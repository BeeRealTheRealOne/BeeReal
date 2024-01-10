import { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import pb from '../../../../constants/pocketbase';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import SightingCard from '../../../../components/SightingCard';
import StyleLib from '../../../../constants/style';
import LoadingPage from '../../../../components/LoadingPage';

/**
 * This page displays a single sighting with the given id
 */
function sightingCardView() {
    const local = useLocalSearchParams();
    const id = local.id as string;
    const [sighting, setSighting] = useState<any | null>(null);

    const [loading, setLoading] = useState(true);

    // load the sighting with the given id
    useEffect(() => {
        pb.collection('insectFindings')
            .getOne(id, { expand: 'species' })
            .then((res) => {
                setLoading(false);
                setSighting(res);
            })
            .catch((err) => {
                if (err.status != 0) {
                    console.error(err);
                }
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <LoadingPage />;
    }

    return <View style={StyleSheet.flatten([StyleLib.page, { paddingTop: 60, paddingBottom: 20 }])}>{sighting ? <SightingCard sighting={sighting} /> : <Text style={StyleSheet.flatten([StyleLib.text])}>Loading...</Text>}</View>;
}
export default sightingCardView;
