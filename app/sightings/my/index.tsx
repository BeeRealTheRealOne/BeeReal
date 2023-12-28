import { useEffect, useState } from 'react';
import pb from '../../../constants/pocketbase';
import { FlatList } from 'react-native-gesture-handler';
import { View } from 'react-native';
import { Link, Stack } from 'expo-router';
import SightingItem from '../../../components/MySightingItem';

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
            .getList(page + 1, 15)
            .then((res) => {
                setPage(page + 1);
                setSighting([...sighting, ...res.items]);
            })
            .catch((err) => console.error(err));
    }
    return (
        <View>
            <Stack.Screen options={{ title: 'My Sightings' }} />
            <FlatList
                data={sighting}
                renderItem={({ item }) => (
                    <Link href={`/sightings/id/${item.id}/`} key={item.id}>
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

export default sightingList;
