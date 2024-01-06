import { Image, StyleSheet, Text, View } from 'react-native';
import StyleLib from '../../constants/style';

// This is the imprint page
function imprintView() {
    return (
        <View style={StyleLib.page}>
            <Text style={[StyleLib.h2]}>Imprint</Text>
            <Text style={[StyleLib.text]}>Name: Michel Hoffmeister</Text>
            <Text style={[StyleLib.text]}>Anschrift: Beispielstraße 25</Text>
            <Text style={[StyleLib.text]}>Email: michel.hoffmeister@stud.hs-ruhrwest.de</Text>
            <Text style={[StyleLib.text]}>Telefon: 0123456789</Text>
        </View>
    );
}

export default imprintView;
