import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import Colors from "../constants/colors";

/* A large, themed blue button. 
    Usage: 
   <MainButton onPress={onPressHandler}>Title</MainButton>
   Where onPressHandler: You must create this function and pass it in.
   You can also override the styling by passing in style parameters.
   <MainButton onPress={onPressHandler} style={{backgroundColor: "white"}}>Title</MainButton>
   */

const MainButton = (props) => {
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
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});

export default MainButton;
