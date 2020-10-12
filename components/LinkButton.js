import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import Colors from "../constants/colors";

const LinkButton = (props) => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.dark,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 2,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});

export default LinkButton;
