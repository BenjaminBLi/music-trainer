import { useState } from 'react';
import { StyleSheet, Button, View } from 'react-native';
import { Audio } from 'expo-av';

export default function App() {
    const [recording, setRecording] = useState<Audio.Recording>();
    const [permissionResponse, requestPermission] = Audio.usePermissions();

    async function startRecording() {
        try {
            if (permissionResponse) {
                console.log('Requesting permission..');
                await requestPermission();
            }

            console.log('Starting recording..');
            const { recording } = await Audio.Recording.createAsync( Audio.RecordingOptionsPresets.HIGH_QUALITY);
            setRecording(recording);
            console.log('Recording Started');
        }catch (err) {
            console.error('Failed to start recording', err);
        }
    }

    async function stopRecording() {
        console.log('Stopping recording..');
        setRecording(undefined);
        await recording.stopAndUnloadAsync();
        await Audio.setAudioModeAsync(
            {
                allowsRecordingIOS: false,
            }
        );
        const uri = recording?.getURI();
        console.log('Recording stopped and stored at', uri);
    }


    return (
        <View style={styles.container}>
        <Button
            title={recording ? 'Stop recording' : 'Start recording'}
            onPress={recording ? stopRecording : startRecording}
        />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
