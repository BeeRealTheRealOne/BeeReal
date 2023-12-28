import { useEffect, useState } from 'react';
import pb from '../../constants/pocketbase';
import CategoriesItem from '../../components/CategoriesItem';
import { FlatList } from 'react-native-gesture-handler';
import { Link, Stack } from 'expo-router';
import { View } from 'react-native';
import CameraIcon from '../../components/CameraIcon';

function categoriesList() {
    const [categories, setCategories] = useState<any>([]);
    useEffect(() => {
        pb.collection('categories')
            .getList(1, 100, { name: 'asc' })
            .then((res) => {
                setCategories(res.items);
            })
            .catch((err) => console.error(err));
    }, []);
    return (
        <View>
            <Stack.Screen options={{ title: 'Categories', headerRight: CameraIcon }} />
            <FlatList
                data={categories}
                renderItem={({ item }) => (
                    <Link href={`/species/categorie/id/${item.id}/`} key={item.id}>
                        <CategoriesItem id={item.id} key={item.id} name={item.name} scientificName={item.scientificName} />
                    </Link>
                )}
                keyExtractor={(item: any) => item.id}
            />
        </View>
    );
}

export default categoriesList;
