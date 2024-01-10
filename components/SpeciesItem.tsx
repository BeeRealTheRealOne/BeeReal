import { Text, View, Image, StyleSheet, Touchable, Pressable } from 'react-native';
import StyleLib from '../constants/style';
import { Link } from 'expo-router';

const SpeciesItem = (props: { name: string; scientificName: string; imageURL: string; id: string }) => {
    if (!props.name) return <></>;
    if (!props.scientificName) return <></>;
    if (!props.imageURL) return <></>;

    return (
        <Link href={`/species/id/${props.id}/`} style={StyleSheet.flatten([styles.row, styles.margin])} asChild>
            <Pressable>
                <View style={StyleSheet.flatten([StyleLib.card])}>
                    <View style={StyleSheet.flatten([styles.row, { flex: 1, marginRight: 'auto' }])}>
                        <Image style={StyleSheet.flatten([{ width: 100, height: 100, marginRight: 10 }, StyleLib.rounded, styles.flex])} source={{ uri: props.imageURL }} resizeMode="contain" />
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
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        alignItems: 'center',
    },
    flex: {
        flex: 1,
    },
    stretch: {
        width: '100%',
    },
    margin: {
        marginHorizontal: 20,
        marginVertical: 10,
    },
});

export default SpeciesItem;
