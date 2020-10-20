import React from "react";
import { Text, StyleSheet } from "react-native";

/* Creates standard text in 16pt font.
   Usage: <BodyText style={styles.override}>Text</BodyText>
   Where styles.override, you can place any other style inside, such as
   <BodyText style={{color: "white"}}>Text</BodyText> */

const BodyText = (props) => (
  <Text style={{ ...styles.body, ...props.style }}>{props.children}</Text>
);

const styles = StyleSheet.create({
  body: {
    fontSize: 16,
  },
});

export default BodyText;
