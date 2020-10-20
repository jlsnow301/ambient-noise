import React from "react";
import { View, StyleSheet, Text } from "react-native";

import Colors from "../constants/colors";
import AccentButton from "../components/AccentButton";
import TitleText from "../components/TitleText";

/* Header prop. Creates a styled header that accepts a title.
   Usage: <Header style={styles.override}>Text</Header>
   Where styles.override: You can insert override styles, ie:
   <Header style={{backgroundColor: "red"}}>Title</Header> */

const Header = (props) => {
  return (
    <View style={{ ...styles.header, ...props.style }}>
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
