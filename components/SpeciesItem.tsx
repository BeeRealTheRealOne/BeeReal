import { Text, View, Image, StyleSheet } from 'react-native';
import StyleLib from '../constants/style';

const SpeciesItem = (props: { name: string; scientificName: string; imageURL: string }) => {
    if (!props.name) return <></>;
    if (!props.scientificName) return <></>;
    if (!props.imageURL) return <></>;

    return (
        <View style={[StyleLib.card]}>
            <View style={[styles.row]}>
                <Image style={[{ width: 100, height: 100 }, StyleLib.rounded]} source={{ uri: props.imageURL }} resizeMode="contain" />
                <View>
                    <Text style={[StyleLib.text]}>{props.name}</Text>
                    <Text style={[StyleLib.text]}>{`[${props.scientificName}]`}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

export default SpeciesItem;
