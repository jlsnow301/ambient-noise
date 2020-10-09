import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
function WelcomeScreen(props) {
  return (
    <View style={styles.background}>
      <View style={styles.nav}>
        <View
          style={{
            flex: 1.5,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={styles.navTitle}>Saved homes</Text>
        </View>
        <View style={{ flex: 1 }} />
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={styles.navButton}>Sharing | Map</Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text>wip</Text>
      </View>
      <View style={styles.botNav}>
        <View style={styles.navIcons}>
          <Feather name="search" size={30} color="black" />
        </View>
        <View style={styles.navIcons}>
          <MaterialCommunityIcons name="new-box" size={30} color="black" />
        </View>
        <View style={styles.navIcons}>
          <Ionicons name="ios-heart-empty" size={30} color="black" />
        </View>
        <View style={styles.navIcons}>
          <Feather name="home" size={30} color="black" />
        </View>
        <View style={styles.navIcons}>
          <Feather name="more-vertical" size={30} color="black" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  botNav: {
    width: "100%",
    height: 70,
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
  },
  content: {
    width: "100%",
    height: 70,
    flex: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  navButton: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#0066FF",
  },
  nav: {
    backgroundColor: "#ffffff",
    width: "100%",
    height: 70,
    // marginTop: 30,
    flex: 1,
    flexDirection: "row",
    elevation: 8,
  },
  navIcons: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  navTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default WelcomeScreen;
