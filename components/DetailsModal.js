import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Modal, Button } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import BodyText from "./BodyText";
import PlayButton from "./PlayButton";

const DetailsModal = (props) => {
  const [date, setDate] = useState("2020-10-27");
  const [title, setTitle] = useState("Blank");

  useEffect(() => {
    if (props.place !== null) {
      setTitle(props.place.item.title);
      setDate(props.place.item.date);
    }
  }, [props.place]);

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.modalContent}>
        <MaterialIcons
          name="close"
          size={24}
          style={{ ...styles.modalToggle, ...styles.modalClose }}
          onPress={props.onClose}
        />
        <View style={{ alignItems: "center" }}>
          <BodyText>{title}</BodyText>
          <Text>Added On: {date}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Text>Listen:</Text>
            <PlayButton />
          </View>
          <View style={styles.button}>
            <Text>Map:</Text>
            <Button title="Map" onPress={() => props.navigate("Home")} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DetailsModal;

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    alignItems: "center",
  },
  modalToggle: {
    marginBottom: 20,

    borderWidth: 1,
    borderColor: "#f2f2f2",
    padding: 10,
    borderRadius: 10,
    alignSelf: "center",
  },
  modalClose: {
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    alignItems: "center",
    marginHorizontal: 50,
  },
  buttonContainer: {
    flex: 1,
    marginTop: "70%",
    flexDirection: "row",
  },
});
