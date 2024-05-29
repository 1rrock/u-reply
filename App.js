import { View } from 'react-native';
import Index from './Index';


export default function App() {
  return (

    <View
      style={{
        display: "flex",
        flexDirection: "row",
        height: "100%",
      }}>
      <Index />
    </View>
  );
}