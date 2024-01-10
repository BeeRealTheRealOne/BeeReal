import { Link, router } from 'expo-router';
import { Image, ImageBackground, Platform, StyleSheet, Text, Touchable, TouchableHighlight, View } from 'react-native';
import Colors from '../../constants/colors';
import StyleLib from '../../constants/style';
import { TouchableOpacity } from 'react-native-gesture-handler';

/**
  *This page is used to navigate to the different pages that are related to insects, 
  like categories, species and sightings using pictures of insects as buttons
  Pictures are AI generated so they are free to use
  */
export default function insectsView() {
    return (
        <View style={StyleSheet.flatten(StyleLib.page)}>
            <View style={StyleSheet.flatten(styles.firstRow)}>
                <View style={StyleSheet.flatten([styles.linkWrapper, StyleLib.rounded])}>
                    <Link href="/species/" asChild>
                        <TouchableOpacity style={StyleSheet.flatten([styles.banner])}>
                            <ImageBackground style={StyleSheet.flatten([styles.bannerImage])} source={require('../../assets/images/speciesBanner.png')} resizeMode="cover"></ImageBackground>
                            <Link href="/species/" asChild>
                                <Text style={StyleSheet.flatten([StyleLib.h2, styles.bannerText])}>Species</Text>
                            </Link>
                        </TouchableOpacity>
                    </Link>
                </View>
                <View style={StyleSheet.flatten([styles.spacer])}></View>
                <View style={StyleSheet.flatten([styles.linkWrapper, StyleLib.rounded])}>
                    <Link href="/categories/" asChild>
                        <TouchableOpacity style={StyleSheet.flatten([styles.banner])}>
                            <ImageBackground style={StyleSheet.flatten([styles.bannerImage2])} source={require('../../assets/images/categoriesBanner.png')} resizeMode="cover"></ImageBackground>
                            <Link href="/categories/" asChild>
                                <Text style={StyleSheet.flatten([StyleLib.h2, styles.bannerText])}>Categories</Text>
                            </Link>
                        </TouchableOpacity>
                    </Link>
                </View>
            </View>
            <View style={StyleSheet.flatten([styles.spacer])}></View>
            <View style={StyleSheet.flatten(styles.secondRow)}>
                <View style={StyleSheet.flatten([styles.linkWrapper, StyleLib.rounded])}>
                    <Link href="/sightings/my/" asChild>
                        <TouchableOpacity style={StyleSheet.flatten([styles.banner])}>
                            <ImageBackground style={StyleSheet.flatten([styles.mainBannerImage])} source={require('../../assets/images/findingsBanner.png')} resizeMode="cover"></ImageBackground>
                            <Link href="/sightings/my/" asChild>
                                <Text style={StyleSheet.flatten([StyleLib.h2, styles.bannerText])}>My Sightings</Text>
                            </Link>
                        </TouchableOpacity>
                    </Link>
                </View>
            </View>
            <View style={StyleSheet.flatten([styles.spacer])}></View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.background,
    },
    firstRow: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 60,
    },
    secondRow: {
        width: '100%',
        flex: 1,
    },
    banner: {
        width: 400,
        height: '100%',
        // Shadow properties
        shadowColor: '#000',
        shadowOffset: {
            width: 1,
            height: 5, // Adjust for vertical offset
        },
        shadowOpacity: 0.5, // Adjust opacity
        shadowRadius: 5, // Blur radius
        elevation: 10,
    },
    mainBanner: {
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        // Shadow properties
        shadowColor: '#000',
        shadowOffset: {
            width: 1,
            height: 5, // Adjust for vertical offset
        },
        shadowOpacity: 0.5, // Adjust opacity
        shadowRadius: 5, // Blur radius
        elevation: 10,
        marginTop: 10,
    },
    bannerImage: {
        transform: [{ scale: 1.2 }],
        width: '100%',
        height: '100%',
    },
    bannerImage2: {
        transform: [{ scale: 1.5 }, { translateX: -30 }],
        width: '100%',
        height: '100%',
    },
    mainBannerImage: {
        transform: [{ scale: 1.2 }, { translateX: -30 }],
        width: '100%',
        height: '100%',
    },
    bannerText: {
        position: 'absolute',
        color: 'black',
        fontWeight: '500',
        width: 'auto',
        top: 20,
        left: 20,
        backgroundColor: '#a2de8eda',
        paddingHorizontal: 10,
        borderRadius: 30,
    },
    spacer: {
        width: 10,
        height: 10,
    },
    linkWrapper: {
        flex: 1,
        overflow: 'hidden',
    },
});
