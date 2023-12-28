import { View, Text, Image, StyleSheet } from 'react-native';
import { Sighting } from '../types/Sighting';

function SightingItem(props: { sighting: Sighting }) {
    console.log(`${process.env.EXPO_PUBLIC_PB_URL}/api/files/insectFindings/${props.sighting.id}/${props.sighting.image}?thumb=100x100`);
    return (
        <View>
            <Image style={[styles.image]} source={{ uri: `${process.env.EXPO_PUBLIC_PB_URL}/api/files/insectFindings/${props.sighting.id}/${props.sighting.image}?thumb=100x100` }} />
            <Text>{props.sighting.species}</Text>
            <Text>{props.sighting.longitude}</Text>
            <Text>{props.sighting.latitude}</Text>
            <Text>{props.sighting.created}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
    },
});

export default SightingItem;
