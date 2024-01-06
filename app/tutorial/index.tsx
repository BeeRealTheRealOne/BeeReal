import { router } from 'expo-router';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import StyleLib from '../../constants/style';
import { useState } from 'react';
import Colors from '../../constants/colors';

function tutorialView() {
    const images = [require('../../assets/images/tutorial/nav.png'), require('../../assets/images/tutorial/cam.png'), require('../../assets/images/tutorial/social.png'), require('../../assets/images/tutorial/profile.png'), require('../../assets/images/tutorial/insects.png')];

    const [index, setIndex] = useState(0);
    return (
        <View style={[StyleLib.page]}>
            <Image source={images[index]} style={styles.image}></Image>
            <Button
                title={index != images.length - 1 ? 'next' : 'finish'}
                color={Colors.primary}
                onPress={() => {
                    if (index == images.length - 1) {
                        router.push('/snap/');
                        return;
                    }
                    setIndex(index + 1);
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        height: '90%',
        width: '100%',
        resizeMode: 'contain',
    },
});

export default tutorialView;
