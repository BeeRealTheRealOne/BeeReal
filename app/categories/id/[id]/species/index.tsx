import { useEffect, useState } from 'react';
import pb from '../../../../../constants/pocketbase';
import { useLocalSearchParams, Link } from 'expo-router';
import SpeciesItem from '../../../../../components/SpeciesItem';

function categoriesCardView() {
    const local = useLocalSearchParams();
    const id = local.id;
    const [species, setSpecies] = useState<any>([]);
    useEffect(() => {
        pb.collection('species')
            .getList(1, 50, { filter: `categorie = "${id}"` })
            .then((res) => {
                setSpecies(res.items);
            })
            .catch((err) => console.error(err));
    }, []);

    return species.map((item: any) => (
        <Link href={`/species/id/${item.id}/`} key={item.id}>
            <SpeciesItem key={item.id} name={item.name} scientificName={item.scientificName} />
        </Link>
    ));
}

export default categoriesCardView;
