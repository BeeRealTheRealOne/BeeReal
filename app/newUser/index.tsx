import { Link } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import StyleLib from '../../constants/style';

/**
 * This page can be used to give the user the choice of logging in or registering,
 * but is currently not used
 */
export default function newUser() {
    return (
        <View style={StyleSheet.flatten([styles.container])}>
            <View style={StyleSheet.flatten([styles.infoContainer])}>
                <Text style={StyleSheet.flatten([StyleLib.h1])}>
                    Welcome to <Text style={StyleSheet.flatten([styles.highlight])}>Bee</Text>
                    Real<Text style={StyleSheet.flatten([styles.highlight])}>!</Text>
                </Text>
                <Text style={StyleSheet.flatten([StyleLib.text])}>Please login or register to continue.</Text>
            </View>
            <View style={StyleSheet.flatten([styles.LoginContainer])}>
                <Link href="/register/">
                    <View style={StyleSheet.flatten([styles.IconWithText])}>
                        <Ionicons name="person-add" size={80} color={Colors.baseText} />
                        <Text style={StyleSheet.flatten([styles.text, styles.center])}>Register</Text>
                    </View>
                </Link>
                <Link href="/login/">
                    <View style={StyleSheet.flatten([styles.IconWithText])}>
                        <Ionicons name="log-in" size={80} color={Colors.baseText} />
                        <Text style={StyleSheet.flatten([styles.text, styles.center])}>Login</Text>
                    </View>
                </Link>
            </View>
            <View style={StyleSheet.flatten([styles.bumper])} />
        </View>
    );
}

const styles = StyleSheet.create({
    grid: {
        flex: 2,
        margin: 20,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
    },
    col: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        color: Colors.baseText,
    },
    infoContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bumper: {
        flex: 1,
    },
    LoginContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        gap: 40,
    },
    IconWithText: {
        justifyContent: 'center',
        textAlign: 'center',
    },
    heading: {
        fontSize: 30,
    },
    text: {
        color: Colors.baseText,
    },
    highlight: {
        color: Colors.primary,
    },
    center: {
        textAlign: 'center',
    },
});
