import { router } from 'expo-router';
import { Image, StyleSheet, Text, View } from 'react-native';
import Colors from '../../constants/colors';
import StyleLib from '../../constants/style';

function Home() {
    const handleNavigation = (dest: any) => {
        router.push(dest);
    };

    return (
        <>
            <View style={styles.container}>
                <View style={styles.header}></View>
                <View style={styles.firstRow}>
                    <View style={styles.banner} onTouchEnd={() => handleNavigation('/species/')}>
                        <Image source={require('../../assets/images/speciesBanner.png')} style={styles.bannerImage}></Image>
                        <View style={styles.bannerText}>
                            <Text style={[StyleLib.h2]}>Species</Text>
                        </View>
                    </View>
                    <View style={styles.banner} onTouchEnd={() => handleNavigation('/categories/')}>
                        <Image source={require('../../assets/images/categoriesBanner.png')} style={styles.bannerImage2}></Image>
                        <View style={styles.bannerText}>
                            <Text style={[StyleLib.h2]}>Categories</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.secondRow}>
                    <View style={styles.mainBanner} onTouchEnd={() => handleNavigation('/sightings/my/')}>
                        <Image source={require('../../assets/images/findingsBanner.png')} style={styles.mainBannerImage}></Image>
                        <View style={styles.bannerText}>
                            <Text style={[StyleLib.h2]}>My Sightings</Text>
                        </View>
                    </View>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.background,
    },
    header: {
        marginBottom: 50,
    },
    firstRow: {
        width: '100%',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        marginTop: 40,
    },
    secondRow: {
        alignItems: 'center',
        width: '100%',
    },
    banner: {
        width: '47%',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 30,
        backgroundColor: 'white', // Consider setting a background color for better shadow effect
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
        width: '98%',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 30,
        backgroundColor: 'white', // Consider setting a background color for better shadow effect
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
        fontWeight: 'bold',
        bottom: 20,
        left: 20,
        backgroundColor: '#a2de8eda',
        paddingHorizontal: 10,
        borderRadius: 30,
    },
});

export default Home;
