import React from "react";
import { Text, StyleSheet } from "react-native";

/* Creates large text in 26pt font. Used on the header.
   Usage: <TitleText style={styles.override}>Text</TitleText>
   Where styles.override, you can place any other style inside, such as
   <TitleText style={{color: "black"}}>Text</TitleText> */

const TitleText = (props) => (
  <Text style={{ ...styles.title, ...props.style }}>{props.children}</Text>
);

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    color: "white",
  },
});

export default TitleText;
