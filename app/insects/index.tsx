import { Link, Stack, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import pb from '../../constants/pocketbase';
import Colors from '../../constants/colors';

function Home() {
    return (
        <>
            <View style={[styles.grid]}>
                <View style={[styles.row]}>
                    <Link style={[styles.text, styles.col]} href="/species/">
                        Species
                    </Link>
                    <Link style={[styles.text, styles.col]} href="/categories/">
                        Categories
                    </Link>
                </View>
                <View style={[styles.row]}>
                    <Link style={[styles.text, styles.col]} href="/profile/">
                        Profile
                    </Link>
                    <Link style={[styles.text, styles.col]} href="/sightings/my/">
                        My Sightings
                    </Link>
                </View>
            </View>
        </>
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
