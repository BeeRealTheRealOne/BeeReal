import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { Sighting } from '../types/Sighting';
import { WebView } from 'react-native-webview';
import timeToString from '../util/timeToString';
import StyleLib from '../constants/style';
import Colors from '../constants/colors';
import { useState } from 'react';
import pb from '../constants/pocketbase';
import { router } from 'expo-router';

//Wir verwenden hier eine Webview mit IFrame, da die Google Maps API einen API Key benötigt, den wir nicht haben. Und für OpenStreetAPI haben wir keinen React-Native Wrapper gefunden.
function SightingCard(props: { sighting: Sighting }) {
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);

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
                                        console.error(err);
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
        <View style={[StyleLib.card, styles.flexNo, styles.gap, styles.center]}>
            <View style={[styles.gap]}>
                <View style={[styles.col]}>
                    <Text style={[StyleLib.h2]}>{props.sighting.expand.species.name}</Text>
                    <View style={[styles.row, styles.gap]}>
                        <Text style={[StyleLib.text]}>{props.sighting.expand.species.scientificName}</Text>
                        <Text style={[StyleLib.text]}>{timeToString(props.sighting.created)}</Text>
                    </View>
                </View>
                <Image
                    style={[styles.image, StyleLib.rounded]}
                    source={{
                        uri: `${process.env.EXPO_PUBLIC_PB_URL}/api/files/insectFindings/${props.sighting.id}/${props.sighting.image}`,
                    }}
                />
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
                <Button color={Colors.primary} title="Post" />
            </View>
        </View>
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
});

export default SightingCard;
