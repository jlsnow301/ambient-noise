import * as firebase from "firebase";
import Keys from "../constants/api-keys";
import Location from "../models/location";

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(Keys.FIREBASE_CONFIG);
}

export const getLocations = async () => {
  let locations = [];
  await firebase
    .database()
    .ref("locations")
    .once("value", (snapshot) => {
      snapshot.forEach((location) => {
        let loadedRatings =
          location.val().ratings === undefined ? [] : location.val().ratings;
        locations.push(
          new Location(
            location.val().id,
            location.val().coordinates,
            location.val().title,
            location.val().description,
            location.val().date,
            location.val().soundId,
            loadedRatings
          )
        );
      });
    })
    .catch((err) => {
      console.log(err);
    });

  return locations;
};
