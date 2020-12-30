import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View, Keyboard, TextInput } from "react-native";

import Card from "../components/Card";
import Colors from "../constants/colors";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import IconButton from "../components/IconButton";
import RecordingDials from "../components/RecordingDials";

const NewScreen = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [cardContent, setCardContent] = useState(null);
  const [cardVisible, setCardVisible] = useState(false);
  const [enteredDescription, setEnteredDescription] = useState("");

  const showCardHandler = () => {
    if (cardVisible) {
      clearOptionsHandler();
    } else {
      setCardContent(<RecordingDials onSave={clearOptionsHandler} />);
      setCardVisible(true);
    }
  };

  const clearOptionsHandler = () => {
    setCardVisible(false);
    setCardContent(null);
  };
  const nameInputHandler = (value) => {
    setEnteredName(value);
  };
  const descriptionInputHandler = (value) => {
    setEnteredDescription(value);
  };

  return (
    <LinearGradient
      // Background Linear Gradient
      colors={["#6DD5FA", "#FFFFFF"]}
      style={styles.linearGradient}>
      <View style={styles.screen}>
        <Card>
          <View style={styles.header}>
            <TitleText style={styles.titleText}>New Recording</TitleText>
            <Ionicons name="ios-pin" size={25} color={Colors.accent} />
          </View>
          <View style={styles.lineStyle} />
          {!cardVisible && (
            <View>
              <Text style={styles.attributeText}>Coordinates:</Text>
              <BodyText style={styles.bodyText}>
                ({props.route.params.latitude}, {props.route.params.longitude})
              </BodyText>
              <Text style={styles.attributeText}>Name:</Text>
              <TextInput
                style={styles.input}
                blurOnSubmit
                autoCapitalize="none"
                autoCorrect={false}
                placeholder={"enter name"}
                placeholderTextColor="#8e9eab"
                onChangeText={nameInputHandler}
                value={enteredName}
              />
              <Text style={styles.attributeText}>Description:</Text>
              <TextInput
                style={styles.input}
                blurOnSubmit
                autoCapitalize="none"
                autoCorrect={true}
                placeholder={"enter brief description"}
                placeholderTextColor="#8e9eab"
                onChangeText={descriptionInputHandler}
                value={enteredDescription}
              />
              <View style={styles.buttonContainer}>
                <IconButton
                  icon={
                    <FontAwesome5
                      name="microphone"
                      size={40}
                      color={Colors.primary}
                    />
                  }
                  onPress={showCardHandler}
                  text="RECORD"
                />
              </View>
            </View>
          )}
        </Card>
        {cardVisible && <Card style={styles.card}>{cardContent}</Card>}
      </View>
    </LinearGradient>
  );
};

export default NewScreen;

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
    justifyContent: "space-around",
    marginTop: 10,
    paddingHorizontal: 15,
  },
  card: {
    marginTop: 10,
  },
  input: {
    width: "90%",
    textAlign: "left",
    borderRadius: 5,
    padding: 12,
    backgroundColor: "white",
    marginBottom: 18,
    borderColor: "#8e9eab",
    borderWidth: 2,
    marginTop: 5,
  },
});
