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

function RecentlyAddedScreen(props) {
  const [recentlyAdded, setRecentlyAdded] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState();

  // Recently added tracks new additions to the global db,
  // This marks the ones that are newer than 3 days with a NEW icon.
  // The others are given a dot.
  let icon;
  let day = new Date();
  day.setDate(day.getDate() - 5);
  if (props.date > day) {
    icon = <Entypo name="dot-single" size={22} />;
  } else {
    icon = <Entypo name="new" size={22} />;
  }

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
    // Testing
    const getRecentlyAdded = () => {
      console.log("Retrieving recent additions...");
      const savedData = "server call";
      return savedData;
    };
    setRecentlyAdded((currentList) => [
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
        <Header>Recently Added</Header>
        <View style={styles.content}>
          <DetailsModal visible={modalIsOpen} onClose={onCloseHandler}>
            {modalContent}
          </DetailsModal>
          <FlatList
            keyExtractor={(item) => item.id}
            data={recentlyAdded}
            renderItem={(placeData) => (
              <TouchableOpacity onPress={() => showDetailsHandler(placeData)}>
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
