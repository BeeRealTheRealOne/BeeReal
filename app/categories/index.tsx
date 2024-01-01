import { useEffect, useState } from 'react';
import pb from '../../constants/pocketbase';
import CategoriesItem from '../../components/CategoriesItem';
import { FlatList } from 'react-native-gesture-handler';
import { Link } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import StyleLib from '../../constants/style';

function categoriesList() {
    const [categories, setCategories] = useState<any>([]);
    useEffect(() => {
        pb.collection('categories')
            .getList(1, 100, { sort: 'name' })
            .then((res) => {
                setCategories(res.items);
            })
            .catch((err) => console.error(err));
    }, []);
    if (!categories) return <Text>Loading</Text>;
    return (
        <View style={StyleLib.page}>
            <FlatList
                ItemSeparatorComponent={() => <View style={styles.gap}></View>}
                numColumns={1}
                data={categories}
                renderItem={({ item }) => (
                    <Link href={`/species/categorie/id/${item.id}/`} key={item.id}>
                        <CategoriesItem id={item.id} key={item.id} name={item.name} scientificName={item.scientificName} />
                    </Link>
                )}
                keyExtractor={(item: any) => item.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    gap: {
        height: 10,
    },
});

export default categoriesList;
