import { StyleSheet, Dimensions } from "react-native";
import colors from "./Colors";
export default recordStyles = StyleSheet.create({
    controller: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 30
    },
    range: {
        width: '80%',
        height: 13,
        backgroundColor: '#545251',
        borderRadius: 15,
        borderWidth: 3,
        borderColor: '#545251',
    },
    btnWrap: {
        position: 'relative',
        height: 68,
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
    },
    dot: {
        width: 34,
        height: 34,
        borderWidth: 6,
        borderColor: '#545251',
        backgroundColor: '#fff',
        borderRadius: 100,
        position: 'absolute',
        left: 0,
        top: -13
    },
    title: {
        fontSize: 48,
        // fontFamily: 'NanumGothic-Regular',
        color: colors.fontColor,
        marginLeft: 8.42,
        marginTop: -12
    },
    subTitle: {
        fontSize: 24,
        // fontFamily: 'NanumGothic-Regular',
        marginTop: 2,
        marginLeft: 7.93
    },
    recordText: {
        fontSize: 24,
        color: colors.white,
    }
})