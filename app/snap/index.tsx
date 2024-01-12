import { Camera, CameraCapturedPicture, CameraType } from 'expo-camera';
import * as Location from 'expo-location';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image, Pressable, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import pb from '../../constants/pocketbase';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/colors';
import StyleLib from '../../constants/style';
import { router } from 'expo-router';
import { Audio } from 'expo-av';
import Toast from 'react-native-root-toast';

// this page lets the user take photos of insects and send them to the api
export default function SnapView() {
    // get the camera permissions
    const [permissionCam, requestPermissionCam] = Camera.useCameraPermissions();
    const [permissionLoc, setPermissionLoc] = useState<boolean>(false);
    const [camera, setCamera] = useState<Camera | null>(null);
    const [image, setImage] = useState<CameraCapturedPicture | null>(null);
    const [location, setLocation] = useState<Location.LocationObject | null>(null);

    const [sending, setSending] = useState<boolean>(false);

    // ask for location permissions
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                return;
            }
            setPermissionLoc(true);
        })();
    }, [permissionLoc, permissionCam]);

    // check if permissions are granted
    if (!permissionCam || !permissionLoc) {
        // Camera permissions are still loading
        return (
            <View>
                <Text>Seems like you declined the permissions. Pls grant permission to the camera and your location in the settings of your device.</Text>
            </View>
        );
    }

    if (!permissionCam.granted) {
        // Camera permissions are not granted yet
        return (
            <View style={StyleSheet.flatten(styles.container)}>
                <Text style={StyleSheet.flatten({ textAlign: 'center' })}>We need your permission to show the camera</Text>
                <Button onPress={requestPermissionCam} title="grant permission" />
            </View>
        );
    }

    // take a picture and save it to the state
    function onSnap() {
        if (!pb.authStore.isValid) {
            return;
        }
        if (camera) {
            camera
                .takePictureAsync({ base64: true })
                .then((result) => {
                    Audio.Sound.createAsync(require('../../assets/sounds/camera.mp3'), {
                        shouldPlay: true,
                    }).then((result) => {
                        result.sound.playAsync();
                    });
                    Location.getCurrentPositionAsync({}).then((locationTemp) => {
                        setLocation(locationTemp);
                        setImage(result);
                    });
                })
                .catch((err) => {
                    if (err.status != 0) {
                        console.error(err);
                    }
                });
        }
    }

    // when the user confirmes the picture, send it to the api
    async function confirm() {
        if (!pb.authStore.isValid) {
            return;
        }
        if (location != null && image != null) {
            setSending(true);
            const formdata = new FormData();

            // add the image, location and user to the formdata
            formdata.append('image', JSON.parse(JSON.stringify({ uri: image.uri, type: 'image/jpeg', name: 'image' })));
            formdata.append('longitude', location.coords.longitude.toString());
            formdata.append('latitude', location.coords.latitude.toString());
            formdata.append('user', pb?.authStore?.model?.id);

            /*
            This would be the real API call to the insect categorization api. For testing purposes we use Mocks. But this was tested and worked if the Backend Dataset matches the one from the API.
            const resultSpeciesApi = await sendImageToApi(image.base64, location);
            resultSpeciesApi.result.classification.suggestions[0].name
            */

            //mock the insect categorization api by getting one random species
            const possibleName = await pb.collection('species').getList(1, 1, { sort: '@random' });

            //mock the insect categorization api by returning the result in the same format as the real api
            const resultSpeciesApi = {
                result: {
                    classification: {
                        suggestions: [
                            {
                                name: possibleName.items[0].scientificName,
                            },
                        ],
                    },
                },
            };

            //get the species from the database
            let species: any = await pb.collection('species').getList(1, 1, { filter: `scientificName = '${resultSpeciesApi.result.classification.suggestions[0].name}'` });

            //if the species does not exist in the database, set it to unknown
            if (species.items.length === 0) {
                species = await pb.collection('species').getList(1, 1, { filter: `name = 'unknown'` });

                //if there is no unknown species in the database, show error
                if (species.items.length === 0) {
                    Toast.show('Something went wrong categorizing your insect. We are sorry.', {
                        duration: Toast.durations.LONG,
                        position: Toast.positions.BOTTOM,
                        shadow: true,
                        animation: true,
                        backgroundColor: Colors.primary,
                        hideOnPress: true,
                        delay: 0,
                    });
                    return;
                }
            }

            //check if the user already found this species
            const isNew = await pb.collection('insectFindings').getList(1, 1, { filter: `user = '${pb.authStore.model?.id}' && species = '${species.items[0].id}'` });

            //create the sighting
            formdata.append('species', species.items[0].id);

            pb.collection('insectFindings')
                .create(formdata)
                .then((result) => {
                    if (result.id != null) {
                        if (isNew.items.length === 0) {
                            // if the user found this species for the first time, show this toast
                            Toast.show('First time you found this species! Thx for helping with the insect population!', {
                                duration: Toast.durations.LONG,
                                position: Toast.positions.BOTTOM,
                                shadow: true,
                                animation: true,
                                backgroundColor: Colors.primary,
                                hideOnPress: true,
                                delay: 0,
                            });
                        } else {
                            // if the user found this species before, show this Toast
                            Toast.show('Nice Catch! Thx for helping with the insect population!', {
                                duration: Toast.durations.LONG,
                                position: Toast.positions.BOTTOM,
                                shadow: true,
                                animation: true,
                                backgroundColor: Colors.primary,
                                hideOnPress: true,
                                delay: 0,
                            });
                        }
                        setSending(false);
                        // redirect to the sighting
                        router.push(`/sightings/id/${result.id}/`);
                    }
                })
                .catch((err) => {
                    if (err.status != 0) {
                        console.error(err);
                    }
                });
        }
        setLocation(null);
        setImage(null);
    }

    // send the image to the insect categorization api
    const sendImageToApi = async (base64Image: any, location: any): Promise<string> => {
        var myHeaders = new Headers();
        myHeaders.append('Api-Key', process.env.EXPO_PUBLIC_API_KEY as string);
        myHeaders.append('Content-Type', 'application/json');

        var raw = JSON.stringify({
            images: ['data:image/jpeg;base64,' + base64Image],
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            similar_images: true,
        });

        var requestOptions: RequestInit = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        try {
            const response = await fetch('https://insect.kindwise.com/api/v1/identification?details=common_names,url,description,image', requestOptions);

            const result = await response.json();

            //return the name of the species that is most likely
            return result.result.classification.suggestions[0].name as string;
        } catch (err: any) {
            if (err.status != 0) {
                console.error(err);
                return 'error';
            }
        }
        return '';
    };

    return (
        <>
            <View style={StyleSheet.flatten(styles.container)}>
                {image ? (
                    <View style={StyleSheet.flatten([styles.container, styles.flex])}>
                        <View style={StyleSheet.flatten([styles.flex])} />
                        <Image source={{ uri: image.uri }} style={StyleSheet.flatten(styles.camera)} />
                        <View style={StyleSheet.flatten([styles.containerRow])}>
                            {sending ? (
                                <>
                                    <Text>Classifing your insect...</Text>
                                    <ActivityIndicator size="large" color={Colors.primary} />
                                </>
                            ) : (
                                <>
                                    <TouchableOpacity style={StyleSheet.flatten([styles.container])} onPress={confirm} disabled={sending}>
                                        <View style={StyleSheet.flatten([styles.snapButton, { backgroundColor: Colors.accent }])}>{sending ? <ActivityIndicator size="large" color="black" /> : <Ionicons name="checkmark" size={40} color="black" />}</View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.container]} onPress={() => setImage(null)} disabled={sending}>
                                        <View style={StyleSheet.flatten([styles.snapButton, { backgroundColor: Colors.cancel }])}>{sending ? <ActivityIndicator size="large" color="black" /> : <Ionicons name="close" size={40} color="black" />}</View>
                                    </TouchableOpacity>
                                </>
                            )}
                        </View>
                    </View>
                ) : (
                    <View style={StyleSheet.flatten([styles.container, styles.flex])}>
                        <View style={StyleSheet.flatten([styles.flex])} />
                        <View style={StyleSheet.flatten([styles.camera, StyleLib.rounded])}>
                            <Camera ratio="1:1" style={StyleSheet.flatten([styles.camera])} type={CameraType.back} ref={(ref) => setCamera(ref)}></Camera>
                        </View>
                        <Pressable android_disableSound={false} style={StyleSheet.flatten([styles.container])} onPress={onSnap}>
                            <View style={StyleSheet.flatten([styles.snapButton])}>
                                <Ionicons name="camera" size={40} color="black" />
                            </View>
                        </Pressable>
                    </View>
                )}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    containerRow: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    camera: {
        aspectRatio: 1,
        width: '100%',
    },
    snapButton: {
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary,
        borderRadius: 50,
    },
    flex: {
        flex: 1,
    },
});
