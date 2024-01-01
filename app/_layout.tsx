import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text } from 'react-native';
import pb from '../constants/pocketbase';

function AppLayout() {
    const [validUser, setValidUser] = React.useState<boolean>(false);
    React.useEffect(() => {
        setValidUser(pb.authStore.isValid);
    }, []);

    pb.authStore.onChange(() => {
        setValidUser(pb.authStore.isValid);
    });

    if (!validUser) {
        return (
            <>
                <StatusBar style="dark" />
                <Tabs>
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
                    <Tabs.Screen name="profile/index" options={{ href: null, headerShown: false }} />
                    <Tabs.Screen name="categories/index" options={{ href: null, headerShown: false }} />
                    <Tabs.Screen name="sightings/my/index" options={{ href: null, headerShown: false }} />
                    <Tabs.Screen name="sightings/id/[id]/index" options={{ href: null, headerShown: false }} />
                    <Tabs.Screen name="species/index" options={{ href: null, headerShown: false }} />
                    <Tabs.Screen name="species/categorie/id/[id]/index" options={{ href: null, headerShown: false }} />
                    <Tabs.Screen name="species/id/[id]/index" options={{ href: null, headerShown: false }} />
                    <Tabs.Screen name="newUser/index" options={{ href: null, headerShown: false }} />
                    <Tabs.Screen name="index" options={{ href: null, headerShown: false }} />
                </Tabs>
            </>
        );
    }
    return (
        <>
            <StatusBar style="dark" />
            <Tabs>
                <Tabs.Screen name="insects/index" options={{ href: '/insects', title: 'insects', tabBarIcon: () => <MaterialCommunityIcons name="bee" size={25} />, headerShown: false }} />
                <Tabs.Screen name="snap/index" options={{ href: '/snap', title: 'snap', tabBarIcon: () => <Ionicons name="camera" size={25} />, headerShown: false }} />
                <Tabs.Screen name="social/index" options={{ href: '/social', title: 'social', tabBarIcon: () => <Ionicons name="people" size={25} />, headerShown: false }} />
                <Tabs.Screen name="profile/index" options={{ href: '/profile', title: 'profile', tabBarIcon: () => <Ionicons name="person" size={25} />, headerShown: false }} />
                <Tabs.Screen name="categories/index" options={{ href: null, headerShown: false }} />
                <Tabs.Screen name="login/index" options={{ href: null, headerShown: false }} />
                <Tabs.Screen name="register/index" options={{ href: null, headerShown: false }} />
                <Tabs.Screen name="sightings/my/index" options={{ href: null, headerShown: false }} />
                <Tabs.Screen name="sightings/id/[id]/index" options={{ href: null, headerShown: false }} />
                <Tabs.Screen name="species/index" options={{ href: null, headerShown: false }} />
                <Tabs.Screen name="species/categorie/id/[id]/index" options={{ href: null, headerShown: false }} />
                <Tabs.Screen name="species/id/[id]/index" options={{ href: null, headerShown: false }} />
                <Tabs.Screen name="newUser/index" options={{ href: null, headerShown: false }} />
                <Tabs.Screen name="index" options={{ href: null, headerShown: false }} />
            </Tabs>
        </>
    );
}

export default AppLayout;
