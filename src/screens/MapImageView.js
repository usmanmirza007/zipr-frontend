import React from 'react';
import { View } from 'react-native';


import ImageViewDesign from './ImageViewDesign';

const MapImageView = ({ style, imageData, order, isServerImage, onPressItem = (imageUri) => null }) => {
  var data = [];
  const ImageWrapper = ({ data }) => {
    return data;
  }
  for (let index = 0; index < imageData.length; index = index + 2) {
    var itemStyle = {};
    if (index >= 0) {
      itemStyle = { marginLeft: 15 }
    }

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
        {imageData[index] && (
          <ImageViewDesign
            imageUri={imageData[index]}
            index={index}
            isServerImage={isServerImage}
            order={order}
            onPress={onPressItem}
          />
        )}

        {imageData[index + 1] && (
          <ImageViewDesign
            imageUri={imageData[index + 1]}
            index={index + 1}
            style={itemStyle}
            isServerImage={isServerImage}
            order={order}
            onPress={onPressItem}
          />
        )}
        {/* {!imageData[index + 1] && (
          <AddNewPageView index={index + 1} style={itemStyle} />
        )} */}
      </View>
    );
  }

  // if (imageData.length % 2 == 0) {
  //   data.push(
  //     <View style={{
  //       alignSelf: 'flex-start',
  //     }}>
  //       <AddNewPageView style={{ marginTop: 10 }} />
  //     </View>);
  // }

  return (
    <>
      {data.map((itemPair, index) => {
        return <ImageWrapper data={itemPair} key={index} />;
      })}
    </>
  );
};

export default MapImageView