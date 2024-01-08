import { useEffect, useState } from 'react';
import pb from '../../constants/pocketbase';
import { Link, Stack, router } from 'expo-router';
import { Text, TextInput, View, Button, StyleSheet } from 'react-native';
import Colors from '../../constants/colors';
import StyleLib from '../../constants/style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-root-toast';

// this is the login page
function login() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    // send login request to pocketbase
    const login = async () => {
        if (!email || !password) {
            Toast.show('Please fill in all fields', {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                backgroundColor: Colors.cancel,
                hideOnPress: true,
                delay: 0,
            });
            return;
        }

        setLoading(true);
        pb.collection('users')
            .authWithPassword(email, password)
            .then((res) => {
                setLoading(false);
                if (res.token) {
                    const cookie = pb.authStore.exportToCookie();
                    AsyncStorage.setItem('sessionCookie', cookie);
                    router.push('/');
                }
            })
            .catch((err) => {
                setLoading(false);
                // show error message on fail
                Toast.show('Wrong email or password', {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    backgroundColor: Colors.cancel,
                    hideOnPress: true,
                    delay: 0,
                });
            });
    };

    return (
        <View style={[styles.container]}>
            <View style={[styles.infoContainer]}>
                <Text style={[StyleLib.h1]}>
                    Welcome <Text style={[styles.highlight]}>Bee</Text>ck
                    <Text style={[styles.highlight]}>!</Text>
                </Text>
            </View>
            <View style={[styles.loginContainer]}>
                <View style={[styles.inputContainer]}>
                    <TextInput style={[StyleLib.input]} placeholder="Enter your email..." onChangeText={(text) => setEmail(text)} />
                    <TextInput style={[StyleLib.input]} secureTextEntry={true} placeholder="Enter your password..." onChangeText={(text) => setPassword(text)} />
                </View>
                <Button color={Colors.primary} title={!loading ? 'Login' : 'sending'} onPress={login} disabled={loading} />
                <Link href="/imprint/">
                    <Text style={[StyleLib.text]}>Imprint</Text>
                </Link>
            </View>
            <View style={[styles.bumper]} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        margin: 20,
    },
    infoContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
    },
    inputContainer: {
        gap: 10,
    },
    input: {
        backgroundColor: Colors.base,
        color: Colors.baseText,
        paddingHorizontal: 5,
        borderRadius: 2,
        width: 250,
    },
    button: {
        backgroundColor: Colors.primary,
        color: Colors.base,
    },
    text: {
        color: Colors.baseText,
    },
    highlight: {
        color: Colors.primary,
    },
    heading: {
        fontSize: 30,
    },
    bumper: {
        flex: 1,
    },
});

export default login;
