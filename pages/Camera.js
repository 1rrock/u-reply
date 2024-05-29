import * as FileSystem from 'expo-file-system';
import { Camera, CameraType } from 'expo-camera';
import { useRef, useState } from 'react';
import { Alert, Button, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SideBar from '../components/SideBar';
import containers from '../style/Containers';
import * as MediaLibrary from 'expo-media-library';
import { ClipPath, Defs, G, Path, Rect, Svg } from 'react-native-svg';


export default function App({ navigation }) {
    const cameraRef = useRef(null);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [microPhonePermission, requestMicrophonePermission] = Camera.useMicrophonePermissions();


    const [type, setType] = useState(CameraType.back);
    const [isRecord, setIsRecord] = useState(false);

    if (!permission || !microPhonePermission) {
        // Camera permissions are still loading
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet
        return (
            <View style={containers.home}>
                <SideBar navigation={navigation} isRecBtnVisible={false} />
                <View style={containers.permissionContainer}>
                    <Text style={{ textAlign: 'center' }}>카메라를 사용하려면 권한이 필요합니다.</Text>
                    <Button onPress={requestPermission} title="확인" />
                </View>
            </View>
        );
    }

    if (!microPhonePermission.granted) {
        // Camera permissions are not granted yet
        return (
            <View style={containers.home}>
                <SideBar navigation={navigation} isRecBtnVisible={false} />
                <View style={containers.permissionContainer}>
                    <Text style={{ textAlign: 'center' }}>마이크 접근 권한이 필요합니다.</Text>
                    <Button onPress={requestMicrophonePermission} title="확인" />
                </View>
            </View>
        );
    }

    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    const onRecording = async () => {
        setIsRecord(!isRecord);
        if (!isRecord) {
            const timestamp = () => {
                const date = new Date();
                date.setHours(date.getHours() + 9);
                return date.toISOString().replace('T', ' ').substring(0, 19);
            }

            const save = async (uri) => {
                try {
                    // Request device storage access permission
                    const { status } = await MediaLibrary.requestPermissionsAsync();
                    if (status === "granted") {
                        // Save image to media library
                        await MediaLibrary.saveToLibraryAsync(uri);

                        console.log("video successfully saved");
                        Alert.alert(`${uri.split('/').pop()}으로 저장되었습니다.`)
                    }
                } catch (error) {
                    console.log(error);
                }
            };

            const data = await cameraRef.current.recordAsync();
            const splitedUri = data.uri.split('/');
            splitedUri.pop();
            splitedUri.push(`${timestamp().replace(' ', '-')}.mp4`);
            const newUri = splitedUri.join('/');

            await FileSystem.moveAsync({
                from: data.uri,
                to: newUri
            })
            save(newUri)
        } else {
            cameraRef.current.stopRecording();
        }
    }

    return (
        <View style={containers.home}>
            <SideBar navigation={navigation} isRecBtnVisible={false} />
            <View style={containers.cameraContainer}>
                <Camera ref={cameraRef} style={styles.camera} type={type}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.recordBtn}
                            onPress={onRecording}
                        >
                            {
                                isRecord ?
                                    <View style={{ width: Dimensions.get('window').width / 10, aspectRatio: 1 / 1 }}>
                                        <Svg width="100%" height="100%" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <G id="Group">
                                                <Path id="Vector" d="M60.0397 2H11.9603C6.45937 2 2 6.45937 2 11.9603V60.0397C2 65.5406 6.45937 70 11.9603 70H60.0397C65.5406 70 70 65.5406 70 60.0397V11.9603C70 6.45937 65.5406 2 60.0397 2Z" fill="#ffffff" />
                                                <Path id="Vector_2" d="M45.7086 23.0532H26.2915C24.5065 23.0532 23.0534 24.5006 23.0534 26.2913V45.7085C23.0534 47.4934 24.5008 48.9465 26.2915 48.9465H45.7086C47.4935 48.9465 48.9467 47.4991 48.9467 45.7085V26.2913C48.9467 24.5064 47.4993 23.0532 45.7086 23.0532Z" fill="#DC000C" />
                                            </G>
                                        </Svg>
                                    </View>
                                    :
                                    <View style={{ width: Dimensions.get('window').width / 10, aspectRatio: 1 / 1 }}>
                                        <Svg width="100%" height="100%" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <G id="Group">
                                                <Path id="Vector" d="M60.0397 2H11.9603C6.45938 2 2 6.45937 2 11.9603V60.0397C2 65.5406 6.45938 70 11.9603 70H60.0397C65.5406 70 70 65.5406 70 60.0397V11.9603C70 6.45937 65.5406 2 60.0397 2Z" fill="#ffffff" />
                                                <Path id="Vector_2" d="M36 20.187C31.7779 20.187 27.8075 21.8289 24.8211 24.8153C21.8348 27.8017 20.1928 31.7721 20.1928 35.9942C20.1928 40.2163 21.8348 44.1867 24.8211 47.173C27.8075 50.1594 31.7779 51.8013 36 51.8013C40.2221 51.8013 44.1925 50.1594 47.1789 47.173C50.1652 44.1867 51.8129 40.2163 51.8129 35.9942C51.8129 31.7721 50.1652 27.8017 47.1789 24.8153C44.1925 21.8289 40.2221 20.187 36 20.187Z" fill="#DC000C" />
                                            </G>
                                        </Svg>
                                    </View>
                            }
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.shyffleBtn}
                            onPress={toggleCameraType}
                        >
                            <View style={{ width: Dimensions.get('window').width / 10, aspectRatio: 1 / 1 }}>
                                <Svg id="그룹_97" data-name="그룹 97" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" width="60" height="60" viewBox="0 0 105.767 105.767">
                                    <Defs>
                                        <ClipPath id="clip-path">
                                            <Rect id="사각형_57" data-name="사각형 57" width="105.767" height="105.767" fill="none" />
                                        </ClipPath>
                                    </Defs>
                                    <G id="그룹_96" data-name="그룹 96" transform="translate(0 0)" clip-path="url(#clip-path)">
                                        <Path id="패스_617" data-name="패스 617" d="M95.732,105.767h-85.7A10.032,10.032,0,0,1,0,95.734v-85.7A10.033,10.033,0,0,1,10.032,0h85.7a10.033,10.033,0,0,1,10.032,10.034v85.7a10.032,10.032,0,0,1-10.032,10.032" transform="translate(0 0.001)" fill="#fff" />
                                        <Path id="패스_618" data-name="패스 618" d="M48.5,25.823,31.8,11.809c-1.014-.85-2.265.253-2.253,1.987l.056,7.6C13.9,23.4,3.211,32.911,3.211,45.35c0,16,16.338,24.367,32.476,24.367h8.046c.834,0,1.51-1.009,1.51-2.251v-9c0-1.244-.677-2.251-1.51-2.251H35.687c-15.207,0-23.41-7.712-23.41-10.863,0-2.615,5.919-8.741,17.42-10.426l.055,7.43c.012,1.734,1.279,2.8,2.279,1.914l16.5-14.547a2.893,2.893,0,0,0-.028-3.9" transform="translate(2.1 7.534)" fill="#767676" />
                                        <Path id="패스_619" data-name="패스 619" d="M78.943,41.606c0-16-16.338-24.367-32.478-24.367H38.421c-.834,0-1.51,1.009-1.51,2.251v9c0,1.244.677,2.251,1.51,2.251h8.044c15.208,0,23.411,7.712,23.411,10.863,0,2.614-5.919,8.739-17.42,10.426L52.4,44.6c-.012-1.734-1.279-2.8-2.281-1.914l-16.5,14.547a2.893,2.893,0,0,0,.028,3.9L50.358,75.148c1.012.85,2.265-.253,2.251-1.987l-.055-7.6c15.7-2.011,26.389-11.518,26.389-23.956" transform="translate(21.51 11.278)" fill="#767676" />
                                    </G>
                                </Svg>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Camera>
            </View >
        </View >
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
        position: 'relative',
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        justifyContent: 'center'
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
    recordBtn: {
        alignSelf: 'flex-end',
        bottom: 30
    },
    shyffleBtn: {
        position: 'absolute',
        right: 40,
        bottom: 30
    }
});
