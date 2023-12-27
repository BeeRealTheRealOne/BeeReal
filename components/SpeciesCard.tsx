import { Text, View, Image } from 'react-native';

const SpeciesCard = (props: { name: string; description: string; scientificName: string; categorie: string; imageURL: string }) => {
    return (
        <View>
            <Text>{props.name}</Text>
            <Text>{`[${props.scientificName}]`}</Text>
            <Text>{props.description}</Text>
            <Image style={{ width: 100, height: 100 }} source={{ uri: props.imageURL }} resizeMode="contain" />
        </View>
    );
};

export default SpeciesCard;
