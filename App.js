import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import NavBar from "./components/NavBar";

function App() {
  return (
    <NavigationContainer>
      {/*This ensures that the navbar is loaded on every screen. */}
      <NavBar />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});

export default App;
