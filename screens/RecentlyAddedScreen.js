import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  TouchableOpacity,
} from "react-native";

import Header from "../components/Header";
import PlaceItem from "../components/PlaceItem";
import RecentIcon from "../components/RecentIcon";
import DetailsModal from "../components/DetailsModal";

// Testing only
import DUMMY_SAVES from "../constants/dummy-saves";

const RecentlyAddedScreen = (props) => {
  const [recentlyAdded, setRecentlyAdded] = useState([]);
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

  // Initially retrieves the database. Currently grabbing dummy data.
  useEffect(() => {
    const getRecentPlaces = () => {
      const recentData = DUMMY_SAVES;
      return recentData;
    };
    setRecentlyAdded(getRecentPlaces);
  }, []);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <Header navigate={props.navigation.navigate}>Recently Added</Header>
        <View style={styles.content}>
          <DetailsModal
            place={modalContent}
            visible={modalIsOpen}
            onClose={onCloseHandler}
            navigate={props.navigation.navigate}
          />
          <FlatList
            keyExtractor={(item) => item.id}
            data={recentlyAdded}
            renderItem={(placeData) => (
              <TouchableOpacity onPress={() => showDetailsHandler(placeData)}>
                <PlaceItem
                  id={placeData.item.id}
                  title={placeData.item.title}
                  date={placeData.item.date}
                  icon={<RecentIcon date={placeData.item.date} />}
                />
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
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
