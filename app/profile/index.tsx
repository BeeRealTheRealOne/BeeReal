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
export default function profileView() {
    // get the current user that is logged in
    const user = pb.authStore.model;
    if (user === undefined || user === null) {
        router.push('/newUser/');
        return;
    }
    return (
        <View style={StyleSheet.flatten([StyleLib.page])}>
            <View style={StyleSheet.flatten([styles.spacer])}></View>
            <View style={StyleSheet.flatten([styles.col])}>
                <View style={StyleSheet.flatten([styles.row, styles.center])}>
                    <View style={StyleSheet.flatten([StyleLib.card])}>
                        <Text style={StyleSheet.flatten([StyleLib.text])}>Email: {user.email}</Text>
                        <Text style={StyleSheet.flatten([StyleLib.text])}>Username: {user.username}</Text>
                    </View>
                </View>
                <View style={StyleSheet.flatten([styles.row])}>
                    <View style={StyleSheet.flatten([StyleLib.card])}>
                        <Link href="/achivements/" asChild>
                            <TouchableOpacity>
                                <View style={StyleSheet.flatten([styles.col, styles.center])}>
                                    <Ionicons name="trophy" size={45} color="black" />
                                    <Text>Achivements</Text>
                                </View>
                            </TouchableOpacity>
                        </Link>
                    </View>
                </View>
                <View style={StyleSheet.flatten([styles.row])}>
                    <View style={StyleSheet.flatten([StyleLib.card, styles.centerSpaced])}>
                        <Link style={StyleSheet.flatten([styles.col])} href="/tutorial/">
                            <Text style={StyleSheet.flatten([StyleLib.text])}>tutorial</Text>
                        </Link>
                    </View>
                    <View style={StyleSheet.flatten([StyleLib.card, styles.centerSpaced])}>
                        <Link style={StyleSheet.flatten([styles.col])} href="/imprint/">
                            <Text style={StyleSheet.flatten([StyleLib.text])}>Imprint</Text>
                        </Link>
                    </View>
                </View>
                <View style={StyleSheet.flatten([styles.row])}>
                    <View style={StyleSheet.flatten([StyleLib.card, styles.centerSpaced])}>
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
