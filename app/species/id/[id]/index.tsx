import { useEffect, useState } from 'react';
import pb from '../../../../constants/pocketbase';
import { useLocalSearchParams, Link, Stack } from 'expo-router';
import SpeciesCard from '../../../../components/SpeciesCard';
import { Platform, StyleSheet, View } from 'react-native';
import StyleLib from '../../../../constants/style';

/**
 * This page displays a detail view of a single species with the given id
 */
export default function speciesCardView() {
    const local = useLocalSearchParams();
    const id = local.id;
    const [species, setSpecies] = useState<any>([]);

    const [loading, setLoading] = useState(true);

    // load the species when the page loads
    useEffect(() => {
        pb.collection('species')
            .getOne(id as string)
            .then((res) => {
                setSpecies(res);
                setLoading(false);
            })
            .catch((err) => {
                if (err.status != 0) {
                    console.error(err);
                }
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <View style={[StyleLib.page]}></View>;
    }

    return (
        <View style={StyleSheet.flatten([StyleLib.page, styles.extraPaddingPage])}>
            <View style={StyleSheet.flatten([styles.justify])}>
                <SpeciesCard name={species.name} scientificName={species.scientificName} description={species.description} categorie={species.categorie} imageURL={`${process.env.EXPO_PUBLIC_PB_URL}/api/files/species/${species.id}/${species.image}`} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    justify: {
        justifyContent: 'center',
    },
    extraPaddingPage: {
        paddingTop: 60,
    },
});
