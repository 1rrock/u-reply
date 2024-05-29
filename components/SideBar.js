import { Alert, Text, TouchableOpacity, View } from "react-native";
import Svg, { Path, G, ClipPath, Rect, Defs } from "react-native-svg"

import styles from "../style/StyleSheet";
import { useState } from "react";

// import * as MediaLibrary from 'expo-media-library';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
// import ReactNativeBlobUtil from "react-native-blob-util";
import * as Sharing from 'expo-sharing';

const SideBar = ({ navigation, isRecBtnVisible, onClickRecCB, isRecord }) => {
    const [recording, setRecording] = useState(false);
    const onClickHome = () => {
        navigation.navigate('Home', new Date().getTime());
    };

    const onClickRegister = () => {
        navigation.navigate('Register', new Date().getTime());
    };

    const onClickCamera = () => {
        onClickRecCB && onClickRecCB();
    }

    const onClickVoice = () => {
        // globalThis.onRecording();
        // navigation.navigate('Voice', 'R');
        if (!recording) {
            startRecording();
        } else {
            stopRecording();
        }
    }

    async function startRecording() {
        try {
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            console.log('Starting recording..');
            const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
            setRecording(recording);
            console.log('Recording started');
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    }

    // const save = async (uri) => {
    //     try {
    //         // Request device storage access permission
    //         // console.log(status)
    //         // if (status === "granted") {
    //         // console.log(uri)
    //         // // Save image to media library
    //         await MediaLibrary.createAssetAsync(uri);

    //         // console.log("voice successfully saved");
    //         // Alert.alert(`${uri.split('/').pop()}으로 저장되었습니다.`)
    //         // }
    //     } catch (error) {
    //         console.log('에러', error);
    //     }
    // };

    async function stopRecording() {
        console.log('Stopping recording..');
        setRecording(false);
        await recording.stopAndUnloadAsync();
        await Audio.setAudioModeAsync(
            {
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            }
        );
        const uri = recording.getURI();
        // console.log('Recording stopped and stored at', uri);
        // ReactNativeBlobUtil

        const timestamp = () => {
            const date = new Date();
            date.setHours(date.getHours() + 9);
            return date.toISOString().replace('T', ' ').substring(0, 19);
        }
        // if(!(await Sharing.isAvailableAsync())){

        // }
        await Sharing.shareAsync(uri);


        // let dirs = ReactNativeBlobUtil.fs.dirs.DownloadDir
        // console.log(uri)
        // console.log(dirs + `/${timestamp().replace(' ', '-')}.m4a`)

        // ReactNativeBlobUtil
        //     .config({
        //         // response data will be saved to this path if it has access right.
        //         path: dirs + `/${timestamp().replace(' ', '-')}.m4a`
        //     })
        //     .fetch('GET', uri)
        //     .then((res) => {
        //         // the path should be dirs.DocumentDir + 'path-to-file.anything'
        //         Alert.alert(`/${timestamp().replace(' ', '-')}.m4a 으로 저장되었습니다.`)
        //     })
        // const splitedUri = uri.split('/');
        // splitedUri.pop();
        // splitedUri.push(`${timestamp().replace(' ', '-')}.m4a`);
        // const newUri = splitedUri.join('/');
        // await FileSystem.moveAsync({
        //     from: uri,
        //     to: newUri
        // })
        // save(newUri)

    }

    return (
        <View style={styles.sideBar}>
            <View style={styles.sideBarTop}>
                <TouchableOpacity onPress={onClickHome} style={{ width: 50, height: 50 }}>
                    <Svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 80 80" style={{ pointerEvents: 'none' }}>
                        <G id="그룹_16" data-name="그룹 16" transform="translate(294 -1358)">
                            <Path id="패스_11" data-name="패스 11" d="M66.44,80H13.561A13.56,13.56,0,0,1,0,66.44V13.56A13.56,13.56,0,0,1,13.561,0H66.44A13.56,13.56,0,0,1,80,13.56V66.44A13.56,13.56,0,0,1,66.44,80" transform="translate(-294 1358)" fill="#49494a" />
                            <Path id="패스_12" data-name="패스 12" d="M68.21,22.06c-.784-.424-18.407-9.8-28.21-2.227-9.8-7.581-27.427,1.8-28.21,2.227a2.121,2.121,0,0,0-1.1,1.865V61A2.121,2.121,0,0,0,11.7,62.816a2.071,2.071,0,0,0,2.059.053c.173-.1,17.5-9.309,24.693-1.7a2.259,2.259,0,0,0,1.586.651,2.08,2.08,0,0,0,1.509-.651c7.2-7.609,24.52,1.6,24.693,1.7a2.07,2.07,0,0,0,2.059-.053A2.121,2.121,0,0,0,69.314,61V23.926a2.119,2.119,0,0,0-1.1-1.865M65.135,57.668C59.5,55.215,47.477,51.128,40,56.911c-7.474-5.78-19.5-1.694-25.135.757V25.239c3.951-1.89,17.451-7.634,23.588-1.148a2.254,2.254,0,0,0,1.586.651,2.076,2.076,0,0,0,1.509-.651c6.137-6.486,19.637-.742,23.588,1.148Z" transform="translate(-294 1358)" fill="#fff" />
                            <Path id="패스_13" data-name="패스 13" d="M17.437,29.71a1,1,0,1,0,1.043,1.706c.112-.067,11.157-6.695,16.631-.31a1,1,0,0,0,1.519-1.3c-6.586-7.677-18.682-.407-19.193-.094" transform="translate(-293.26 1358.915)" fill="#fff" />
                            <Path id="패스_14" data-name="패스 14" d="M17.437,36.366a1,1,0,1,0,1.043,1.706c.112-.067,11.157-6.695,16.631-.31a1,1,0,0,0,1.519-1.3c-6.586-7.678-18.682-.406-19.193-.094" transform="translate(-293.26 1359.147)" fill="#fff" />
                        </G>
                    </Svg>
                </TouchableOpacity>
                <TouchableOpacity onPress={onClickRegister} style={{ width: 50, height: 50 }}>
                    <Svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 80 80" style={{ pointerEvents: 'none' }}>
                        <G id="그룹_17" data-name="그룹 17" transform="translate(294 -1459.068)">
                            <Path id="패스_15" data-name="패스 15" d="M66.44,181.068H13.561A13.561,13.561,0,0,1,0,167.508V114.629a13.561,13.561,0,0,1,13.561-13.561H66.44A13.56,13.56,0,0,1,80,114.629v52.879a13.56,13.56,0,0,1-13.56,13.56" transform="translate(-294 1358)" fill="#49494a" />
                            <Path id="패스_16" data-name="패스 16" d="M38.541,150.543c-.353-.19-8.291-4.361-12.747-1.014-4.459-3.348-12.4.824-12.749,1.014a1,1,0,0,0-.529.882v16.518a1,1,0,0,0,1.471.882c2.174-1.156,8.4-3.551,11.067-.768a1.073,1.073,0,0,0,1.479,0c2.668-2.786,8.892-.388,11.066.768a.994.994,0,0,0,.471.118,1,1,0,0,0,1-1V151.425a1,1,0,0,0-.529-.882M37.07,166.37c-2.574-1.094-7.916-2.846-11.277-.322-3.362-2.528-8.7-.774-11.277.323V152.04c2.522-1.209,8.061-3.086,10.538-.5a1.073,1.073,0,0,0,1.479,0c2.477-2.584,8.016-.706,10.537.5Z" transform="translate(-293.382 1360.513)" fill="#fff" />
                            <Path id="패스_17" data-name="패스 17" d="M61.4,113.89H47.109l-4.2-3.709a2,2,0,0,0-1.324-.5H31.3a4.574,4.574,0,0,0-4.568,4.569v18.357a4.573,4.573,0,0,0,4.568,4.568H61.4a4.574,4.574,0,0,0,4.569-4.568V118.459A4.575,4.575,0,0,0,61.4,113.89m.569,18.716a.569.569,0,0,1-.569.568H31.3a.569.569,0,0,1-.568-.568V114.249a.569.569,0,0,1,.568-.569h9.523l4.2,3.709a2,2,0,0,0,1.323.5H61.4a.569.569,0,0,1,.569.569Z" transform="translate(-291.487 1358)" fill="#fff" />
                            <Path id="패스_18" data-name="패스 18" d="M53.138,140.166l-6.707,11.671,4.053-.008c-.907,3.13-3.01,4.256-7.386,4.256a2.5,2.5,0,1,0,0,5c7.265,0,11.277-2.961,12.517-9.268l4.279-.008Z" transform="translate(-292.247 1359.737)" fill="#fff" />
                        </G>
                    </Svg>
                </TouchableOpacity>
            </View>
            <View style={styles.sideBarBottom}>
                <TouchableOpacity onPress={onClickCamera} style={{ width: 50, height: 50 }}>
                    <Svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 80 80" style={{ pointerEvents: 'none' }}>
                        <G id="그룹_18" data-name="그룹 18" transform="translate(294 -2176.779)">
                            <Path id="패스_9" data-name="패스 9" d="M66.44,898.779H13.561A13.561,13.561,0,0,1,0,885.219v-52.88a13.56,13.56,0,0,1,13.561-13.56H66.44A13.56,13.56,0,0,1,80,832.339v52.88a13.56,13.56,0,0,1-13.56,13.56" transform="translate(-294 1358)" fill={!isRecBtnVisible ? '#dddddd' : (!isRecord ? '#49494a' : '#009630')} />
                            <Path id="패스_10" data-name="패스 10" d="M58.914,833.222H33.074a7.759,7.759,0,0,0-7.742,7.758v.294l-5.259-3.043a4.486,4.486,0,0,0-6.728,3.893v9.629a4.475,4.475,0,0,0,6.728,3.893l5.259-3.043v.294a7.759,7.759,0,0,0,7.742,7.758H43.9v9.189L33.66,880.1H29.507a2.1,2.1,0,0,0,0,4.207H35.4l8.5-8.514v6.434a2.1,2.1,0,1,0,4.2,0V875.8l8.5,8.514h4.627a2.1,2.1,0,0,0,0-4.207H58.328L48.093,869.848v-9.189H58.914a7.759,7.759,0,0,0,7.742-7.758V840.98a7.759,7.759,0,0,0-7.742-7.758m-25.84,4.207h25.84a3.552,3.552,0,0,1,3.544,3.552v8.964H29.53V840.98a3.552,3.552,0,0,1,3.544-3.552M24.733,848.1,17.975,852a.263.263,0,0,1-.29,0,.268.268,0,0,1-.143-.249v-9.629a.268.268,0,0,1,.143-.249.265.265,0,0,1,.289,0l6.759,3.91a2.05,2.05,0,0,0,.6.223v1.863a2.052,2.052,0,0,0-.6.223m34.181,8.357H33.074A3.552,3.552,0,0,1,29.53,852.9v-.853H62.458v.853a3.552,3.552,0,0,1-3.544,3.552" transform="translate(-294 1358)" fill="#fff" />
                        </G>
                    </Svg>
                </TouchableOpacity>
                <TouchableOpacity onPress={onClickVoice} style={{ width: 50, height: 50 }}>
                    <Svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 80 80" style={{ pointerEvents: 'none' }}>
                        <G id="그룹_19" data-name="그룹 19" transform="translate(294 -2272.799)">
                            <Path id="패스_6" data-name="패스 6" d="M66.44,994.8H13.561A13.561,13.561,0,0,1,0,981.239v-52.88A13.56,13.56,0,0,1,13.561,914.8H66.44A13.56,13.56,0,0,1,80,928.359v52.88A13.56,13.56,0,0,1,66.44,994.8" transform="translate(-294 1358)" fill={recording ? '#009630' : '#49494a'} />
                            <Path id="패스_7" data-name="패스 7" d="M38.743,967.432a13.905,13.905,0,0,0,13.89-13.89V939.653a13.889,13.889,0,1,0-27.779,0v13.889a13.9,13.9,0,0,0,13.889,13.89M28.326,939.653a10.417,10.417,0,1,1,20.835,0v1.736H28.326Zm0,3.472H49.161v6.945H28.326Zm0,8.681H49.161v1.736a10.417,10.417,0,1,1-20.835,0Z" transform="translate(-292.743 1358)" fill="#fff" />
                            <Path id="패스_8" data-name="패스 8" d="M60.25,946.6a1.79,1.79,0,0,0-1.841,1.736v5.209c0,9.574-8.259,17.363-18.41,17.363S21.59,963.117,21.59,953.543v-5.209a1.844,1.844,0,0,0-3.682,0v5.209c0,10.9,8.928,19.877,20.251,20.762v3.545H30.795a1.739,1.739,0,1,0,0,3.473h18.41a1.739,1.739,0,1,0,0-3.473H41.84V974.3c11.323-.885,20.251-9.858,20.251-20.762v-5.209A1.79,1.79,0,0,0,60.25,946.6" transform="translate(-294 1360.513)" fill="#fff" />
                        </G>
                    </Svg>
                </TouchableOpacity>
            </View>
        </View >
    )
};
export default SideBar;