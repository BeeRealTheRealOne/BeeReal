import { Text, View, StyleSheet, Pressable } from 'react-native';
import StyleLib from '../constants/style';
import { Link } from 'expo-router';

const CategoriesItem = (props: { name: string; scientificName: string; id: string }) => {
    if (!props.name) return <Text>Loading...</Text>;
    if (!props.scientificName) return <Text>Loading...</Text>;
    if (!props.id) return <Text>Loading...</Text>;

    return (
        <Link style={StyleSheet.flatten([styles.row, styles.margin])} href={`/species/categorie/id/${props.id}/`} asChild>
            <Pressable>
                <View style={StyleSheet.flatten([styles.col, StyleLib.card])}>
                    <Text>{props.name}</Text>
                    <Text>{`[${props.scientificName}]`}</Text>
                </View>
            </Pressable>
        </Link>
    );
};

const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    col: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    margin: {
        marginHorizontal: 20,
        marginVertical: 10,
    },
});

export default CategoriesItem;
