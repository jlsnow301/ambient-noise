import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import Geocode from "react-geocode";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

import GOOGLE_KEY from "../constants/api-keys";
import { LOCATIONS } from "../data/dummy-locations";

/* A component which renders a map using Google API.
   Usage: <MapOverlay style={styles.map} coordinates={coordinates}/>
   The coordinates prop accepts only latitude and longitude, currently,
   which can be retrieved from the google API at response.results[0].geometry.location.
   Note that this does not return deltas, which is required for the MapView component,
   but they can be manually calculated or entered. */

const MapOverlay = (props) => {
  const [currentRegion, setCurrentRegion] = useState(null);

  Geocode.setApiKey(GOOGLE_KEY);
  useEffect(() => {
    if (props.coordinates === null){
      (async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
        }
        let location = await Location.getCurrentPositionAsync({});
        setCurrentRegion(location);
      })();
    }
  }, []);
  // Fire once props.coordinates are changed
  useEffect(() => {
    if (props.coordinates !== "") {
      setCurrentRegion((prevState) => ({
        ...prevState,
        latitude: props.coordinates.latitude,
        latitudeDelta: prevState.latitudeDelta,
        longitude: props.coordinates.longitude,
        longitudeDelta: prevState.longitudeDelta,
      }));
    }
  }, [props.coordinates]);

  return (
    <MapView
      showsUserLocation={true}
      showsMyLocationButton={true} 
      zoomControlEnabled={true}
      style={styles.mapView}
      provider={PROVIDER_GOOGLE}
      region={currentRegion}
    >
      {LOCATIONS.map((location) => (
        <MapView.Marker
          key={location.id}
          coordinate={{
            latitude: location.coordinates.latitude,
            longitude: location.coordinates.longitude,
          }}
          title={location.title}
          description={location.description}
        />
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
