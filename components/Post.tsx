import { Text, View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import EmptyHeartIcon from './HeartEmptyIcon';
import StyleLib from '../constants/style';
import { useState } from 'react';
import FilledHeartIcon from './FilledHeartIcon';
import pb from '../constants/pocketbase';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/colors';

const Post = (props: { postId: string; title: string; message: string; user: string; userId: string; imageUrl: string; insectFindingId: string; isLikedByUser: boolean; likes: number; created: string }) => {
    const [isLiked, setIsLiked] = useState(props.isLikedByUser || false);
    const [likes, setLikes] = useState(props.likes || 0);
    const [likeLoading, setLikeLoading] = useState(false);

    const date = new Date(props.created);
    const dateStr = date.toLocaleString();
    const handleLike = () => {
        if (!pb.authStore.isValid) {
            return;
        }
        setLikeLoading(true);
        if (!isLiked) {
            pb.collection('posts')
                .update(props.postId, { 'likes+': pb.authStore?.model?.id })
                .then((res) => {
                    console.log(res);
                    setIsLiked(true);
                    setLikeLoading(false);
                    setLikes(res.likes.length);
                })
                .catch((err) => {
                    if (err.status != 0) {
                        console.error(err);
                    }
                    setLikeLoading(false);
                });
        } else {
            pb.collection('posts')
                .update(props.postId, { 'likes-': pb.authStore?.model?.id })
                .then((res) => {
                    setIsLiked(false);
                    setLikeLoading(false);
                    setLikes(res.likes.length);
                })
                .catch((err) => {
                    if (err.status != 0) {
                        console.error(err);
                    }
                    setLikeLoading(false);
                });
        }
    };

    return (
        <View style={[StyleLib.card, styles.margin, styles.center]}>
            <View style={styles.header}>
                <Text style={[StyleLib.h2]}>{props.title}</Text>
                <Link style={[{ marginLeft: 10 }]} href={`/social/user/id/${props.userId}/`}>
                    <Text style={styles.author}>{props.user}</Text>
                </Link>
            </View>
            <View style={[styles.image, StyleLib.rounded]}>
                <Image style={[styles.image, StyleLib.rounded]} source={{ uri: props.imageUrl }} resizeMode="contain" />
                {likeLoading ? (
                    <View style={styles.heartContainer}>
                        <ActivityIndicator size="large" color={Colors.primary} />
                    </View>
                ) : (
                    <View style={styles.heartContainer} onTouchEnd={handleLike}>
                        {isLiked ? <FilledHeartIcon /> : <EmptyHeartIcon />}
                        <Text style={[StyleLib.h2]}>{likes}</Text>
                    </View>
                )}
            </View>
            <View style={styles.flex}>
                <Text style={[StyleLib.text]}>{dateStr}</Text>
            </View>
            {props.message.length > 0 && (
                <View style={styles.bottom}>
                    <Text style={[StyleLib.text]}>{props.message}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 5,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
    },
    author: {
        marginLeft: 10,
        textDecorationLine: 'underline',
        marginBottom: -5,
    },
    title: {
        color: 'white',
        fontSize: 25,
        textAlign: 'center',
        marginBottom: 5,
    },
    image: {
        width: 280,
        height: 280,
        marginBottom: 10,
        position: 'relative',
    },
    heartContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: 'rgba(255,255,255,0.3)',
        paddingRight: 3,
        borderTopLeftRadius: 5,
    },
    bottom: {
        flex: 1,
        marginTop: 5,
    },
    flex: {
        flex: 1,
    },
    margin: {
        marginHorizontal: 20,
        marginVertical: 10,
    },
    center: {
        alignItems: 'center',
    },
});

export default Post;
