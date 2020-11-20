import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, TouchableOpacity } from "react-native";

import Location from "../models/location";
import PlaceIcon from "./PlaceIcon";
import PlaceItem from "./PlaceItem";

import * as firebase from 'firebase';
import { firebaseConfig } from "../services/firebase";
import { LogBox } from 'react-native';

// Testing only
// import { LOCATIONS } from "../data/dummy-locations";


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

LogBox.ignoreLogs(['Setting a timer']);

var LOCATIONS = [];

const ref = firebase.database().ref('locations');

ref.once('value', snapshot => {
    snapshot.forEach(location=>{
      LOCATIONS.push([new Location(location.val().id, location.val().coordinates, location.val().title, location.val().description, location.val().date, location.val().soundId)]);
      console.log(LOCATIONS);
    })
})


const PlaceList = (props) => {
  const [placeData, setPlaceData] = useState({});
  // Sets what icons display and what database is grabbed.

  // Initially retrieves the database. Currently grabbing dummy data.
  useEffect(() => {
    const getPlaceData = () => {
      if (props.listMode === "saved") {
        const savedData = LOCATIONS;
        return savedData;
      } else {
        const recentData = LOCATIONS;
        return recentData;
      }
    };
    setPlaceData(getPlaceData);
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
