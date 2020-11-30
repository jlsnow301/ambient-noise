import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Entypo } from '@expo/vector-icons';

const StopButton = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.8} onPress={props.onPress}>
        <View style={styles.button}>
          <Entypo name="controller-stop" size={40} color="#006AFF" />
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

export default StopButton;
