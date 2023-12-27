import { Text, View, Image } from 'react-native';

const SpeciesItem = (props: { name: string; scientificName: string }) => {
    return (
        <View>
            <Text>{props.name}</Text>
            <Text>{`[${props.scientificName}]`}</Text>
        </View>
    );
};

export default SpeciesItem;
