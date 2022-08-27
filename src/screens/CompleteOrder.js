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

export default function CompleteOrder() {


  const navigation = useNavigation();
  // Checkout > Delivery Details > Payment > Order Confirm > Track orders / Continue Shopping
  return (
    <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity style={{ alignSelf: 'flex-start', marginLeft: 25, marginTop: -200, marginBottom: 60 }} onPress={() => { navigation.navigate('Checkout') }}>

        <Image source={images.back} style={{ width: 30, height: 30, }} />
      </TouchableOpacity>

      <View style={{ marginHorizontal: 25, alignItems: 'center' }}>
        <Image source={images.check} style={{ width: 165, height: 165, alignSelf: 'center', }} />

        <Text style={{ fontSize: 32, marginTop: 40, color: '#000', fontFamily: commonStyle.fontFamily.medium }}>Order Taken </Text>
        <Text style={{ fontSize: 16, color: '#000', width: 300, textAlign: 'center', fontFamily: commonStyle.fontFamily.semibold }}>Your order have been taken and is being attended to</Text>

        {/* <Button style={{ width: 250, marginTop: 50 }} onClick={() => {
          // navigation.navigate('Home');
          // modalRef.current.getAlert();
        }} text={`Track order`} /> */}
        {/* <AddCardModal
          ref={modalRef} totalPrice={price} /> */}
        <Button textStyle={{ color: '#403FFC' }} style={{ marginTop: 25, width: 250, backgroundColor: '#e8e8ff' }} 
        onClick={() => {
          navigation.navigate('Home');

        }} text={`Continue shopping`} />

      </View>
    </View>
  );
}
const styles = StyleSheet.create({

});
