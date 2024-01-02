import { useEffect, useRef, useState } from 'react';
import pb from '../../../../../constants/pocketbase';
import { useLocalSearchParams, Link } from 'expo-router';
import SpeciesItem from '../../../../../components/SpeciesItem';
import { FlatList, StyleSheet, View } from 'react-native';
import StyleLib from '../../../../../constants/style';
import { RefreshControl } from 'react-native-gesture-handler';
import Colors from '../../../../../constants/colors';

function categoriesCardView() {
    const flatListRef = useRef<FlatList>();
    const [refreshing, setRefreshing] = useState(false);

    const local = useLocalSearchParams();
    const id = local.id;
    const [species, setSpecies] = useState<any>([]);

    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);

    useEffect(() => {
        pb.collection('species')
            .getList(1, 10, { filter: `categorie = "${id}"` })
            .then((res) => {
                setSpecies(res.items);
                setMaxPage(res.totalPages);
            })
            .catch((err) => console.error(err));
    }, [id]);

    function loadMoreSpecies() {
        if (page > maxPage) return;
        pb.collection('insectFindings')
            .getList(page + 1, 10, { expand: 'species', sort: '-created' })
            .then((res) => {
                setPage(page + 1);
                setSpecies([...species, ...res.items]);
            })
            .catch((err) => console.error(err));
    }

    function onRefresh() {
        setRefreshing(true);
        pb.collection('species')
            .getList(1, 10, { filter: `categorie = "${id}"` })
            .then((res) => {
                setSpecies(res.items);
                setMaxPage(res.totalPages);
                setRefreshing(false);
                flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
            })
            .catch((err) => console.error(err));
    }

    return (
        <View style={[StyleLib.pageMarginTop]}>
            <FlatList
                ref={flatListRef as any}
                data={species}
                numColumns={1}
                ItemSeparatorComponent={() => <View style={styles.gap}></View>}
                renderItem={({ item }) => {
                    return <SpeciesItem key={item.id} id={item.id} name={item.name} scientificName={item.scientificName} imageURL={`${process.env.EXPO_PUBLIC_PB_URL}/api/files/species/${item.id}/${item.image}`}></SpeciesItem>;
                }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} />}
                onRefresh={onRefresh}
                refreshing={refreshing}
                keyExtractor={(item) => item.id}
                onEndReached={loadMoreSpecies}
                onEndReachedThreshold={0.5}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    gap: {
        height: 10,
    },
});

export default categoriesCardView;
