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
import AddCardModal from '../components/AddCard';

export default function CompleteOrder() {

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
  const modalRef = useRef();


  const handleCheckoutOrder = async () => {
    navigation.navigate('CompleteOrder')
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
    <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity style={{ alignSelf: 'flex-start', marginLeft: 25, marginTop: -200, marginBottom: 60 }} onPress={() => { navigation.navigate('Checkout') }}>

        <Image source={images.back} style={{ width: 30, height: 30, }} />
      </TouchableOpacity>

      <View style={{ marginHorizontal: 25, alignItems: 'center' }}>
        <Image source={images.check} style={{ width: 165, height: 165, alignSelf: 'center', }} />

        <Text style={{ fontSize: 32, marginTop: 40, color: '#000', fontFamily: commonStyle.fontFamily.medium }}>Order Taken </Text>
        <Text style={{ fontSize: 16, color: '#000', width: 300, textAlign: 'center', fontFamily: commonStyle.fontFamily.semibold }}>Your order have been taken and is being attended to</Text>


        {/* :<ActivityIndicator style={{marginVertical: 30, marginTop: 70}} size={'large'} color={'green'} /> */}

        <Button style={{ width: 250, marginTop: 50 }} onClick={() => {
          // handleCheckoutOrder()
          // modalRef.current.passData(userData.su_id, item.id);
          modalRef.current.getAlert();
        }} text={`Track order`} />
        <AddCardModal
          ref={modalRef} />
        <Button textStyle={{ color: '#403FFC' }} style={{ marginTop: 25, width: 250, backgroundColor: '#e8e8ff' }} onClick={() => {
          // handleCheckoutOrder()
        }} text={`Continue shopping`} />

      </View>
    </View>
  );
}
const styles = StyleSheet.create({

});
