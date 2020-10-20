import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Entypo } from "@expo/vector-icons";

import Header from "../components/Header";
import PlaceItem from "../components/PlaceItem";
import DetailsModal from "../components/DetailsModal";

function RecentlyAddedScreen(props) {
  const [recentlyAdded, setRecentlyAdded] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  let icon;
  let day = new Date();
  day.setDate(day.getDate() - 5);
  if (props.date > day) {
    icon = <Entypo name="dot-single" size={22} />;
  } else {
    icon = <Entypo name="new" size={22} />;
  }
  const showDetailsHandler = (place) => {
    setModalIsOpen(true);
    <DetailsModal visible={modalIsOpen} data={place}>
      Hello
    </DetailsModal>;
  };

  useEffect(() => {
    // Testing
    const getRecentlyAdded = () => {
      console.log("Retrieving recent additions...");
      const savedData = "server call";
      return testPlace;
    };
    setRecentlyAdded((currentList) => [
      ...currentList,
      {
        id: Math.random().toString(),
        title: "8801 Aurora Ave",
        date: "10/18/2020",
      },
    ]);
  }, []);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <Header>Recently Added</Header>
        <View style={styles.content}>
          <FlatList
            keyExtractor={(item) => item.id}
            data={recentlyAdded}
            renderItem={(placeData) => (
              <TouchableOpacity onPress={showDetailsHandler(placeData)}>
                <PlaceItem
                  id={placeData.item.id}
                  title={placeData.item.title}
                  date={placeData.item.date}
                  icon={icon}
                />
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
export default RecentlyAddedScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    marginTop: 10,
    paddingHorizontal: 20,
    maxHeight: "85%",
    minWidth: 400,
    maxWidth: "95%",
  },
});
