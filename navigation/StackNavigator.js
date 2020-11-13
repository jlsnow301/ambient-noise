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

const HomeStack = createStackNavigator();
const MoreStack = createStackNavigator();
const LoginStack = createStackNavigator();
const SavedStack = createStackNavigator();
const RecentStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const defaultStyling = {
  headerTintColor: Colors.primary,
  headerTitleStyle: {
    fontSize: 28,
  },
};

export const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={defaultStyling}
      />
    </HomeStack.Navigator>
  );
};
export const MoreStackNavigator = () => {
  return (
    <MoreStack.Navigator>
      <MoreStack.Screen
        name="More"
        component={MoreScreen}
        options={defaultStyling}
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
        options={defaultStyling}
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
        name="Saved Places"
        component={SavedScreen}
        options={defaultStyling}
      />
    </SavedStack.Navigator>
  );
};
export const RecentStackNavigator = () => {
  return (
    <RecentStack.Navigator>
      <RecentStack.Screen
        name="Recently Added"
        component={RecentScreen}
        options={defaultStyling}
      />
    </RecentStack.Navigator>
  );
};
export const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={defaultStyling}
      />
    </ProfileStack.Navigator>
  );
};
