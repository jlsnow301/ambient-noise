import React from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import PlaceList from "../components/PlaceList";

const RecentScreen = (props) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <View style={styles.content}>
          <PlaceList listMode={"recent"} navigation={props.navigation} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default RecentScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    marginTop: 10,
    paddingHorizontal: 20,
    maxHeight: "85%",
  },
});
