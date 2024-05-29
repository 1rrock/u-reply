import { StyleSheet, Dimensions } from "react-native";

import colors from './Colors';
const styles = StyleSheet.create({
    permissionBtn: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 30,
        backgroundColor: colors.fontColor,
    },
    perMissionBtnText: {
        color: colors.white
    },
    permissionModal: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        height: 200,
        backgroundColor: colors.white,
        gap: 20,
        borderRadius: 15
    },
    permissionContainer: {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        zIndex: 100,
        backgroundColor: 'rgba(0,0,0, 0.2)',
    },
    cameraRecording: {
        position: 'absolute',
        right: 0,
        top: 0,
        width: 300,
        height: 200,
        opacity: 1
    },
    camera: {
        position: 'absolute',
        right: 0,
        top: 0,
        width: 300,
        height: 200,
        opacity: 0
    },
    saveText: {
        textAlign: 'center',
        fontSize: 40,
        color: colors.white
    },
    save: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        height: 95,
        backgroundColor: colors.mainColor,
        borderRadius: 50,
    },
    textInputWrap: {
        display: 'flex',
        gap: 20,
        marginBottom: 40
    },
    textInputTitle: {
        fontSize: 40,
        color: colors.fontColor
    },
    linkFileBtn: {
        position: 'absolute',
        right: 20,
        top: 70,
        width: 39,
        height: 28,
        zIndex: 100
    },
    pdfTextInput: {
        display: 'flex',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.fontColor,
        height: 65,
        padding: 15,
        flex: 1,
        paddingRight: 80
    },
    textInput: {
        display: 'flex',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.fontColor,
        height: 65,
        padding: 15,
        flex: 1
    },
    bg: {
        width: '40%',
        height: '58%',
        position: 'absolute',
        right: 0,
        top: 0,
    },
    bg2: {
        width: '25%',
        height: '38%',
        position: 'absolute',
        left: 0,
        bottom: 0,
    },
    recordBg: {
        width: '40%',
        height: '58%',
        position: 'absolute',
        right: 0,
        top: 0,
    },
    sideBarTop: {
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        width: '100%',
        paddingTop: 15,
        paddingBottom: 15
    },
    sideBarBottom: {
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        width: '100%',
        paddingBottom: 15,
        paddingTop: 15
    },
    sideBar: {
        display: "flex",
        flexDirection: 'column',
        justifyContent: "space-between",
        alignItems: 'center',
        width: 80,
        height: Dimensions.get('window').height,
        backgroundColor: colors.mainColor,
        // backgroundColor: 'blue',
    },
    sideBarBtn: {
        width: 50,
        height: 50,
        borderRadius: 10,
    },
    sideBarBtnDisabled: {
        width: 50,
        height: 50,
        borderRadius: 10,
    },
    main: {
        display: "flex",
        flexDirection: "row",
        height: "100%",
        backgroundColor: colors.mainColor
    },
    homePage: {
        marginTop: 42,
        marginLeft: 57,
        marginBottom: 52,
    },
    listPage: {
        marginTop: 42,
        marginLeft: 57,
        marginBottom: 52
    },
    discriptPage: {
        marginTop: 42,
        marginLeft: 57,
        marginRight: 57,
        height: Dimensions.get('window').height - 40,
    },
    discriptMediaPage: {
        marginLeft: 57,
        marginBottom: 52,
        display: 'flex',
        flexDirection: 'row',
        gap: 28,
        height: '100%',
        width: Dimensions.get('window').width - 80,
    },
    ul: {
        display: 'flex',
        gap: 10,
    },
    li: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 22
    },
    liDot: {
        width: 22,
        height: 22,
        borderRadius: 50,
        backgroundColor: '#D9D9D9',
    },
    liDot2: {
        width: 25,
        height: 25,
        borderRadius: 50,
        backgroundColor: '#D9D9D9',
        marginBottom: 15
    },
    list: {
        marginTop: 40,
        marginLeft: 40,
        marginBottom: 100
    },
    listTitleWrap: {
        display: 'flex',
        flexDirection: 'row',
    },
    listLine: {
        width: 9,
        height: 86,
        backgroundColor: colors.mainColor
    },
    listTextWrap: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    homeWrap: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
        // justifyContent: 'flex-start',
    },
    listDelete: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.fontColor,
        width: 26,
        height: 26,
        borderRadius: 100
    },
    listText: {
        fontSize: 40,
        color: colors.fontColor,
        overflow: 'scroll',
        maxWidth: Dimensions.get('window').width - 230,
    },
    listTextDot: {
        fontSize: 40,
        color: colors.fontColor,
    },
    listScript: {
        fontSize: 18,
        // fontFamily: 'NanumGothic-Regular',
        color: colors.fontColor
    },
    title: {
        fontSize: 48,
        // fontFamily: 'NanumGothic-Regular',
        color: colors.fontColor,
        marginLeft: 8.42,
        marginTop: -10

    },
    subTitle: {
        fontSize: 24,
        // fontFamily: 'NanumGothic-Regular',
        marginTop: 2,
        marginLeft: 7.93
    },
    text: {
        // fontFamily: 'NanumGothic-Regular',
        color: colors.fontColor,
    },
    discriptTextScroll: {
        marginLeft: 20,
        marginBottom: 40,
        marginTop: 40,
    },
    discriptTextWrap: {
        display: 'flex'
    },
    discriptMediaLeft: {
        marginTop: 42,
        flex: .45,
    },
    discriptMediaRight: {
        flex: .55,
    },
    discriptMediaScroll: {
        marginTop: -10,
    },
    image: {
        maxWidth: '80%',
        maxHeight: 280,
        minHeight: 180,
        marginTop: 10,
        marginBottom: 10
    },

    recordContainer: {
        display: 'flex',
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
        hegiht: '100%',
        flex: 1,
        backgroundColor: colors.white,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        gap: 40
    },
    recordingLeft: {
        flex: .5,
        display: 'flex',
        alignItems: "center",
        justifyContent: "center",
        gap: 50
    },
    recordLeft: {
        flex: .5,
        display: 'flex',
        alignItems: "center",
        justifyContent: "space-around",
    },
    recordRight: {
        flex: .5,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        backgroundColor: '#fff'
    },
    recordIconWrap: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: colors.white,
        elevation: 50,
    },
    recordIconCircle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        height: '90%',
        borderRadius: 100,
    },
    recTitleWrap: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: 40,
        marginTop: 30
    },
    recTitle: {
        fontSize: 40,
        // fontFamily: 'NanumGothic-Regular',
        color: colors.fontColor,
        marginLeft: 8.42,
    },
    recLine: {
        width: 10,
        height: 42,
        backgroundColor: colors.mainColor
    },
    recScroll: {
        marginTop: 20,
        marginRight: 40,
        marginBottom: 40,
        height: Dimensions.get('window').height - 120

    },
    recStt: {
        fontSize: 16,
    },
    listContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        backgroundColor: '#000'
    },
    pdfViewer: {
        flex: 1,
        backgroundColor: 'black'
    },
    pdfBtnWrap: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        width: 220,
        paddingRight: 20,
        paddingBottom: 20,
        gap: 10
    },
    pdfBtn: {
        width: 80,
        height: 80,
    },
    pdf: {
        height: '100%',
        width: '100%'
    }
})

export default styles;
