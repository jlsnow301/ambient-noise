import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

/* An icon that serves as a button. Easy to link your onPress events to.
  Usage: <IconButton onPress={somethingHandler} icon={<FontAwesome name="test"/>} text="Lower Label"/>
*/
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
