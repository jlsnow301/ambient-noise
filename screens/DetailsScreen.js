import React, { useState, useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import Card from "../components/Card";
import Colors from "../constants/colors";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import IconButton from "../components/IconButton";
import PlayButton from "../components/PlayButton";
import SoundScore from "../components/SoundScore";
import { AuthContext } from "../functions/auth-context";
import LoudnessRating from "../components/LoudnessRating";

const DetailsScreen = (props) => {
  const auth = useContext(AuthContext);
  const [cardVisible, setCardVisible] = useState(false);
  const [cardContent, setCardContent] = useState(null);
  const [currentOption, setCurrentOption] = useState("");

  const showOptionsHandler = (option) => {
    // This is kind of dumb that I do it in a state. But this
    // hides the card if they click on it twice.
    if (!option || option === currentOption) {
      clearOptionsHandler();
      return;
    }

    if (option === "record") {
      setCardContent(<RecordingDials />);
      setCardVisible(true);
      setCurrentOption("record");
    } else if (option === "rate") {
      setCardContent(<SoundScore locationId={props.route.params.id} />);
      setCardVisible(true);
      setCurrentOption("rate");
    }
  };

  const clearOptionsHandler = () => {
    setCardVisible(false);
    setCardContent(null);
    setCurrentOption("");
  };

  return (
    <LinearGradient
      // Background Linear Gradient
      colors={["#6DD5FA", "#FFFFFF"]}
      style={styles.linearGradient}>
      <View style={styles.screen}>
        <Card>
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
          <LoudnessRating ratings={props.route.params.ratings} />
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => clearOptionsHandler()}>
              <PlayButton soundId={props.route.params.id} />
            </TouchableOpacity>
            <IconButton
              icon={
                <FontAwesome5
                  name="microphone"
                  size={40}
                  color={
                    currentOption === "record" ? Colors.accent : Colors.primary
                  }
                />
              }
              onPress={() => showOptionsHandler("record")}
              text="RECORD"
            />
            <IconButton
              icon={
                <FontAwesome5
                  name="star"
                  size={40}
                  color={
                    currentOption === "rate" ? Colors.accent : Colors.primary
                  }
                />
              }
              onPress={() => showOptionsHandler("rate")}
              text="RATE"
            />
            <IconButton
              icon={
                <FontAwesome5
                  name="globe-americas"
                  size={40}
                  color={Colors.primary}
                />
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
        {cardVisible && <Card style={styles.card}>{cardContent}</Card>}
      </View>
    </LinearGradient>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  linearGradient: {
    opacity: 0.95,
    height: "100%",
    width: "100%",
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
    alignSelf: "stretch",
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
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingHorizontal: 15,
  },
  card: {
    marginTop: 10,
  },
});
