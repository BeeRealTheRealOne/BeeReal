import pb from '../../constants/pocketbase';
import { Stack, router } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CameraIcon from '../../components/CameraIcon';
import BeeIcon from '../../components/BeeIcon';
import Colors from '../../constants/colors';

function categoriesList() {
    const user = pb.authStore.model;

    if (user === undefined || user === null) {
        router.push('/newUser/');
        return;
    }
    return (
        <View style={[styles.container]}>
            <View>
                <Text>Email: {user.email}</Text>
                <Text>Username: {user.username}</Text>
            </View>
            <TouchableOpacity
                onPress={() => {
                    pb.authStore.clear();
                    router.push('/');
                }}
            >
                <Text style={[styles.text]}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: Colors.baseText,
    },
});

export default categoriesList;
