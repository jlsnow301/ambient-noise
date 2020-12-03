import React from "react";
import { StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";

import Colors from "../constants/colors";

const PlaceIcon = props => {
  // Is this for the saved list?
  if (props.listMode === "saved") {
    return <Entypo name="heart" size={20} color={Colors.secondary} />;
  }

  // Okay so what's the creation date
  let saveDate = new Date(props.date);
  saveDate = saveDate.getDate();
  // Now what's three days ago
  let threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

  // Is the place new?
  if (saveDate > threeDaysAgo) {
    return <Entypo name="new" size={22} color={Colors.primary} />;
  }
  return <Entypo name="clock" size={22} color={Colors.primary} />;

  // Please refactor this I feel disgusting
};

export default PlaceIcon;

const styles = StyleSheet.create({});
