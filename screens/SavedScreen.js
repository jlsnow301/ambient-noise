import React from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import PlaceList from "../components/PlaceList";

const SavedScreen = props => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <LinearGradient
        // Background Linear Gradient
        colors={["#6DD5FA", "#FFFFFF"]}
        style={styles.linearGradient}>
        <View style={styles.screen}>
          <View style={styles.content}>
            <PlaceList listMode={"saved"} navigation={props.navigation} />
          </View>
        </View>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

export default SavedScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  linearGradient: {
    opacity: 0.95,
    height: "100%",
    width: "100%",
  },
  content: {
    marginTop: 10,
    paddingHorizontal: 20,
    maxHeight: "85%",
  },
});
