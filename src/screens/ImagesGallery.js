import React, { useRef, useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  StyleSheet,
  Image,
  ImageBackground,
  ActivityIndicator,
  StatusBar,
  Platform,
} from 'react-native';

import MapImageView from './MapImageView';
import Button from '../components/Button';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import commonStyle from './../constants/commonStyle'
import Header from '../components/Header';
import images from '../constants/images';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import { useGetSingleProductQuery } from '../store/slice/api';
import { store } from '../store/store';
import { newProductImage } from '../store/reducer/mainSlice';

export default function ImagesGallery({route}) {
  
  const isServerImage = route.params.isServerImage
  const newProduct = route.params.newProduct
  const [modalVisible, setModalVisible] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

  const navigation = useNavigation();
  let imageName = useRef('')
  const editProductImages = useSelector((state) => state.user.editProductImages)
  const newProductImages = useSelector((state) => state.user.newProductImages)
  const { data: productData, isLoading: isProductLoading, isError, isFetching } = useGetSingleProductQuery(route.params.product?.id)
  const product = productData ?? {}

  const productImages = useMemo(() => {
    if ((product && Array.isArray(product?.picture) && product.picture.length) && !(Array.isArray(editProductImages) && editProductImages.length) && !(Array.isArray(newProductImages) && newProductImages.length)) {
      return [...product?.picture]
    } else if (!(product && Array.isArray(product?.picture) && product.picture.length) && !(Array.isArray(newProductImages) && newProductImages.length) && (Array.isArray(editProductImages) && editProductImages.length)) {
      return [...editProductImages]
    } else if (!(product && Array.isArray(product?.picture) && product.picture.length) && (Array.isArray(newProductImages) && newProductImages.length) && !(Array.isArray(editProductImages) && editProductImages.length)) {
      return [...newProductImages]
    } else if ((product && Array.isArray(product?.picture) && product.picture.length) && (Array.isArray(editProductImages) && editProductImages.length || (Array.isArray(newProductImages) && newProductImages.length))) {
      if ((product && Array.isArray(product?.picture) && product.picture.length) || (Array.isArray(editProductImages) && editProductImages.length)) {
        return [...product?.picture, ...editProductImages]
      } else if ((product && Array.isArray(product?.picture) && product.picture.length) || (Array.isArray(newProductImages) && newProductImages.length)) {
        return [...product?.picture, ...newProductImages]
      } else {
        return []
      }
    } else {
      return []
    }

  }, [editProductImages, product]);
  const openCamera = () => {
    ImagePicker.openPicker({
      // includeExif: true,
      mediaType: 'photo',
      width: 300,
      height: 400,
    })
      .then((image) => {
        uploadImage(image.path)
      })
      .catch((e) => alert(e));
  };

  const uploadImage = async (path) => {
    setImageLoading(true)
    const filename = path.substring(path.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? path.replace('file://', '') : path
    try {
      const task = await storage().ref(filename).putFile(uploadUri)
      if (task.metadata) {
        imageName.current = task.metadata.fullPath
      }
      let url 
      if (imageName.current) {
        url = await storage().ref(imageName.current).getDownloadURL();
      }
      if (newProduct) {
        store.dispatch(newProductImage(url))
      } else {
        store.dispatch(editProductImages(url))
      }
      setImageLoading(false)
      console.log('fofof1', url);

    } catch (error) {
      setImageLoading(false)
      console.log('error', error);
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Header title="Images" image={images.back} />
      <ScrollView>

        <View
          style={{
            marginTop: 10
          }}>
          <View style={{ flexDirection: 'row', marginHorizontal: 15 }}>
            <View style={styles.centeredView}>
              <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}>
                <StatusBar backgroundColor='#403FFC' barStyle='light-content' />
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <ImageBackground
                      resizeMode='contain'
                      style={{
                        width: '100%',
                        height: '100%',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-end'
                      }}
                      source={{ uri: imageUri }}>

                      <TouchableOpacity
                        style={{
                          position: 'absolute',
                          top: Platform.OS == 'ios' ? 40 : 20,
                          right: 20,
                          backgroundColor: '#fff',
                          width: 50,
                          height: 50,
                          borderRadius: 50,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        onPress={() => {
                          setModalVisible(!modalVisible)
                        }}>
                        <Image
                          source={images.cross}
                          style={{ height: 20, width: 20, tintColor: '#18ad86' }}
                        />
                      </TouchableOpacity>
                    </ImageBackground>
                  </View>
                </View>
              </Modal>

              {!imageLoading && Array.isArray(productImages) && productImages.length ? <MapImageView
                style={{ marginTop: 10 }}
                imageData={productImages}
                isServerImage={isServerImage}
                newProduct={newProduct}
                product={product}
                onPressItem={(imageUri) => {
                  setModalVisible(true)
                  setImageUri(imageUri)
                }}
              /> 
              : imageLoading ? 
              <ActivityIndicator style={{ marginTop: 250, justifyContent: 'center', alignItems: 'center' }} size={'large'} color={'green'} />
              :
                <View style={{ alignItems: 'center', marginTop: 250, justifyContent: 'center' }}>
                  <Text style={{
                    fontSize: 18,
                    color: '#000',
                    fontFamily: commonStyle.fontFamily.bold,
                  }}
                  >No product image yet!</Text>
                </View>}
            </View>
          </View>


        </View>
      </ScrollView>

      <View
        style={{
          position: 'absolute',
          bottom: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          width: "100%"
        }}>
        <View style={{}}>
          <TouchableOpacity
            onPress={() => openCamera()}
            style={[{
              marginHorizontal: 15,
              zIndex: 2,
              elevation: 3,
              backgroundColor: '#818181',
              borderRadius: 15, width: 54, justifyContent: 'center', alignItems: 'center', height: 54
            }, commonStyle.shadow]}>
            <Text style={{ marginTop: -5, color: '#fff', fontSize: 25 }}>+</Text>
          </TouchableOpacity>

        </View>
        <View
          style={{ width: 300 }}>
          <Button text='Done' onClick={() => {
              navigation.goBack()
          }} style={{
            marginHorizontal: 15,
          }} />

        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    marginBottom: 75
  },
  modalView: {
    backgroundColor: "black",
    width: '100%',
    height: '100%'
  },
});