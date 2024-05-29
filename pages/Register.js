import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

import { useEffect, useRef, useState } from "react";
import { Alert, Button, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

import SideBar from "../components/SideBar";

import styles from "../style/StyleSheet";
import containers from "../style/Containers";
import { ClipPath, Defs, G, Path, Rect, Svg } from 'react-native-svg';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const Register = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [youtube, setYoutube] = useState('');
    const [google, setGoogle] = useState('');
    const [pdf, setPdf] = useState('');

    const titleRef = useRef();
    const pdfRef = useRef();
    const youtubeRef = useRef();
    const googleRef = useRef();

    const isContentCheck = (content) => {
        if (content.title.trim() === "") {
            Alert.alert('제목', '제목을 입력해 주세요.', [
                {
                    text: '확인',
                    onPress: () => {
                        titleRef.current.focus()
                    }
                }
            ])
            return false;
        }
        if (content.pdf.trim() === "") {
            Alert.alert('문서 Link', '문서 Link를 입력해 주세요.', [
                {
                    text: '확인',
                    onPress: () => {
                        pdfRef.current.focus()
                    }
                }
            ])
            return false;
        }
        if (content.youtube.trim() === "") {
            Alert.alert('영상 Link', '영상 Link를 입력해 주세요.', [
                {
                    text: '확인',
                    onPress: () => {
                        youtubeRef.current.focus()
                    }
                }
            ])
            return false;
        }
        if (content.google.trim() === "") {
            Alert.alert('설문 Link', '설문 Link를 입력해 주세요.', [
                {
                    text: '확인',
                    onPress: () => {
                        googleRef.current.focus()
                    }
                }
            ])
            return false;
        }

        return true
    }
    const save = async () => {
        const key = new Date().getTime();
        const content = {
            id: key,
            title,
            pdf,
            youtube,
            google
        }

        if (!isContentCheck(content)) return;

        async function ensureDirExists() {
            const dir = FileSystem.documentDirectory + "list/";
            const dirInfo = await FileSystem.getInfoAsync(dir);
            if (!dirInfo.exists) {
                console.log("directory doesn't exist, creating...");
                await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
            } else {
                console.log("directory alreay exists");
            }
        }

        const fileUri = `${FileSystem.documentDirectory}list/${key}.txt`;
        ensureDirExists()
            .then(() =>
                FileSystem.writeAsStringAsync(fileUri, JSON.stringify(content))
                    .then((contents) => {
                        console.log("write Success");
                        navigation.navigate('Home', new Date().getTime());
                    })
                    .catch((e) => console.log(e))
            )
            .catch((e) => console.log(e));
    }

    const onClickAddPdf = async () => {
        try {
            const response = await DocumentPicker.getDocumentAsync({ type: 'application/pdf', copyToCacheDirectory: true });
            setPdf(response.assets[0].uri);
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ backgroundColor: '#B7B8B8' }}>
                <View style={containers.home}>
                    <SideBar navigation={navigation} />
                    <View style={containers.register}>
                        <ScrollView>
                            <View style={styles.textInputWrap}>
                                <View>
                                    <Text style={styles.textInputTitle}>제목</Text>
                                    <TextInput ref={titleRef} style={styles.textInput} onChangeText={setTitle} value={title}></TextInput>
                                </View>
                                <View style={{ position: 'relative' }}>
                                    <Text style={styles.textInputTitle}>문서 Link</Text>
                                    {/* <TextInput style={styles.textInput} onChangeText={setPdf} value={pdf}></TextInput> */}
                                    {/* <View style={styles.textInput} onPress={onClickAddPdf}>
                                <Text numberOfLines={1} ellipsizeMode='middle'>{pdf}</Text>
                            </View> */}
                                    <TextInput ref={pdfRef} style={styles.pdfTextInput} onChangeText={setPdf} value={pdf}></TextInput>
                                    <TouchableOpacity style={styles.linkFileBtn} onPress={onClickAddPdf}>
                                        <Svg xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" width="39.248" height="28.584" viewBox="0 0 39.248 28.584">
                                            <Defs>
                                                <ClipPath id="clip-path">
                                                    <Rect id="사각형_56" data-name="사각형 56" width="39.248" height="28.584" transform="translate(0 0)" fill="none" />
                                                </ClipPath>
                                            </Defs>
                                            <G id="그룹_95" data-name="그룹 95" transform="translate(0 0)">
                                                <G id="그룹_94" data-name="그룹 94" clip-path="url(#clip-path)">
                                                    <Path id="패스_616" data-name="패스 616" d="M14.229,3a3.166,3.166,0,0,1,2.383,1.081l2.066,2.361a3.167,3.167,0,0,0,2.383,1.082H33.082a3.165,3.165,0,0,1,3.166,3.166V22.418a3.165,3.165,0,0,1-3.166,3.166H6.166A3.165,3.165,0,0,1,3,22.418V6.167A3.166,3.166,0,0,1,6.166,3Zm0-3H6.166A6.173,6.173,0,0,0,0,6.167V22.418a6.173,6.173,0,0,0,6.166,6.166H33.082a6.173,6.173,0,0,0,6.166-6.166V10.69a6.173,6.173,0,0,0-6.166-6.166H21.061a.169.169,0,0,1-.126-.057L18.87,2.106A6.165,6.165,0,0,0,14.229,0" fill="#909192" />
                                                </G>
                                            </G>
                                        </Svg>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <Text style={styles.textInputTitle}>영상 Link</Text>
                                    <TextInput ref={youtubeRef} style={styles.textInput} onChangeText={setYoutube} value={youtube}></TextInput>
                                </View>
                                <View>
                                    <Text style={styles.textInputTitle}>설문 Link</Text>
                                    <TextInput ref={googleRef} style={styles.textInput} onChangeText={setGoogle} value={google}></TextInput>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.save} onPress={save}>
                                <Text style={styles.saveText}>저장</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
};

export default Register;