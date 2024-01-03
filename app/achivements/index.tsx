import { useEffect, useState } from 'react';
import pb from '../../constants/pocketbase';
import { View, StyleSheet, Text } from 'react-native';
import StyleLib from '../../constants/style';
import Colors from '../../constants/colors';

function achivementsView() {
    const [numSightingsAchivements, setNumSightingsAchivements] = useState<number | null>();
    const [numSpeciesAchivements, setNumSpeciesAchivements] = useState<number | null>();

    useEffect(() => {
        pb.collection('numSightingsAchivements')
            .getOne(pb.authStore?.model?.id)
            .then((res) => {
                console.log(res);
                setNumSightingsAchivements(res.cnt);
            })
            .catch((err) => console.error(err));
        pb.collection('numSpeciesAchivements')
            .getOne(pb.authStore?.model?.id)
            .then((res) => {
                console.log(res);
                setNumSpeciesAchivements(res.cnt);
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <View style={StyleLib.page}>
            <Text>Number of Sightings: {numSightingsAchivements}</Text>
            <Text>Number of Species Sighted: {numSpeciesAchivements}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: Colors.baseText,
    },
});

export default achivementsView;
