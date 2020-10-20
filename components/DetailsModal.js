import React from "react";
import { StyleSheet, Text, View, Modal } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import PlayButton from "./PlayButton";

const DetailsModal = (props) => {
  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.modalContent}>
        <MaterialIcons
          name="close"
          size={24}
          style={{ ...styles.modalToggle, ...styles.modalClose }}
          onPress={props.onClose}
        />
        {props.children}

        <View style={{ flex: 1 }} />
        <Text>Listen:</Text>
        <PlayButton />
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
});
