import { useEffect, useState } from 'react';
import pb from '../../../constants/pocketbase';
import { FlatList } from 'react-native-gesture-handler';
import { StyleSheet, View } from 'react-native';
import { Link } from 'expo-router';
import SightingItem from '../../../components/MySightingItem';
import StyleLib from '../../../constants/style';

function sightingList() {
    const [sighting, setSighting] = useState<any>([]);

    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);

    useEffect(() => {
        pb.collection('insectFindings')
            .getList(page, 10, { expand: 'species', sort: '-created' })
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
                console.log(res.items);
                setPage(page + 1);
                setSighting([...sighting, ...res.items]);
            })
            .catch((err) => console.error(err));
    }
    return (
        <View style={[StyleLib.page]}>
            <FlatList
                data={sighting}
                numColumns={1}
                ItemSeparatorComponent={() => <View style={styles.gap}></View>}
                renderItem={({ item }) => (
                    <Link style={[styles.width]} href={`/sightings/id/${item.id}/`} key={item.id}>
                        <SightingItem sighting={item} />
                    </Link>
                )}
                keyExtractor={(item) => item.id}
                onEndReached={loadMoreSightings}
                onEndReachedThreshold={0.5}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    gap: {
        height: 10,
    },
    width: {
        flex: 1,
    },
});

export default sightingList;
