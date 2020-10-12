import * as React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Card from "../components/Card";
import MainButton from "../components/MainButton";
import BodyText from "../components/BodyText";
import DefaultStyles from "../constants/default-styles";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.screen}>
      <Text></Text>
      <Button
        title="Go to Newest Homes"
        onPress={() => navigation.navigate('Newest')}
        />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
});
