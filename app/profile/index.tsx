import pb from '../../constants/pocketbase';
import { Link, router } from 'expo-router';
import { View, Text, StyleSheet, Button } from 'react-native';
import Colors from '../../constants/colors';
import StyleLib from '../../constants/style';
import { Ionicons } from '@expo/vector-icons';

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
                <View>
                    <Link style={[styles.col]} href="/achivements/" asChild>
                        <Ionicons name="trophy" size={45} color="black" />
                        <Text>Achivements</Text>
                    </Link>
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
    col: {
        flexDirection: 'column',
    },
});

export default categoriesList;
