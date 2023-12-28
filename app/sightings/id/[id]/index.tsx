import { useEffect, useState } from 'react';
import pb from '../../../../constants/pocketbase';
import { useLocalSearchParams, Link, Stack } from 'expo-router';
import SightingCard from '../../../../components/SightingCard';
import { View } from 'react-native';

function categoriesCardView() {
    const local = useLocalSearchParams();
    const id = local.id;
    const [sighting, setSighting] = useState<any>([]);
    useEffect(() => {
        pb.collection('insectFindings')
            .getOne(id as string)
            .then((res) => {
                setSighting(res);
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <>
            <Stack.Screen options={{ title: 'Sighting' }} />
            <SightingCard sighting={sighting} />
        </>
    );
}
/*
        <View>
        </View>
            */
export default categoriesCardView;
