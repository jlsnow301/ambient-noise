import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";
import { Foundation, Entypo, Ionicons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

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

// const Tab = createBottomTabNavigator();
const Tab = createMaterialBottomTabNavigator();

const NavBar = () => {
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      shifting={true}
      activeColor={Colors.accent}
      inactiveColor="#5A5A5A"
      barStyle={{ backgroundColor: Colors.primary }}
    >
      <Tab.Screen
        name="Home"
        options={{
          tabBarLabel: (
            <Text style={{ fontSize: 13, color: "white" }}> Search </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <Foundation name="magnifying-glass" size={25} color={color} />
          ),
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="Recent"
        options={{
          tabBarLabel: (
            <Text style={{ fontSize: 13, color: "white" }}> Recent </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <Entypo name="new" size={25} color={color} />
          ),
        }}
        component={RecentlyAddedScreen}
      />
      <Tab.Screen
        name="Saved"
        options={{
          tabBarLabel: (
            <Text style={{ fontSize: 13, color: "white" }}> Saved </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <Entypo name="heart" size={25} color={color} />
          ),
        }}
        component={SavedScreen}
      />
      {userIsLoggedIn ? (
        <Tab.Screen
          name="Profile"
          options={{
            tabBarLabel: (
              <Text style={{ fontSize: 13, color: "white" }}> Profile </Text>
            ),
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="md-person" size={25} color={color} />
            ),
          }}
          component={ProfileScreen}
        />
      ) : (
        <Tab.Screen
          name="Login"
          options={{
            tabBarLabel: (
              <Text style={{ fontSize: 13, color: "white" }}> Login </Text>
            ),
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="md-person" size={25} color={color} />
            ),
          }}
          component={LoginScreen}
        />
      )}
      <Tab.Screen
        name="More"
        options={{
          tabBarLabel: (
            <Text style={{ fontSize: 13, color: "white" }}> More </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-more" size={25} color={color} />
          ),
        }}
        component={MoreScreen}
      />
    </Tab.Navigator>
  );
};

export default NavBar;

const styles = StyleSheet.create({});
