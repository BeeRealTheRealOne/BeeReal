import { useState } from 'react';
import pb from '../../constants/pocketbase';
import { Stack, router } from 'expo-router';
import { Text, TextInput, View, Button } from 'react-native';

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
        <View>
            <Stack.Screen options={{ title: 'Login' }} />
            <TextInput placeholder="Enter your username..." onChangeText={(text) => setUsername(text)} />
            <TextInput placeholder="Enter your email..." onChangeText={(text) => setEmail(text)} />
            <TextInput secureTextEntry={true} placeholder="Enter your password..." onChangeText={(text) => setPassword(text)} />
            <TextInput secureTextEntry={true} placeholder="Confirm your password..." onChangeText={(text) => setPasswordConfirm(text)} />
            <Button title="Login" onPress={register} />
            {wrong && <Text>Error Registering</Text>}
        </View>
    );
}

export default login;
