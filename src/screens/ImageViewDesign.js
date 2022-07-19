import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import Snackbar from 'react-native-snackbar';

import { useDispatch } from 'react-redux';
import commonStyle from '../constants/commonStyle';
import images from '../constants/images';
import { removeOrderImage } from '../store/reducer/mainSlice';
import { useEditOrderMutation } from '../store/slice/api';

const windowWidth = Dimensions.get('window').width;

const ImageViewDesign = ({style, imageUri, order, isServerImage, onPress = imageUri => null, index}) => {
  const dispatch = useDispatch();

  const [editOrder] = useEditOrderMutation();

  const handleUpdateOrderImage = async (images) => {
    
        const addOrderData = {
          name: order?.name,
          description: order?.description,
          location: order?.location,
          price: order?.price,
          tags: order?.allTags,
          picture: images,
          orderId: order?.id
        }
        editOrder(addOrderData).unwrap()
          .then(() => {
              Snackbar.show({
                text: "Order image has been deleted", duration: Snackbar.LENGTH_SHORT, textColor: '#fff', backgroundColor: '#24A9DF',
              });

          })
          .catch((error) => {
            console.log('err', error);
            Snackbar.show({
              text: error.message, duration: Snackbar.LENGTH_SHORT, textColor: '#fff', backgroundColor: '#24A9DF',
            });
          });
   
  }

  return (
    <View key={index}>
      <TouchableOpacity
        onPress={() => onPress(imageUri)}
        style={[
          style,
          {
            borderWidth: 1,
            borderColor: '#E7EAE9',
            borderRadius: 41,
          },
        ]}>
        <ImageBackground
          imageStyle={{borderRadius: 41}}
          style={{
            width: (windowWidth - 15 * 3) / 2,
            height: 170,
          }}
          source={{uri: imageUri}}>
          <View style={{alignItems: 'flex-end'}}>
            <TouchableOpacity style={[{backgroundColor: '#fff', height: 40, width: 40, marginRight: 15, marginTop: 10, borderRadius: 40, alignItems: 'center', justifyContent: 'center'}, commonStyle.shadow]} 
            onPress={() => {
                if (isServerImage) {
                  // delete image from server api call
                  var images = order?.picture.slice();
                  images.splice(index, 1);
                  handleUpdateOrderImage(images)
                } else {
                  // delete image from redux 
                  dispatch(removeOrderImage(index))
                }

              }}>
              <Image
                style={{width: 20, height: 20, tintColor: 'red', }}
                source={images.cross}
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};
export default ImageViewDesign;
