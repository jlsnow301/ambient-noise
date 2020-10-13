import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const SavedScreen = () => {
  return (
    <View style={styles.container}>
      {/* Top bar */}
      <View style={styles.navBar}>
        <View style={styles.navTitleButton}>
          <Text style={styles.navTitle}>Saved homes</Text>
        </View>
        <View style={styles.navButton}>
          <Text style={styles.button}>Sharing</Text>
          <Text style={styles.button}>Map</Text>
        </View>
      </View>
      {/* Content */}
      <View style={styles.content}>
        <Text>wip</Text>
      </View>
      {/* Bottom nav */}
      <View style={styles.tabBar}>
        <View style={styles.tabBarButton}>
          <Feather name="search" size={30} color="black" />
        </View>
        <View style={styles.tabBarButton}>
          <MaterialCommunityIcons name="new-box" size={30} color="black" />
        </View>
        <View style={styles.tabBarButton}>
          <Ionicons name="ios-heart-empty" size={30} color="black" />
        </View>
        <View style={styles.tabBarButton}>
          <Feather name="home" size={30} color="black" />
        </View>
        <View style={styles.tabBarButton}>
          <Feather name="more-vertical" size={30} color="black" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    color: '#0066FF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
  },
  content: {
    height: 70,
    flex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  navBar: {
    flexDirection: 'row',
    height: 60,
    elevation: 8,
    backgroundColor: '#ffffff',
  },
  navButton: {
    flex: 1.3,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 0,
    flexDirection: 'row',
  },
  navTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  navTitleButton: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 3,
    padding: 10,
  },
  tabBar: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: '#f2f2f2',
  },
  tabBarButton: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default SavedScreen;
