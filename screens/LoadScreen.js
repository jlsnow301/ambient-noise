import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

/* This could be displayed as the app first loads up or is paused. 
   This screen is effectively on hold for now */

function LoadScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/logo.png")}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
    </View>
  );
}

export default LoadScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: "black",
    overflow: "hidden",
    marginVertical: 30,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

// rnfes
