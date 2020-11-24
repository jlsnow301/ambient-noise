import React, { useState, useCallback, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FadeInView } from 'react-native';
import { Rating, AirbnbRating } from 'react-native-elements';

import Colors from "../constants/colors";

const SoundScore = (props) => {
  console.log("Rating is: " + props.rating)
  return (

    <AirbnbRating
      count={6}
      reviews={["Silent", "Light Outdoors", "Normal Conversation", "Light Traffic", "Heavy Machinery", "Unliveable"]}
      defaultRating={3}
      size={20}
    />

  )
};



export default SoundScore;