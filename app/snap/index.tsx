import { Camera, CameraType } from 'expo-camera';
import * as Location from 'expo-location';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { useEffect, useState } from 'react';
import pb from '../../constants/pocketbase';

function SnapView() {
    const [permissionCam, requestPermissionCam] = Camera.useCameraPermissions();
    const [permissionLoc, setPermissionLoc] = useState<boolean>(false);
    const [camera, setCamera] = useState<Camera | null>(null);
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
                    Location.getCurrentPositionAsync({}).then((location) => {
                        console.log(location);
                        setLocation(location);
                        const formdata = new FormData();
                        formdata.append('image', JSON.parse(JSON.stringify({ uri: result.uri, type: 'image/jpeg', name: 'image' })));
                        formdata.append('longitude', location.coords.longitude.toString());
                        formdata.append('latitude', location.coords.latitude.toString());
                        formdata.append('user', pb?.authStore?.model?.id);
                        formdata.append('species', 'iegoy1qo50ufs8n');

                        pb.collection('insectFindings').create(formdata);
                    });
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    return (
        <>
            <View style={styles.container}>
                <Camera style={styles.camera} type={CameraType.back} ref={(ref) => setCamera(ref)}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={onSnap}>
                            <Text style={styles.text}>Button</Text>
                        </TouchableOpacity>
                    </View>
                </Camera>
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
        flex: 1,
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
