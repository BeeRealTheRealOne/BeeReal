import { View, Text, Image, StyleSheet, Button, Platform } from 'react-native';
import { Sighting } from '../types/Sighting';
import { WebView } from 'react-native-webview';
import timeToString from '../util/timeToString';
import StyleLib from '../constants/style';
import Colors from '../constants/colors';
import { useState } from 'react';
import pb from '../constants/pocketbase';
import { Link, router } from 'expo-router';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import Toast from 'react-native-root-toast';

//Wir verwenden hier eine Webview mit IFrame, da die Google Maps API einen API Key benötigt, den wir nicht haben. Und für OpenStreetAPI haben wir keinen React-Native Wrapper gefunden.
function SightingCard(props: { sighting: Sighting }) {
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [postModalVisible, setPostModalVisible] = useState(false);

    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');

    const [deleting, setDeleting] = useState(false);

    function deleteSighting() {
        if (deleting) return;
        setDeleting(true);
        pb.collection('insectFindings')
            .delete(props.sighting.id)
            .then((res) => {
                router.push('/sightings/my/');
            })
            .catch((err) => {
                if (err.status != 0) {
                    console.error(err);
                }
            })
            .finally(() => {
                setDeleting(false);
            });
    }

    function post() {
        if (!pb.authStore.isValid) return;

        if (!title) {
            Toast.show('Please enter a title!', {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                backgroundColor: Colors.primary,
                hideOnPress: true,
                delay: 0,
            });
            return;
        }

        if (title.length < 3) {
            Toast.show('Title too short!', {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                backgroundColor: Colors.primary,
                hideOnPress: true,
                delay: 0,
            });
            return;
        }

        pb.collection('posts')
            .create({
                title: title,
                message: message,
                insectFinding: props.sighting.id,
                user: pb.authStore?.model?.id,
            })
            .then((res) => {
                Toast.show('Posted!', {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    backgroundColor: Colors.primary,
                    hideOnPress: true,
                    delay: 0,
                });
                setPostModalVisible(false);
            })
            .catch((err) => {
                if (err.status != 0) {
                    console.error(err);
                    Toast.show('Error posting, maybe log in again!', {
                        duration: Toast.durations.LONG,
                        position: Toast.positions.BOTTOM,
                        shadow: true,
                        animation: true,
                        backgroundColor: Colors.cancel,
                        hideOnPress: true,
                        delay: 0,
                    });
                }
            });
    }

    if (postModalVisible) {
        return (
            <View style={StyleSheet.flatten([{ height: '100%', alignItems: 'center', justifyContent: 'center' }])}>
                {/*the card doesnt stretch in the browser..., on native it works fine*/}
                <View style={StyleSheet.flatten([StyleLib.card, styles.flexNo, styles.col, styles.centerAll, { gap: 5 }, Platform.OS == 'web' ? { flex: 1 } : { flex: 0 }])}>
                    <Text>Post your findings for all to see!</Text>
                    <View style={StyleSheet.flatten([styles.row])}>
                        <TextInput
                            onChangeText={(text) => {
                                setTitle(text);
                            }}
                            maxLength={20}
                            style={StyleSheet.flatten([StyleLib.inputDark, { flex: 1 }])}
                            placeholder="Title"
                        />
                    </View>
                    <Image
                        style={StyleSheet.flatten([styles.image, StyleLib.rounded])}
                        source={{
                            uri: `${process.env.EXPO_PUBLIC_PB_URL}/api/files/insectFindings/${props.sighting.id}/${props.sighting.image}`,
                        }}
                    />
                    <View style={StyleSheet.flatten([styles.row])}>
                        <TextInput
                            onChangeText={(text) => {
                                setMessage(text);
                            }}
                            multiline={true}
                            maxLength={150}
                            style={StyleSheet.flatten([StyleLib.inputDark, { flex: 1 }])}
                            placeholder="Message"
                        />
                    </View>
                    <View style={StyleSheet.flatten([styles.row])}>
                        <Button title="post" color={Colors.accent} onPress={post} />
                        <Button
                            title="cancel"
                            color={Colors.cancel}
                            onPress={() => {
                                setPostModalVisible(false);
                            }}
                        />
                    </View>
                </View>
            </View>
        );
    }

    if (deleteModalVisible) {
        return (
            <View style={StyleSheet.flatten([styles.deleteModalContainer])}>
                {/*the card stretches in the browser to 100%, on native it works fine*/}
                <View style={StyleSheet.flatten([StyleLib.card, styles.deleteModal, Platform.OS == 'web' ? { flex: 1, maxHeight: 150 } : { flex: 0 }])}>
                    <Text>Are you sure you want to delte this?</Text>
                    <View style={StyleSheet.flatten([styles.row, { gap: 60 }])}>
                        <Button
                            title="cancel"
                            color={Colors.accent}
                            onPress={() => {
                                setDeleteModalVisible(false);
                            }}
                            disabled={deleting}
                        />
                        <Button title="delete" color={Colors.cancel} onPress={deleteSighting} disabled={deleting} />
                    </View>
                </View>
            </View>
        );
    }

    if (!props.sighting) return <Text>Loading...</Text>;
    return (
        <ScrollView style={StyleSheet.flatten(styles.scrollview)}>
            <View style={StyleSheet.flatten([StyleLib.card, styles.sightingCard, Platform.OS == 'web' ? { flex: 1 } : { flex: 0 }])}>
                <View style={StyleSheet.flatten([styles.gap5])}>
                    <View style={StyleSheet.flatten([styles.col])}>
                        <Text style={StyleSheet.flatten([StyleLib.h2])}>{props.sighting.expand.species.name}</Text>
                        <View style={StyleSheet.flatten([styles.row, styles.gap10])}>
                            <Text style={StyleSheet.flatten([StyleLib.text])}>{props.sighting.expand.species.scientificName}</Text>
                            <Link style={StyleSheet.flatten([StyleLib.text])} href={`/species/id/${props.sighting.expand.species.id}/`}>
                                Learn more...
                            </Link>
                        </View>
                    </View>
                    <Image
                        style={StyleSheet.flatten([StyleLib.rounded, styles.image])}
                        source={{
                            uri: `${process.env.EXPO_PUBLIC_PB_URL}/api/files/insectFindings/${props.sighting.id}/${props.sighting.image}`,
                        }}
                    />
                    <Text style={StyleSheet.flatten([StyleLib.text, styles.centerSelf])}>{timeToString(props.sighting.created)}</Text>
                </View>
                <View style={StyleSheet.flatten([styles.webviewContainer])}>
                    <WebView
                        style={StyleSheet.flatten([styles.webview])}
                        originWhitelist={['*']}
                        scrollEnabled={false}
                        source={{
                            html: `<div style="width: 100%" scrolling="false"><iframe width="100%" height="600" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=${props.sighting.latitude},${props.sighting.longitude}&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.maps.ie/population/">Population mapping</a></iframe></div>`,
                        }}
                    />
                </View>
                <View style={StyleSheet.flatten([styles.buttonContainer])}>
                    <Button color={Colors.cancel} title="Delete" onPress={() => setDeleteModalVisible(true)} />
                    <Button color={Colors.primary} title="Post" onPress={() => setPostModalVisible(true)} />
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    sightingCard: {
        gap: 5,
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 5,
        width: '100%',
        justifyContent: 'space-between',
    },
    deleteModalContainer: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    deleteModal: {
        gap: 20,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollview: {
        height: '100%',
        width: '100%',
    },
    image: {
        width: 300,
        height: 300,
        alignSelf: 'center',
    },
    flex: {
        flex: 1,
    },
    webview: {
        width: 300,
        height: 200,
    },
    webviewContainer: {
        width: 300,
        height: 200,
        marginBottom: -5,
    },
    flexNo: {
        flex: 0,
        flexGrow: 0,
    },
    row: {
        flexDirection: 'row',
        gap: 5,
    },
    col: {
        flexDirection: 'column',
    },
    gap5: {
        gap: 5,
    },
    gap10: {
        gap: 10,
    },
    center: {
        alignItems: 'center',
    },
    centerAll: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    between: {
        width: '100%',
        justifyContent: 'space-between',
    },
    centerSelf: {
        alignSelf: 'center',
    },
});

export default SightingCard;
