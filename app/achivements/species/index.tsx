import { useEffect, useRef, useState } from 'react';
import pb from '../../../constants/pocketbase';
import { View, StyleSheet } from 'react-native';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import StyleLib from '../../../constants/style';
import LoadingPage from '../../../components/LoadingPage';
import SpeciesDiscovered from '../../../components/SpeciesDiscovered';
import Colors from '../../../constants/colors';

// This is the achivements page, it shows the achivements of the user and can be accessed from the profile page
export default function speciesAchivements() {
    const flatListRef = useRef<FlatList>();
    const [refreshing, setRefreshing] = useState(false);

    //list of all species
    const [speciesIds, setSpeciesIds] = useState<any>();

    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);

    const [loading, setLoading] = useState(true);

    //load functions for the achivements
    useEffect(() => {
        pb.collection('speciesIds')
            .getList(1, 20)
            .then((res) => {
                setSpeciesIds(
                    res.items.map((x) => {
                        return x.id;
                    })
                );
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

    function loadMoreAchievements() {
        if (page >= maxPage) return;
        pb.collection('speciesIds')
            .getList(page + 1, 20)
            .then((res) => {
                setPage(page + 1);
                setSpeciesIds([...speciesIds, ...res.items.map((x) => x.id)]);
            })
            .catch((err) => {
                if (err.status != 0) {
                    console.error(err);
                }
            });
    }

    function onRefresh() {
        setRefreshing(true);
        pb.collection('speciesIds')
            .getList(1, 20)
            .then((res) => {
                setSpeciesIds(res.items.map((x) => x.id));
                setRefreshing(false);
            })
            .catch((err) => {
                if (err.status != 0) {
                    console.error(err);
                }
                setRefreshing(false);
            });
    }

    if (loading) {
        return <LoadingPage />;
    }

    return (
        <View style={StyleSheet.flatten([StyleLib.pageMarginTop, styles.fullHeight])}>
            <FlatList
                ref={flatListRef as any}
                style={StyleSheet.flatten([styles.flatList])}
                data={speciesIds}
                horizontal={false}
                renderItem={({ item }) => {
                    return <SpeciesDiscovered speciesId={item} key={item} />;
                }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} />}
                onRefresh={onRefresh}
                refreshing={refreshing}
                keyExtractor={(item: any) => item}
                onEndReached={loadMoreAchievements}
                onEndReachedThreshold={0.5}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    flatList: {
        height: '100%',
        width: '100%',
    },
    fullHeight: {
        height: '100%',
    },
});
