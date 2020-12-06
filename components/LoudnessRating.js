import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import DrawStars from "../components/DrawStars";

const LoudnessRating = (props) => {
  const [averageRating, setAverageRating] = useState(null);

  useEffect(() => {
    if (Object.keys(props.ratings).length) {
      // Get the average ratings
      let ratings = [];
      Object.values(props.ratings).map((rating) => {
        ratings.push(Object.values(rating)[0]);
      });
      let averages =
        ratings.reduce((previous, current) => (current += previous)) /
        ratings.length;

      setAverageRating(averages);
    }
  }, []);

  return (
    <View>
      <Text style={styles.attributeText}>Average Loudness Rating:</Text>
      {averageRating ? (
        <View style={styles.ratingsContainer}>
          <DrawStars stars={averageRating} />
          <Text style={styles.rating}>
            {averageRating ? averageRating : "None yet!"}
          </Text>
        </View>
      ) : (
        <Text style={{ fontSize: 18 }}>None yet!</Text>
      )}
    </View>
  );
};

export default LoudnessRating;

const styles = StyleSheet.create({
  attributeText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  ratingsContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  rating: {
    fontSize: 17,
    marginLeft: 10,
    fontWeight: "bold",
    textAlignVertical: "center",
  },
});
