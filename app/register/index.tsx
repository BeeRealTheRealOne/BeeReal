import { useState } from 'react';
import pb from '../../constants/pocketbase';
import { Link, router } from 'expo-router';
import { Text, TextInput, View, Button, StyleSheet } from 'react-native';
import Colors from '../../constants/colors';
import StyleLib from '../../constants/style';
import Toast from 'react-native-root-toast';

// this is the register page
function register() {
    if (pb.authStore.isValid) {
        router.replace('/insects/');
    }
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirm, setPasswordConfirm] = useState<string>('');
    const [wrong, setWrong] = useState<boolean>(false);

    // send register request to pocketbase, all the checks also run in the backend for validation, it is just to give the user a better experience
    const register = () => {
        // check if all fields are filled
        if (!password || !passwordConfirm || !username || !email) {
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
        // check if passwords match
        if (password !== passwordConfirm) {
            Toast.show('Passwords do not match', {
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
        // check if password is long enough
        if (password.length < 8) {
            Toast.show('Password must be at least 8 characters long', {
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
        // check if username is long enough
        if (username.length < 5) {
            Toast.show('Username must be at least 3 characters long', {
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
        // check if email is valid
        if (!email.includes('@')) {
            Toast.show('Email must be valid', {
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

        pb.collection('users')
            .create({ username, email, password, passwordConfirm, newUser: true })
            .then((res) => {
                pb.collection('users')
                    .authWithPassword(email, password)
                    .then((res) => {
                        router.replace('/tutorial/');
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                Toast.show('Username/Email taken', {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    backgroundColor: Colors.cancel,
                    hideOnPress: true,
                    delay: 0,
                });
                setWrong(true);
            });
    };

    return (
        <View style={[styles.container]}>
            <View style={[styles.infoContainer]}>
                <Text style={[StyleLib.h1]}>
                    <Text style={[styles.highlight]}>Bee</Text> part of our community<Text style={[styles.highlight]}>!</Text>
                </Text>
            </View>
            <View style={[styles.loginContainer]}>
                <View style={[styles.inputContainer]}>
                    <TextInput style={[StyleLib.input]} keyboardAppearance="dark" placeholder="Enter your username..." onChangeText={(text) => setUsername(text)} />
                    <TextInput style={[StyleLib.input]} keyboardAppearance="dark" placeholder="Enter your email..." onChangeText={(text) => setEmail(text)} />
                    <View style={[styles.space]} />
                    <TextInput style={[StyleLib.input]} keyboardAppearance="dark" secureTextEntry={true} placeholder="Enter your password..." onChangeText={(text) => setPassword(text)} />
                    <TextInput style={[StyleLib.input]} keyboardAppearance="dark" secureTextEntry={true} placeholder="Confirm your password..." onChangeText={(text) => setPasswordConfirm(text)} />
                </View>
                <Button color={Colors.primary} title="Register" onPress={register} />
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
        margin: 5,
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
        gap: 5,
    },
    inputContainer: {
        gap: 5,
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

export default register;
