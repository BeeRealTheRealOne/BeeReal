import { View, Text, Image, StyleSheet, Button } from 'react-native';
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
            <View style={[styles.centerAll, { height: '100%' }]}>
                <View style={[StyleLib.card, styles.flexNo, styles.col, styles.centerAll, { gap: 5 }]}>
                    <Text>Post your findings for all to see!</Text>
                    <View style={[styles.row]}>
                        <TextInput
                            onChangeText={(text) => {
                                setTitle(text);
                            }}
                            maxLength={20}
                            style={[StyleLib.inputDark, { flex: 1 }]}
                            placeholder="Title"
                        />
                    </View>
                    <Image
                        style={[styles.image, StyleLib.rounded]}
                        source={{
                            uri: `${process.env.EXPO_PUBLIC_PB_URL}/api/files/insectFindings/${props.sighting.id}/${props.sighting.image}`,
                        }}
                    />
                    <View style={[styles.row]}>
                        <TextInput
                            onChangeText={(text) => {
                                setMessage(text);
                            }}
                            multiline={true}
                            maxLength={150}
                            style={[StyleLib.inputDark, { flex: 1 }]}
                            placeholder="Message"
                        />
                    </View>
                    <View style={[styles.row]}>
                        <Button
                            title="post"
                            color={Colors.accent}
                            onPress={() => {
                                post();
                            }}
                        />
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
            <View style={[styles.centerAll, { height: '100%' }]}>
                <View style={[StyleLib.card, styles.flexNo, styles.col, styles.centerAll, { gap: 20 }]}>
                    <Text>Are you sure you want to delte this?</Text>
                    <View style={[styles.row, { gap: 60 }]}>
                        <Button
                            title="cancel"
                            color={Colors.accent}
                            onPress={() => {
                                setDeleteModalVisible(false);
                            }}
                        />
                        <Button
                            title="delete"
                            color={Colors.cancel}
                            onPress={() => {
                                pb.collection('insectFindings')
                                    .delete(props.sighting.id)
                                    .then((res) => {
                                        router.push('/sightings/my/');
                                        setDeleteModalVisible(false);
                                    })
                                    .catch((err) => {
                                        if (err.status != 0) {
                                            console.error(err);
                                        }
                                    });
                            }}
                        />
                    </View>
                </View>
            </View>
        );
    }

    if (!props.sighting) return <Text>Loading...</Text>;
    return (
        <ScrollView style={{ height: '100%', width: '100%' }}>
            <View style={[StyleLib.card, styles.flexNo, styles.gap, styles.center]}>
                <View style={[styles.gap]}>
                    <View style={[styles.col]}>
                        <Text style={[StyleLib.h2]}>{props.sighting.expand.species.name}</Text>
                        <View style={[styles.row, { gap: 10 }]}>
                            <Text style={[StyleLib.text]}>{props.sighting.expand.species.scientificName}</Text>
                            <Link style={[StyleLib.text]} href={`/species/id/${props.sighting.expand.species.id}/`}>
                                Learn more...
                            </Link>
                        </View>
                    </View>
                    <Image
                        style={[styles.image, StyleLib.rounded, styles.centerSelf]}
                        source={{
                            uri: `${process.env.EXPO_PUBLIC_PB_URL}/api/files/insectFindings/${props.sighting.id}/${props.sighting.image}`,
                        }}
                    />
                    <Text style={[StyleLib.text, styles.centerSelf]}>{timeToString(props.sighting.created)}</Text>
                </View>
                <View style={[{ width: 300, height: 200, marginBottom: -5 }]}>
                    <WebView
                        style={{ width: 300, height: 200 }}
                        originWhitelist={['*']}
                        scrollEnabled={false}
                        source={{
                            html: `<div style="width: 100%" scrolling="false"><iframe width="100%" height="600" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=${props.sighting.latitude},${props.sighting.longitude}&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.maps.ie/population/">Population mapping</a></iframe></div>`,
                        }}
                    />
                </View>
                <View style={[styles.between, styles.row]}>
                    <Button color={Colors.cancel} title="Delete" onPress={() => setDeleteModalVisible(true)} />
                    <Button color={Colors.primary} title="Post" onPress={() => setPostModalVisible(true)} />
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 300,
        height: 300,
    },
    flex: {
        flex: 1,
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
    gap: {
        gap: 5,
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
