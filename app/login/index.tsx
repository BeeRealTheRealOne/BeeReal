import { useState } from 'react';
import pb from '../../constants/pocketbase';
import { Stack, router } from 'expo-router';
import { Text, TextInput, View, Button, StyleSheet } from 'react-native';

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
            <Stack.Screen options={{ title: 'Login' }} />
            <View style={[styles.inputView]}>
                <TextInput style={[styles.input]} placeholder="Enter your email..." onChangeText={(text) => setEmail(text)} />
                <TextInput style={[styles.input]} secureTextEntry={true} placeholder="Enter your password..." onChangeText={(text) => setPassword(text)} />
            </View>
            <Button title="Login" onPress={login} />
            {wrong && <Text>Wrong email or password</Text>}
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
