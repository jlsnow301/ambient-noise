import React from "react";
import { TextInput, StyleSheet } from "react-native";

/* Text input prop. Allows for the creation of a simple form.
   Usage: <Input ANY VALUES style={styles.override}/>
   This allows you to change optional paramaters, ie:
   Different styling: <Input style={{borderWidth: 5}}/>
   Different options: <Input autocorrect={false}/> */

const Input = (props) => {
  return <TextInput {...props} style={{ ...styles.input, ...props.style }} />;
};

const styles = StyleSheet.create({
  input: {
    height: 30,
    borderColor: "grey",
    borderWidth: 1,
    marginVertical: 10,
  },
});

export default Input;
