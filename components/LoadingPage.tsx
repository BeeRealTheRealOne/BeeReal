import { View, Text } from 'react-native';
import StyleLib from '../constants/style';

export default function Loading() {
    return (
        <View style={[StyleLib.page, { paddingBottom: 20, alignContent: 'center', justifyContent: 'center', height: '100%', width: '100%' }]}>
            <Text style={[StyleLib.h2, { textAlign: 'center' }]}>Loading...</Text>
        </View>
    );
}
