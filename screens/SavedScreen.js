import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import Header from "../components/Header";
import PlaceList from "../components/PlaceList";
import DetailsModal from "../components/DetailsModal";

const SavedScreen = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

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
          <PlaceList listmode={"recent"} />
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
