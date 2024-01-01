import { Text, View, Image, StyleSheet } from 'react-native';

const SpeciesItem = (props: { name: string; scientificName: string; imageURL: string }) => {
    if (!props.name) return <></>;
    if (!props.scientificName) return <></>;
    if (!props.imageURL) return <></>;

    return (
        <View style={[styles.row]}>
            <Image style={{ width: 100, height: 100 }} source={{ uri: props.imageURL }} resizeMode="contain" />
            <View>
                <Text>{props.name}</Text>
                <Text>{`[${props.scientificName}]`}</Text>
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
