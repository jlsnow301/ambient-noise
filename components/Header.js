import React from "react";
import { View, StyleSheet, Text } from "react-native";

import Colors from "../constants/colors";
import AccentButton from "../components/AccentButton";
import TitleText from "../components/TitleText";

const Header = (props) => {
  return (
    <View style={styles.header}>
      <View style={styles.items}>
        <TitleText>{props.children}</TitleText>
        <View style={{ flex: 1 }} />
        <View style={styles.buttonContainer}>
          <AccentButton>Sharing</AccentButton>
          <AccentButton>Map</AccentButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    elevation: 8,
    backgroundColor: Colors.primary,
  },
  items: {
    margin: 10,
    marginTop: 25,
    flexDirection: "row",
  },
  buttonContainer: {
    width: "40%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 5,
  },
});

export default Header;
