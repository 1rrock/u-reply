// import * as FileSystem from 'expo-file-system';
// import { useEffect, useRef, useState } from "react";
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { Button, Text, TouchableOpacity, View, Alert } from "react-native";
import * as Linking from 'expo-linking';
import Pdf from 'react-native-pdf'
import { Camera, CameraType } from 'expo-camera';

import SideBar from "../components/SideBar";

import styles from "../style/StyleSheet";
import containers from "../style/Containers";
import Svg, { Path, G, ClipPath, Rect, Defs } from "react-native-svg"
import { useEffect, useRef, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const ListScreen = ({ navigation, route }) => {
    const cameraRef = useRef(null);
    // const [permission, requestPermission] = Camera.useCameraPermissions();
    // const [microPhonePermission, requestMicrophonePermission] = Camera.useMicrophonePermissions();
    CameraType.front
    const [isRecord, setIsRecord] = useState(false);

    const onClickYoutube = () => {
        Linking.openURL(route.params.youtube);
    };

    const onClickGoogle = () => {
        Linking.openURL(route.params.google);
    };

    const onClickRecCB = async () => {
        // if (!permission.granted) {
        //     requestPermission();
        // }
        // if (!microPhonePermission.granted) {
        //     requestMicrophonePermission();
        // }

        if (!isRecord) {
            setIsRecord(true);

            const timestamp = () => {
                const date = new Date();
                date.setHours(date.getHours() + 9);
                return date.toISOString().replace('T', ' ').substring(0, 19);
            }

            const save = async (uri) => {
                try {
                    // Request device storage access permission
                    // const { status } = await MediaLibrary.requestPermissionsAsync();
                    // if (status === "granted") {
                    // Save image to media library
                    await MediaLibrary.saveToLibraryAsync(uri);

                    console.log("video successfully saved");
                    Alert.alert(`${uri.split('/').pop()}으로 저장되었습니다.`)
                    setIsRecord(false);
                    // }
                } catch (error) {
                    console.log(error);
                }
            };

            const saveAlbum = async uri => {
                try {
                    console.log(uri)
                    const asset = await MediaLibrary.createAssetAsync(uri);
                    console.log(asset)
                    const { status } = await MediaLibrary.requestPermissionsAsync();
                    if(status === "granted") {
                        console.log(`저장시작`)
                        await MediaLibrary.createAlbumAsync('UReply', asset, false);

                        console.log("video successfully saved");
                    }
                } catch (error) {
                    console.log(`앨범저장안됨 ${error}`)
                }

                Alert.alert(`${uri.split('/').pop()}으로 저장되었습니다.`)
                setIsRecord(false);
            }

            const data = await cameraRef.current.recordAsync();
            // const splitedUri = data.uri.split('/');
            // splitedUri.pop();
            // splitedUri.push(`${timestamp().replace(' ', '-')}.mp4`);
            // const newUri = splitedUri.join('/');

            // await FileSystem.moveAsync({
            //     from: data.uri,
            //     to: newUri
            // })
            await saveAlbum(data.uri);
            // await save(data.uri)
        } else {
            cameraRef.current.stopRecording();
        }

    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ backgroundColor: '#B7B8B8' }}>
                <View style={containers.home}>
                    <SideBar navigation={navigation} isRecBtnVisible={true} onClickRecCB={onClickRecCB} isRecord={isRecord} />
                    <View style={containers.listContainer}>
                        <View style={styles.pdfViewer}>
                            <Pdf
                                style={styles.pdf}
                                trustAllCerts={false}
                                source={{
                                    uri: route.params.pdf
                                }}
                            />
                        </View>
                        <View style={styles.pdfBtnWrap}>
                            <TouchableOpacity style={styles.pdfBtn} onPress={onClickYoutube}>
                                <Svg id="그룹_33" data-name="그룹 33" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" width="80" height="80" viewBox="0 0 100 100">
                                    <Defs>
                                        <ClipPath id="clip-path">
                                            <Rect id="사각형_27" data-name="사각형 27" width="80" height="80" fill="none" />
                                        </ClipPath>
                                    </Defs>
                                    <G id="그룹_32" data-name="그룹 32" clip-path="url(#clip-path)">
                                        <G id="그룹_31" data-name="그룹 31">
                                            <G id="그룹_30" data-name="그룹 30" clip-path="url(#clip-path)">
                                                <G id="그룹_29" data-name="그룹 29" transform="translate(0 0)" opacity="0.4">
                                                    <G id="그룹_28" data-name="그룹 28">
                                                        <G id="그룹_27" data-name="그룹 27" clip-path="url(#clip-path)">
                                                            <Path id="패스_28" data-name="패스 28" d="M83.05,100h-66.1A16.951,16.951,0,0,1,0,83.05V16.95A16.951,16.951,0,0,1,16.951,0h66.1A16.949,16.949,0,0,1,100,16.95v66.1A16.95,16.95,0,0,1,83.05,100" transform="translate(0 0)" fill="#797878" />
                                                        </G>
                                                    </G>
                                                </G>
                                                <Path id="패스_29" data-name="패스 29" d="M68.9,24.826H48.909L59.046,14.688a1.29,1.29,0,1,0-1.825-1.825L45.639,24.446,34.082,12.889a1.29,1.29,0,1,0-1.825,1.825L42.37,24.826H22.405a7.447,7.447,0,0,0-7.441,7.439V64.753a7.449,7.449,0,0,0,7.441,7.44H68.9a7.448,7.448,0,0,0,7.44-7.44V32.265a7.446,7.446,0,0,0-7.44-7.439m2.278,39.927A2.281,2.281,0,0,1,68.9,67.031H22.405a2.281,2.281,0,0,1-2.279-2.278V32.265a2.281,2.281,0,0,1,2.279-2.277H68.9a2.28,2.28,0,0,1,2.278,2.277Z" transform="translate(4.348 3.627)" fill="#fff" />
                                                <Path id="패스_30" data-name="패스 30" d="M51.948,41.811l-17.235-9.95a1.291,1.291,0,0,0-1.936,1.118v19.9A1.292,1.292,0,0,0,34.713,54l17.235-9.95a1.292,1.292,0,0,0,0-2.237m-16.59,8.832V35.215l13.364,7.714Z" transform="translate(9.523 9.207)" fill="#fff" />
                                            </G>
                                        </G>
                                    </G>
                                </Svg>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.pdfBtn} onPress={onClickGoogle}>
                                <Svg id="그룹_40" data-name="그룹 40" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" width="80" height="80" viewBox="0 0 100 100">
                                    <Defs>
                                        <ClipPath id="clip-path">
                                            <Rect id="사각형_30" data-name="사각형 30" width="80" height="80" fill="none" />
                                        </ClipPath>
                                    </Defs>
                                    <G id="그룹_39" data-name="그룹 39" clip-path="url(#clip-path)">
                                        <G id="그룹_38" data-name="그룹 38">
                                            <G id="그룹_37" data-name="그룹 37" clip-path="url(#clip-path)">
                                                <G id="그룹_36" data-name="그룹 36" transform="translate(0 0)" opacity="0.4">
                                                    <G id="그룹_35" data-name="그룹 35">
                                                        <G id="그룹_34" data-name="그룹 34" clip-path="url(#clip-path)">
                                                            <Path id="패스_31" data-name="패스 31" d="M83.05,100h-66.1A16.951,16.951,0,0,1,0,83.05V16.95A16.951,16.951,0,0,1,16.951,0h66.1A16.949,16.949,0,0,1,100,16.95v66.1A16.95,16.95,0,0,1,83.05,100" transform="translate(0 0)" fill="#797878" />
                                                        </G>
                                                    </G>
                                                </G>
                                                <Path id="패스_32" data-name="패스 32" d="M25.328,44.548a1.372,1.372,0,0,0-.032.161V55.877a1.29,1.29,0,0,0,1.291,1.291H37.754a1.289,1.289,0,0,0,1.291-1.291v-9.5L43.821,41.6A1.29,1.29,0,1,0,42,39.777L38.252,43.52a1.281,1.281,0,0,0-.5-.1H27.693L26.751,42.1a1.291,1.291,0,1,0-2.1,1.5ZM36.464,54.586H27.876V48.117l3.043,4.26a1.289,1.289,0,0,0,.943.537c.036,0,.072,0,.107,0a1.286,1.286,0,0,0,.912-.378l3.581-3.581ZM35.772,46l-3.638,3.637L29.536,46Z" transform="translate(7.092 11.447)" fill="#fff" />
                                                <Path id="패스_33" data-name="패스 33" d="M72.567,15.288a2.579,2.579,0,0,0-2.074-1.047H24.222a2.582,2.582,0,0,0-2.468,1.826L20.8,19.185a33.274,33.274,0,0,0-1.462,9.76V63.484a32.456,32.456,0,0,1-1.661,10.26l-.511,1.534a2.58,2.58,0,0,0,2.448,3.4h46.27a2.584,2.584,0,0,0,2.458-1.789l.6-1.875a37.644,37.644,0,0,0,1.825-11.577V28.945A28.179,28.179,0,0,1,72,20.7l.956-3.118a2.574,2.574,0,0,0-.392-2.291m-6.96,13.658V63.434a32.487,32.487,0,0,1-1.574,9.993L64,73.513H23.139A37.616,37.616,0,0,0,24.5,63.484V28.945A28.108,28.108,0,0,1,25.734,20.7l.4-1.293H67a33.362,33.362,0,0,0-1.394,9.542" transform="translate(4.948 4.138)" fill="#fff" />
                                                <Path id="패스_34" data-name="패스 34" d="M26.387,40.069h11.17a1.29,1.29,0,0,0,1.291-1.291V27.611a1.291,1.291,0,0,0-1.291-1.291H26.387A1.291,1.291,0,0,0,25.1,27.611V38.779a1.29,1.29,0,0,0,1.291,1.291M27.677,28.9h8.587v8.586H27.677Z" transform="translate(7.291 7.647)" fill="#fff" />
                                                <Path id="패스_35" data-name="패스 35" d="M40.528,31.169H55.374a1.291,1.291,0,0,0,0-2.581H40.528a1.291,1.291,0,1,0,0,2.581" transform="translate(11.4 8.306)" fill="#fff" />
                                                <Path id="패스_36" data-name="패스 36" d="M40.528,35.948h7.995a1.291,1.291,0,1,0,0-2.581H40.528a1.291,1.291,0,1,0,0,2.581" transform="translate(11.4 9.694)" fill="#fff" />
                                            </G>
                                        </G>
                                    </G>
                                </Svg>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Camera ref={cameraRef} style={isRecord ? styles.cameraRecording : styles.camera} type={CameraType.front} />
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default ListScreen