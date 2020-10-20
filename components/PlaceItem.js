import React from "react";
import { StyleSheet, Text, View } from "react-native";

/* A squared card to display places in the Saved and Recent Flatlists.
   Usage: <PlaceItem OPTIONAL PROPS title={title} date={date} icon={icon}/>
   Where OPTIONAL PROPS: You can add in anything else you'd like to pass on.
   */

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
