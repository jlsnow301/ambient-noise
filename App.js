import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Font from "expo-font";
// import { AppLoading } from "expo";
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
enableScreens();

import Header from "./components/Header";
import BodyText from "./components/BodyText";
import LoginScreen from "./screens/LoginScreen";
import NewScreen from "./screens/NewScreen"
import HomeScreen from "./screens/HomeScreen"

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name = "Home" component = {HomeScreen} />
        <Stack.Screen name = "Login" component = {LoginScreen} />
        <Stack.Screen name = "Newest" component = {NewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default App;