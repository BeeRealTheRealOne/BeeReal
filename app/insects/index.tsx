import { router } from 'expo-router';
import { Image, StyleSheet, Text, View } from 'react-native';
import Colors from '../../constants/colors';
import StyleLib from '../../constants/style';

/**
  *This page is used to navigate to the different pages that are related to insects, 
  like categories, species and sightings using pictures of insects as buttons
  Pictures are AI generated so they are free to use
  */
function insectsView() {
    const handleNavigation = (dest: any) => {
        router.push(dest);
    };

    return (
        <View style={StyleLib.page}>
            <View style={styles.firstRow}>
                <View style={[styles.banner, StyleLib.rounded]} onTouchEnd={() => handleNavigation('/species/')}>
                    <Image source={require('../../assets/images/speciesBanner.png')} style={styles.bannerImage}></Image>
                    <View style={styles.bannerText}>
                        <Text style={[StyleLib.h2]}>Species</Text>
                    </View>
                </View>
                <View style={[styles.spacer]}></View>
                <View style={[styles.banner, StyleLib.rounded]} onTouchEnd={() => handleNavigation('/categories/')}>
                    <Image source={require('../../assets/images/categoriesBanner.png')} style={styles.bannerImage2}></Image>
                    <View style={styles.bannerText}>
                        <Text style={[StyleLib.h2]}>Categories</Text>
                    </View>
                </View>
            </View>
            <View style={styles.secondRow}>
                <View style={[styles.mainBanner, StyleLib.rounded]} onTouchEnd={() => handleNavigation('/sightings/my/')}>
                    <Image source={require('../../assets/images/findingsBanner.png')} style={styles.mainBannerImage}></Image>
                    <View style={styles.bannerText}>
                        <Text style={[StyleLib.h2]}>My Sightings</Text>
                    </View>
                </View>
            </View>
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
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 60,
    },
    secondRow: {
        width: '100%',
    },
    banner: {
        flex: 1,
        position: 'relative',
        overflow: 'hidden',
        // Shadow properties
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
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
            width: 0,
            height: 5, // Adjust for vertical offset
        },
        shadowOpacity: 0.5, // Adjust opacity
        shadowRadius: 5, // Blur radius
        elevation: 10,
        marginTop: 10,
    },
    bannerImage: {
        width: '100%',
        height: 200,
        transform: [{ scale: 1.5 }, { translateX: -30 }],
    },
    bannerImage2: {
        width: '100%',
        height: 200,
        transform: [{ scale: 1.7 }, { translateX: -30 }],
    },
    mainBannerImage: {
        width: '100%',
        height: 300,
        transform: [{ scale: 1.7 }, { translateX: -30 }],
    },
    bannerText: {
        position: 'absolute',
        fontSize: 25,
        color: 'black',
        fontWeight: '500',
        bottom: 20,
        left: 20,
        backgroundColor: '#a2de8eda',
        paddingHorizontal: 10,
        borderRadius: 30,
    },
    spacer: {
        width: 10,
    },
});

export default insectsView;
