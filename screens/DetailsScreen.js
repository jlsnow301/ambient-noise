import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import Card from "../components/Card";
import Colors from "../constants/colors";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import IconButton from "../components/IconButton";
import PlayButton from "../components/PlayButton";
import PlayBackButton from "../components/PlayBackButton";
import PauseButton from "../components/PauseButton";

const DetailsScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Card style={styles.card}>
        <View style={styles.header}>
          <TitleText style={styles.titleText}>
            {props.route.params.title}
          </TitleText>
          <Ionicons name="ios-pin" size={25} color={Colors.accent} />
        </View>
        <View style={styles.lineStyle} />
        <Text style={styles.attributeText}>Description:</Text>
        <BodyText style={styles.bodyText}>
          {props.route.params.description}
        </BodyText>
        <Text style={styles.attributeText}>Date Added:</Text>
        <BodyText style={styles.bodyText}>{props.route.params.date}</BodyText>
        <View style={styles.buttonContainer}>
          <PlayButton
            soundId={`../assets/sound/${props.route.params.soundId}.mp3`}
          />
          <IconButton
            icon={
              <FontAwesome5 name="globe-americas" size={40} color="#006AFF" />
            }
            onPress={() =>
              props.navigation.navigate(
                "HomeStack",
                props.route.params.coordinates
              )
            }
            text="MAP"
          />
        </View>
      </Card>
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  titleText: {
    fontWeight: "bold",
    color: "black",
  },
  lineStyle: {
    alignSelf:'stretch',
    borderWidth: 1,
    borderColor: "#808080",
    margin: 5,
    marginBottom: 10,
  },
  attributeText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  bodyText: {
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
