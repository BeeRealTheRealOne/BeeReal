import { useEffect, useState } from 'react';
import pb from '../../../../constants/pocketbase';
import { useLocalSearchParams, Link, Stack } from 'expo-router';
import SpeciesCard from '../../../../components/SpeciesCard';
import { View } from 'react-native';

function categoriesCardView() {
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
    }, []);

    return (
        <View>
            <Stack.Screen options={{ title: species.name }} />
            <SpeciesCard name={species.name} scientificName={species.scientificName} description={species.description} categorie={species.categorie} imageURL={`http://192.168.2.109:80/api/files/species/${species.id}/${species.image}`} />
        </View>
    );
}

export default categoriesCardView;
