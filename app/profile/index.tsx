import pb from '../../constants/pocketbase';
import { Link, router } from 'expo-router';
import { View, Text, StyleSheet, Button, Touchable } from 'react-native';
import Colors from '../../constants/colors';
import StyleLib from '../../constants/style';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';

/**
  * This page shows the users profile and some other app informations and also
  * can log the user out and links to the achievments
  */
function profileView() {
    // get the current user that is logged in
    const user = pb.authStore.model;
    if (user === undefined || user === null) {
        router.push('/newUser/');
        return;
    }
    return (
        <View style={[StyleLib.page]}>
            <View style={[styles.spacer]}></View>
            <View style={[styles.col]}>
                <View style={[styles.row, styles.center]}>
                    <View style={[StyleLib.card]}>
                        <Text style={[StyleLib.text]}>Email: {user.email}</Text>
                        <Text style={[StyleLib.text]}>Username: {user.username}</Text>
                    </View>
                </View>
                <View style={[styles.row]}>
                    <View style={[StyleLib.card]}>
                        <Link href="/achivements/" asChild>
                            <TouchableOpacity>
                                <View style={[styles.col, styles.center]}>
                                    <Ionicons name="trophy" size={45} color="black" />
                                    <Text>Achivements</Text>
                                </View>
                            </TouchableOpacity>
                        </Link>
                    </View>
                </View>
                <View style={[styles.row]}>
                    <View style={[StyleLib.card, styles.centerSpaced]}>
                        <Link style={[styles.col]} href="/tutorial/">
                            <Text style={[StyleLib.text]}>tutorial</Text>
                        </Link>
                    </View>
                    <View style={[StyleLib.card, styles.centerSpaced]}>
                        <Link style={[styles.col]} href="/imprint/">
                            <Text style={[StyleLib.text]}>Imprint</Text>
                        </Link>
                    </View>
                </View>
                <View style={[styles.row]}>
                    <View style={[StyleLib.card, styles.centerSpaced]}>
                        <Button
                            color={Colors.primary}
                            title="Logout"
                            onPress={() => {
                                pb.authStore.clear();
                                AsyncStorage.clear();
                                router.push('/');
                            }}
                        />
                    </View>
                </View>
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
        gap: 10,
    },
    row: {
        flexDirection: 'row',
        gap: 10,
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    centerSpaced: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    spacer: {
        height: 50,
    },
});

export default profileView;
