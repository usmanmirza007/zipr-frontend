import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import images from '../constants/images';

import commonStyle from '../constants/commonStyle';
import Button from '../components/Button';
import Snackbar from 'react-native-snackbar';
import MyStatusBar from '../components/MyStatusBar';
import { useEditProductMutation, useGetSingleProductQuery } from '../store/slice/api';
import storage from '@react-native-firebase/storage';
import Header from '../components/Header';

export default function DeliveryStatus() {

  // const { data: orderData, isLoading: isOrderLoading, isError, isFetching } = useGetSingleProductQuery()
  // const order = orderData ?? {}

  const [name, setName] = useState('');
  const [price, setPrice] = useState();
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [addTag, setAddTag] = useState('');
  const [picture, setPicture] = useState(null);
  const [allTags, setAllTags] = useState([]);
  const [enable, setEnable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  let imageName = useRef('')
  const navigation = useNavigation();
  const [editOrder] = useEditProductMutation();


  const handleCheckoutOrder = async () => {
    // navigation.navigate('CompleteOrder')
    return

    if (name && description && price && location && allTags) {
      setLoading(true)
      let url
      if (imageName.current) {
        url = await storage().ref(imageName.current).getDownloadURL();
      }

      const addOrderData = {
        name: name,
        description: description,
        location: location,
        price: price,
        tags: allTags,
        picture: url,
        orderId: orderId
      }
      editOrder(addOrderData).unwrap()
        .then(() => {
          Snackbar.show({
            text: "Order has been updated!", duration: Snackbar.LENGTH_SHORT, textColor: '#fff', backgroundColor: '#24A9DF',
          });
          setLoading(false)
          navigation.navigate('Home')

        })
        .catch((error) => {
          console.log('err', error);
          setLoading(false)
          Snackbar.show({
            text: error.data.message, duration: Snackbar.LENGTH_SHORT, textColor: '#fff', backgroundColor: '#24A9DF',
          });
        });

    } else {
      Snackbar.show({
        text: 'Please fill all fields',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: '#24A9DF',
      });
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header title={'Delivery Status'} image={images.back} />
      <ScrollView>
        <View style={{ marginHorizontal: 25 }}>

          <View style={{ flexDirection: "row", justifyContent: 'space-between', marginTop: 20, alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ backgroundColor: '#FFFAEB', width: 80, height: 80, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                <Image source={images.capture} style={{ width: 60, height: 60 }} />
              </View>
              <Text style={{ marginLeft: 15, fontSize: 16, color: '#000', fontFamily: commonStyle.fontFamily.medium }}>Order captured</Text>
            </View>
            <TouchableOpacity style={{ backgroundColor: '#4CD964', width: 35, height: 35, borderRadius: 35, alignItems: 'center', justifyContent: 'center', }}>
              <Image source={images.checkmark} style={{ width: 25, height: 25 }} />
            </TouchableOpacity>
          </View>
          <Image source={images.line} style={{ marginLeft: 35, height: 60 }} />
          <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ backgroundColor: '#F1EFF6', width: 80, height: 80, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                <Image source={images.processing} style={{ width: 60, height: 60 }} />
              </View>
              <Text style={{ marginLeft: 15, fontSize: 16, color: '#000', fontFamily: commonStyle.fontFamily.medium }}>Order is being processed</Text>
            </View>
            <TouchableOpacity style={{ backgroundColor: '#4CD964', width: 35, height: 35, borderRadius: 35, alignItems: 'center', justifyContent: 'center', }}>
              <Image source={images.checkmark} style={{ width: 25, height: 25 }} />
            </TouchableOpacity>
          </View>
          <Image source={images.line} style={{ marginLeft: 35, height: 60 }} />

          <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ backgroundColor: '#FEF0F0', width: 80, height: 80, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                <Image source={images.deliveryMan} style={{ width: 60, height: 60 }} />
              </View>
              <Text style={{ marginLeft: 15, fontSize: 16, width: 200, color: '#000', fontFamily: commonStyle.fontFamily.medium }}>Order is being delivered Your package is on it’s way!</Text>
            </View>
            <TouchableOpacity style={{ backgroundColor: '#4CD964', width: 35, height: 35, borderRadius: 35, alignItems: 'center', justifyContent: 'center', }}>
              <Image source={images.checkmark} style={{ width: 25, height: 25 }} />
            </TouchableOpacity>
          </View>
          <Image source={images.line} style={{ marginLeft: 35, height: 60 }} />
          <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ backgroundColor: '#F0FEF8', width: 80, height: 80, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                <TouchableOpacity style={{ backgroundColor: '#4CD964', width: 35, height: 35, borderRadius: 35, alignItems: 'center', justifyContent: 'center', }}>
                  <Image source={images.checkmark} style={{ width: 25, height: 25 }} />
                </TouchableOpacity>
              </View>
              <Text style={{ marginLeft: 15, fontSize: 16, width: 200, color: '#000', fontFamily: commonStyle.fontFamily.medium }}>Order Received</Text>
            </View>
            <Image source={images.option} resizeMode='contain' style={{ width: 40, height: 40 }} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({

});
