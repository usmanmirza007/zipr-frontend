import React from 'react';
import { View } from 'react-native';

import MapImageView from './MapImageView';

const HomeScreenView = ({ style, appData, }) => {

  var data = [];
  for (let index = 0; index < appData.length; index = index + 2) {
    data.push(
      <View
        key={index}
        style={[
          style,
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10,
          },
        ]}>
        {appData[index] && (
          <MapImageView
            data={appData[index]}
          />
        )}
        {appData[index + 1] && (
          <MapImageView
            data={appData[index + 1]}
          />
        )}
      </View>
    );
  }


  return (
    <>
      {data.map((itemPair) => {
        return itemPair;
      })}
    </>
  );
};

export default HomeScreenView;