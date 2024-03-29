import { useEffect, useState } from 'react';
import pb from '../../constants/pocketbase';
import { View, StyleSheet, Text } from 'react-native';
import StyleLib from '../../constants/style';
import Colors from '../../constants/colors';
import LoadingPage from '../../components/LoadingPage';
import { Link } from 'expo-router';

// This is the achivements page, it shows the achivements of the user and can be accessed from the profile page
export default function achivementsView() {
    //this achivement shows the number of pictures a user has uploaded
    const [numSightingsAchivements, setNumSightingsAchivements] = useState<number | null>();

    //this achivement shows the number of species a user has sighted
    const [numSpeciesAchivements, setNumSpeciesAchivements] = useState<number | null>();
    const [numSpeciesOverall, setNumSpeciesOverall] = useState<number | null>();

    //this achivement shows the most common species a user has sighted
    const [mostCommonSpeciesAchievment, setMostCommonSpeciesAchievment] = useState<string | null>();

    //Todo: loading state individual for each achivement
    const [loading, setLoading] = useState(true);

    //load functions for the achivements
    useEffect(() => {
        pb.collection('species')
            .getList(1, 1, { requestKey: 'numSpeciesOverall' })
            .then((res) => {
                setNumSpeciesOverall(res.totalPages);
            })
            .catch((err) => {
                if (err.status != 0) {
                    console.error(err);
                }
            });
        pb.collection('numSightingsAchivements')
            .getOne(pb.authStore?.model?.id)
            .then((res) => {
                setNumSightingsAchivements(res.cnt);
            })
            .catch((err) => {
                if (err.status != 0) {
                    console.error(err);
                }
            });
        pb.collection('numSpeciesAchivements')
            .getOne(pb.authStore?.model?.id)
            .then((res) => {
                setNumSpeciesAchivements(res.cnt);
            })
            .catch((err) => {
                if (err.status != 0) {
                    console.error(err);
                }
            });
        pb.collection('mostCommonSpeciesAchievment')
            .getOne(pb.authStore?.model?.id)
            .then((res) => {
                pb.collection('species')
                    .getOne(res.species)
                    .then((res2) => {
                        setMostCommonSpeciesAchievment(res2.name);
                        setLoading(false);
                    });
            })
            .catch((err) => {
                if (err.status != 0) {
                    console.error(err);
                }
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <LoadingPage />;
    }

    return (
        <View style={StyleSheet.flatten([StyleLib.page, { paddingBottom: 20 }])}>
            <View style={StyleSheet.flatten([styles.col])}>
                <View style={StyleSheet.flatten([styles.row])}>
                    <View style={StyleSheet.flatten([StyleLib.card, styles.center])}>
                        <Text style={StyleSheet.flatten([StyleLib.h2, styles.bannerText])}>Number of Sightings</Text>
                        <Text style={StyleSheet.flatten([StyleLib.h1, styles.flex])}>{numSightingsAchivements}</Text>
                    </View>
                </View>
                <View style={StyleSheet.flatten([styles.row])}>
                    <View style={StyleSheet.flatten([StyleLib.card, styles.center])}>
                        <Text style={StyleSheet.flatten([StyleLib.h2, styles.bannerText])}>Number of Species Sighted</Text>
                        <Text style={StyleSheet.flatten([StyleLib.h1, styles.flex])}>
                            {numSpeciesAchivements}/{numSpeciesOverall}
                        </Text>
                        <Link style={StyleSheet.flatten([StyleLib.h2])} href="/achivements/species/">
                            more info...
                        </Link>
                    </View>
                </View>
                <View style={StyleSheet.flatten([styles.row])}>
                    <View style={StyleSheet.flatten([StyleLib.card, styles.center])}>
                        <Text style={StyleSheet.flatten([StyleLib.h2, styles.bannerText])}>Most common species</Text>
                        <Text style={StyleSheet.flatten([StyleLib.h1, styles.flex])}>{mostCommonSpeciesAchievment}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    col: {
        flex: 1,
        flexDirection: 'column',
        gap: 10,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 10,
    },
    flex: {
        paddingVertical: 'auto',
        flex: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    absolute: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    bannerText: {
        fontWeight: '500',
        backgroundColor: Colors.accent,
        paddingHorizontal: 10,
        borderRadius: 30,
    },
    minHeight: {
        minHeight: '25%',
    },
});
