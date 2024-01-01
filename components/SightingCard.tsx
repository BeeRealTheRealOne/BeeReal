import { View, Text, Image, StyleSheet } from 'react-native';
import { Sighting } from '../types/Sighting';
import { WebView } from 'react-native-webview';
import timeToString from '../util/timeToString';
import StyleLib from '../constants/style';

//Wir verwenden hier eine Webview mit IFrame, da die Google Maps API einen API Key benötigt, den wir nicht haben. Und für OpenStreetAPI haben wir keinen React-Native Wrapper gefunden.
function SightingCard(props: { sighting: Sighting }) {
    if (!props.sighting) return <Text>Loading...</Text>;
    return (
        <View style={[StyleLib.card]}>
            <View>
                <Text style={[StyleLib.text]}>{props.sighting.expand.species.name}</Text>
                <Image style={[styles.image, StyleLib.rounded]} source={{ uri: `${process.env.EXPO_PUBLIC_PB_URL}/api/files/insectFindings/${props.sighting.id}/${props.sighting.image}` }} />
                <Text style={[StyleLib.text]}>
                    {props.sighting.longitude}, {props.sighting.latitude}
                </Text>
                <Text style={[StyleLib.text]}>{timeToString(props.sighting.created)}</Text>
            </View>
            <WebView
                style={{ marginTop: 'auto' }}
                originWhitelist={['*']}
                scrollEnabled={false}
                source={{
                    html: `<div style="width: 100%" scrolling="false"><iframe width="100%" height="600" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=${props.sighting.latitude},${props.sighting.longitude}&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.maps.ie/population/">Population mapping</a></iframe></div>`,
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 300,
        height: 300,
    },
});

export default SightingCard;
