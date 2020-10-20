import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import { Entypo } from "@expo/vector-icons";

import Header from "../components/Header";
import PlaceItem from "../components/PlaceItem";
import DetailsModal from "../components/DetailsModal";

function SavedScreen(props) {
  const [savedPlaces, setSavedPlaces] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState();

  // User chooses to delete one of their saved entries.
  // This must be passed into the modal content.
  // Currently unused.
  const removeSavedHandler = (placeId) => {
    console.log(`TO BE DELETED: ${placeId}`);
    console.log(savedPlaces);
    setCourseGoals((currentSaved) => {
      return currentSaved.filter((place) => place.id !== placeId);
    });
  };

  // User clicks on one of the items for details.
  // Opens a modal window.
  const showDetailsHandler = (place) => {
    Keyboard.dismiss();
    setModalContent(
      <View style={{ alignItems: "center" }}>
        <Text>{place.item.title}</Text>
        <Text>Added On: {place.item.date}</Text>
      </View>
    );
    setModalIsOpen(true);
  };

  // User hits the x on the modal.
  const onCloseHandler = () => {
    setModalIsOpen(false);
  };

  // Initially retrieves the database. Currently
  // Going nowhere.
  useEffect(() => {
    const getSavedPlaces = () => {
      console.log("Retrieving saved places...");
      const savedData = "server call";
      return savedData;
    };
    setSavedPlaces((currentList) => [
      ...currentList,
      {
        //This is a test place. It adds in every render.
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
          <DetailsModal visible={modalIsOpen} onClose={onCloseHandler}>
            {modalContent}
          </DetailsModal>
          <FlatList
            keyExtractor={(item) => item.id}
            data={savedPlaces}
            renderItem={(placeData) => (
              <TouchableOpacity onPress={() => showDetailsHandler(placeData)}>
                <PlaceItem
                  id={placeData.item.id}
                  title={placeData.item.title}
                  date={placeData.item.date}
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
