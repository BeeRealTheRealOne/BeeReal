import { useState } from 'react';
import pb from '../../constants/pocketbase';
import { Stack, router } from 'expo-router';
import { Text, TextInput, View, Button, StyleSheet } from 'react-native';
import Colors from '../../constants/colors';
import BeeIcon from '../../components/BeeIcon';

function login() {
    if (pb.authStore.isValid) {
        router.replace('/');
    }
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirm, setPasswordConfirm] = useState<string>('');
    const [wrong, setWrong] = useState<boolean>(false);

    const register = () => {
        pb.collection('users')
            .create({ username, email, password, passwordConfirm })
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
                <Text style={[styles.text, styles.heading]}>
                    <Text style={[styles.highlight]}>Bee</Text> part of our community<Text style={[styles.highlight, styles.heading]}>!</Text>
                </Text>
            </View>
            <View style={[styles.loginContainer]}>
                <View style={[styles.inputContainer]}>
                    <TextInput style={[styles.input]} keyboardAppearance="dark" placeholder="Enter your username..." onChangeText={(text) => setUsername(text)} />
                    <TextInput style={[styles.input]} keyboardAppearance="dark" placeholder="Enter your email..." onChangeText={(text) => setEmail(text)} />
                    <View style={[styles.space]} />
                    <TextInput style={[styles.input]} keyboardAppearance="dark" secureTextEntry={true} placeholder="Enter your password..." onChangeText={(text) => setPassword(text)} />
                    <TextInput style={[styles.input]} keyboardAppearance="dark" secureTextEntry={true} placeholder="Confirm your password..." onChangeText={(text) => setPasswordConfirm(text)} />
                </View>
                <Button color={Colors.primary} title="Register" onPress={register} />
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
    space: {
        margin: 2,
    },
});

export default login;
