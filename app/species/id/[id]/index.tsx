import { useEffect, useState } from 'react';
import pb from '../../../../constants/pocketbase';
import { useLocalSearchParams, Link, Stack } from 'expo-router';
import SpeciesCard from '../../../../components/SpeciesCard';
import { StyleSheet, View } from 'react-native';
import StyleLib from '../../../../constants/style';

// this page displays a detail view of a single species with the given id
function speciesCardView() {
    const local = useLocalSearchParams();
    const id = local.id;
    const [species, setSpecies] = useState<any>([]);

    // load the species when the page loads
    useEffect(() => {
        pb.collection('species')
            .getOne(id as string)
            .then((res) => {
                setSpecies(res);
            })
            .catch((err) => console.error(err));
    }, [id]);

    return (
        <View style={[StyleLib.page]}>
            <View style={[styles.flex, styles.justify]}>
                <SpeciesCard name={species.name} scientificName={species.scientificName} description={species.description} categorie={species.categorie} imageURL={`${process.env.EXPO_PUBLIC_PB_URL}/api/files/species/${species.id}/${species.image}`} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    justify: {
        justifyContent: 'center',
    },
    spacer: {
        height: 50,
    },
});

export default speciesCardView;
