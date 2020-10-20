import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import Colors from "../constants/colors";

/* A large, themed black button. Used here, it's a link. However,
   you do not have to use it for this. Usage:
   <LinkButton onPress={onPressHandler}>Title</LinkButton>
   Where onPressHandler: You must create this function and pass it in.
   You can also override the styling by passing in style parameters.
   <LinkButton onPress={onPressHandler} style={{backgroundColor: "white"}}>Title</LinkButton>
   */

const LinkButton = (props) => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
      <View style={...styles.button, props.style}>
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
