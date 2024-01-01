import { Link } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';

function Home() {
    return (
        <View style={[styles.container]}>
            <View style={[styles.infoContainer]}>
                <Text style={[styles.text, styles.heading]}>
                    Welcome to <Text style={[styles.highlight, styles.heading]}>Bee</Text>
                    Real<Text style={[styles.highlight, styles.heading]}>!</Text>
                </Text>
                <Text style={[styles.text]}>Please login or register to continue.</Text>
            </View>
            <View style={[styles.LoginContainer]}>
                <Link href="/register/">
                    <View style={[styles.IconWithText]}>
                        <Ionicons name="person-add" size={80} color={Colors.baseText} />
                        <Text style={[styles.text, styles.center]}>Register</Text>
                    </View>
                </Link>
                <Link href="/login/">
                    <View style={[styles.IconWithText]}>
                        <Ionicons name="log-in" size={80} color={Colors.baseText} />
                        <Text style={[styles.text, styles.center]}>Login</Text>
                    </View>
                </Link>
            </View>
            <View style={[styles.bumper]} />
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

export default Home;
