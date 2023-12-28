import { Stack } from 'expo-router';
import Colors from '../constants/colors';
import { StatusBar } from 'expo-status-bar';

function AppLayout() {
    return (
        <>
            <StatusBar style="dark" />
            <Stack
                screenOptions={{
                    headerStyle: {
                        backgroundColor: Colors.base,
                    },
                    contentStyle: {
                        backgroundColor: Colors.baseLight,
                    },
                    headerTintColor: Colors.primary,
                    animation: 'fade_from_bottom',
                }}
            />
        </>
    );
}

export default AppLayout;
