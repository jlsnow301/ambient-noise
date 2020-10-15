import * as React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SearchBar } from 'react-native-elements'
import { Foundation, Entypo, Ionicons } from '@expo/vector-icons'

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
        <Foundation 
          name="magnifying-glass" 
          size={40} 
          color="black"
          style={styles.btnIcon}
          title="Search"
          onPress={() => navigation.navigate('Search')}
        />
        <Entypo 
          name="new" 
          size={40} 
          color="black"
          style={styles.btnIcon}
          title="Recent"
          onPress={() => navigation.navigate('Recent')}
          />
        <Entypo 
          name="heart" 
          size={40} 
          color="black"
          style={styles.btnIcon}
          title="Saved"
          onPress={() => navigation.navigate('Saved')}
          />
        <Ionicons 
          name="md-person" 
          size={40} 
          color="black"
          style={styles.btnIcon}
          title="Profile"
          onPress={() => navigation.navigate('Profile')}
          />
        <Ionicons 
          name="ios-more" 
          size={45} 
          color="black"
          style={styles.btnIcon}
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
    alignItems: 'center',
  },
  navbar: {
    padding: 5,
    backgroundColor: "#d8ebff",
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 20,
    alignContent: 'center',
    flex: 1,
    
  },
  btnIcon: {
    height: 45,
    width: 45,
    marginHorizontal: 20
  }
});
