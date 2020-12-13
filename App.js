import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { useAuth } from "./hooks/auth-hook";
import TabNavigator from "./navigation/TabNavigator";
import { AuthContext } from "./functions/auth-context";

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
