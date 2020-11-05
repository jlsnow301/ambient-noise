import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { SearchBar } from "react-native-elements";
import Geocode from "react-geocode";

import MapOverlay from "../components/MapOverlay";

const HomeScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [enteredValue, setEnteredValue] = useState("");
  const [coordinates, setCoordinates] = useState("");

  // Changes what is displayed as the user types
  const searchInputHandler = (value) => {
    setEnteredValue(value);
  };

  // Clears the value when the user hits x
  const clearSearchHandler = () => {
    setEnteredValue("");
  };

  // Searches coordinates when the user hits the SUBMIT key on the keyboard.
  const submitSearchHandler = () => {
    console.log(`Searching for ${enteredValue}`);
    setIsLoading(true);
    Geocode.fromAddress(enteredValue).then(
      (response) => {
        setCoordinates({
          latitude: response.results[0].geometry.location.lat,
          longitude: response.results[0].geometry.location.lng,
        });
      },
      (error) => {
        console.error(error);
      }
    );
    setIsLoading(false);
  };

  // Get

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        {/*While searching for coordinates, display a spinner screen */}
        {isLoading ? (
          <ActivityIndicator size={"large"} />
        ) : (
          <MapOverlay coordinates={coordinates} />
        )}

        <View style={styles.geobar}>
          <SearchBar
            round
            containerStyle={{
              backgroundColor: "transparent",
              borderBottomColor: "transparent",
              borderTopColor: "transparent",
            }}
            placeholder="Type here..."
            onChangeText={searchInputHandler}
            onClear={clearSearchHandler}
            value={enteredValue}
            onSubmitEditing={submitSearchHandler}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  content: {
    flex: 1,
    width: "100%",
  },
  geobar: {
    width: "80%",
  },
});
