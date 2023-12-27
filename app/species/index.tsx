import { useEffect, useState } from 'react';
import pb from '../../constants/pocketbase';
import SpeciesCard from '../../components/SpeciesCard';
import { FlatList } from 'react-native-gesture-handler';

function speciesList() {
    const [species, setSpecies] = useState<any>([]);
    useEffect(() => {
        pb.collection('species')
            .getList(1, 50, { name: 'asc' })
            .then((res) => {
                setSpecies(res.items);
            })
            .catch((err) => console.error(err));
    }, []);
    return <FlatList data={species} renderItem={({ item }) => <SpeciesCard key={item.id} name={item.name} description={item.description} scientificName={item.scientificName} categorie={item.categorie} imageURL={`http://192.168.2.109:80/api/files/species/${item.id}/${item.image}`}></SpeciesCard>} keyExtractor={(item: any) => item.id} />;
}

export default speciesList;
