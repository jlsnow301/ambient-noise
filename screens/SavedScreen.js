import React from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import Header from "../components/Header";
import PlaceList from "../components/PlaceList";

const SavedScreen = (props) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <View style={styles.content}>
          <PlaceList listMode={"saved"} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SavedScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    marginTop: 10,
    paddingHorizontal: 20,
    maxHeight: "85%",
    minWidth: 400,
    maxWidth: "95%",
  },
});
