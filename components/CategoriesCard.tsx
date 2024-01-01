import { Text, View } from 'react-native';
import StyleLib from '../constants/style';

const CategoriesCard = (props: { name: string; description: string; scientificName: string }) => {
    if (!props.name) return <Text>Loading...</Text>;
    if (!props.scientificName) return <Text>Loading...</Text>;
    return (
        <View style={[StyleLib.card]}>
            <Text style={[StyleLib.text]}>{props.name}</Text>
            <Text style={[StyleLib.text]}>{`[${props.scientificName}]`}</Text>
            <Text style={[StyleLib.text]}>{props.description}</Text>
        </View>
    );
};

export default CategoriesCard;
