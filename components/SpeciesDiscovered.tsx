import { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import pb from '../constants/pocketbase';
import StyleLib from '../constants/style';
import Colors from '../constants/colors';

const SpeciesDiscovered = (props: { speciesId: string }) => {
    const [loadingSpecies, setLoadingSpecies] = useState(true);
    const [loadingFinding, setLoadingFinding] = useState(true);
    const [found, setFound] = useState<boolean>();
    const [species, setSpecies] = useState<any>();

    useEffect(() => {
        pb.collection('insectFindings')
            .getList(1, 1, { filter: `user = '${pb.authStore.model?.id}' && species = '${props.speciesId}'`, requestKey: `${props.speciesId + pb.authStore.model?.id}` })
            .then((res) => {
                console.log(res);
                if (res.items.length > 0) {
                    setFound(true);
                }
                setLoadingFinding(false);
            })
            .catch((err) => {
                if (err.status != 0) {
                    console.error(err);
                }
                console.log(err);
                setLoadingFinding(false);
            });

        pb.collection('species')
            .getOne(props.speciesId)
            .then((res) => {
                setSpecies(res);
                setLoadingSpecies(false);
            })
            .catch((err) => {
                if (err.status != 0) {
                    console.error(err);
                }
                setLoadingSpecies(false);
            });
    }, []);
    if (loadingFinding || loadingSpecies) return <Text>Loading...</Text>;

    return (
        <View style={StyleSheet.flatten([StyleLib.card, styles.margin, { borderColor: found ? Colors.accent : Colors.cancel, borderWidth: 2 }, { flexDirection: 'row', alignItems: 'center', gap: 10 }])}>
            <Image style={StyleSheet.flatten([{ width: 100, height: 100, resizeMode: 'contain' }, StyleLib.rounded])} source={{ uri: `${process.env.EXPO_PUBLIC_PB_URL}/api/files/species/${props.speciesId}/${species.image}` }} />
            <View style={StyleSheet.flatten([styles.flex])}>
                <Text style={StyleSheet.flatten([StyleLib.h3, { flexWrap: 'wrap' }])}>{species.name}</Text>
                <Text style={StyleSheet.flatten([StyleLib.text])}>{`[${species.scientificName}]`}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    margin: {
        marginHorizontal: 20,
        marginVertical: 10,
    },
    flex: {
        flex: 1,
    },
});

export default SpeciesDiscovered;
