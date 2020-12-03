import React from "react";
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity, View } from "react-native";

const DeleteButton = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.8} onPress={props.onPress}>
        <View style={styles.button}>
          <MaterialIcons name="delete" size={40} color="#006AFF" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    alignItems: "center",
  },
});

export default DeleteButton;
