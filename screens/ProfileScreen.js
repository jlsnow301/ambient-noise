import React, { useContext } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

import Colors from "../constants/colors";
import { AuthContext } from "../functions/auth-context";

const ProfileScreen = () => {
  const auth = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <Image style={styles.avatar} source={{ uri: auth.image }} />
      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <Text style={styles.name}>{auth.name}</Text>
          <Text style={styles.info}>UX Designer / Mobile developer</Text>
          <Text style={styles.description}>
            Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum
            electram expetendis, omittam deseruisse consequuntur ius an,
          </Text>

          <TouchableOpacity style={styles.buttonContainer}>
            <Text>My Places</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.primary,
    height: 200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    marginTop: 130,
  },
  name: {
    fontSize: 22,
    color: Colors.accent,
    fontWeight: "600",
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: "center",
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: Colors.grey,
    fontWeight: "600",
  },
  info: {
    fontSize: 16,
    color: Colors.grey,
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: Colors.grey,
    marginTop: 10,
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: Colors.primary,
  },
});
