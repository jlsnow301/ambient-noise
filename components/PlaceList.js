import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import { StyleSheet, FlatList, TouchableOpacity, LogBox } from "react-native";

import PlaceIcon from "./PlaceIcon";
import PlaceItem from "./PlaceItem";
import keys from "../constants/api-keys";
import Location from "../models/location";

// Testing only
// import { LOCATIONS } from "../data/dummy-locations";
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(keys.FIREBASE_CONFIG);
}

LogBox.ignoreLogs(["Setting a timer"]);

const PlaceList = (props) => {
  const [placeData, setPlaceData] = useState({});
  // Sets what icons display and what database is grabbed.

  // Initially retrieves the database. Currently grabbing dummy data.
  useEffect(() => {
    const getPlaceData = async () => {
      let locations = [];
      await firebase
        .database()
        // .ref(props.listMode) for when we have different dbs for recent/saved
        .ref("locations")
        .once("value", (snapshot) => {
          snapshot.forEach((location) => {
            locations.push(
              new Location(
                location.val().id,
                location.val().coordinates,
                location.val().title,
                location.val().description,
                location.val().date,
                location.val().soundId
              )
            );
          });
        })
        .catch((err) => {
          console.log(err);
        });
      setPlaceData(locations);
    };
    getPlaceData();
  }, []);

  return (
    <FlatList
      keyExtractor={(placeData, item) => item.toString()}
      // keyExtractor={(item) => item.toString()}
      data={placeData}
      renderItem={(placeData) => (
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate("DetailsStack", placeData.item)
          }
        >
          <PlaceItem
            id={placeData.item.id}
            title={placeData.item.title}
            date={placeData.item.date}
            icon={
              <PlaceIcon listMode={props.listMode} date={placeData.item.date} />
            }
          />
        </TouchableOpacity>
      )}
    />
  );
};
export default PlaceList;

const styles = StyleSheet.create({});
