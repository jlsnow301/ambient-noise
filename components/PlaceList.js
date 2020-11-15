import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, TouchableOpacity } from "react-native";

import PlaceIcon from "./PlaceIcon";
import PlaceItem from "./PlaceItem";

// Testing only
import { LOCATIONS } from "../data/dummy-locations";

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
      keyExtractor={(item) => item.id}
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
