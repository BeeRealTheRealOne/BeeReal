import { Image, StyleSheet, Text, View } from 'react-native';
import StyleLib from '../../constants/style';

/**
 * Imprint page with fake data
 */
function imprintView() {
    return (
        <View style={StyleSheet.flatten(StyleLib.page)}>
            <Text style={StyleSheet.flatten([StyleLib.h2])}>Imprint</Text>
            <Text style={StyleSheet.flatten([StyleLib.text])}>Name: Michel Hoffmeister</Text>
            <Text style={StyleSheet.flatten([StyleLib.text])}>Anschrift: Beispielstraße 25</Text>
            <Text style={StyleSheet.flatten([StyleLib.text])}>Email: michel.hoffmeister@stud.hs-ruhrwest.de</Text>
            <Text style={StyleSheet.flatten([StyleLib.text])}>Telefon: 0123456789</Text>
        </View>
    );
}

export default imprintView;
