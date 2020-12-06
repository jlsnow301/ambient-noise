import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, TouchableOpacity, LogBox } from "react-native";

import PlaceIcon from "./PlaceIcon";
import PlaceItem from "./PlaceItem";
import { getLocations } from "../functions/getLocations";

LogBox.ignoreLogs(["Setting a timer"]);

/* Generates a list based on locations fetched.
  Usage: <PlaceList/>
  TODO: Get a specific list from props. Pass this to fetch only that list.
    <PlaceList listMode="recent"/>
    getLocations(props.listMode);
*/
const PlaceList = (props) => {
  const [locations, setLocations] = useState({});

  useEffect(() => {
    // Grab the locations from getLocations
    const fetchLocations = async () => {
      let locations = await getLocations();
      setLocations(locations);
    };
    fetchLocations();
  }, []);

  return (
    <FlatList
      keyExtractor={(location, item) => item.toString()}
      data={locations}
      renderItem={(location) => (
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate("DetailsStack", location.item)
          }>
          <PlaceItem
            id={location.item.id}
            title={location.item.title}
            date={location.item.date}
            icon={
              <PlaceIcon listMode={props.listMode} date={location.item.date} />
            }
          />
        </TouchableOpacity>
      )}
    />
  );
};
export default PlaceList;

const styles = StyleSheet.create({});
