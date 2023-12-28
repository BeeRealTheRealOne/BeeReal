import { Text, View, Image } from 'react-native';

const CategoriesCard = (props: { name: string; description: string; scientificName: string }) => {
    if (!props.name) return <Text>Loading...</Text>;
    if (!props.scientificName) return <Text>Loading...</Text>;
    return (
        <View>
            <Text>{props.name}</Text>
            <Text>{`[${props.scientificName}]`}</Text>
            <Text>{props.description}</Text>
        </View>
    );
};

export default CategoriesCard;
