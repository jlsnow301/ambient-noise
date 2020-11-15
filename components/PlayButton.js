import React from "react";
import { Audio } from "expo-av";
import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";

const PlayButton = (props) => {
  const playSound = () => {
    Audio.Sound.createAsync(require("../assets/sound/freeway-1.mp3"), {
      shouldPlay: true,
    })
      .then((res) => {
        res.sound.setOnPlaybackStatusUpdate((status) => {
          if (!status.didJustFinish) return;
          console.log("Unloading " + props.soundId);
          res.sound.unloadAsync().catch(() => {});
        });
      })
      .catch((error) => {});
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => playSound()}>
        <View style={styles.button}>
          <AntDesign name="sound" size={40} color="#006AFF" />
          <Text style={{ textAlign: "center" }}>LISTEN</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    margin: 10,
    width: 80,
    height: 80,
    backgroundColor: "white",
    borderRadius: 50,
    alignItems: "center",
    borderColor: "black",
  },
});

export default PlayButton;
