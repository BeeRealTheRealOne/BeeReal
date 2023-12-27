import { Text, View, Image, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const SpeciesCard = (props: { name: string; description: string; scientificName: string; categorie: string; imageURL: string }) => {
    return (
        <ScrollView style={[styles.col, styles.container]}>
            <View style={[styles.row]}>
                <View style={[styles.nameBox]}>
                    <Text style={[styles.name]}>{props.name}</Text>
                    <Text style={[styles.scientificName]}>{`[${props.scientificName}]`}</Text>
                </View>
                <Image style={[styles.image]} source={{ uri: props.imageURL }} resizeMode="contain" />
            </View>
            <View style={[styles.spacer10]} />
            <Text style={[styles.description]}>{props.description}</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    image: {
        width: 130,
        height: 130,
        flex: 1,
    },
    row: {
        flexDirection: 'row',
    },
    col: {
        flexDirection: 'column',
    },
    nameBox: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    scientificName: {
        fontSize: 15,
    },
    description: {
        textAlign: 'justify',
    },
    spacer10: {
        margin: 10,
    },
});

export default SpeciesCard;
