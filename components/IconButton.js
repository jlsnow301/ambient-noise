import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const IconButton = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
        <View style={{ ...styles.button, ...props.style }}>{props.icon}</View>
        <Text style={{ textAlign: "center" }}>{props.text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  button: {
    width: 60,
    backgroundColor: "white",
    borderRadius: 50,
    alignItems: "center",
    borderColor: "black",
  },
});
