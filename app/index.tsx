import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import pb from '../constants/pocketbase';

const Greeting = () => {
    const [name, setName] = useState<string | undefined>();

    useEffect(() => {
        if (pb?.authStore?.model?.username !== undefined) {
            setName(pb.authStore.model.username);
        }
    }, []);

    return (
        <View>
            {name === undefined && (
                <Link href="/login/">
                    <Text>Login</Text>
                </Link>
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
