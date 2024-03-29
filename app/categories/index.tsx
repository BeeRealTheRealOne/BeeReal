import { useEffect, useRef, useState } from 'react';
import pb from '../../constants/pocketbase';
import CategoriesItem from '../../components/CategoriesItem';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import { View, Text, StyleSheet } from 'react-native';
import StyleLib from '../../constants/style';
import Colors from '../../constants/colors';
import LoadingPage from '../../components/LoadingPage';

/*
 * This page shows a list of all the categories, a categorie is a group of species of insects.
 * From here the user can navigate to the species in the categorie
 */
export default function categoriesList() {
    const flatListRef = useRef<FlatList>();
    const [refreshing, setRefreshing] = useState(false);
    const [categories, setCategories] = useState<any>([]);

    const [loading, setLoading] = useState(true);

    // there shouldn't be more than 100 categories (5 atm), so we can just load them all at once
    // load the first page of categories when the page loads
    useEffect(() => {
        pb.collection('categories')
            .getList(1, 100, { sort: 'name' })
            .then((res) => {
                setCategories(res.items);
                setLoading(false);
            })
            .catch((err) => {
                if (err.status != 0) {
                    console.error(err);
                }
                setLoading(false);
            });
    }, []);

    // refresh the categories list when the user pulls down on the list and scroll to the top
    function onRefresh() {
        setRefreshing(true);
        pb.collection('categories')
            .getList(1, 100, { sort: 'name' })
            .then((res) => {
                setCategories(res.items);
                setRefreshing(false);
                flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
            })
            .catch((err) => {
                if (err.status != 0) {
                    console.error(err);
                }
            });
    }

    if (loading) {
        return <LoadingPage />;
    }
    return (
        <View style={StyleSheet.flatten([StyleLib.pageMarginTop, styles.fullHeight])}>
            <FlatList
                ref={flatListRef as any}
                style={StyleSheet.flatten([styles.flatList])}
                ItemSeparatorComponent={() => <View style={styles.gap}></View>}
                numColumns={1}
                data={categories}
                renderItem={({ item }) => {
                    return <CategoriesItem id={item.id} key={item.id} name={item.name} scientificName={item.scientificName} />;
                }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} />}
                onRefresh={onRefresh}
                refreshing={refreshing}
                keyExtractor={(item: any) => item.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    gap: {
        height: 10,
    },
    flatList: {
        height: '100%',
        width: '100%',
    },
    fullHeight: {
        height: '100%',
    },
});
