import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screen/HomeScreen";
import ExploreScreen from "../screen/ExploreScreen";
import AddPostScreen from "../screen/AddPostScreen";
import ProfileScreen from "../screen/ProfileScreen";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from "react-native";
import { Platform } from "react-native";



const Tab = createBottomTabNavigator();

export default function TabNavigation() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: 'blue', // Change active color here
                tabBarInactiveTintColor: 'gray', // Change inactive color here
            }}
        >
            <Tab.Screen
                name="home"
                component={HomeScreen}
                options={{
                    tabBarLabel: ({ color }) => (
                        <Text
                            style={{
                                color: color,
                                fontSize: 12,
                                marginBottom: 3,
                                paddingTop: 5,
                            }}
                        >
                            Home
                        </Text>
                    ),
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="home" size={24} color={color}  style={StyleSheet.icon} />
                    ),
                }}
            />
            <Tab.Screen
                name="explore"
                component={ExploreScreen}
                options={{
                    tabBarLabel: ({ color }) => (
                        <Text
                            style={{
                                color: color,
                                fontSize: 12,
                                marginBottom: 3,
                                paddingTop: 5,
                            }}
                        >
                            Explore
                        </Text>
                    ),
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="explore" size={24} color={color} style={StyleSheet.icon} />
                    ),
                }}
            />
            <Tab.Screen
                name="addpost"
                component={AddPostScreen}
                options={{
                    tabBarLabel: ({ color }) => (
                        <Text
                            style={{
                                color: color,
                                fontSize: 12,
                                marginBottom: 3,
                                paddingTop: 5,
                            }}
                        >
                            Add Post
                        </Text>
                    ),
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="post-add" size={24} color={color} style={StyleSheet.icon} />
                    ),
                }}
            />
            <Tab.Screen
                name="profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: ({ color }) => (
                        <Text
                            style={{
                                color: color,
                                fontSize: 12,
                                marginBottom: 3,
                                paddingTop: 5,
                            }}
                        >
                            Profile
                        </Text>
                    ),
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person-circle" size={24} color={color} style={StyleSheet.icon} />),
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    icon: {
        padding: Platform.OS === 'ios' ? 5 : 0, // Adjust padding based on platform
    },
});
