import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Foundation, Entypo, Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import MoreScreen from "../screens/MoreScreen";
import LoginScreen from "../screens/LoginScreen";
import SavedScreen from "../screens/SavedScreen";
import ProfileScreen from "../screens/ProfileScreen";
import RecentlyAddedScreen from "../screens/RecentlyAddedScreen";

import Colors from "../constants/colors";

/* Bottom navigator component. Note that all linked screens must be
   in function WhateverScreen() {} format.
   This will not render functional component ie const WhateverScreen = () => {}
   To create new links, add a <Tab.Screen/>
   */

const Tab = createBottomTabNavigator();

function NavBar() {
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ color, size }) => (
            <Foundation name="magnifying-glass" size={size} color={color} />
          ),
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="Recent"
        options={{
          tabBarLabel: "Recently Added",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="new" size={size} color={color} />
          ),
        }}
        component={RecentlyAddedScreen}
      />
      <Tab.Screen
        name="Saved"
        options={{
          tabBarLabel: "Saved Places",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="heart" size={size} color={color} />
          ),
        }}
        component={SavedScreen}
      />
      {userIsLoggedIn ? (
        <Tab.Screen
          name="Profile"
          options={{
            tabBarLabel: "Profile Management",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="md-person" size={size} color={color} />
            ),
          }}
          component={ProfileScreen}
        />
      ) : (
        <Tab.Screen
          name="Login"
          options={{
            tabBarLabel: "Login",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="md-person" size={size} color={color} />
            ),
          }}
          component={LoginScreen}
        />
      )}
      <Tab.Screen
        name="More"
        options={{
          tabBarLabel: "Other Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-more" size={size} color={color} />
          ),
        }}
        component={MoreScreen}
      />
    </Tab.Navigator>
  );
}

export default NavBar;

const styles = StyleSheet.create({});
