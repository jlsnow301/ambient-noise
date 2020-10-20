import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";

const PlaceItem = (props) => {
  return (
    <View style={styles.container}>
      {props.icon}
      <Text style={styles.placeText}>{props.title}</Text>
      <View style={styles.flex} />
      <Text style={styles.dateText}>{props.date}</Text>
    </View>
  );
};

export default PlaceItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#ccc",
    borderColor: "black",
    borderRadius: 2,
    borderWidth: 1,
  },
  placeText: {
    fontSize: 18,
  },
  dateText: {
    paddingTop: 3,
    fontSize: 13,
  },
});
