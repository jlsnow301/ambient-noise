import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Font from "expo-font";
// import { AppLoading } from "expo";

import Header from "./components/Header";
import BodyText from "./components/BodyText";
import LoginScreen from "./screens/LoginScreen";

export default function App() {
  // State here
  const [dataLoaded, setDataLoaded] = useState(false);

  // Logic here
  let content = <LoginScreen />;

  // Return
  return (
    <View style={styles.screen}>
      <Header title="Ambient Noise" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
