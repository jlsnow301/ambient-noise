import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Alert,
  Keyboard,
} from "react-native";
import { SearchBar } from "react-native-elements";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";


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
        <MapView
          style={styles.mapView}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: 47.608013,
            longitude: -122.335167,
            latitudeDelta: 0.07,
            longitudeDelta: 0.07,
          }}
        />
        <View style={styles.geobar}>
          <SearchBar
            round
            containerStyle={{
              backgroundColor: 'transparent',
              borderBottomColor: 'transparent',
              borderTopColor: 'transparent'
            }}
            placeholder="Type here..."
            onChangeText={searchInputHandler}
            onClear={clearSearchHandler}
            value={enteredValue}
            onSubmitEditing={submitSearchHandler}
          />
        </View>

        <View style={styles.twobtcontainers}>
          <View style={styles.buttoncontainers}>
            <PlayButton title="play the sound"
              onPress={() => navigation.navigate('')}
            />
          </View>
          <View style={styles.buttoncontainers}>
            <RecordButton title="go to modal screen"
              onPress={() => navigation.navigate('MyModal')}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  mapView: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  buttonContainers: {
    flex: 1,
  },
  containers: {
    flexDirection: "row",
    flex: 1,
    justifyContent: 'center',

  },
  screen: {
    flex: 1,
    alignItems: "center",
  },
  geobar: {
    marginTop: "10%",
    width: "80%",
  },
  containerStyle: {
    backgroundColor: "#FBFBFB",
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent'
  }
});
