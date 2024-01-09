import { View, Text, StyleSheet } from 'react-native';
import StyleLib from '../constants/style';
import Colors from '../constants/colors';

export default function Comment(props: { user: string; text: string }) {
    return (
        <View style={[StyleLib.card, styles.margin, styles.gap]}>
            <Text style={[StyleLib.text, { fontWeight: '400' }]}>{props.user}</Text>
            <Text style={[StyleLib.text]}>{props.text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    margin: {
        marginHorizontal: 20,
        marginVertical: 10,
    },
    gap: {
        gap: 10,
    },
});
