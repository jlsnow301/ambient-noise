import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, Text, View } from "react-native";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";
import { Audio } from 'expo-av';
import Card from "../components/Card";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import IconButton from "../components/IconButton";

const DetailsScreen = (props) => {
  const playAudio = async () => {
    try {

      const soundObject = new Audio.Sound();
  
      const status = {
        shouldPlay: true
      };
      console.log(`Played track ${props.route.params.id}`);
      soundObject.loadAsync(require('../assets/sound/freeway-1.mp3'), status, false);
      soundObject.playAsync();
      soundObject.unloadAsync();
    }
    catch (error) {
      console.log(`Error while playing ${error}`);
    }

  };
  const mapButtonHandler = () => {
    props.navigation.navigate("HomeStack", props.route.params.coordinates);
  };

  const listenButtonHandler = () => {
    console.log(`Played track ${props.route.params.id}`);
  };

  return (
    <View style={styles.screen}>
      <Card style={styles.card}>
        <TitleText style={styles.titleText}>
          {props.route.params.title}
        </TitleText>
        <View style={styles.lineStyle} />
        <Text style={styles.attributeText}>Description:</Text>
        <BodyText style={styles.bodyText}>
          {props.route.params.description}
        </BodyText>
        <Text style={styles.attributeText}>Date Added:</Text>
        <BodyText style={styles.bodyText}>{props.route.params.date}</BodyText>
        <View style={styles.buttonContainer}>
          <IconButton
            icon={<AntDesign name="sound" size={40} color="#006AFF" />}
            onPress={() => { playAudio() }}
            text="LISTEN"
          />
          <IconButton
            icon={
              <FontAwesome5 name="globe-americas" size={40} color="#006AFF" />
            }
            onPress={mapButtonHandler}
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
  titleText: {
    color: "black",
    textAlign: "center",
  },
  lineStyle: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#808080",
    margin: 10,
    marginBottom: 30,
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