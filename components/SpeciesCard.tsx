import { Text, View, Image, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import StyleLib from '../constants/style';

const SpeciesCard = (props: { name: string; description: string; scientificName: string; categorie: string; imageURL: string }) => {
    if (!props.name) return <Text>Loading...</Text>;
    if (!props.scientificName) return <Text>Loading...</Text>;
    if (!props.categorie) return <Text>Loading...</Text>;
    if (!props.imageURL) return <Text>Loading...</Text>;
    if (!props.description) return <Text>Loading...</Text>;

    return (
        <View style={[StyleLib.card, styles.col, styles.flexNo]}>
            <View style={[styles.row]}>
                <View style={[styles.nameBox]}>
                    <Text style={[StyleLib.h2]}>{props.name}</Text>
                    <Text style={[StyleLib.text]}>{`[${props.scientificName}]`}</Text>
                </View>
                <Image style={[styles.image]} source={{ uri: props.imageURL }} resizeMode="contain" />
            </View>
            <View style={[styles.spacer10]} />
            <Text style={[StyleLib.text]}>{props.description}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    image: {
        width: 130,
        height: 130,
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
        fontWeight: '500',
    },
    scientificName: {
        fontSize: 15,
    },
    description: {
        textAlign: 'justify',
    },
    spacer10: {
        width: 10,
    },
    flex: {
        flex: 1,
    },
    flexNo: {
        flex: 0,
    },
});

export default SpeciesCard;
