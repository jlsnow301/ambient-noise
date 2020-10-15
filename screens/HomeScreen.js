import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Alert,
  Keyboard,
} from "react-native";

import { SearchBar } from "react-native-elements";
import RecordButton from "../components/RecordButton";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PlayButton from "../components/PlayButton";



function HomeScreen({ navigation }) {
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

          <View style={styles.twobtcontainers}>
            <PlayButton title="play the sound"
              onPress={() => navigation.navigate('')}
            />
            <RecordButton title="go to modal screen"
              onPress={() => navigation.navigate('MyModal')}
            />
          </View>

        </View>



      </View>
    </TouchableWithoutFeedback >
  );
}

export default HomeScreen;


const styles = StyleSheet.create({
  twobtcontainers: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
});
