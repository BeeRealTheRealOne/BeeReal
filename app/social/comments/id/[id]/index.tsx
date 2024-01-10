import { useEffect, useState } from 'react';
import pb from '../../../../../constants/pocketbase';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, View, Text, Button } from 'react-native';
import StyleLib from '../../../../../constants/style';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import LoadingPage from '../../../../../components/LoadingPage';
import Comment from '../../../../../components/Comment';
import Colors from '../../../../../constants/colors';

/**
 * This page displays a detail view of a single species with the given id
 */
function commentsView() {
    const local = useLocalSearchParams();
    const id = local.id;
    const [comments, setComments] = useState<any>([]);

    const [text, setText] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const [loading, setLoading] = useState(true);

    // load the species when the page loads
    useEffect(() => {
        pb.collection('comments')
            .getFullList({ filter: `post = '${id}'`, expand: 'user', sort: '-created' })
            .then((res) => {
                setComments(res);
                setLoading(false);
            })
            .catch((err) => {
                if (err.status != 0) {
                    console.error(err);
                }
                setLoading(false);
            });
    }, [id]);

    function reload() {
        setLoading(true);
        pb.collection('comments')
            .getFullList({ filter: `post = '${id}'`, expand: 'user', sort: '-created' })
            .then((res) => {
                setComments(res);
                setLoading(false);
            })
            .catch((err) => {
                if (err.status != 0) {
                    console.error(err);
                }
                setLoading(false);
            });
    }

    function submitComment() {
        setSubmitting(true);
        pb.collection('comments')
            .create({ text: text, post: id, user: pb.authStore?.model?.id })
            .then((res) => {
                setSubmitting(false);
                reload();
            })
            .catch((err) => {
                if (err.status != 0) {
                    console.error(err);
                }
                setSubmitting(false);
                setLoading(false);
            });
    }

    if (loading) {
        return <LoadingPage />;
    }

    return (
        <View style={StyleSheet.flatten([styles.container])}>
            <ScrollView>
                <View style={StyleSheet.flatten([styles.commentContainer])}>
                    {comments.map((comment: any) => {
                        return <Comment key={comment.id} user={comment.expand.user.username} text={comment.text} />;
                    })}
                    {comments.length == 0 && <Text style={[StyleLib.h2, styles.paddingEmpty]}>No comments yet</Text>}
                </View>
            </ScrollView>
            <View style={StyleSheet.flatten([styles.commentInputContainer])}>
                <TextInput style={StyleSheet.flatten([StyleLib.input, styles.flex])} placeholder="Comment" onChangeText={(text: string) => setText(text)} />
                <Button title="Submit" color={Colors.primary} onPress={submitComment} disabled={submitting} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    commentContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    flex: {
        flex: 1,
    },
    paddingEmpty: {
        padding: 10,
    },
    container: {
        height: '80%',
        flex: 1,
        paddingTop: 60,
    },
    commentInputContainer: {
        flexDirection: 'row',
        padding: 10,
        bottom: 0,
        width: '100%',
        alignItems: 'center',
    },
});

export default commentsView;
