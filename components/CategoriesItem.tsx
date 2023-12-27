import { Text, View } from 'react-native';

const CategoriesItem = (props: { name: string; scientificName: string; id: string }) => {
    return (
        <View>
            <Text>{props.name}</Text>
            <Text>{`[${props.scientificName}]`}</Text>
        </View>
    );
};

export default CategoriesItem;
