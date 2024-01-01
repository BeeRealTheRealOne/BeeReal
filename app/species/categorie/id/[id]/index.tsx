import { useEffect, useState } from 'react';
import pb from '../../../../../constants/pocketbase';
import { useLocalSearchParams, Link, Stack, router } from 'expo-router';
import SpeciesItem from '../../../../../components/SpeciesItem';
import { View } from 'react-native';
import CameraIcon from '../../../../../components/CameraIcon';
import BeeIcon from '../../../../../components/BeeIcon';

function categoriesCardView() {
    const local = useLocalSearchParams();
    const id = local.id;
    const [species, setSpecies] = useState<any>([]);

    useEffect(() => {
        pb.collection('species')
            .getList(1, 10, { filter: `categorie = "${id}"` })
            .then((res) => {
                setSpecies(res.items);
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <View>
            {species.map((item: any) => (
                <Link href={`/species/id/${item.id}/`} key={item.id}>
                    <SpeciesItem key={item.id} name={item.name} scientificName={item.scientificName} imageURL={`${process.env.EXPO_PUBLIC_PB_URL}/api/files/species/${item.id}/${item.image}`} />
                </Link>
            ))}
        </View>
    );
}

export default categoriesCardView;
