import React, { useState, useCallback, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FadeInView } from 'react-native';
import { Rating, AirbnbRating } from 'react-native-elements';

import Colors from "../constants/colors";

const SoundScore = (rating) => {
  console.log("Rating is: " + rating)
  return (
    <View>
      <AirbnbRating
        count={6}
        reviews={["Silent", "Light Outdoors", "Normal Conversation", "Light Traffic", "Heavy Machinery", "Unliveable"]}
        defaultRating={3}
        size={20}
      />
    </View>
  )
};


export default SoundScore;