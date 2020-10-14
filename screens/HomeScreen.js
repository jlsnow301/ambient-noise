import * as React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SearchBar } from 'react-native-elements'

import Card from "../components/Card";
import MainButton from "../components/MainButton";
import BodyText from "../components/BodyText";
import DefaultStyles from "../constants/default-styles";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1}}>

      <View style={styles.geobar}>
        <SearchBar placeholder="Type here..."/>
        {/* https://reactnativeelements.com/docs/searchbar/ */}
      </View>





      <View style={styles.navbar}>
        <Button style={styles.btnIcon}
          title="Search"
          onPress={() => navigation.navigate('Search')}
          />
        <Button style={styles.btnIcon}
          title="Recent"
          onPress={() => navigation.navigate('Recent')}
          />
        <Button style={styles.btnIcon}
          title="Saved"
          onPress={() => navigation.navigate('Saved')}
          />
        <Button style={styles.btnIcon}
          title="Profile"
          onPress={() => navigation.navigate('Profile')}
          />
          <Button style={styles.btnIcon}
          title="More"
          onPress={() => navigation.navigate('More')}
          />
      </View>
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
  navbar: {
    padding: 5,
    backgroundColor: "#d8ebff",
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 15,
    width: '100%'
    
  },
  btnIcon: {
    height: 25,
    width: 25,
    flex: 1,
  }
});
