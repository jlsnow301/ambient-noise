import React, { useState, useEffect, useContext } from "react";
import * as firebase from "firebase";
import { View, StyleSheet, Button } from "react-native";
import { AirbnbRating } from "react-native-elements";

import Keys from "../constants/api-keys";
import Colors from "../constants/colors";
import { AuthContext } from "../functions/auth-context";

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(Keys.FIREBASE_CONFIG);
}

const SoundScore = (props) => {
  const auth = useContext(AuthContext);
  const [userCanRate, setUserCanRate] = useState(true);
  const [userRating, setUserRating] = useState(0);

  // This is the test part.
  let testUser = "jerm";
  // So when we for sure have a user ID (we shouldn't make it to ratings if we aren't logged in)
  // We can use auth.userId instead of this

  const submitRatingHandler = async () => {
    if (!userCanRate) return;
    await firebase
      .database()
      .ref(`locations/${props.locationId}/ratings`)
      // This wild formation is how we make a variable into a object key
      .push({ [testUser]: userRating });
    setUserCanRate(false);
  };

  useEffect(() => {
    const getRatings = async () => {
      await firebase
        .database()
        .ref(`locations/${props.locationId}/ratings`)
        .once("value", (snapshot) => {
          // If there are no ratings, user can make one
          if (!snapshot.val()) setUserCanRate(true);
          else {
            // If the user has not rated this location, they can
            snapshot.forEach((rating) => {
              if (Object.keys(rating.val()).includes(testUser)) {
                setUserCanRate(false);
              }
            });
          }
        });
    };
    getRatings();
  }, []);

  return (
    <View style={styles.container}>
      <AirbnbRating
        count={6}
        reviews={[
          "Silent",
          "Light Outdoors",
          "Normal Conversation",
          "Light Traffic",
          "Heavy Machinery",
          "Unliveable",
        ]}
        defaultRating={3}
        onFinishRating={(value) => setUserRating(value)}
        size={20}
      />
      <Button
        onPress={() => submitRatingHandler()}
        title="SUBMIT"
        disabled={userRating === 0 || !userCanRate}
      />
    </View>
  );
};

export default SoundScore;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
});
