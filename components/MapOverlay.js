import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import Geocode from "react-geocode";

/* A component which renders a map using Google API.
   Usage: <MapOverlay style={styles.map} coordinates={coordinates}/>
   The coordinates prop accepts only latitude and longitude, currently,
   which can be retrieved from the google API at response.results[0].geometry.location.
   Note that this does not return deltas, which is required for the MapView component,
   but they can be manually calculated or entered. */

const MapOverlay = (props) => {
  const [currentRegion, setCurrentRegion] = useState({
    latitude: 47.608013,
    latitudeDelta: 0.07,
    longitude: -122.335167,
    longitudeDelta: 0.07,
  });

  // I am using my own here because the other does not have geolocation activated.
  // Please activate these in the developer console @ google maps api
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
    >
      <MapView.Marker
        coordinate={{
          latitude: currentRegion.latitude,
          longitude: currentRegion.longitude,
        }}
        title={"here"}
        description={"location"}
      />
    </MapView>
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
