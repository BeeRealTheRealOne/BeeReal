import { useState } from 'react';
import pb from '../../constants/pocketbase';
import { Stack, router } from 'expo-router';
import { Text, TextInput, View, Button } from 'react-native';

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
        <View>
            <Stack.Screen options={{ title: 'Login' }} />
            <TextInput placeholder="Enter your email..." onChangeText={(text) => setEmail(text)} />
            <TextInput secureTextEntry={true} placeholder="Enter your password..." onChangeText={(text) => setPassword(text)} />
            <Button title="Login" onPress={login} />
            {wrong && <Text>Wrong email or password</Text>}
        </View>
    );
}

export default login;
