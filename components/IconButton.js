import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const IconButton = (props) => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
      <View style={{ ...styles.button, ...props.style }}>
        {props.icon}
        <Text style={styles.text}>{props.text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    marginTop: 5,
  },
});
