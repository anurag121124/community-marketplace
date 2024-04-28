import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { StatusBar } from 'react-native';
import LoginPageScreen from "./apps/screen/LoginPageScreen";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigation from "./apps/Navigation/TabNavigation";

export default function App() {
  return (
    <ClerkProvider publishableKey='pk_test_Y29udGVudC1nb3BoZXItMy5jbGVyay5hY2NvdW50cy5kZXYk'>
      <View className ="flex-1 bg-white">
      <StatusBar style="auto" />
        <SignedIn>
          <NavigationContainer>
            <TabNavigation/>
          </NavigationContainer>
        </SignedIn>
        <SignedOut>
          <LoginPageScreen/>
        </SignedOut>
      </View>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});