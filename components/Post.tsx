import { Text, View, StyleSheet, Image } from 'react-native';
import EmptyHeartIcon from './HeartEmptyIcon';
import StyleLib from '../constants/style';
import { useState } from 'react';
import FilledHeartIcon from './FilledHeartIcon';
import pb from '../constants/pocketbase';

const Post = (props: { postId: string; title: string; message: string; user: string; imageUrl: string; insectFindingId: string; isLikedByUser: boolean; likes: number }) => {
    const [isLiked, setIsLiked] = useState(props.isLikedByUser || false);
    const handleLike = () => {
        if (!pb.authStore.isValid) {
            return;
        }
        if (!isLiked) {
            pb.collection('posts')
                .update(props.postId, { 'likes+': pb.authStore?.model?.id })
                .then((res) => {
                    setIsLiked(true);
                })
                .catch((err) => console.error(err));
        } else {
            pb.collection('posts')
                .update(props.postId, { 'likes-': pb.authStore?.model?.id })
                .then((res) => {
                    setIsLiked(false);
                })
                .catch((err) => console.error(err));
        }
    };

    return (
        <View style={[StyleLib.card, styles.margin, styles.center]}>
            <View style={styles.header}>
                <Text style={[StyleLib.h2]}>{props.title}</Text>
                <Text style={styles.author}>{props.user}</Text>
            </View>
            <View style={[styles.image, StyleLib.rounded]}>
                <Image style={[styles.image, StyleLib.rounded]} source={{ uri: props.imageUrl }} resizeMode="contain" />
                <View style={styles.heartContainer} onTouchEnd={handleLike}>
                    {isLiked ? <FilledHeartIcon /> : <EmptyHeartIcon />}
                    <Text style={[StyleLib.h2]}>{props.likes}</Text>
                </View>
            </View>
            <View style={styles.bottom}>
                <Text style={[StyleLib.text]}>{props.message}</Text>
            </View>
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
