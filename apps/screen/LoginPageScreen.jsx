import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const LoginPageScreen = () => {
  return (
    <View >
      <Image
        source={require('../../assets/images/loginscreenimage.png')}
        className = 'w-[670px] h-[400px]'
      />
     <Text>LoginPageScreen</Text>

    </View>
  );
};

const styles = StyleSheet.create({}); // This stylesheet is no longer needed

export default LoginPageScreen;
