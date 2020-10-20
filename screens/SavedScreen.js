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

function SavedScreen(props) {
  const [savedPlaces, setSavedPlaces] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const removeSavedHandler = (placeId) => {
    console.log(`TO BE DELETED: ${placeId}`);
    console.log(savedPlaces);
    setCourseGoals((currentSaved) => {
      return currentSaved.filter((place) => place.id !== placeId);
    });
  };

  const showDetailsHandler = (place) => {
    setModalIsOpen((currentVisibility) => !currentVisibility);
    <DetailsModal visible={modalIsOpen} data={place} />;
  };

  //Testing
  useEffect(() => {
    const getSavedPlaces = () => {
      console.log("Retrieving saved places...");
      const savedData = "server call";
      return savedData;
    };
    // testing
    setSavedPlaces((currentList) => [
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
        <Header>Saved Places</Header>
        <View style={styles.content}>
          <FlatList
            keyExtractor={(item) => item.id}
            data={savedPlaces}
            renderItem={(placeData) => (
              <TouchableOpacity onPress={showDetailsHandler(placeData)}>
                <PlaceItem
                  id={placeData.item.id}
                  title={placeData.item.title}
                  date={placeData.item.date}
                  onDelete={removeSavedHandler}
                  icon={<Entypo name="heart" size={22} />}
                />
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

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

export default SavedScreen;
