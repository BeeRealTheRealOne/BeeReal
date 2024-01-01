import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

function AppLayout() {
    return (
        <>
            <StatusBar style="dark" />
            <Tabs>
                <Tabs.Screen name="index" options={{ href: '/', title: 'home', headerShown: false }} />
                <Tabs.Screen name="snap/index" options={{ href: '/snap', title: 'snap', headerShown: false }} />
                <Tabs.Screen name="social/index" options={{ href: '/social', title: 'social', headerShown: false }} />
                <Tabs.Screen name="categories/index" options={{ href: null, headerShown: false }} />
                <Tabs.Screen name="login/index" options={{ href: null, headerShown: false }} />
                <Tabs.Screen name="profile/index" options={{ href: null, headerShown: false }} />
                <Tabs.Screen name="register/index" options={{ href: null, headerShown: false }} />
                <Tabs.Screen name="sightings/my/index" options={{ href: null, headerShown: false }} />
                <Tabs.Screen name="sightings/id/[id]/index" options={{ href: null, headerShown: false }} />
                <Tabs.Screen name="species/index" options={{ href: null, headerShown: false }} />
                <Tabs.Screen name="species/categorie/id/[id]/index" options={{ href: null, headerShown: false }} />
                <Tabs.Screen name="species/id/[id]/index" options={{ href: null, headerShown: false }} />
            </Tabs>
        </>
    );
}

export default AppLayout;
