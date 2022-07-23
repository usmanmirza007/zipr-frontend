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

import { useDispatch, useSelector } from 'react-redux';
import commonStyle from '../constants/commonStyle';
import images from '../constants/images';
import { removeNewProductImage, removeEditProductImage } from '../store/reducer/mainSlice';
import { useEditProductMutation } from '../store/slice/api';

const windowWidth = Dimensions.get('window').width;

const ImageViewDesign = ({style, imageUri, product, isServerImage, newProduct, onPress = imageUri => null, index}) => {
  const editProductImages = useSelector((state) => state.user.editProductImages)
  const dispatch = useDispatch();

  const [editProduct] = useEditProductMutation();
  const handleUpdateOrderImage = async (images) => {

    const editProductData = {
      name: product?.name,
      description: product?.description,
      location: product?.location,
      price: product?.price,
      tags: product?.allTags,
      picture: images,
      productId: product?.id
    }
    editProduct(editProductData).unwrap()
      .then(() => {
        Snackbar.show({
          text: "Product image has been deleted", duration: Snackbar.LENGTH_SHORT, textColor: '#fff', backgroundColor: '#24A9DF',
        });

      })
      .catch((error) => {
        console.log('err', error);
        Snackbar.show({
          text: error.data.message, duration: Snackbar.LENGTH_SHORT, textColor: '#fff', backgroundColor: '#24A9DF',
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
                  if (Array.isArray(editProductImages) && editProductImages.length) {
                    const productLenght = product?.picture.length
                    if (newProduct) {
                      dispatch(removeNewProductImage(productLenght - index))
                    } else {
                      dispatch(removeEditProductImage(productLenght - index))
                    }
                  } else {
                    // delete image from server api call
                    var images = product?.picture.slice();
                    images.splice(index, 1);
                    handleUpdateOrderImage(images)
                  }
                } else {
                  if (newProduct) {
                    dispatch(removeNewProductImage(index))
                  } else {
                    dispatch(removeEditProductImage(index))
                  }
                  // delete image from redux 
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
