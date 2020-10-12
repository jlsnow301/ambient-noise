import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import Header from "./components/Header";
import BodyText from "./components/BodyText";

export default function App() {
  // State here
  const [dataLoaded, setDataLoaded] = useState(false);

  // Logic here
  let content = <BodyText>WIP!</BodyText>;

  // Return
  return (
    <View style={styles.screen}>
      <Header title="Ambient Noise" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
