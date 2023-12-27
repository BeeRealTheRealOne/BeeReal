import { useEffect, useState } from 'react';
import pb from '../../constants/pocketbase';
import { FlatList } from 'react-native-gesture-handler';
import { View } from 'react-native';
import { Link, Stack } from 'expo-router';
import SpeciesItem from '../../components/SpeciesItem';

function speciesList() {
    const [species, setSpecies] = useState<any>([]);

    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    useEffect(() => {
        pb.collection('species')
            .getList(page, 15)
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
    return (
        <View>
            <Stack.Screen options={{ title: 'Species' }} />
            <FlatList
                data={species}
                renderItem={({ item }) => (
                    <Link href={`/species/id/${item.id}/`} key={item.id}>
                        <SpeciesItem key={item.id} name={item.name} scientificName={item.scientificName} imageURL={`&{process.env.EXPO_PUBLIC_PB_URL}/api/files/species/${item.id}/${item.image}`}></SpeciesItem>
                    </Link>
                )}
                keyExtractor={(item) => item.id}
                onEndReached={loadMoreSpecies}
                onEndReachedThreshold={0.5}
            />
        </View>
    );
}

export default speciesList;
