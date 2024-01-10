import { useEffect, useState, useRef } from 'react';
import pb from '../../constants/pocketbase';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import Post from '../../components/Post';
import StyleLib from '../../constants/style';
import Colors from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import LoadingPage from '../../components/LoadingPage';

/**
 * This page displays a list of all posts made
 */
export default function Social() {
    const flatListRef = useRef<FlatList>();
    const [refreshing, setRefreshing] = useState(false);

    const [posts, setPosts] = useState<any>();

    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);

    const [loading, setLoading] = useState(true);

    // load the first page of posts when the page loads
    useEffect(() => {
        pb.collection('posts')
            .getList(page, 10, { expand: 'insectFinding.user, comments(post)', sort: '-created' })
            .then((res) => {
                res.items.forEach((item: any) => {
                    if (item.expand['comments(post)'] == undefined) {
                        item.comments = item.expand['comments(post)'] = { length: 0 };
                    }
                });
                setPosts(res.items);
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

    // load the next page of posts when the user scrolls to the bottom of the list
    function loadMorePosts() {
        if (page >= maxPage) return;
        pb.collection('posts')
            .getList(page + 1, 15, { expand: 'insectFinding.user, comments(post)', sort: '-created' })
            .then((res) => {
                res.items.forEach((item: any) => {
                    if (item.expand['comments(post)'] == undefined) {
                        item.comments = item.expand['comments(post)'] = { length: 0 };
                    }
                });
                setPage(page + 1);
                setPosts([...posts, ...res.items]);
            })
            .catch((err) => {
                if (err.status != 0) {
                    console.error(err);
                }
            });
    }

    // refresh the posts list when the user pulls down on the list, or presses the refresh button and then scroll to the top
    function onRefresh() {
        setRefreshing(true);
        pb.collection('posts')
            .getList(1, 10, { expand: 'insectFinding.user, comments(post)', sort: '-created' })
            .then((res) => {
                res.items.forEach((item: any) => {
                    if (item.expand['comments(post)'] == undefined) {
                        item.comments = item.expand['comments(post)'] = { length: 0 };
                    }
                });
                setPosts(res.items);
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
        <View style={StyleSheet.flatten([styles.container])}>
            <View style={StyleSheet.flatten([styles.refresh])}>
                <TouchableOpacity onPress={onRefresh}>
                    <Ionicons name="refresh" size={24} color={Colors.primaryText} />
                </TouchableOpacity>
            </View>
            <FlatList
                ref={flatListRef as any}
                style={StyleSheet.flatten([styles.flatlist])}
                data={posts}
                horizontal={false}
                renderItem={({ item }) => {
                    return (
                        <Post
                            postId={item.id}
                            user={item.expand.insectFinding.expand.user.username}
                            userId={item.expand.insectFinding.expand.user.id}
                            title={item.title}
                            message={item.message}
                            imageUrl={`${process.env.EXPO_PUBLIC_PB_URL}/api/files/insectFindings/${item.expand.insectFinding.id}/${item.expand.insectFinding.image}`}
                            insectFindingId={item.expand.insectFinding.id}
                            isLikedByUser={item.likes.includes(pb.authStore?.model?.id)}
                            likes={item.likes.length}
                            comments={item.expand['comments(post)'].length}
                            created={item.created}
                        />
                    );
                }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} />}
                onRefresh={onRefresh}
                refreshing={refreshing}
                keyExtractor={(item: any) => item.id}
                onEndReached={loadMorePosts}
                onEndReachedThreshold={0.5}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
    },
    flatlist: {
        height: '100%',
        width: '100%',
    },
    refresh: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        zIndex: 20,
        backgroundColor: Colors.primary,
        padding: 5,
        borderRadius: 30,
        opacity: 0.8,
    },
});
