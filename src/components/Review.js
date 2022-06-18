import React, { useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';

import images from '../constants/images';

const Review = ({ editable, value, size }) => {
  const [selectReview, setReviewSelect] = useState(value ? value : 0);

  if (!editable && editable !== false) {
    editable = true;
  }

  return (
    <View style={{ flexDirection: 'row' }}>
      {[1, 2, 3, 4, 5].map((starData, index) => (
        <View key={starData}>
          <TouchableOpacity
            disabled={!editable}
            style={{ marginRight: 3 }}
            onPress={() => setReviewSelect(starData)}>
            {starData < selectReview || starData == selectReview ? (
              <Image
                source={size ? images.star_2 : images.star}
                style={{
                  tintColor: 'yellow',
                  height: size ? 34 : 12,
                  width: size ? 34 : 12,
                }}
              />
            ) : (
                <Image
                  source={size ? images.star_2 : images.star}
                  style={{
                    tintColor: 'red',
                    height: size ? 34 : 12,
                    width: size ? 34 : 12,
                  }}
                />
              )}
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default Review;
