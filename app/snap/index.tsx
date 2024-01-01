import { Camera, CameraCapturedPicture, CameraType } from 'expo-camera';
import * as Location from 'expo-location';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { useEffect, useState } from 'react';
import pb from '../../constants/pocketbase';
import { Stack, router } from 'expo-router';
import BeeIcon from '../../components/BeeIcon';

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
    }, []);

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
            pb.collection('insectFindings').create(formdata);
        }
        setLocation(null);
        setImage(null);
    }

    return (
        <>
            <View style={styles.container}>
                {image ? (
                    <>
                        <Image source={{ uri: image.uri }} style={styles.camera} />
                        <Button title="Confirm" onPress={confirm} />
                        <Button title="Retake" onPress={() => setImage(null)} />
                    </>
                ) : (
                    <Camera ratio="1:1" style={styles.camera} type={CameraType.back} ref={(ref) => setCamera(ref)}>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={onSnap}>
                                <Text style={styles.text}>Snap</Text>
                            </TouchableOpacity>
                        </View>
                    </Camera>
                )}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    camera: {
        width: '100%',
        aspectRatio: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
});

export default SnapView;
