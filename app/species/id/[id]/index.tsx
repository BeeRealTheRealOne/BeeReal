import { useEffect, useState } from 'react';
import pb from '../../../../constants/pocketbase';
import { useLocalSearchParams, Link, Stack } from 'expo-router';
import SpeciesCard from '../../../../components/SpeciesCard';
import { View } from 'react-native';
import StyleLib from '../../../../constants/style';

function speciesCardView() {
    const local = useLocalSearchParams();
    const id = local.id;
    const [species, setSpecies] = useState<any>([]);
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
            <SpeciesCard name={species.name} scientificName={species.scientificName} description={species.description} categorie={species.categorie} imageURL={`${process.env.EXPO_PUBLIC_PB_URL}/api/files/species/${species.id}/${species.image}`} />
        </View>
    );
}

export default speciesCardView;
