import { useEffect, useRef, useState } from 'react';
import pb from '../../../../../constants/pocketbase';
import { useLocalSearchParams, Link } from 'expo-router';
import SpeciesItem from '../../../../../components/SpeciesItem';
import { FlatList, StyleSheet, View } from 'react-native';
import StyleLib from '../../../../../constants/style';
import { RefreshControl } from 'react-native-gesture-handler';
import Colors from '../../../../../constants/colors';
import LoadingPage from '../../../../../components/LoadingPage';

// this page displays a list of all species in a categorie
function speciesCategoriesCardView() {
    const flatListRef = useRef<FlatList>();
    const [refreshing, setRefreshing] = useState(false);

    const local = useLocalSearchParams();
    const id = local.id;
    const [species, setSpecies] = useState<any>([]);

    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);

    const [loading, setLoading] = useState(true);

    // load the first page of species when the page loads
    useEffect(() => {
        pb.collection('species')
            .getList(1, 10, { filter: `categorie = "${id}"` })
            .then((res) => {
                setSpecies(res.items);
                setMaxPage(res.totalPages);
                setLoading(false);
            })
            .catch((err) => {
                if (err.status != 0) {
                    console.error(err);
                }
                setLoading(false);
            });
    }, [id]);

    // load the next page of species when the user scrolls to the bottom of the list
    function loadMoreSpecies() {
        if (page > maxPage) return;
        pb.collection('insectFindings')
            .getList(page + 1, 10, { expand: 'species', sort: '-created' })
            .then((res) => {
                setPage(page + 1);
                setSpecies([...species, ...res.items]);
            })
            .catch((err) => {
                if (err.status != 0) {
                    console.error(err);
                }
            });
    }

    // refresh the species list when the user pulls down on the list, or presses the refresh button and then scroll to the top
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
        <View style={StyleSheet.flatten([StyleLib.pageMarginTop, styles.flex])}>
            <FlatList
                ref={flatListRef as any}
                data={species}
                numColumns={1}
                ItemSeparatorComponent={() => <View style={StyleSheet.flatten(styles.gap)}></View>}
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
    flex: {
        flex: 1,
    },
});

export default speciesCategoriesCardView;
