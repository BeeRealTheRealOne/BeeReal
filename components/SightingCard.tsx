import { View, Text, Image, StyleSheet } from 'react-native';
import { Sighting } from '../types/Sighting';
import { WebView } from 'react-native-webview';
import timeToString from '../util/timeToString';
import StyleLib from '../constants/style';

//Wir verwenden hier eine Webview mit IFrame, da die Google Maps API einen API Key benötigt, den wir nicht haben. Und für OpenStreetAPI haben wir keinen React-Native Wrapper gefunden.
function SightingCard(props: { sighting: Sighting }) {
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
            <View style={[{ width: 300, height: 200 }]}>
                <WebView
                    style={{ width: 300, height: 200 }}
                    originWhitelist={['*']}
                    scrollEnabled={false}
                    source={{
                        html: `<div style="width: 100%" scrolling="false"><iframe width="100%" height="600" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=${props.sighting.latitude},${props.sighting.longitude}&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.maps.ie/population/">Population mapping</a></iframe></div>`,
                    }}
                />
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
        gap: 10,
    },
    col: {
        flexDirection: 'column',
    },
    gap: {
        gap: 10,
    },
    center: {
        alignItems: 'center',
    },
});

export default SightingCard;
