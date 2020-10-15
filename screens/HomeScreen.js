import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Alert,
  Keyboard,
} from "react-native";

import { SearchBar } from "react-native-elements";

function HomeScreen() {
  const [enteredValue, setEnteredValue] = useState("");
  const [confirmedSearch, setConfirmedSearch] = useState("");

  const searchInputHandler = (value) => {
    setEnteredValue(value);
  };

  const clearSearchHandler = () => {
    setEnteredValue("");
  };

  const submitSearchHandler = () => {
    setConfirmedSearch(enteredValue);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <View style={styles.geobar}>
          <SearchBar
            placeholder="Type here..."
            onChangeText={searchInputHandler}
            onClear={clearSearchHandler}
            value={enteredValue}
            onSubmitEditing={submitSearchHandler}
          />
        </View>
        <View>
          {/* MAP GOES HERE. JUST MAKE IT A COMPONENT*/}
          {/* <MapOverlay search={enteredValue}/> */}
          {/* props.search will be the user's submitted search.. I think... */}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  containers: {
    flexDirection: "row",
    flex: 1,
    marginHorizontal: 20,
    marginTop: 5,

  },
  screen: {
    flex: 1,
    alignItems: "center",
  },
  geobar: {
    marginTop: "10%",
    width: "80%",
  },
});
