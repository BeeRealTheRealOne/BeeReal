import { Link, Stack, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import StyleLib from '../../constants/style';

function Home() {
    return (
        <View style={[styles.grid, StyleLib.page]}>
            <View style={[styles.row]}>
                <View style={[styles.center]}>
                    <Link style={[StyleLib.text, styles.col]} href="/species/">
                        All Species
                    </Link>
                </View>
                <View style={[styles.center]}>
                    <Link style={[StyleLib.text, styles.col]} href="/categories/">
                        Categories of Species
                    </Link>
                </View>
            </View>
            <View style={[styles.row]}>
                <View style={[styles.center]}>
                    <Link style={[StyleLib.text, styles.col]} href="/sightings/my/">
                        My Sightings
                    </Link>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    grid: {
        flex: 2,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
    },
    col: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },
});

export default Home;
