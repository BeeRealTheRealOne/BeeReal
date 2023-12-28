import { View, Text, Image, StyleSheet } from 'react-native';
import { Sighting } from '../types/Sighting';
import { WebView } from 'react-native-webview';

//Wir verwenden hier eine Webview mit IFrame, da die Google Maps API einen API Key benötigt, den wir nicht haben. Und für OpenStreetAPI haben wir keinen React-Native Wrapper gefunden.
function SightingItem(props: { sighting: Sighting }) {
    return (
        <>
            <View>
                <Image style={[styles.image]} source={{ uri: `${process.env.EXPO_PUBLIC_PB_URL}/api/files/insectFindings/${props.sighting.id}/${props.sighting.image}?thumb=100x100` }} />
                <Text>{props.sighting.species}</Text>
                <Text>{props.sighting.longitude}</Text>
                <Text>{props.sighting.latitude}</Text>
                <Text>{props.sighting.created}</Text>
            </View>
            <WebView
                originWhitelist={['*']}
                scrollEnabled={false}
                source={{
                    html: `<div style="width: 100%" scrolling="no"><iframe width="100%" height="600" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=${props.sighting.latitude},${props.sighting.longitude}&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.maps.ie/population/">Population mapping</a></iframe></div>`,
                }}
            />
        </>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
    },
});

export default SightingItem;
