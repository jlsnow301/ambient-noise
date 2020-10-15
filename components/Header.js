import React from "react";
import { View, StyleSheet } from "react-native";

import Colors from "../constants/colors";
import TitleText from "../components/TitleText";

const Header = (props) => {
  return (
    <View style={styles.header}>
      <TitleText>{props.title}</TitleText>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    paddingTop: 3,
    height: "3%",
    backgroundColor: Colors.primary,
    alignItems: "center",
  },
});

export default Header;
