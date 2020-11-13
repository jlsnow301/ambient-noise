import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import MoreScreen from "../screens/MoreScreen";
import LoginScreen from "../screens/LoginScreen";
import SavedScreen from "../screens/SavedScreen";
import RecentScreen from "../screens/RecentlyScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SignupScreen from "../screens/SignupScreen"

import Colors from "../constants/colors";
import DetailsScreen from "../screens/DetailsScreen";

const HomeStack = createStackNavigator();
const MoreStack = createStackNavigator();
const LoginStack = createStackNavigator();
const SavedStack = createStackNavigator();
const RecentStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const defaultStyling = (route) => {
  return {
    headerTintColor: Colors.primary,
    headerTitleStyle: {
      fontSize: 28,
    },
    // Wow it's kinda dumb to do this
    title: route.name.split("Stack"),
  };
};

export const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeStack"
        component={HomeScreen}
        options={({ route }) => defaultStyling(route)}
      />
      <HomeStack.Screen
        name="DetailsStack"
        component={DetailsScreen}
        options={({ route }) => defaultStyling(route)}
      />
    </HomeStack.Navigator>
  );
};
export const MoreStackNavigator = () => {
  return (
    <MoreStack.Navigator>
      <MoreStack.Screen
        name="MoreStack"
        component={MoreScreen}
        options={({ route }) => defaultStyling(route)}
      />
    </MoreStack.Navigator>
  );
};
export const LoginStackNavigator = () => {
  return (
    <LoginStack.Navigator>
      <LoginStack.Screen
        name="LoginStack"
        component={LoginScreen}
        options={({ route }) => defaultStyling(route)}
      />
        <LoginStack.Screen
        name="SignupStack"
        component={SignupScreen}
        options={defaultStyling}
      />
    </LoginStack.Navigator>
  );
};
export const SavedStackNavigator = () => {
  return (
    <SavedStack.Navigator>
      <SavedStack.Screen
        name="SavedStack"
        component={SavedScreen}
        options={({ route }) => defaultStyling(route)}
      />
      <SavedStack.Screen
        name="DetailsStack"
        component={DetailsScreen}
        options={({ route }) => defaultStyling(route)}
      />
    </SavedStack.Navigator>
  );
};
export const RecentStackNavigator = () => {
  return (
    <RecentStack.Navigator>
      <RecentStack.Screen
        name="RecentStack"
        component={RecentScreen}
        options={({ route }) => defaultStyling(route)}
      />
      <RecentStack.Screen
        name="DetailsStack"
        component={DetailsScreen}
        options={({ route }) => defaultStyling(route)}
      />
    </RecentStack.Navigator>
  );
};
export const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="ProfileStack"
        component={ProfileScreen}
        options={({ route }) => defaultStyling(route)}
      />
    </ProfileStack.Navigator>
  );
};
