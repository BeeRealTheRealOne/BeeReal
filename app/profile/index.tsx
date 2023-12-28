import pb from '../../constants/pocketbase';
import { Stack, router } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import CameraIcon from '../../components/CameraIcon';

function categoriesList() {
    const user = pb.authStore.model;

    if (user === undefined || user === null) {
        router.push('/login/');
        return;
    }
    return (
        <View style={[styles.container]}>
            <View>
                <Text>Email: {user.email}</Text>
                <Text>Username: {user.username}</Text>
                <Stack.Screen options={{ title: 'Profile', headerRight: CameraIcon }} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default categoriesList;
