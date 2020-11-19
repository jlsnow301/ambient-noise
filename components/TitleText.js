import React from "react";
import { Text, View, StyleSheet } from "react-native";

import Colors from "../constants/colors";

/* Creates large text in 26pt font. Used on the header.
   Usage: <TitleText style={styles.override}>Text</TitleText>
   Where styles.override, you can place any other style inside, such as
   <TitleText style={{color: "black"}}>Text</TitleText> */

const TitleText = (props) => (
  <View style={{ ...styles.button, ...props.style }}>
    <Text style={styles.text}>{props.children}</Text>
  </View>
);

const styles = StyleSheet.create({
  button: {
    // backgroundColor: Colors.secondary,
    // paddingVertical: 12,
    // paddingHorizontal: 30,
    // borderRadius: 10,
    alignSelf: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    color: Colors.primary,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default TitleText;
