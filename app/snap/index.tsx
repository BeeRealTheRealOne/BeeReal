import { Camera, CameraCapturedPicture, CameraType } from 'expo-camera';
import * as Location from 'expo-location';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image, SafeAreaView } from 'react-native';
import { useEffect, useState } from 'react';
import pb from '../../constants/pocketbase';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../../constants/colors';
import StyleLib from '../../constants/style';
import { router } from 'expo-router';

function SnapView() {
    const [permissionCam, requestPermissionCam] = Camera.useCameraPermissions();
    const [permissionLoc, setPermissionLoc] = useState<boolean>(false);
    const [camera, setCamera] = useState<Camera | null>(null);
    const [image, setImage] = useState<CameraCapturedPicture | null>(null);
    const [location, setLocation] = useState<Location.LocationObject | null>(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                return;
            }
            setPermissionLoc(true);
        })();
    }, [permissionLoc, permissionCam]);

    if (!permissionCam || !permissionLoc) {
        // Camera permissions are still loading
        return <View />;
    }

    if (!permissionCam.granted) {
        // Camera permissions are not granted yet
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
                <Button onPress={requestPermissionCam} title="grant permission" />
            </View>
        );
    }

    function onSnap() {
        if (!pb.authStore.isValid) {
            return;
        }
        if (camera) {
            camera
                .takePictureAsync({ base64: true })
                .then((result) => {
                    Location.getCurrentPositionAsync({}).then((locationTemp) => {
                        setLocation(locationTemp);
                        setImage(result);
                    });
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    function confirm() {
        if (!pb.authStore.isValid) {
            return;
        }
        if (location != null && image != null) {
            const formdata = new FormData();
            formdata.append('image', JSON.parse(JSON.stringify({ uri: image.uri, type: 'image/jpeg', name: 'image' })));
            formdata.append('longitude', location.coords.longitude.toString());
            formdata.append('latitude', location.coords.latitude.toString());
            formdata.append('user', pb?.authStore?.model?.id);
            formdata.append('species', 'iegoy1qo50ufs8n');
            pb.collection('insectFindings')
                .create(formdata)
                .then((result) => {
                    if (result.id != null) {
                        router.push(`/sightings/id/${result.id}/`);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
        setLocation(null);
        setImage(null);
    }

    return (
        <>
            <View style={styles.container}>
                {image ? (
                    <View style={[styles.container, styles.flex]}>
                        <View style={[styles.flex]} />
                        <Image source={{ uri: image.uri }} style={styles.camera} />
                        <View style={[styles.containerRow]}>
                            <TouchableOpacity style={[styles.container]} onPress={confirm}>
                                <View style={[styles.snapButton, { backgroundColor: Colors.accent }]}>
                                    <Ionicons name="checkmark" size={40} color="black" />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.container]} onPress={() => setImage(null)}>
                                <View style={[styles.snapButton, { backgroundColor: Colors.cancel }]}>
                                    <Ionicons name="close" size={40} color="black" />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    <View style={[styles.container, styles.flex]}>
                        <View style={[styles.flex]} />
                        <View style={[styles.camera, StyleLib.rounded]}>
                            <Camera ratio="1:1" style={[styles.camera]} type={CameraType.back} ref={(ref) => setCamera(ref)}></Camera>
                        </View>
                        <TouchableOpacity style={[styles.container]} onPress={onSnap}>
                            <View style={[styles.snapButton]}>
                                <Ionicons name="camera" size={40} color="black" />
                            </View>
                        </TouchableOpacity>
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

export default SnapView;
