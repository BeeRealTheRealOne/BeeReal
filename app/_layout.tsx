import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Link, Tabs, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import pb from '../constants/pocketbase';
import Colors from '../constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootSiblingParent } from 'react-native-root-siblings';

/**
  * Layout of the app using expo,
  * defines the structure, navbar and profile
  * checks if session cookies exist
  */
function AppLayout() {
    const [validUser, setValidUser] = useState<boolean>(false);

    // check if the user is logged in
    useEffect(() => {
        setValidUser(pb.authStore.isValid);
    }, []);

    // when ever the authState changes, set the layout state
    pb.authStore.onChange(() => {
        setValidUser(pb.authStore.isValid);
    });

    // if the user is logged in, load the session cookie and redirect to the home page
    useEffect(() => {
        const reloadSession = async () => {
            const cookie = await AsyncStorage.getItem('sessionCookie');
            if (cookie) {
                pb.authStore.loadFromCookie(cookie);
                router.push('/');
            }
        };
        reloadSession();
    }, []);

    // if the user is not logged in, show the login and register tabs
    if (!validUser) {
        return (
            <RootSiblingParent>
                <StatusBar style="dark" />
                <Tabs backBehavior="history">
                    <Tabs.Screen
                        name="login/index"
                        options={{
                            href: '/login',
                            title: 'login',
                            tabBarIcon: () => <Ionicons name="log-in" size={25} />,
                            headerShown: false,
                        }}
                    />
                    <Tabs.Screen
                        name="register/index"
                        options={{
                            href: '/register',
                            title: 'register',
                            tabBarIcon: () => <Ionicons name="person-add" size={25} />,
                            headerShown: false,
                        }}
                    />
                    <Tabs.Screen name="insects/index" options={{ href: null, headerShown: false }} />
                    <Tabs.Screen name="snap/index" options={{ href: null, headerShown: false }} />
                    <Tabs.Screen name="social/index" options={{ href: null, headerShown: false }} />
                    <Tabs.Screen name="social/user/id/[id]/index" options={{ href: null, headerShown: false, unmountOnBlur: true }} />
                    <Tabs.Screen name="social/comments/id/[id]/index" options={{ href: null, headerShown: false, unmountOnBlur: true }} />
                    <Tabs.Screen name="profile/index" options={{ href: null, headerShown: false, unmountOnBlur: true }} />
                    <Tabs.Screen name="categories/index" options={{ href: null, headerShown: false, unmountOnBlur: true }} />
                    <Tabs.Screen name="sightings/my/index" options={{ href: null, headerShown: false, unmountOnBlur: true }} />
                    <Tabs.Screen name="sightings/id/[id]/index" options={{ href: null, headerShown: false, unmountOnBlur: true }} />
                    <Tabs.Screen name="species/index" options={{ href: null, headerShown: false, unmountOnBlur: true }} />
                    <Tabs.Screen name="species/categorie/id/[id]/index" options={{ href: null, headerShown: false, unmountOnBlur: true }} />
                    <Tabs.Screen name="species/id/[id]/index" options={{ href: null, headerShown: false, unmountOnBlur: true }} />
                    <Tabs.Screen name="newUser/index" options={{ href: null, headerShown: false, unmountOnBlur: true }} />
                    <Tabs.Screen name="achivements/index" options={{ href: null, headerShown: false, unmountOnBlur: true }} />
                    <Tabs.Screen name="achivements/species/index" options={{ href: null, headerShown: false, unmountOnBlur: true }} />
                    <Tabs.Screen name="imprint/index" options={{ href: null, headerShown: false, unmountOnBlur: true }} />
                    <Tabs.Screen name="tutorial/index" options={{ href: null, headerShown: false, unmountOnBlur: true }} />
                    <Tabs.Screen name="index" options={{ href: null, headerShown: false, unmountOnBlur: true }} />
                </Tabs>
            </RootSiblingParent>
        );
    }
    // if the user is logged in, show the home page with tabs
    return (
        <RootSiblingParent>
            <Link href="/profile/" style={styles.profileWrapper}>
                <MaterialCommunityIcons name={'account'} size={40} style={styles.accountIcon} />
            </Link>
            <StatusBar style="dark" />
            <Tabs backBehavior="history">
                <Tabs.Screen
                    name="insects/index"
                    options={{
                        tabBarActiveBackgroundColor: Colors.primary,
                        href: '/insects',
                        title: '',
                        // tabBarIcon so shown in the navbar
                        tabBarIcon: () => <MaterialCommunityIcons name="bee" size={45} />,
                        headerShown: false,
                    }}
                />
                <Tabs.Screen
                    name="snap/index"
                    options={{
                        tabBarActiveBackgroundColor: Colors.primary,
                        href: '/snap',
                        title: '',
                        tabBarIcon: () => <Ionicons name="camera" size={40} />,
                        headerShown: false,
                    }}
                />
                <Tabs.Screen
                    name="social/index"
                    options={{
                        tabBarActiveTintColor: Colors.primary,
                        tabBarActiveBackgroundColor: Colors.primary,
                        href: '/social',
                        title: '',
                        tabBarIcon: () => <Ionicons name="people" size={38} />,
                        headerShown: false,
                    }}
                />
                <Tabs.Screen
                    name="profile/index"
                    options={{
                        href: null,
                        headerShown: false,
                        unmountOnBlur: true,
                    }}
                />
                <Tabs.Screen name="social/user/id/[id]/index" options={{ href: null, headerShown: false, unmountOnBlur: true }} />
                <Tabs.Screen name="social/comments/id/[id]/index" options={{ href: null, headerShown: false, unmountOnBlur: true }} />
                <Tabs.Screen name="categories/index" options={{ href: null, headerShown: false, unmountOnBlur: true }} />
                <Tabs.Screen name="login/index" options={{ href: null, headerShown: false, unmountOnBlur: true }} />
                <Tabs.Screen name="register/index" options={{ href: null, headerShown: false, unmountOnBlur: true }} />
                <Tabs.Screen name="sightings/my/index" options={{ href: null, headerShown: false, unmountOnBlur: true }} />
                <Tabs.Screen name="sightings/id/[id]/index" options={{ href: null, headerShown: false, unmountOnBlur: true }} />
                <Tabs.Screen name="species/index" options={{ href: null, headerShown: false, unmountOnBlur: true }} />
                <Tabs.Screen name="species/categorie/id/[id]/index" options={{ href: null, headerShown: false, unmountOnBlur: true }} />
                <Tabs.Screen name="species/id/[id]/index" options={{ href: null, headerShown: false, unmountOnBlur: true }} />
                <Tabs.Screen name="newUser/index" options={{ href: null, headerShown: false, unmountOnBlur: true }} />
                <Tabs.Screen name="achivements/index" options={{ href: null, headerShown: false, unmountOnBlur: true }} />
                <Tabs.Screen name="achivements/species/index" options={{ href: null, headerShown: false, unmountOnBlur: true }} />
                <Tabs.Screen name="imprint/index" options={{ href: null, headerShown: false, unmountOnBlur: true }} />
                <Tabs.Screen name="tutorial/index" options={{ href: null, headerShown: false, unmountOnBlur: true }} />
                <Tabs.Screen name="index" options={{ href: null, headerShown: false, unmountOnBlur: true }} />
            </Tabs>
        </RootSiblingParent>
    );
}
const styles = StyleSheet.create({
    tabBar: {
        alignItems: 'center', // Center items vertically
        justifyContent: 'center', // Center items horizontally
    },
    profileWrapper: {
        flexDirection: 'row',
        position: 'absolute',
        top: 30,
        right: 20,
        alignItems: 'center',
        backgroundColor: Colors.primary,
        borderRadius: 50,
        padding: 5,
        opacity: 0.8,
        zIndex: 20,
    },
    accountIcon: {
        opacity: 1,
    },
    accountText: {
        fontSize: 20,
        fontWeight: '500',
    },
});

export default AppLayout;
