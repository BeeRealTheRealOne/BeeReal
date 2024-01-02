import { useEffect, useRef, useState } from 'react';
import pb from '../../constants/pocketbase';
import CategoriesItem from '../../components/CategoriesItem';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import { Link } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import StyleLib from '../../constants/style';
import Colors from '../../constants/colors';

function categoriesList() {
    const flatListRef = useRef<FlatList>();
    const [refreshing, setRefreshing] = useState(false);
    const [categories, setCategories] = useState<any>([]);

    useEffect(() => {
        pb.collection('categories')
            .getList(1, 100, { sort: 'name' })
            .then((res) => {
                setCategories(res.items);
            })
            .catch((err) => console.error(err));
    }, []);

    function onRefresh() {
        setRefreshing(true);
        pb.collection('categories')
            .getList(1, 100, { sort: 'name' })
            .then((res) => {
                setCategories(res.items);
                setRefreshing(false);
                flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
            })
            .catch((err) => console.error(err));
    }

    if (!categories) return <Text>Loading</Text>;
    return (
        <View style={StyleLib.pageMarginTop}>
            <FlatList
                ref={flatListRef as any}
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
});

export default categoriesList;
