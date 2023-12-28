import { useEffect, useState } from 'react';
import { Text } from 'react-native';
import pb from '../../../../constants/pocketbase';
import { useLocalSearchParams, Stack } from 'expo-router';
import SightingCard from '../../../../components/SightingCard';
import { Sighting } from '../../../../types/Sighting';
import { RecordModel } from 'pocketbase';
import CameraIcon from '../../../../components/CameraIcon';
import BeeIcon from '../../../../components/BeeIcon';

function sightingCardView() {
    const local = useLocalSearchParams();
    const id = local.id as string;
    const [sighting, setSighting] = useState<any | null>(null);

    useEffect(() => {
        pb.collection('insectFindings')
            .getOne(id, { expand: 'species' })
            .then((res) => {
                setSighting(res);
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <>
            <Stack.Screen options={{ title: 'Sighting', headerRight: CameraIcon }} />
            {sighting ? <SightingCard sighting={sighting} /> : <Text>Loading...</Text>}
        </>
    );
}
export default sightingCardView;
