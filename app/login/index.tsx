import { useState } from 'react';
import pb from '../../constants/pocketbase';
import { router } from 'expo-router';
import { Text, TextInput, View, Button } from 'react-native';

function login() {
    if (pb.authStore.isValid) {
        router.replace('/species/');
    }
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [wrong, setWrong] = useState<boolean>(false);

    const login = () => {
        pb.collection('users')
            .authWithPassword(email, password)
            .then((res) => {
                router.replace('/');
            })
            .catch((err) => {
                console.error(err);
                setWrong(true);
            });
    };

    return (
        <View>
            <TextInput placeholder="Enter your email..." onChangeText={(text) => setEmail(text)} />
            <TextInput placeholder="Enter your password..." onChangeText={(text) => setPassword(text)} />
            <Button title="Login" onPress={login} />
            {wrong && <Text>Wrong email or password</Text>}
        </View>
    );
}

export default login;
