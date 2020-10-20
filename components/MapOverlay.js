import React, { useState, useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import Geocode from "react-geocode";

const MapOverlay = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [resultLatitude, setResultLatitude] = useState("");
  const [resultLongitude, setResultLongitude] = useState("");
  const [searchRegion, setSearchRegion] = useState({
    latitude: 47.608013,
    latitudeDelta: 0.07,
    longitude: -122.335167,
    longitudeDelta: 0.07,
  });

  Geocode.setApiKey("AIzaSyBcvyw8T_imdM9Iy33MuiGtcNUcqAOqeIE");

  // This is really hacky the way I did this and I don't like it
  // Two states is bad
  const fetchData = (query) => {
    console.log(`Searching for ${query}`);
    setIsLoading(true);
    Geocode.fromAddress(query).then(
      (response) => {
        setResultLatitude(response.results[0].geometry.location.lat);
        setResultLongitude(response.results[0].geometry.location.lng);
      },
      (error) => {
        console.error(error);
      }
    );
  };

  useEffect(() => {
    if (props.query !== "") {
      fetchData(props.query);
      if (resultLatitude !== "" && resultLongitude !== "") {
        setSearchRegion((prevState) => ({
          ...prevState,
          latitude: resultLatitude,
          latitudeDelta: prevState.latitudeDelta,
          longitude: resultLongitude,
          longitudeDelta: prevState.longitudeDelta,
        }));
      }
      setIsLoading(false);
    }
  }, [props.query]);

  // <ActivityIndicator style={styles.loadingSpinner} size={"large"} />

  return (
    <MapView
      style={styles.mapView}
      provider={PROVIDER_GOOGLE}
      region={searchRegion}
    />
  );
};

export default MapOverlay;

const styles = StyleSheet.create({
  mapView: {
    flex: 1,
  },
  loadingSpinner: {
    flex: 1,
    justifyContent: "center",
  },
});
