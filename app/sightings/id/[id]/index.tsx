import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import pb from '../../../../constants/pocketbase';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import SightingCard from '../../../../components/SightingCard';
import StyleLib from '../../../../constants/style';

// This page displays a single sighting with the given id
function sightingCardView() {
    const local = useLocalSearchParams();
    const id = local.id as string;
    const [sighting, setSighting] = useState<any | null>(null);

    // load the sighting with the given id
    useEffect(() => {
        pb.collection('insectFindings')
            .getOne(id, { expand: 'species' })
            .then((res) => {
                setSighting(res);
            })
            .catch((err) => {
                if (err.status != 0) {
                    console.error(err);
                }
            });
    }, [id]);

    return <View style={[StyleLib.page, { paddingTop: 80, paddingBottom: 20 }]}>{sighting ? <SightingCard sighting={sighting} /> : <Text style={[StyleLib.text]}>Loading...</Text>}</View>;
}
export default sightingCardView;
