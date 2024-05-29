import { StyleSheet, Dimensions } from "react-native";
import colors from "./Colors";
const containers = StyleSheet.create({
    home: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: colors.mainColor,
    },
    contents: {
        paddingLeft: 40,
        paddingTop: 40,
        paddingRight: 40,
        paddingBottom: 40,
        flex: 1,
        backgroundColor: colors.white,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
    },
    register: {
        paddingLeft: 40,
        paddingTop: 40,
        paddingRight: 40,
        paddingBottom: 40,
        flex: 1,
        backgroundColor: colors.white,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
    },
    listContainer: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        backgroundColor: colors.white,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
    },
    cameraContainer: {
        flex: 1,
    },
    permissionContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: colors.white,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        gap: 30
    }
});

export default containers;