import { useEffect, useState, useRef } from 'react';
import pb from '../../constants/pocketbase';
import { View } from 'react-native';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import Post from '../../components/Post';
import StyleLib from '../../constants/style';
import Colors from '../../constants/colors';

function Social() {
    const flatListRef = useRef<FlatList>();
    const [refreshing, setRefreshing] = useState(false);

    const [posts, setPosts] = useState<any>();

    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);

    useEffect(() => {
        pb.collection('posts')
            .getList(page, 10, { expand: 'insectFinding.user', sort: '-created' })
            .then((res) => {
                setPosts(res.items);
                setMaxPage(res.totalPages);
            })
            .catch((err) => console.error(err));
    }, []);

    function loadMorePosts() {
        if (page >= maxPage) return;
        pb.collection('posts')
            .getList(page + 1, 15, { expand: 'insectFinding.user', sort: '-created' })
            .then((res) => {
                setPage(page + 1);
                setPosts([...posts, ...res.items]);
            })
            .catch((err) => console.error(err));
    }

    function onRefresh() {
        setRefreshing(true);
        pb.collection('posts')
            .getList(page, 10, { expand: 'insectFinding.user', sort: '-created' })
            .then((res) => {
                setPosts(res.items);
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
                data={posts}
                horizontal={false}
                renderItem={({ item }) => {
                    return <Post postId={item.id} user={item.expand.insectFinding.expand.user.username} title={item.title} message={item.message} imageUrl={`${process.env.EXPO_PUBLIC_PB_URL}/api/files/insectFindings/${item.expand.insectFinding.id}/${item.expand.insectFinding.image}`} insectFindingId={item.expand.insectFinding.id} isLikedByUser={item.likes.includes(pb.authStore?.model?.id)} />;
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
export default Social;
