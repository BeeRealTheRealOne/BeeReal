import { useEffect, useRef, useState } from 'react';
import pb from '../../constants/pocketbase';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import { View } from 'react-native';
import SpeciesItem from '../../components/SpeciesItem';
import StyleLib from '../../constants/style';
import Colors from '../../constants/colors';

function speciesList() {
    const flatListRef = useRef<FlatList>();
    const [refreshing, setRefreshing] = useState(false);

    const [species, setSpecies] = useState<any>();

    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);

    useEffect(() => {
        pb.collection('species')
            .getList(1, 15)
            .then((res) => {
                setSpecies(res.items);
                setMaxPage(res.totalPages);
            })
            .catch((err) => console.error(err));
    }, []);

    function loadMoreSpecies() {
        if (page > maxPage) return;
        pb.collection('species')
            .getList(page + 1, 15)
            .then((res) => {
                setPage(page + 1);
                setSpecies([...species, ...res.items]);
            })
            .catch((err) => console.error(err));
    }

    function onRefresh() {
        setRefreshing(true);
        pb.collection('species')
            .getList(1, 15)
            .then((res) => {
                setSpecies(res.items);
                setMaxPage(res.totalPages);
                setRefreshing(false);
                flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
            })
            .catch((err) => console.error(err));
    }

    return (
        <View style={StyleLib.pageMarginTop}>
            <FlatList
                ref={flatListRef as any}
                data={species}
                horizontal={false}
                renderItem={({ item }) => {
                    return <SpeciesItem key={item.id} id={item.id} name={item.name} scientificName={item.scientificName} imageURL={`${process.env.EXPO_PUBLIC_PB_URL}/api/files/species/${item.id}/${item.image}`}></SpeciesItem>;
                }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} />}
                onRefresh={onRefresh}
                refreshing={refreshing}
                keyExtractor={(item) => item.id}
                onEndReached={loadMoreSpecies}
                onEndReachedThreshold={0.5}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

export default speciesList;
