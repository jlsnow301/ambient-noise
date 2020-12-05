import React, { useState, useCallback, useEffect } from "react";
import { Rating, AirbnbRating } from "react-native-elements";
import {
  Text,
  View,
  StyleSheet,
  FadeInView,
  TouchableOpacity,
} from "react-native";

import Colors from "../constants/colors";

const SoundScore = (props) => {
  return (
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
      size={20}
    />
  );
};

export default SoundScore;
