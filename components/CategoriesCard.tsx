import { Text, View, StyleSheet } from 'react-native';
import StyleLib from '../constants/style';

const CategoriesCard = (props: { name: string; description: string; scientificName: string }) => {
    if (!props.name) return <Text>Loading...</Text>;
    if (!props.scientificName) return <Text>Loading...</Text>;
    return (
        <View style={StyleSheet.flatten([StyleLib.card])}>
            <Text style={StyleSheet.flatten([StyleLib.text])}>{props.name}</Text>
            <Text style={StyleSheet.flatten([StyleLib.text])}>{`[${props.scientificName}]`}</Text>
            <Text style={StyleSheet.flatten([StyleLib.text])}>{props.description}</Text>
        </View>
    );
};

export default CategoriesCard;
