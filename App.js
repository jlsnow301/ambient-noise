import React, { useState } from "react";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { StyleSheet, View, Text, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { useAuth } from "./hooks/auth-hook";
import TabNavigator from "./navigation/TabNavigator";
import { AuthContext } from "./functions/auth-context";
import * as firebase from 'firebase';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';



const firebaseConfig = {
  apiKey: "AIzaSyAglebuHHSx-5hZmFUAzXQ1Jr-4x-sVcYQ",
  authDomain: "ambient-noise-app.firebaseapp.com",
  databaseURL: "https://ambient-noise-app.firebaseio.com",
  projectId: "ambient-noise-app",
  storageBucket: "ambient-noise-app.appspot.com",
  messagingSenderId: "132685312648",
  appId: "1:132685312648:web:e6e52982dc854bf0d2653d"
};
// Initialize Firebase
if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}




const fetchFonts = () => {
  Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const { token, login, logout, userId, name, image } = useAuth();

  if (!fontsLoaded) {
    return (
      <View style={styles.screen}>
        <View style={styles.imageContainer}>
          <Image
            source={require("./assets/logo.png")}
            style={styles.image}
            resizeMode="cover"
          />
          <Text>Loading...</Text>
          <AppLoading
            startAsync={fetchFonts}
            onFinish={() => setFontsLoaded(true)}
          />
        </View>
      </View>
    );
  }

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
