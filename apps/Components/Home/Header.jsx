import { View, Text, Image, TextInput, Platform } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { styled } from "nativewind";
import { StyleSheet } from "react-native";

export default function Header() {
  const { user } = useUser(); // Corrected usage: invoke the useUser hook

  return (
    <View>
      {/* User Info Section */}
      <View  className={`
        ios:mt-10
        android:mt-2
        web:tmt-2
      `}>
      <View className="flex flex-row items-center gap-2">
        <Image
          source={{ uri: user?.imageUrl }}
          className="rounded-full w-12 h-12"
        />
        <View className="text-[16px]">
          <Text>Welcome</Text>
          <Text className="text-[20px] font-bold"> {user?.fullName}</Text>
        </View>
      </View>
      
      {/* Search Bar */}
      <View className="bg-white rounded-full p-3 px-5 mt-5 flex flex-row  items-center border-[2px] border-blue-500">
        <Ionicons name="search" size={24} color="gray"  />
        <TextInput placeholder="Search" className=" ml-3 text-[20px]" onChangeText={(e) => console.log(e)} />
      </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: Platform.OS === 'ios' ? 20 : 0, // Correct way to conditionally apply marginTop based on platform
  },
})