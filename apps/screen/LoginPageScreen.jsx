import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from '../../hooks/useWarmUpBrowser'; // Assuming this hook is defined elsewhere
import { useOAuth } from "@clerk/clerk-expo";


const LoginPageScreen = () => {
  // Warm up the android browser to improve UX
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
        // Handle successful authentication (e.g., navigate to a different screen)
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <View style={styles.container}>
    <Image
      source={require('../../assets/images/female_shopping_from_phone.jpg')}
      className='w-[450px] h-[400px]'
      style={styles.image}
    />
    <View className="flex p-[50px]  mt-[-20px]  bg-white h-[500px]" style={styles.content}>
      <Text className="text-[30px] font-bold" style={styles.title}>Community Marketplace</Text>
      <Text className="text-[18px] text-slate-500 mt-7" style={styles.description}>
        Sell what you don't need, make real money!
      </Text>
      <TouchableOpacity onPress={onPress} className="p-4 bg-blue-500 rounded-full mt-20 w-[300px]" style={styles.button}>
        <Text className="text-white text-center text-[18px]" style={styles.buttonText}>
          Get Started
        </Text>
      </TouchableOpacity>
    </View>
  </View>
  
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1, // Makes the view occupy the entire screen
  },
  image: {
    resizeMode: 'cover', // Ensures image fills the width while maintaining aspect ratio
  },
  content: {
    paddingHorizontal: 40, // Adjust padding for content area
    paddingBottom: 40, // Adjust padding for bottom elements
    borderRadius: 30,
  },
  title: {
    color: '#333', // Darker text color for better contrast
  },
  description: {
    lineHeight: 24,
  },
  button: {
    alignSelf: 'center', // Centers the button horizontally
  },
  buttonText: {
    fontWeight: 'bold', // Bold text for button
  },
});

export default LoginPageScreen;
