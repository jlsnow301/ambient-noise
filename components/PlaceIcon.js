import React from "react";
import { StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";

const PlaceIcon = (props) => {
  // Is this for the saved list?
  if (props.listMode === "saved") {
    return <Entypo name="heart" size={22} />;
  }

  // Okay so what's the creation date
  let saveDate = new Date(props.date);
  saveDate = saveDate.getDate();
  // Now what's three days ago
  let threeDaysAgo = new Date();
  threeDaysAgo = threeDaysAgo.getDate() - 3;

  // Is the place new?
  if (saveDate > threeDaysAgo) {
    return <Entypo name="new" size={22} />;
  }
  return <Entypo name="dot-single" size={22} />;

  // Please refactor this I feel disgusting
};

export default PlaceIcon;

const styles = StyleSheet.create({});
