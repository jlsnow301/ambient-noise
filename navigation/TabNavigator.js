import React, { useState } from "react";
import { Text } from "react-native";
import { Foundation, Entypo, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {
  HomeStackNavigator,
  RecentStackNavigator,
  SavedStackNavigator,
  LoginStackNavigator,
  ProfileStackNavigator,
  MoreStackNavigator,
} from "./StackNavigator";

import Colors from "../constants/colors";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);

  return (
    <Tab.Navigator
      // Default look and feel
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          switch (route.name) {
            case "Home":
              return (
                <Foundation name="magnifying-glass" size={size} color={color} />
              );
            case "Recent":
              return <Entypo name="new" size={size} color={color} />;
            case "Saved":
              return <Entypo name="heart" size={size} color={color} />;
            case "Login":
              return <Ionicons name="md-person" size={size} color={color} />;
            case "Profile":
              return <Ionicons name="md-person" size={size} color={color} />;
            case "More":
              return <Ionicons name="ios-more" size={size} color={color} />;
            default:
              return (
                <Ionicons
                  name="ios-information-circle"
                  size={size}
                  color={color}
                />
              );
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: Colors.primary,
        inactiveTintColor: "gray",
      }}
    >
      {/* Tabs at bottom */}
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Recent" component={RecentStackNavigator} />
      <Tab.Screen name="Saved" component={SavedStackNavigator} />
      {userIsLoggedIn ? (
        <Tab.Screen name="Profile" component={ProfileStackNavigator} />
      ) : (
        <Tab.Screen name="Login" component={LoginStackNavigator} />
      )}
      <Tab.Screen name="More" component={MoreStackNavigator} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
