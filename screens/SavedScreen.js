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

// Testing only
import DUMMY_SAVES from "../constants/dummy-saves";

const SavedScreen = (props) => {
  const [savedPlaces, setSavedPlaces] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  // User chooses to delete one of their saved entries.
  // This must be passed into the modal content.
  // Currently unused.
  const removeSavedHandler = (placeId) => {
    console.log(`TO BE DELETED: ${placeId}`);
    console.log(savedPlaces);
    setSavedPlaces((currentSaved) => {
      return currentSaved.filter((place) => place.id !== placeId);
    });
  };

  // User clicks on one of the items for details.
  // Opens a modal window.
  const showDetailsHandler = (placeData) => {
    Keyboard.dismiss();
    setModalContent(placeData);
    setModalIsOpen(true);
  };

  // User hits the x on the modal.
  const onCloseHandler = () => {
    setModalIsOpen(false);
  };

  // Initially retrieves the database. Currently grabbing dummy data.
  useEffect(() => {
    const getSavedPlaces = () => {
      const savedData = DUMMY_SAVES;
      return savedData;
    };
    setSavedPlaces(getSavedPlaces);
  }, []);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <Header navigate={props.navigation.navigate}>Saved Places</Header>
        <View style={styles.content}>
          <DetailsModal
            place={modalContent}
            visible={modalIsOpen}
            onClose={onCloseHandler}
            navigate={props.navigation.navigate}
          />
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
};

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
