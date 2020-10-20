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

function HomeScreen(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [enteredValue, setEnteredValue] = useState("");
  const [coordinates, setCoordinates] = useState("");

  const searchInputHandler = (value) => {
    setEnteredValue(value);
  };

  const clearSearchHandler = () => {
    setEnteredValue("");
  };

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

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        {isLoading ? (
          <ActivityIndicator size={"large"} />
        ) : (
          <MapOverlay style={styles.map} coordinates={coordinates} />
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
}

export default HomeScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  map: {
    flex: 1,
  },
  geobar: {
    position: "absolute",
    marginTop: "10%",
    width: "80%",
  },
});
