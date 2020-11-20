import React from 'react';
import { Rating, AirbnbRating } from 'react-native-elements';

import Colors from "../constants/colors";

const SoundScore = (rating) => {
  console.log("Rating is: " + rating)
  return (
    <View>
      <AirbnbRating />
      <AirbnbRating
        count={6}
        reviews={["Silent", "Light Outdoors", "Normal Conversation", "Light Traffic", "Heavy Machinery", "Unliveable"]}
        defaultRating={3}
        size={20}
      />

      <Rating
        showRating
        onFinishRating={this.ratingCompleted}
        style={{ paddingVertical: 10 }}
      />

      <Rating
        type='bell'
        ratingCount={3}
        imageSize={60}
        showRating
        onFinishRating={this.ratingCompleted}
      />

      {/* const WATER_IMAGE = require('./water.png') */}
      {/* IF WE WANT TO ADD CUSTOM ICON */}

      <Rating
        type='custom'
        ratingImage={WATER_IMAGE}
        ratingColor={Colors.accent}
        ratingBackgroundColor={Colors.grey}
        ratingCount={10}
        imageSize={30}
        onFinishRating={this.ratingCompleted}
        style={{ paddingVertical: 10 }}
      />
    </View>
  )
};


export default SoundScore;