import { useEffect, useState, useRef } from 'react';
import pb from '../../../../../constants/pocketbase';
import { View, Text, TouchableOpacity } from 'react-native';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import Post from '../../../../../components/Post';
import StyleLib from '../../../../../constants/style';
import Colors from '../../../../../constants/colors';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// this page displays a list of all posts that the user has made
function UserSocial() {
    // get the id of the user from the url
    const local = useLocalSearchParams();
    const id = local.id as string;

    const flatListRef = useRef<FlatList>();
    const [refreshing, setRefreshing] = useState(false);

    const [posts, setPosts] = useState<any>();

    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const [username, setUsername] = useState<string>();

    // load the first page of posts when the page loads
    useEffect(() => {
        pb.collection('users')
            .getOne(id)
            .then((res) => {
                setUsername(res.username);
            })
            .catch((err) => {
                if (err.status != 0) {
                    console.error(err);
                }
            });
        pb.collection('posts')
            .getList(page, 10, { filter: `user = '${id}'`, expand: 'insectFinding.user', sort: '-created' })
            .then((res) => {
                setPosts(res.items);
                setMaxPage(res.totalPages);
            })
            .catch((err) => {
                if (err.status != 0) {
                    console.error(err);
                }
            });
    }, [id]);

    // load the next page of posts when the user scrolls to the bottom of the list
    function loadMorePosts() {
        if (page >= maxPage) return;
        pb.collection('posts')
            .getList(page + 1, 15, { filter: `user = '${id}'`, expand: 'insectFinding.user', sort: '-created' })
            .then((res) => {
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
            .getList(1, 10, { filter: `user = '${id}'`, expand: 'insectFinding.user', sort: '-created' })
            .then((res) => {
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

    return (
        <View style={StyleLib.pageMarginTop}>
            <View style={[{ position: 'absolute', bottom: 10, right: 10, zIndex: 20, backgroundColor: Colors.primary, padding: 5, borderRadius: 30, opacity: 0.8 }]}>
                <TouchableOpacity onPress={onRefresh}>
                    <Ionicons name="refresh" size={24} color={Colors.primaryText} />
                </TouchableOpacity>
            </View>
            <FlatList
                ref={flatListRef as any}
                style={[{ height: '100%', width: '100%' }]}
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
export default UserSocial;
