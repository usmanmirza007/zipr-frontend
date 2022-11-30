import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import images from '../constants/images';

import commonStyle from '../constants/commonStyle';
import Header from '../components/Header';
import { orderCaptured, orderCompleted, orderDeliered, orderDispatched, orderProcessing } from '../constants/userType';
const { width } = Dimensions.get('screen');

export default function DeliveryStatus({route}) {

  const navigation = useNavigation();
  const status = route.params?.status;
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
              <Text style={{ marginLeft: 15,width: width - 180, fontSize: 16, color: '#000', fontFamily: commonStyle.fontFamily.medium }}>Order captured</Text>
            </View>
            <TouchableOpacity style={{ backgroundColor: status == orderCaptured ? '#4CD964' : 'grey' , width: 35, height: 35, borderRadius: 35, alignItems: 'center', justifyContent: 'center', }}>
              <Image source={images.checkmark} style={{ width: 25, height: 25 }} />
            </TouchableOpacity>
          </View>
          <Image source={images.line} style={{ marginLeft: 35, height: 60 }} />
          <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
              <View style={{ backgroundColor: '#F1EFF6', width: 80, height: 80, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                <Image source={images.processing} style={{ width: 60, height: 60 }} />
              </View>
              <Text style={{ marginLeft: 15, width: width - 180, fontSize: 16, color: '#000', fontFamily: commonStyle.fontFamily.medium }}>Order is being processed</Text>
            </View>
            <TouchableOpacity style={{ backgroundColor: status == orderDispatched ?  '#4CD964' : 'grey', width: 35, height: 35, borderRadius: 35, alignItems: 'center', justifyContent: 'center', }}>
              <Image source={images.checkmark} style={{ width: 25, height: 25 }} />
            </TouchableOpacity>
          </View>
          <Image source={images.line} style={{ marginLeft: 35, height: 60 }} />

          <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ backgroundColor: '#FEF0F0', width: 80, height: 80, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                <Image source={images.deliveryMan} style={{ width: 60, height: 60 }} />
              </View>
              <Text style={{ marginLeft: 15, fontSize: 16, width: width - 180, color: '#000', fontFamily: commonStyle.fontFamily.medium }}>Order is being delivered Your package is on it’s way!</Text>
            </View>
            <TouchableOpacity style={{ backgroundColor: status == orderDeliered ?  '#4CD964' : 'grey' , width: 35, height: 35, borderRadius: 35, alignItems: 'center', justifyContent: 'center', }}>
              <Image source={images.checkmark} style={{ width: 25, height: 25 }} />
            </TouchableOpacity>
          </View>
          <Image source={images.line} style={{ marginLeft: 35, height: 60 }} />
          <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ backgroundColor: '#F0FEF8', width: 80, height: 80, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                <TouchableOpacity style={{ backgroundColor: status == orderCompleted ? '#4CD964' : 'grey' , width: 35, height: 35, borderRadius: 35, alignItems: 'center', justifyContent: 'center', }}>
                  <Image source={images.checkmark} style={{ width: 25, height: 25 }} />
                </TouchableOpacity>
              </View>
              <Text style={{ marginLeft: 15, fontSize: 16, width: width - 180, color: '#000', fontFamily: commonStyle.fontFamily.medium }}>Order Received</Text>
            </View>
            <Image source={images.option} resizeMode='contain' style={{ width: 25, height: 25, marginRight: 5 }} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({

});
