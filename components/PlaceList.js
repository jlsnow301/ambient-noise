import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList } from "react-native";

import PlaceItem from "./PlaceItem";
import PlaceIcon from "./PlaceIcon";

// Testing only
import DUMMY_SAVES from "../constants/dummy-saves";

const PlaceList = (props) => {
  const [placeData, setPlaceData] = useState({});
  // Sets what icons display and what database is grabbed.
  const [listMode, setListMode] = useState("recent");

  // Initially retrieves the database. Currently grabbing dummy data.
  useEffect(() => {
    setListMode(props.listMode);
    const getPlaceData = () => {
      if (listMode === "saved") {
        const savedData = DUMMY_SAVES;
        return savedData;
      } else {
        const recentData = DUMMY_SAVES;
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
        <PlaceItem
          id={placeData.item.id}
          title={placeData.item.title}
          date={placeData.item.date}
          icon={<PlaceIcon listMode={listMode} date={placeData.item.date} />}
        />
      )}
    />
  );
};

export default PlaceList;

const styles = StyleSheet.create({});
