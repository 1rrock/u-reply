import * as FileSystem from 'expo-file-system';
import { useEffect, useRef, useState } from "react";
import { Button, Text, TouchableOpacity, View, ScrollView, FlatList, Alert } from "react-native";
import { Audio } from 'expo-av';
import * as MediaLibrary from 'expo-media-library';
import { Camera } from 'expo-camera';

import SideBar from "../components/SideBar";

import styles from "../style/StyleSheet";
import containers from "../style/Containers";
import { Path, Svg } from 'react-native-svg';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = ({ navigation, route }) => {
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [_, requestMicrophonePermission] = Camera.useMicrophonePermissions();
    const [list, setList] = useState({});

    const getPermissions = async () => {
        await Audio.requestPermissionsAsync();
        await MediaLibrary.requestPermissionsAsync();

        await requestPermission();
        await requestMicrophonePermission();
    }
    // permission && !permission.granted && (
    //     Alert.alert('권한 요청', '앱을 사용하려면 권한이 필요합니다.', [
    //         {
    //             text: '확인',
    //             onPress: () => {
    //                 getPermissions();
    //             }
    //         }
    //     ])
    // )

    async function ensureDirExists() {
        const dir = FileSystem.documentDirectory + "list";
        const dirInfo = await FileSystem.getInfoAsync(dir);
        if (!dirInfo.exists) {
            // console.log("directory doesn't exist, creating...");
            await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
        } else {
            // console.log("directory alreay exists");
        }
    }

    useEffect(() => {
        const load = async () => {
            const dir = FileSystem.documentDirectory + "list/";

            try {
                const fileList = await FileSystem.readDirectoryAsync(dir);
                // console.log(fileList)
                fileList.map(listFileName => {
                    const key = listFileName.split('.txt')[0];
                    ensureDirExists()
                        .then(() =>
                            FileSystem.readAsStringAsync(dir + listFileName)
                                .then((contents) => {
                                    setList(prev => {
                                        const obj = JSON.parse(JSON.stringify(prev));
                                        obj[key] = JSON.parse(contents);
                                        return obj;
                                    })
                                })
                            // .catch((e) => console.log(e))
                        )
                    // .catch((e) => console.log(e));
                })
            } catch (e) {
                // console.error(e)
            }
        }
        load();
    }, [route]);

    const onClickList = (param) => {
        navigation.navigate('List', param);
    }

    const onListDelete = async (itemData) => {
        Alert.alert('경고', '삭제 하시겠습니까?', [
            {
                text: '확인',
                onPress: () => {
                    ensureDirExists()
                        .then(() => {
                            const fileId = itemData.item.id;
                            const dir = `${FileSystem.documentDirectory}list/${fileId}.txt`;
                            FileSystem.deleteAsync(dir);
                            const newList = JSON.parse(JSON.stringify(list));
                            delete newList[fileId];
                            setList(newList)
                        })
                }
            },
            {
                text: '취소',
                onPress: () => {
                    console.log('삭제 취소')
                }
            }
        ])
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ backgroundColor: '#B7B8B8' }}>
                <View style={containers.home}>
                    {
                        (permission && !permission.granted) && (
                            <View style={styles.permissionContainer}>
                                <View style={styles.permissionModal}>
                                    <Text>앱을 사용하려면 권한이 필요합니다.</Text>
                                    <TouchableOpacity style={styles.permissionBtn} onPress={getPermissions}>
                                        <Text style={styles.perMissionBtnText}>확인</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    }
                    <SideBar navigation={navigation} />
                    <View style={containers.contents}>
                        {
                            Object.keys(list).length ? (
                                <FlatList
                                    data={Object.values(list)}
                                    renderItem={(itemData) => {
                                        return (
                                            <View style={styles.homeWrap}>
                                                <TouchableOpacity onPress={() => onClickList(itemData.item)} style={styles.listTextWrap}>
                                                    <Text style={styles.listTextDot}>▪</Text>
                                                    <Text style={styles.listText} numberOfLines={1} ellipsizeMode='tail'>{itemData.item.title}</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => onListDelete(itemData)} style={styles.listDelete}>
                                                    <Svg width="14" height="14" viewBox="0 0 84 81" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ pointerEvents: 'none' }}>
                                                        <Path d="M8.76782 5.23218L78.7678 75.2322" stroke="#fff" strokeWidth={10} strokeLinecap="round" />
                                                        <Path d="M5.23218 75.2322L75.2322 5.23217" stroke="#fff" strokeWidth={10} strokeLinecap="round" />
                                                    </Svg>
                                                </TouchableOpacity>
                                            </View>
                                        );
                                    }}
                                />
                            ) : (
                                <Text>파일을 등록 해 주세요</Text>
                            )
                        }
                    </View>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
};
export default HomeScreen;