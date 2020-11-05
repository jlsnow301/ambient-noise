import React, { useState } from "react";
import { AppLoading } from "expo";
import { StyleSheet, View, Text, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import * as Font from "expo-font";

import TabNavigator from "./navigation/TabNavigator";

const fetchFonts = () => {
  Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

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
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
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
