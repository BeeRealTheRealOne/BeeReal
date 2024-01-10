import { useEffect, useState } from 'react';
import pb from '../../../../../constants/pocketbase';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, View, Text, Button } from 'react-native';
import StyleLib from '../../../../../constants/style';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import LoadingPage from '../../../../../components/LoadingPage';
import Comment from '../../../../../components/Comment';
import Colors from '../../../../../constants/colors';

// this page displays a detail view of a single species with the given id
function speciesCardView() {
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
        <View style={[{ height: '80%' }, { flex: 1, paddingTop: 60 }]}>
            <ScrollView>
                <View style={[styles.flex, styles.justify]}>
                    {comments.map((comment: any) => {
                        return <Comment user={comment.expand.user.username} text={comment.text} />;
                    })}
                    {comments.length == 0 && <Text style={[StyleLib.h2, { padding: 10 }]}>No comments yet</Text>}
                </View>
            </ScrollView>
            <View style={{ flexDirection: 'row', padding: 10, bottom: 0, width: '100%', alignItems: 'center' }}>
                <TextInput style={[StyleLib.input, { flex: 1 }]} placeholder="Comment" onChangeText={(text: string) => setText(text)} />
                <Button title="Submit" color={Colors.primary} onPress={submitComment} disabled={submitting} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    justify: {
        justifyContent: 'center',
    },
    spacer: {
        height: 50,
    },
});

export default speciesCardView;
