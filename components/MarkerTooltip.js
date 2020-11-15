import React from "react";
import { Callout } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import Card from "./Card";
import Colors from "../constants/colors";
import BodyText from "../components/BodyText";

const MarkerTooltip = (props) => {
  return (
    <Callout
      tooltip={true}
      onPress={() => props.navigation.navigate("DetailsStack", props.location)}
    >
      <Card style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.titleText}>{props.location.title}</Text>
          <Ionicons name="ios-pin" size={25} color={Colors.accent} />
        </View>

        <View style={styles.lineStyle} />
        <Text style={styles.attributeText}>Description:</Text>
        <BodyText style={styles.bodyText}>
          {props.location.description}
        </BodyText>
        <Text style={styles.attributeText}>Date Added:</Text>
        <BodyText style={styles.bodyText}>{props.location.date}</BodyText>
        <Text style={{ marginBottom: 10, textAlign: "right" }}>
          (Click to Inspect)
        </Text>
      </Card>
    </Callout>
  );
};

export default MarkerTooltip;

const styles = StyleSheet.create({
  card: {
    width: 200,
    maxWidth: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  titleText: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
  lineStyle: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#808080",
    margin: 5,
    marginBottom: 10,
  },
  attributeText: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.primary,
  },
  bodyText: {
    marginBottom: 5,
    fontSize: 16,
  },
});
