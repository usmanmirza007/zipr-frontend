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
  StatusBar,
  Platform,
} from 'react-native';

import MapImageView from './MapImageView';
import Button from '../components/Button';
import { useSelector } from 'react-redux';

import commonStyle from './../constants/commonStyle'
import Header from '../components/Header';
import images from '../constants/images';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import { useGetSingleOrderQuery } from '../store/slice/api';
import { store } from '../store/store';
import { addOrderImage } from '../store/reducer/mainSlice';

export default function ImagesGallery({route}) {

  const pictures = route.params.pictures
  const isServerImage = route.params.isServerImage
  const [modalVisible, setModalVisible] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const [picture, setPicture] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

  let imageName = useRef('')
  const imageData = useSelector((state) => state.user.orderImages)
  const { data: orderData, isLoading: isOrderLoading, isError, isFetching } = useGetSingleOrderQuery(route.params.order?.id)
  const order = orderData ?? {}
  useEffect(() => {
    console.log('dododo');
  }, [imageData, order]);

  const openCamera = () => {
    ImagePicker.openPicker({
      // includeExif: true,
      width: 300,
      height: 400,
    })
      .then((image) => {
        setPicture(image.path)
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
      setImageLoading(false)
      let url 
      if (imageName.current) {
        url = await storage().ref(imageName.current).getDownloadURL();
      }
      store.dispatch(addOrderImage(url))
        console.log('fofof1');

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

              <MapImageView
                style={{ marginTop: 10 }}
                imageData={order?.picture ? order?.picture : imageData}
                isServerImage={isServerImage}
                order={order}
                onPressItem={(imageUri) => {
                  setModalVisible(true)
                  setImageUri(imageUri)
                }}
              />
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