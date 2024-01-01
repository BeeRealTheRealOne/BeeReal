import { useState } from 'react';
import pb from '../../constants/pocketbase';
import { Stack, router } from 'expo-router';
import { Text, TextInput, View, Button, StyleSheet } from 'react-native';
import Colors from '../../constants/colors';
import StyleLib from '../../constants/style';

function login() {
    if (pb.authStore.isValid) {
        router.replace('/');
    }
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [wrong, setWrong] = useState<boolean>(false);

    const login = () => {
        pb.collection('users')
            .authWithPassword(email, password)
            .then((res) => {
                router.push('/');
            })
            .catch((err) => {
                console.error(err);
                setWrong(true);
            });
    };

    return (
        <View style={[styles.container]}>
            <View style={[styles.infoContainer]}>
                <Text style={[StyleLib.h1]}>
                    Welcome <Text style={[styles.highlight]}>Bee</Text>ck<Text style={[styles.highlight]}>!</Text>
                </Text>
            </View>
            <View style={[styles.loginContainer]}>
                <View style={[styles.inputContainer]}>
                    <TextInput style={[StyleLib.input]} placeholder="Enter your email..." onChangeText={(text) => setEmail(text)} />
                    <TextInput style={[StyleLib.input]} secureTextEntry={true} placeholder="Enter your password..." onChangeText={(text) => setPassword(text)} />
                </View>
                <Button color={Colors.primary} title="Login" onPress={login} />
                {wrong && <Text>Wrong email or password</Text>}
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
