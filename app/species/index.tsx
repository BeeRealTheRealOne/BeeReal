import { useCallback, useEffect, useRef, useState } from 'react';
import pb from '../../constants/pocketbase';
import { FlatList, RefreshControl, TextInput } from 'react-native-gesture-handler';
import { TouchableOpacity, View } from 'react-native';
import SpeciesItem from '../../components/SpeciesItem';
import StyleLib from '../../constants/style';
import Colors from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import debounce from 'debounce';

function speciesList() {
    const flatListRef = useRef<FlatList>();
    const [refreshing, setRefreshing] = useState(false);

    const [species, setSpecies] = useState<any>();

    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);

    const [searchTerm, setSearchTerm] = useState('');
    const [isSearching, setSearching] = useState(false);

    //search function is a debouce function that waits 500ms after the last keypress before searching
    const search = useCallback(
        debounce(async (localSearchTerm: string) => {
            setRefreshing(true);
            await pb
                .collection('species')
                .getList(1, 15, { filter: `name ~ '${localSearchTerm}'` })
                .then((res) => {
                    setSpecies(res.items);
                    setMaxPage(res.totalPages);
                    setRefreshing(false);
                })
                .catch((err) => console.error(err));
        }, 500),
        []
    );

    //load the first page of species when the page loads
    useEffect(() => {
        pb.collection('species')
            .getList(1, 15)
            .then((res) => {
                setSpecies(res.items);
                setMaxPage(res.totalPages);
            })
            .catch((err) => console.error(err));
    }, []);

    //search whenever the search term changes
    useEffect(() => {
        search(searchTerm);
    }, [searchTerm, search]);

    //load more species when the user scrolls to the bottom of the list
    function loadMoreSpecies() {
        if (page > maxPage) return;
        pb.collection('species')
            .getList(page + 1, 15, { filter: `name ~ '${searchTerm}'` })
            .then((res) => {
                setPage(page + 1);
                setSpecies([...species, ...res.items]);
            })
            .catch((err) => console.error(err));
    }

    //refresh the list when the user pulls down
    async function onRefresh() {
        setRefreshing(true);
        setSearchTerm('');
        pb.collection('species')
            .getList(1, 15, { filter: `name ~ '${''}'` })
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
            <View style={[{ position: 'absolute', bottom: 10, right: 10, zIndex: 20, backgroundColor: Colors.primary, padding: 5, borderRadius: 30, opacity: 0.8 }]}>
                <TouchableOpacity onPress={() => setSearching(!isSearching)}>
                    <Ionicons name="search" size={24} color={Colors.primaryText} />
                </TouchableOpacity>
            </View>
            {isSearching && (
                <View style={[{ position: 'absolute', bottom: 10, right: 60, width: 200, zIndex: 20, backgroundColor: Colors.primary, padding: 5, opacity: 0.8 }, StyleLib.rounded]}>
                    <TextInput
                        placeholder="Search"
                        placeholderTextColor={Colors.primaryText}
                        value={searchTerm}
                        style={[{ color: Colors.primaryText }]}
                        onChangeText={(text) => {
                            setSearchTerm(text);
                        }}
                    />
                </View>
            )}
            <FlatList
                ref={flatListRef as any}
                style={[{ height: '100%', width: '100%' }]}
                data={species}
                horizontal={false}
                renderItem={({ item }) => {
                    return <SpeciesItem key={item.id} id={item.id} name={item.name} scientificName={item.scientificName} imageURL={`${process.env.EXPO_PUBLIC_PB_URL}/api/files/species/${item.id}/${item.image}`}></SpeciesItem>;
                }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} />}
                onRefresh={onRefresh}
                onGestureEvent={() => setSearching(false)}
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
