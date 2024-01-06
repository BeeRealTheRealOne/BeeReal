import { useEffect, useRef, useState } from 'react';
import pb from '../../../constants/pocketbase';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import { View } from 'react-native';
import SightingItem from '../../../components/MySightingItem';
import StyleLib from '../../../constants/style';
import Colors from '../../../constants/colors';

function sightingList() {
    const flatListRef = useRef<FlatList>();
    const [refreshing, setRefreshing] = useState(false);

    const [sighting, setSighting] = useState<any>([]);

    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);

    useEffect(() => {
        pb.collection('insectFindings')
            .getList(1, 10, { expand: 'species', sort: '-created' })
            .then((res) => {
                setSighting(res.items);
                setMaxPage(res.totalPages);
            })
            .catch((err) => console.error(err));
    }, []);

    function loadMoreSightings() {
        if (page > maxPage) return;
        pb.collection('insectFindings')
            .getList(page + 1, 10, { expand: 'species', sort: '-created' })
            .then((res) => {
                setPage(page + 1);
                setSighting([...sighting, ...res.items]);
            })
            .catch((err) => console.error(err));
    }

    function onRefresh() {
        setRefreshing(true);
        pb.collection('insectFindings')
            .getList(1, 10, { expand: 'species', sort: '-created' })
            .then((res) => {
                setSighting(res.items);
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
                data={sighting}
                horizontal={false}
                renderItem={({ item }) => <SightingItem key={item.id} sighting={item} />}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} />}
                onRefresh={onRefresh}
                refreshing={refreshing}
                keyExtractor={(item) => item.id}
                onEndReached={loadMoreSightings}
                onEndReachedThreshold={0.5}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

export default sightingList;
