import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import Colors from "../constants/colors";

/* Creates a small rounded button using the accent colors.
 Usage: <AccentButton onPress={onPressHandler}>Text</AccentButton>
 You must make the onPress function outside this component */

const AccentButton = (props) => {
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
    backgroundColor: Colors.accent,
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});

export default AccentButton;
