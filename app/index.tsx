import { Text, TextInput, View, Button, StyleSheet } from 'react-native';
import Colors from '../constants/colors';
import { useEffect, useState } from 'react';
import pb from '../constants/pocketbase';
import { router, useRootNavigation } from 'expo-router';

/**
 * This is the home page
 */
function Home() {
    //This checks if the root navigation window is ready to be used, only then push to tutorial page
    const [isNavigationReady, setNavigationReady] = useState(false);

    // This is a listener for the root navigation window, it sets the navigation ready state to true when the window is ready
    useEffect(() => {
        const unsubscribe = useRootNavigation()?.addListener('state', (event) => {
            setNavigationReady(true);
        });
        return function cleanup() {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, []);

    // when the window is ready, check if the user is a new user, if so, push to tutorial page
    useEffect(() => {
        if (!isNavigationReady) {
            return;
        } else {
            if (pb.authStore.model?.newUser) {
                pb.collection('users')
                    .update(pb.authStore.model.id, { newUser: false })
                    .then(() => {
                        pb.collection('users')
                            .authRefresh()
                            .then(() => {
                                router.push('/tutorial/');
                            });
                    })
                    .catch((err) => {
                        if (err.code != 0) {
                            console.error(err);
                        }
                    });
            }
        }
    });

    return (
        <View style={StyleSheet.flatten([styles.container])}>
            <Text style={StyleSheet.flatten([styles.text, styles.heading])}>
                Welcome To <Text style={StyleSheet.flatten([styles.highlight])}>Bee</Text>Real
                <Text style={StyleSheet.flatten([styles.highlight, styles.heading])}>!</Text>
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        margin: 20,
    },
    infoContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
    },
    inputContainer: {
        gap: 10,
    },
    input: {
        backgroundColor: Colors.base,
        color: Colors.baseText,
        paddingHorizontal: 5,
        borderRadius: 2,
        width: 250,
    },
    button: {
        backgroundColor: Colors.primary,
        color: Colors.base,
    },
    text: {
        color: Colors.baseText,
    },
    highlight: {
        color: Colors.primary,
    },
    heading: {
        fontSize: 30,
    },
    bumper: {
        flex: 1,
    },
});

export default Home;
