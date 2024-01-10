import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { Sighting } from '../types/Sighting';
import timeToString from '../util/timeToString';
import StyleLib from '../constants/style';
import { Link } from 'expo-router';

function SightingItem(props: { sighting: Sighting }) {
    if (!props.sighting) return <></>;
    return (
        <Link href={`/sightings/id/${props.sighting.id}/`} style={StyleSheet.flatten([styles.row, styles.margin])} asChild>
            <Pressable>
                <View style={StyleSheet.flatten([StyleLib.card, styles.flex])}>
                    <View style={StyleSheet.flatten([styles.container])}>
                        <Image
                            style={StyleSheet.flatten([styles.image, StyleLib.rounded])}
                            source={{
                                uri: `${process.env.EXPO_PUBLIC_PB_URL}/api/files/insectFindings/${props.sighting.id}/${props.sighting.image}?thumb=100x100`,
                            }}
                        />
                        <View style={StyleSheet.flatten([styles.flex, styles.marginRight, styles.justify])}>
                            <View>
                                <Text style={StyleSheet.flatten([StyleLib.h3])}>{props.sighting.expand.species.name}</Text>
                            </View>
                            <Text style={StyleSheet.flatten([StyleLib.text])}>{timeToString(props.sighting.created)}</Text>
                        </View>
                    </View>
                </View>
            </Pressable>
        </Link>
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
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        alignItems: 'center',
    },
    stretch: {
        width: '100%',
    },
    margin: {
        marginHorizontal: 20,
        marginVertical: 10,
    },
    justify: {
        justifyContent: 'center',
    },
});

export default SightingItem;
