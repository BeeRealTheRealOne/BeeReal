import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import StyleLib from '../constants/style';
import Colors from '../constants/colors';

export default function Loading() {
    return (
        <View style={StyleSheet.flatten([StyleLib.page, { paddingBottom: 20, alignContent: 'center', justifyContent: 'center', height: '100%', width: '100%' }])}>
            <Text style={StyleSheet.flatten([StyleLib.h2, { textAlign: 'center' }])}>Loading</Text>
            <ActivityIndicator size="large" color={Colors.primary} />
        </View>
    );
}
