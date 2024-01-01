import pb from '../../constants/pocketbase';
import { Stack, router } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import Colors from '../../constants/colors';
import StyleLib from '../../constants/style';

function categoriesList() {
    const user = pb.authStore.model;

    if (user === undefined || user === null) {
        router.push('/newUser/');
        return;
    }
    return (
        <View style={[StyleLib.page]}>
            <View style={[styles.container]}>
                <View>
                    <Text style={[StyleLib.text]}>Email: {user.email}</Text>
                    <Text style={[StyleLib.text]}>Username: {user.username}</Text>
                </View>
                <View style={[StyleLib.spacer]} />
                <Button
                    color={Colors.primary}
                    title="Logout"
                    onPress={() => {
                        pb.authStore.clear();
                        router.push('/');
                    }}
                />
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
    text: {
        color: Colors.baseText,
    },
});

export default categoriesList;
