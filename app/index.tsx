import { Link, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import pb from '../constants/pocketbase';

const Greeting = () => {
    const [name, setName] = useState<string | undefined>();

    useEffect(() => {
        if (pb?.authStore?.model?.username !== undefined) {
            setName(pb.authStore.model.username);
        }
    });

    return (
        <View>
            <Stack.Screen options={{ title: 'Home' }} />
            {name === undefined && (
                <>
                    <Link href="/login/">
                        <Text>Login</Text>
                    </Link>
                    <Link href="/register/">
                        <Text>Register</Text>
                    </Link>
                </>
            )}
            {name !== undefined && (
                <>
                    <Text>Hello {name}!</Text>
                    <Link href="/species/">
                        <Text>Species</Text>
                    </Link>
                    <Link href="/categories/">
                        <Text>Categories</Text>
                    </Link>
                    <Link href="/snap/">Camera</Link>
                    <Link href="/profile/">Profile</Link>
                    <TouchableOpacity
                        onPress={() => {
                            pb.authStore.clear();
                            setName(undefined);
                        }}
                    >
                        <Text>Logout</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
};

export default Greeting;
