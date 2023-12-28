import { useState } from 'react';
import pb from '../../constants/pocketbase';
import { Stack, router } from 'expo-router';
import { Text, TextInput, View, Button, StyleSheet } from 'react-native';

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
            <Stack.Screen options={{ title: 'Login' }} />
            <View style={[styles.inputView]}>
                <TextInput style={[styles.input]} placeholder="Enter your username..." onChangeText={(text) => setUsername(text)} />
                <TextInput style={[styles.input]} placeholder="Enter your email..." onChangeText={(text) => setEmail(text)} />
                <TextInput style={[styles.input]} secureTextEntry={true} placeholder="Enter your password..." onChangeText={(text) => setPassword(text)} />
                <TextInput style={[styles.input]} secureTextEntry={true} placeholder="Confirm your password..." onChangeText={(text) => setPasswordConfirm(text)} />
            </View>
            <Button title="Login" onPress={register} />
            {wrong && <Text>Error Registering</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    inputView: {
        gap: 10,
    },
    input: {
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 5,
    },
});

export default login;
