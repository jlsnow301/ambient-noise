import React, { useState } from "react";
import * as Font from "expo-font";
import { StyleSheet, View, Text, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import * as firebase from "firebase";
import Keys from "./constants/api-keys";
import { useAuth } from "./hooks/auth-hook";c
import TabNavigator from "./navigation/TabNavigator";
import { AuthContext } from "./functions/auth-context";

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(Keys.FIREBASE_CONFIG);
}

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
      }}
    >
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: "black",
    overflow: "hidden",
    marginVertical: 30,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default App;
