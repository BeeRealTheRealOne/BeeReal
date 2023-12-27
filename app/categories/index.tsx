import { useEffect, useState } from 'react';
import pb from '../../constants/pocketbase';
import CategoriesItem from '../../components/CategoriesItem';
import { FlatList } from 'react-native-gesture-handler';
import { Link } from 'expo-router';

function categoriesList() {
    const [species, setSpecies] = useState<any>([]);
    useEffect(() => {
        pb.collection('categories')
            .getList(1, 50, { name: 'asc' })
            .then((res) => {
                setSpecies(res.items);
            })
            .catch((err) => console.error(err));
    }, []);
    return (
        <FlatList
            data={species}
            renderItem={({ item }) => (
                <Link href={`/categories/id/${item.id}/species/`} key={item.id}>
                    <CategoriesItem id={item.id} key={item.id} name={item.name} scientificName={item.scientificName} />
                </Link>
            )}
            keyExtractor={(item: any) => item.id}
        />
    );
}

export default categoriesList;
