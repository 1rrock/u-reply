
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; const Stack = createNativeStackNavigator();

import HomeScreen from './pages/Home';
import ListScreen from './pages/List';
// import VoiceScreen from './pages/Voice';
// import CameraScreen from './pages/Camera';
import RegisterScreen from './pages/Register';

const Index = () => {
    return (
        <NavigationContainer>
            <StatusBar hidden={true} />
            <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false, detachPreviousScreen: false }}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="List" component={ListScreen} />
                {/* <Stack.Screen name="Voice" component={VoiceScreen} />
                        <Stack.Screen name="Record" component={CameraScreen} /> */}
                <Stack.Screen name="Register" component={RegisterScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Index;