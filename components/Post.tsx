import { Text, View, StyleSheet, Image } from 'react-native';
import EmptyHeartIcon from './HeartEmptyIcon';
import AlertIcon from './AlertIcon';
import Colors from '../constants/colors';
import StyleLib from '../constants/style';

const Post = (props: { title: string; message: string; user: string; imageUrl: string; insectFindingId: string }) => {
    return (
        <View style={[StyleLib.card]}>
            <Text style={[StyleLib.h2]}>{props.title}</Text>
            <Image style={[styles.image, StyleLib.rounded]} source={{ uri: props.imageUrl }} resizeMode="contain" />
            <View style={{ flex: 1, maxWidth: 250 }}>
                <Text style={[StyleLib.text]}>{props.message}</Text>
            </View>
            <View style={[styles.interactionView, StyleLib.rounded]}>
                <EmptyHeartIcon />
                <AlertIcon />
            </View>
        </View>
    );

    /*
        <View style={[StyleLib.card]}>
            <Text style={[StyleLib.h2, styles.flex]}>{props.title}</Text>
            <Image style={[styles.image, StyleLib.rounded]} source={{ uri: props.imageUrl }} resizeMode="contain" />
            <View style={[styles.flex, styles.row]}>
                <Text style={[StyleLib.text, styles.flex]}>{props.message}</Text>
            </View>
    </View>*/
};
const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
    },
    col: {
        flexDirection: 'column',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 5,
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
    },
    interactionView: {
        flex: 1,
        marginVertical: 10,
        flexDirection: 'row',
        padding: 5,
        backgroundColor: Colors.base,
        justifyContent: 'center',
    },
});

export default Post;
