import { useEffect, useState } from 'react';
import pb from '../../constants/pocketbase';
import { View, StyleSheet } from 'react-native';
import { Link, Stack, router } from 'expo-router';
import { FlatList } from 'react-native-gesture-handler';
import Post from '../../components/Post';
import StyleLib from '../../constants/style';

function Social() {
    const [posts, setPosts] = useState<any>();
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);

    useEffect(() => {
        pb.collection('posts')
            .getList(page, 10, { expand: 'insectFinding' })
            .then((res) => {
                console.log(res);
                setPosts(res.items);
                setMaxPage(res.totalPages);
            })
            .catch((err) => console.error(err));
    }, []);

    function loadMorePosts() {
        if (page >= maxPage) return;
        pb.collection('insectFindings')
            .getList(page + 1, 15)
            .then((res) => {
                setPage(page + 1);
                setPosts([...posts, ...res.items]);
            })
            .catch((err) => console.error(err));
    }
    return (
        <View style={StyleLib.page}>
            <View style={styles.container}>
                <FlatList
                    data={posts}
                    ItemSeparatorComponent={() => <View style={styles.gap}></View>}
                    renderItem={({ item }) => {
                        console.log('rendering item ', item);
                        return (
                            <Link href="/insects/" key={item.id} style={styles.postLink}>
                                <Post user={item.user} title={item.title} message={item.message} imageUrl={`${process.env.EXPO_PUBLIC_PB_URL}/api/files/insectFindings/${item.expand.insectFinding.id}/${item.expand.insectFinding.image}`} insectFindingId={item.expand.insectFinding.id} />
                            </Link>
                        );
                    }}
                    keyExtractor={(item: any) => item.id}
                    onEndReached={loadMorePosts}
                    onEndReachedThreshold={0.5}
                />
            </View>
        </View>
    );
}
export default Social;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    postLink: {
        marginBottom: 10,
    },
    gap: {
        height: 10,
    },
});
