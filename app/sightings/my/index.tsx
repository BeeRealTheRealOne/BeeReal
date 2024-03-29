import { useCallback, useEffect, useRef, useState } from 'react';
import pb from '../../../constants/pocketbase';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import { TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import SightingItem from '../../../components/MySightingItem';
import StyleLib from '../../../constants/style';
import Colors from '../../../constants/colors';
import debounce from 'debounce';
import { Ionicons } from '@expo/vector-icons';
import LoadingPage from '../../../components/LoadingPage';

// This page displays a list of all sightings that the user has made
export default function sightingList() {
    const flatListRef = useRef<FlatList>();
    const [refreshing, setRefreshing] = useState(false);

    const [sighting, setSighting] = useState<any>([]);

    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);

    const [searchTerm, setSearchTerm] = useState('');
    const [isSearching, setSearching] = useState(false);

    const [loading, setLoading] = useState(true);

    // load the first page of sightings when the page loads
    useEffect(() => {
        pb.collection('insectFindings')
            .getList(1, 10, { filter: `user.id = '${pb.authStore.model?.id}'`, expand: 'species', sort: '-created' })
            .then((res) => {
                setSighting(res.items);
                setMaxPage(res.totalPages);
                setLoading(false);
            })
            .catch((err) => {
                if (err.status != 0) {
                    console.error(err);
                }
                setLoading(false);
            });
    }, []);

    //search function is a debouce function that waits 500ms after the last keypress before searching
    const search = useCallback(
        debounce(async (localSearchTerm: string) => {
            setRefreshing(true);
            await pb
                .collection('insectFindings')
                .getList(1, 10, { filter: `user.id = '${pb.authStore.model?.id}' && (species.name ~ '${localSearchTerm}' || species.scientificName ~ '${localSearchTerm}')`, expand: 'species', sort: '-created' })
                .then((res) => {
                    setSighting(res.items);
                    setMaxPage(res.totalPages);
                    setRefreshing(false);
                })
                .catch((err) => {
                    if (err.status != 0) {
                        console.error(err);
                    }
                });
        }, 800),
        []
    );

    // refresh the sightings list when the search term changes and then stays constant for longer than 500ms
    useEffect(() => {
        search(searchTerm);
    }, [searchTerm, search]);

    // load the next page of sightings when the user scrolls to the bottom of the list
    function loadMoreSightings() {
        if (page > maxPage) return;
        pb.collection('insectFindings')
            .getList(page + 1, 10, { filter: `user.id = '${pb.authStore.model?.id}' && (species.name ~ '${searchTerm}' || species.scientificName ~ '${searchTerm}')`, expand: 'species', sort: '-created' })
            .then((res) => {
                setPage(page + 1);
                setSighting([...sighting, ...res.items]);
            })
            .catch((err) => {
                if (err.status != 0) {
                    console.error(err);
                }
            });
    }

    // refresh the sightings list when the user pulls down on the list and scroll to top
    function onRefresh() {
        setRefreshing(true);
        setSearchTerm('');
        pb.collection('insectFindings')
            .getList(1, 10, { filter: `user.id = '${pb.authStore.model?.id}' && (species.name ~ '${searchTerm}' || species.scientificName ~ '${searchTerm}')`, expand: 'species', sort: '-created' })
            .then((res) => {
                setSighting(res.items);
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
        <View style={[StyleLib.pageMarginTop, styles.flex]}>
            <View style={StyleSheet.flatten([styles.searchIconContainer])}>
                <TouchableOpacity onPress={() => setSearching(!isSearching)}>
                    <Ionicons name="search" size={30} color={Colors.primaryText} />
                </TouchableOpacity>
            </View>
            {isSearching && (
                <View style={StyleSheet.flatten([styles.searchInputContainer, StyleLib.rounded])}>
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
                style={StyleSheet.flatten([styles.flatList])}
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

const styles = StyleSheet.create({
    searchIconContainer: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        zIndex: 20,
        backgroundColor: Colors.primary,
        padding: 5,
        borderRadius: 30,
        opacity: 0.8,
    },
    searchInputContainer: {
        position: 'absolute',
        bottom: 10,
        right: 60,
        width: 200,
        zIndex: 20,
        backgroundColor: Colors.primary,
        padding: 5,
        opacity: 0.8,
    },
    flatList: {
        height: '100%',
        width: '100%',
    },
    flex: {
        flex: 1,
    },
});
