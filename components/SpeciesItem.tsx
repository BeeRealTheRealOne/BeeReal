import { Text, View, Image, StyleSheet, Touchable, Pressable } from 'react-native';
import StyleLib from '../constants/style';
import { Link } from 'expo-router';

const SpeciesItem = (props: { name: string; scientificName: string; imageURL: string; id: string }) => {
    if (!props.name) return <></>;
    if (!props.scientificName) return <></>;
    if (!props.imageURL) return <></>;

    return (
        <Link href={`/species/id/${props.id}/`} style={StyleSheet.flatten([styles.container])} asChild>
            <Pressable>
                <View style={StyleSheet.flatten([StyleLib.card])}>
                    <View style={StyleSheet.flatten([styles.imageNameContainer])}>
                        <Image style={StyleSheet.flatten([StyleLib.rounded, styles.image])} source={{ uri: props.imageURL }} resizeMode="contain" />
                        <View style={StyleSheet.flatten([styles.flex])}>
                            <Text style={StyleSheet.flatten([StyleLib.h3, { flexWrap: 'wrap' }])}>{props.name}</Text>
                            <Text style={StyleSheet.flatten([StyleLib.text])}>{`[${props.scientificName}]`}</Text>
                        </View>
                    </View>
                </View>
            </Pressable>
        </Link>
    );
};

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        marginRight: 10,
        flex: 1,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 20,
        marginVertical: 10,
    },
    imageNameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        alignItems: 'center',
        marginRight: 'auto',
    },
    flex: {
        flex: 1,
    },
    stretch: {
        width: '100%',
    },
});

export default SpeciesItem;
