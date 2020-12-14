<<<<<<< HEAD
/*jshint esversion: 6 */
import React, { useState, Component } from "react";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { StyleSheet, View, Text, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {createStackNavigator} from '@react-navigation/stack';
=======
import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

>>>>>>> master
import { useAuth } from "./hooks/auth-hook";
import TabNavigator from "./navigation/TabNavigator";
import { AuthContext } from "./functions/auth-context";
import firebase from './database/firebase';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import keys from "./constants/api-keys";



<<<<<<< HEAD

const fetchFonts = () => {
  Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

=======
>>>>>>> master
function App() {
  const { token, login, logout, userId, name, image } = useAuth();

  return (
    
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        name: name,
        image: image,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
<<<<<<< HEAD
      }}
    >
      
=======
      }}>
>>>>>>> master
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({});

export default App;
