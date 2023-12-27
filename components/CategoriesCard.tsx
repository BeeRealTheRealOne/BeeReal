import { Text, View, Image } from 'react-native';

const CategoriesCard = (props: { name: string; description: string; scientificName: string }) => {
    return (
        <View>
            <Text>{props.name}</Text>
            <Text>{`[${props.scientificName}]`}</Text>
            <Text>{props.description}</Text>
        </View>
    );
};

export default CategoriesCard;
