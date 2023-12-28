import { Link, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import pb from '../constants/pocketbase';
import Colors from '../constants/colors';
import CameraIcon from '../components/CameraIcon';
import { Ionicons } from '@expo/vector-icons';

function Home() {
    const [name, setName] = useState<string | undefined>();

    useEffect(() => {
        if (pb?.authStore?.model?.username !== undefined) {
            setName(pb.authStore.model.username);
        }
    });

    return (
        <>
            {name === undefined && <HomeNotLoggedIn />}
            {name !== undefined && (
                <View style={[styles.container]}>
                    <Stack.Screen
                        options={{
                            title: 'Home',
                            headerRight: CameraIcon,
                        }}
                    />
                    <Text style={[styles.text]}>Hello {name}!</Text>
                    <Link style={[styles.text]} href="/species/">
                        Species
                    </Link>
                    <Link style={[styles.text]} href="/categories/">
                        Categories
                    </Link>
                    <Link style={[styles.text]} href="/snap/">
                        Camera
                    </Link>
                    <Link style={[styles.text]} href="/profile/">
                        Profile
                    </Link>
                    <Link style={[styles.text]} href="/sightings/my/">
                        My Sightings
                    </Link>
                    <TouchableOpacity
                        onPress={() => {
                            pb.authStore.clear();
                            setName(undefined);
                        }}
                    >
                        <Text style={[styles.text]}>Logout</Text>
                    </TouchableOpacity>
                </View>
            )}
        </>
    );
}

function HomeNotLoggedIn() {
    return (
        <View style={[styles.container]}>
            <Stack.Screen
                options={{
                    title: 'Home',
                }}
            />
            <View style={[styles.infoContainer]}>
                <Text style={[styles.text, styles.heading]}>
                    Welcome to <Text style={[styles.highlight, styles.heading]}>BeeReal!</Text>
                </Text>
                <Text style={[styles.text]}>Please login or register to continue.</Text>
            </View>
            <View style={[styles.LoginContainer]}>
                <Link href="/register/">
                    <View style={[styles.IconWithText]}>
                        <Ionicons name="person-add" size={80} color={Colors.baseText} />
                        <Text style={[styles.text, styles.center]}>Register</Text>
                    </View>
                </Link>
                <Link href="/login/">
                    <View style={[styles.IconWithText]}>
                        <Ionicons name="log-in" size={80} color={Colors.baseText} />
                        <Text style={[styles.text, styles.center]}>Login</Text>
                    </View>
                </Link>
            </View>
            <View style={[styles.bumper]} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        color: Colors.baseText,
    },
    infoContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bumper: {
        flex: 1,
    },
    LoginContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
    },
    IconWithText: {
        justifyContent: 'center',
        textAlign: 'center',
    },
    heading: {
        fontSize: 30,
    },
    text: {
        color: Colors.baseText,
    },
    highlight: {
        color: Colors.primary,
    },
    center: {
        textAlign: 'center',
    },
});

export default Home;
