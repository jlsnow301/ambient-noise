import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Card from "../components/Card";
import MainButton from "../components/MainButton";
import BodyText from "../components/BodyText";
import DefaultStyles from "../constants/default-styles";

const LoginScreen = () => {
  return (
    <View style={styles.screen}>
      <Text></Text>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
});
