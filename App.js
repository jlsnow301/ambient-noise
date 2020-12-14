import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { useAuth } from "./hooks/auth-hook";
import TabNavigator from "./navigation/TabNavigator";
import { AuthContext } from "./functions/auth-context";
import firebase from './database/firebase';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import keys from "./constants/api-keys";



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
      }}>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({});

export default App;
