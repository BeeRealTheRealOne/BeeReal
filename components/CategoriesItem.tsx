import { Text, View, StyleSheet } from 'react-native';

const CategoriesItem = (props: { name: string; scientificName: string; id: string }) => {
    return (
        <View style={[styles.row]}>
            <Text>{props.name}</Text>
            <Text>{`[${props.scientificName}]`}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

export default CategoriesItem;
