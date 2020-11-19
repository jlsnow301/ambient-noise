import React from "react";
import { View, StyleSheet } from "react-native";

/* Creates a square card component.
   Usage: <Card style={styles.override}>Content</Card>
   Where styles.override: You can change the style here. Ex:
   <Card style={{borderColor: "red"}}>Content</Card> */

const Card = (props) => {
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  card: {
    width:"95%",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
  },
});

export default Card;
