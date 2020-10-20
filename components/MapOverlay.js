import React, { useState, useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import Geocode from "react-geocode";

const MapOverlay = (props) => {
  const [currentRegion, setCurrentRegion] = useState({
    latitude: 47.608013,
    latitudeDelta: 0.07,
    longitude: -122.335167,
    longitudeDelta: 0.07,
  });

  Geocode.setApiKey("AIzaSyBcvyw8T_imdM9Iy33MuiGtcNUcqAOqeIE");

  useEffect(() => {
    if (props.coordinates !== "") {
      console.log(props.coordinates);
      setCurrentRegion((prevState) => ({
        ...prevState,
        latitude: props.coordinates.latitude,
        latitudeDelta: prevState.latitudeDelta,
        longitude: props.coordinates.longitude,
        longitudeDelta: prevState.longitudeDelta,
      }));
    }
  }, [props.coordinates]);

  // <ActivityIndicator style={styles.loadingSpinner} size={"large"} />

  return (
    <MapView
      style={styles.mapView}
      provider={PROVIDER_GOOGLE}
      region={currentRegion}
    />
  );
};

export default MapOverlay;

const styles = StyleSheet.create({
  mapView: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
