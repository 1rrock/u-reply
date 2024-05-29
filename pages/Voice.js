import * as FileSystem from 'expo-file-system';
import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Alert } from "react-native";
import Svg, { Path, G, RadialGradient, Stop, Defs, ClipPath, Rect } from "react-native-svg"
import { Audio } from 'expo-av';
import * as MediaLibrary from 'expo-media-library';

import SideBar from "../components/SideBar";

import containers from "../style/Containers";
import recordStyles from "../style/StyleRecord"
import styles from "../style/StyleSheet";

const RecordScreen = ({ navigation, route }) => {
    const [recording, setRecording] = useState(false);

    async function startRecording() {
        try {
            await Audio.requestPermissionsAsync();
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

    const save = async (uri) => {
        try {
            // Request device storage access permission
            const { status } = await MediaLibrary.requestPermissionsAsync();
            if (status === "granted") {
                // Save image to media library
                await MediaLibrary.saveToLibraryAsync(uri);

                console.log("voice successfully saved");
                Alert.alert(`${uri.split('/').pop()}으로 저장되었습니다.`)
            }
        } catch (error) {
            console.log(error);
        }
    };

    async function stopRecording() {
        console.log('Stopping recording..');
        setRecording(false);
        await recording.stopAndUnloadAsync();
        await Audio.setAudioModeAsync(
            {
                allowsRecordingIOS: false,
            }
        );
        const uri = recording.getURI();
        console.log('Recording stopped and stored at', uri);

        const timestamp = () => {
            const date = new Date();
            date.setHours(date.getHours() + 9);
            return date.toISOString().replace('T', ' ').substring(0, 19);
        }
        const splitedUri = uri.split('/');
        splitedUri.pop();
        splitedUri.push(`${timestamp().replace(' ', '-')}.m4a`);
        const newUri = splitedUri.join('/');
        await FileSystem.moveAsync({
            from: uri,
            to: newUri
        })
        save(newUri)

    }

    return (
        <View style={containers.home}>
            <SideBar navigation={navigation} />
            <View style={styles.recordContainer}>
                <View style={styles.recordIconWrap}>
                    <View style={styles.recordIconCircle}>
                        {
                            recording ?
                                (
                                    <Svg xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" width="360" height="360" viewBox="0 0 529.429 529.43">
                                        <G id="그룹_53" data-name="그룹 53" transform="translate(-760.91 -38.307)">
                                            <G id="그룹_55" data-name="그룹 55" transform="translate(923.947 232)">
                                                <G id="그룹_54" data-name="그룹 54" clip-path="url(#clip-path-3)">
                                                    <Path id="패스_53" data-name="패스 53" d="M101.677,119.2a5.5,5.5,0,0,1-5.5-5.5V5.5a5.5,5.5,0,0,1,11,0V113.7a5.5,5.5,0,0,1-5.5,5.5" fill="#504f4f" />
                                                    <Path id="패스_54" data-name="패스 54" d="M69.618,100.24a5.5,5.5,0,0,1-5.5-5.5V59.677a5.5,5.5,0,0,1,11,0V94.74a5.5,5.5,0,0,1-5.5,5.5" fill="#504f4f" />
                                                    <Path id="패스_55" data-name="패스 55" d="M37.559,94.01a5.5,5.5,0,0,1-5.5-5.5V30.689a5.5,5.5,0,1,1,11,0V88.51a5.5,5.5,0,0,1-5.5,5.5" fill="#504f4f" />
                                                    <Path id="패스_56" data-name="패스 56" d="M5.5,99.688a5.5,5.5,0,0,1-5.5-5.5V62.761a5.5,5.5,0,0,1,11,0V94.188a5.5,5.5,0,0,1-5.5,5.5" fill="#504f4f" />
                                                    <Path id="패스_57" data-name="패스 57" d="M133.736,90.409a5.5,5.5,0,0,1-5.5-5.5V49.846a5.5,5.5,0,0,1,11,0V84.909a5.5,5.5,0,0,1-5.5,5.5" fill="#504f4f" />
                                                    <Path id="패스_58" data-name="패스 58" d="M165.795,119.2a5.5,5.5,0,0,1-5.5-5.5V55.879a5.5,5.5,0,0,1,11,0V113.7a5.5,5.5,0,0,1-5.5,5.5" fill="#504f4f" />
                                                    <Path id="패스_59" data-name="패스 59" d="M197.855,99.688a5.5,5.5,0,0,1-5.5-5.5V62.761a5.5,5.5,0,1,1,11,0V94.188a5.5,5.5,0,0,1-5.5,5.5" fill="#504f4f" />
                                                    <Path id="패스_60" data-name="패스 60" d="M71,173.835a.893.893,0,0,1-1.01-1.01L69.62,150.7a1.991,1.991,0,0,1,.64-1.718,3.177,3.177,0,0,1,1.718-.64,33.364,33.364,0,0,1,7.157.084,15.6,15.6,0,0,1,5.238,1.55,8.1,8.1,0,0,1,3.216,2.93,7.923,7.923,0,0,1,1.1,4.194,7.652,7.652,0,0,1-1.247,4.378,8.58,8.58,0,0,1-3.469,2.93,11.478,11.478,0,0,0,2.24,2.863,12.725,12.725,0,0,0,2.88,1.954,1.218,1.218,0,0,1,.724.808,1.06,1.06,0,0,1-.185.842L87.741,173.6a1.2,1.2,0,0,1-.792.59A1.428,1.428,0,0,1,86.09,174a13.058,13.058,0,0,1-4.21-3.368,15.211,15.211,0,0,1-2.694-4.985,18.634,18.634,0,0,1-3.739.033l-.135,7.141a.893.893,0,0,1-1.01,1.01Zm4.311-12.8a17.9,17.9,0,0,0,3.183.051,7.764,7.764,0,0,0,2.442-.556,3.761,3.761,0,0,0,1.566-1.179,3,3,0,0,0,.556-1.852,3.149,3.149,0,0,0-.539-1.87,3.6,3.6,0,0,0-1.549-1.2,8.054,8.054,0,0,0-2.426-.572,15.253,15.253,0,0,0-3.166.068Z" fill="#504f4f" />
                                                    <Path id="패스_61" data-name="패스 61" d="M98.518,169.019q3.267.067,6.08-.135t5.608-.674q.975-.167,1.111.674l.5,2.8a.889.889,0,0,1-.707,1.178q-2.055.438-3.974.708t-3.857.4q-1.937.135-3.941.185t-4.193.017a2.126,2.126,0,0,1-2.358-2.324L92.388,151a2.136,2.136,0,0,1,.64-1.768,2.512,2.512,0,0,1,1.718-.589l15.8-.068a1.1,1.1,0,0,1,1.179,1.179v2.762a1.1,1.1,0,0,1-1.179,1.179l-12.058.168v5.019l10.711-.2a1.1,1.1,0,0,1,1.179,1.178v2.763a1.1,1.1,0,0,1-1.179,1.178l-10.711.1Z" fill="#504f4f" />
                                                    <Path id="패스_62" data-name="패스 62" d="M135.063,167.806a1.013,1.013,0,0,1,.472.758,1.425,1.425,0,0,1-.27.792,10.092,10.092,0,0,1-3.991,3.62,12.385,12.385,0,0,1-5.574,1.2,12.816,12.816,0,0,1-4.985-.943,11.269,11.269,0,0,1-3.874-2.644,12.172,12.172,0,0,1-2.526-4.059,14.4,14.4,0,0,1-.909-5.22,15.054,15.054,0,0,1,.892-5.271,12.76,12.76,0,0,1,2.493-4.177,11.349,11.349,0,0,1,8.572-3.756,14.4,14.4,0,0,1,3.267.354,11.65,11.65,0,0,1,2.745.994,11.015,11.015,0,0,1,2.206,1.5,10.019,10.019,0,0,1,1.684,1.9,1.129,1.129,0,0,1,.219.708.955.955,0,0,1-.354.674l-3.1,2.425a1.263,1.263,0,0,1-.758.286.84.84,0,0,1-.724-.388,6.811,6.811,0,0,0-1.937-1.65,5.964,5.964,0,0,0-3.014-.673,5.412,5.412,0,0,0-2.392.538,5.959,5.959,0,0,0-1.936,1.5,7.242,7.242,0,0,0-1.314,2.341,9.026,9.026,0,0,0-.488,3.031,8.371,8.371,0,0,0,.5,2.964,6.857,6.857,0,0,0,1.381,2.291,6.18,6.18,0,0,0,4.581,1.987,7.026,7.026,0,0,0,3.031-.606,6.593,6.593,0,0,0,2.257-1.785,1.068,1.068,0,0,1,1.583-.2Z" fill="#504f4f" />
                                                    <Path id="패스_63" data-name="패스 63" d="M140.25,175.957a3.049,3.049,0,1,1,2.172-.893,2.957,2.957,0,0,1-2.172.893" fill="#504f4f" />
                                                    <Path id="패스_64" data-name="패스 64" d="M148.333,175.957a3.049,3.049,0,1,1,2.172-.893,2.957,2.957,0,0,1-2.172.893" fill="#504f4f" />
                                                </G>
                                            </G>
                                        </G>
                                    </Svg>
                                )
                                : (
                                    <Svg width="86" height="120" viewBox="0 0 86 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <G id="Group">
                                            <Path id="Vector" d="M43 79.2876C57.4544 79.2876 69.2087 67.526 69.2087 53.0715V26.3272C69.2087 11.8727 57.4471 0.118408 43 0.118408C28.5529 0.118408 16.7912 11.8801 16.7912 26.3272V53.0715C16.7912 67.526 28.5529 79.2876 43 79.2876ZM23.9377 51.9343V43.5478H62.0696V51.9343H23.9377ZM43 72.1411C34.0632 72.1411 26.5498 65.9631 24.4954 57.65H61.5119C59.4575 65.9631 51.9441 72.1411 43.0073 72.1411H43ZM43 7.26492C53.5143 7.26492 62.0622 15.8202 62.0622 26.3272V37.8247H23.9304V26.3272C23.9304 15.8128 32.4857 7.26492 42.9927 7.26492H43Z" fill="#545251" />
                                            <Path id="Vector_2" d="M85.4902 51.7507C85.4902 49.777 83.8907 48.1775 81.9169 48.1775C79.9432 48.1775 78.3437 49.777 78.3437 51.7507C78.3437 71.2386 62.4878 87.0944 43 87.0944C23.5122 87.0944 7.65634 71.2386 7.65634 51.7507C7.65634 49.777 6.05682 48.1775 4.08309 48.1775C2.10936 48.1775 0.509827 49.777 0.509827 51.7507C0.509827 73.9754 17.6644 92.2599 39.4268 94.0795V111.946H20.3645C18.3908 111.946 16.7912 113.545 16.7912 115.519C16.7912 117.493 18.3908 119.092 20.3645 119.092H65.6428C67.6166 119.092 69.2161 117.493 69.2161 115.519C69.2161 113.545 67.6166 111.946 65.6428 111.946H46.5806V94.0795C68.343 92.2599 85.4975 73.9754 85.4975 51.7507H85.4902Z" fill="#545251" />
                                            <Path id="Vector_3" d="M52.6118 33.1949C55.8861 33.1949 58.5404 30.5406 58.5404 27.2664C58.5404 23.9922 55.8861 21.3379 52.6118 21.3379C49.3376 21.3379 46.6833 23.9922 46.6833 27.2664C46.6833 30.5406 49.3376 33.1949 52.6118 33.1949Z" fill="#545251" />
                                        </G>
                                    </Svg>
                                )

                        }

                    </View>
                </View>
                <View style={recordStyles.controller}>
                    <View style={recordStyles.btnWrap}>
                        {
                            route.params === 'R' ? (
                                <>
                                    {
                                        recording ?
                                            (
                                                <TouchableOpacity onPress={stopRecording} style={{ width: Dimensions.get('window').width / 10, aspectRatio: 1 / 1 }}>
                                                    <Svg width="100%" height="100%" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <G id="Group">
                                                            <Path id="Vector" d="M60.0397 2H11.9603C6.45937 2 2 6.45937 2 11.9603V60.0397C2 65.5406 6.45937 70 11.9603 70H60.0397C65.5406 70 70 65.5406 70 60.0397V11.9603C70 6.45937 65.5406 2 60.0397 2Z" fill="#545251" stroke="#545251" stroke-width="3" stroke-miterlimit="10" />
                                                            <Path id="Vector_2" d="M45.7086 23.0532H26.2915C24.5065 23.0532 23.0534 24.5006 23.0534 26.2913V45.7085C23.0534 47.4934 24.5008 48.9465 26.2915 48.9465H45.7086C47.4935 48.9465 48.9467 47.4991 48.9467 45.7085V26.2913C48.9467 24.5064 47.4993 23.0532 45.7086 23.0532Z" fill="#ffffff" />
                                                        </G>
                                                    </Svg>
                                                </TouchableOpacity>
                                            )
                                            : (
                                                <TouchableOpacity onPress={startRecording} style={{ width: Dimensions.get('window').width / 10, aspectRatio: 1 / 1 }}>
                                                    <Svg width="100%" height="100%" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <G id="Group">
                                                            <Path id="Vector" d="M60.0397 2H11.9603C6.45938 2 2 6.45937 2 11.9603V60.0397C2 65.5406 6.45938 70 11.9603 70H60.0397C65.5406 70 70 65.5406 70 60.0397V11.9603C70 6.45937 65.5406 2 60.0397 2Z" fill="#545251" stroke="#545251" stroke-width="3" stroke-miterlimit="10" />
                                                            <Path id="Vector_2" d="M36 20.187C31.7779 20.187 27.8075 21.8289 24.8211 24.8153C21.8348 27.8017 20.1928 31.7721 20.1928 35.9942C20.1928 40.2163 21.8348 44.1867 24.8211 47.173C27.8075 50.1594 31.7779 51.8013 36 51.8013C40.2221 51.8013 44.1925 50.1594 47.1789 47.173C50.1652 44.1867 51.8129 40.2163 51.8129 35.9942C51.8129 31.7721 50.1652 27.8017 47.1789 24.8153C44.1925 21.8289 40.2221 20.187 36 20.187Z" fill="#ffffff" />
                                                        </G>
                                                    </Svg>
                                                </TouchableOpacity>
                                            )
                                    }

                                </>
                            )
                                : (
                                    <>
                                        <TouchableOpacity style={{ width: Dimensions.get('window').width / 15, aspectRatio: 1 / 1 }}>
                                            <Svg width="100%" height="100%" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <G id="Group">
                                                    <Path id="Vector" d="M60.0397 2H11.9603C6.45937 2 2 6.45937 2 11.9603V60.0397C2 65.5406 6.45937 70 11.9603 70H60.0397C65.5406 70 70 65.5406 70 60.0397V11.9603C70 6.45937 65.5406 2 60.0397 2Z" fill="#545251" stroke="#545251" stroke-width="3" stroke-miterlimit="10" />
                                                    <Path id="Vector_2" d="M28.5798 23.0532C27.9906 23.0532 27.3956 23.2134 26.8807 23.5338C25.9253 24.123 25.3475 25.1642 25.3475 26.2856V45.7027C25.3475 46.824 25.931 47.8652 26.8807 48.4545C27.4013 48.7749 27.9906 48.9351 28.5798 48.9351C29.0718 48.9351 29.5696 48.8207 30.0273 48.5918L49.4444 38.8832C50.5428 38.334 51.2351 37.2127 51.2351 35.9884C51.2351 34.7641 50.5428 33.6428 49.4444 33.0936L30.0273 23.385C29.5696 23.1562 29.0718 23.0417 28.5798 23.0417V23.0532Z" fill="#ffffff" />
                                                </G>
                                            </Svg>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ width: Dimensions.get('window').width / 15, aspectRatio: 1 / 1 }}>
                                            <Svg width="100%" height="100%" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <G id="Group">
                                                    <Path id="Vector" d="M60.0397 2H11.9603C6.45938 2 2 6.45937 2 11.9603V60.0397C2 65.5406 6.45938 70 11.9603 70H60.0397C65.5406 70 70 65.5406 70 60.0397V11.9603C70 6.45937 65.5406 2 60.0397 2Z" fill="#545251" stroke="#545251" stroke-width="3" stroke-miterlimit="10" />
                                                    <Path id="Vector_2" d="M31.143 23.0532H26.2858C24.5009 23.0532 23.0477 24.5006 23.0477 26.2913V45.7085C23.0477 47.4934 24.4951 48.9465 26.2858 48.9465H31.143C32.9279 48.9465 34.3811 47.4991 34.3811 45.7085V26.2913C34.3811 24.5064 32.9336 23.0532 31.143 23.0532ZM45.7087 23.0532H40.8515C39.0666 23.0532 37.6134 24.5006 37.6134 26.2913V45.7085C37.6134 47.4934 39.0609 48.9465 40.8515 48.9465H45.7087C47.4936 48.9465 48.9468 47.4991 48.9468 45.7085V26.2913C48.9468 24.5064 47.4994 23.0532 45.7087 23.0532Z" fill="#ffffff" />
                                                </G>
                                            </Svg>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ width: Dimensions.get('window').width / 15, aspectRatio: 1 / 1 }}>
                                            <Svg width="100%" height="100%" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <G id="Group">
                                                    <Path id="Vector" d="M60.0397 2H11.9603C6.45937 2 2 6.45937 2 11.9603V60.0397C2 65.5406 6.45937 70 11.9603 70H60.0397C65.5406 70 70 65.5406 70 60.0397V11.9603C70 6.45937 65.5406 2 60.0397 2Z" fill="#545251" stroke="#545251" stroke-width="3" stroke-miterlimit="10" />
                                                    <Path id="Vector_2" d="M45.7086 23.0532H26.2915C24.5065 23.0532 23.0534 24.5006 23.0534 26.2913V45.7085C23.0534 47.4934 24.5008 48.9465 26.2915 48.9465H45.7086C47.4935 48.9465 48.9467 47.4991 48.9467 45.7085V26.2913C48.9467 24.5064 47.4993 23.0532 45.7086 23.0532Z" fill="#ffffff" />
                                                </G>
                                            </Svg>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ width: Dimensions.get('window').width / 15, aspectRatio: 1 / 1 }}>
                                            <Svg width="100%" height="100%" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <G id="Group">
                                                    <Path id="Vector" d="M60.0397 2H11.9603C6.45938 2 2 6.45937 2 11.9603V60.0397C2 65.5406 6.45938 70 11.9603 70H60.0397C65.5406 70 70 65.5406 70 60.0397V11.9603C70 6.45937 65.5406 2 60.0397 2Z" fill="#545251" stroke="#545251" stroke-width="3" stroke-miterlimit="10" />
                                                    <Path id="Vector_2" d="M36 20.187C31.7779 20.187 27.8075 21.8289 24.8211 24.8153C21.8348 27.8017 20.1928 31.7721 20.1928 35.9942C20.1928 40.2163 21.8348 44.1867 24.8211 47.173C27.8075 50.1594 31.7779 51.8013 36 51.8013C40.2221 51.8013 44.1925 50.1594 47.1789 47.173C50.1652 44.1867 51.8129 40.2163 51.8129 35.9942C51.8129 31.7721 50.1652 27.8017 47.1789 24.8153C44.1925 21.8289 40.2221 20.187 36 20.187Z" fill="#ffffff" />
                                                </G>
                                            </Svg>
                                        </TouchableOpacity>
                                    </>
                                )
                        }

                    </View>
                </View>
            </View >
        </View >
    )
};
export default RecordScreen;