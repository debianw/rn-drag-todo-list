import 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native';
import React from 'react';
import HackScreen from './src/screens/hack/HackScreen';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HackScreen />
    </SafeAreaView>
  );
}
