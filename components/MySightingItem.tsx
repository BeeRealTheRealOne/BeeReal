import { View, Text, Image, StyleSheet } from 'react-native';
import { Sighting } from '../types/Sighting';
import timeToString from '../util/timeToString';
import StyleLib from '../constants/style';

function SightingItem(props: { sighting: Sighting }) {
    if (!props.sighting) return <></>;
    return (
        <View style={[StyleLib.card, styles.flex]}>
            <View style={[styles.container]}>
                <Image
                    style={[styles.image, StyleLib.rounded]}
                    source={{
                        uri: `${process.env.EXPO_PUBLIC_PB_URL}/api/files/insectFindings/${props.sighting.id}/${props.sighting.image}?thumb=100x100`,
                    }}
                />
                <View style={[styles.flex, styles.marginRight]}>
                    <View>
                        <Text style={[StyleLib.text]}>{props.sighting.expand.species.name}</Text>
                    </View>
                    <Text style={[StyleLib.text]}>
                        {props.sighting.longitude}, {props.sighting.latitude}
                    </Text>
                    <Text style={[StyleLib.text]}>{timeToString(props.sighting.created)}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        gap: 10,
    },
    image: {
        width: 100,
        height: 100,
    },
    flex: {
        flex: 1,
    },
    marginRight: {
        marginRight: 10,
    },
});

export default SightingItem;
