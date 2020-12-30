import React, { useState, useEffect } from "react";
import {
  View,
  Keyboard,
  StyleSheet,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from "react-native";
import Geocode from "react-geocode";
import { SearchBar } from "react-native-elements";
import { FontAwesome5 } from "@expo/vector-icons";

import Colors from "../constants/colors";
import MapOverlay from "../components/MapOverlay";
import IconButton from "../components/IconButton";

const HomeScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [enteredValue, setEnteredValue] = useState("");
  const [coordinates, setCoordinates] = useState("");
  const [userLocation, setUserLocation] = useState({
    latitude: 47.608013,
    longitude: -122.335167,
  });

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

  // Stores the user location for new recordings
  const updateUserLocation = (coords) => {
    setUserLocation({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
  };

  // Did user navigate here? Set the region with params
  useEffect(() => {
    if (props.route.params !== undefined) {
      setCoordinates({
        latitude: props.route.params.latitude,
        longitude: props.route.params.longitude,
      });
    }
  }, [props.route.params]);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View style={styles.screen}>
        {/*While searching for coordinates, display a spinner screen */}
        {isLoading ? (
          <ActivityIndicator size={"large"} />
        ) : (
          <MapOverlay
            coordinates={coordinates}
            navigation={props.navigation}
            updateUserLocation={updateUserLocation}
          />
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
        <View style={{ flex: 1 }} />
        <View style={styles.newButton}>
          <IconButton
            icon={
              <FontAwesome5
                name="microphone"
                size={40}
                color={Colors.primary}
              />
            }
            onPress={() => props.navigation.navigate("NewStack", userLocation)}
            text="RECORD"
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
    width: "75%",
  },
  newButton: {
    padding: 20,
    borderRadius: 30,
    backgroundColor: "white",
    marginBottom: 50,
    marginLeft: 25,
    alignSelf: "flex-start",
  },
});
