import React, { useState, useEffect } from "react";
import Geocode from "react-geocode";
import * as Location from "expo-location";
import { StyleSheet } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

import Colors from "../constants/colors";
import Keys from "../constants/api-keys";
import MarkerTooltip from "./MarkerTooltip";
import { getLocations } from "../functions/getLocations";

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
  const [locations, setLocations] = useState([]);

  Geocode.setApiKey(Keys.GOOGLE_KEY);

  // Get user location
  const fetchUserLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
    }
    let location = await Location.getCurrentPositionAsync({});
    setCurrentRegion({
      latitude: location.coords.latitude,
      latitudeDelta: 0.07,
      longitude: location.coords.longitude,
      longitudeDelta: 0.07,
    });
    props.updateUserLocation(currentRegion);
  };

  // Grab the locations from getLocations
  const fetchLocations = async () => {
    let locations = await getLocations();
    setLocations(locations);
  };

  // Run once on startup
  useEffect(() => {
    if (props.coordinates === "") {
      fetchUserLocation();
    }
    fetchLocations();
  }, []);

  // Run when props.coordinates is changed
  useEffect(() => {
    if (props.coordinates && props.coordinates !== "") {
      setCurrentRegion({
        latitude: props.coordinates.latitude,
        latitudeDelta: 0.07,
        longitude: props.coordinates.longitude,
        longitudeDelta: 0.07,
      });
    }
    fetchLocations();
  }, [props.coordinates]);

  return (
    <MapView
      showsUserLocation={true}
      showsMyLocationButton={true}
      zoomControlEnabled={true}
      style={styles.mapView}
      provider={PROVIDER_GOOGLE}
      region={currentRegion}>
      {locations.map((location) => (
        <Marker
          key={location.id}
          pinColor={Colors.accent}
          coordinate={{
            latitude: location.coordinates.latitude,
            longitude: location.coordinates.longitude,
          }}>
          <MarkerTooltip location={location} navigation={props.navigation} />
        </Marker>
      ))}
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
