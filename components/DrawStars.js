import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import Colors from "../constants/colors";

const DrawStars = (props) => {
  let fullRating = [];
  console.log(props.stars);
  for (let i = 0; i < 6; i++) {
    if (i < Math.floor(props.stars)) {
      fullRating.push(
        <FontAwesome
          key={i}
          style={styles.star}
          name="star"
          size={20}
          color={Colors.accent}
        />
      );
    } else if (i < props.stars) {
      fullRating.push(
        <FontAwesome
          key={i}
          style={styles.star}
          name="star-half-full"
          size={20}
          color={Colors.accent}
        />
      );
    } else {
      fullRating.push(
        <FontAwesome
          key={i}
          style={styles.star}
          name="star-o"
          size={20}
          color={Colors.accent}
        />
      );
    }
  }

  return <View style={styles.bar}>{fullRating}</View>;
};

export default DrawStars;

const styles = StyleSheet.create({
  bar: {
    marginVertical: 5,
    flexDirection: "row",
  },
  star: {
    marginRight: 5,
  },
});
