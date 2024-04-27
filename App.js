import { StatusBar, Image } from 'react-native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import LoginPageScreen from './apps/screen/LoginPageScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <LoginPageScreen/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
