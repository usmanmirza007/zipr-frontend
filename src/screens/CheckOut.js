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
import { useEditOrderMutation, useGetSingleOrderQuery } from '../store/slice/api';
import storage from '@react-native-firebase/storage';
import Header from '../components/Header';

export default function Checkout() {

  // const { data: orderData, isLoading: isOrderLoading, isError, isFetching } = useGetSingleOrderQuery()
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
  const [editOrder] = useEditOrderMutation();


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
            text: error.message, duration: Snackbar.LENGTH_SHORT, textColor: '#fff', backgroundColor: '#24A9DF',
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
      <Header title={'My Basket'} image={images.back} />
      <ScrollView>


        <View style={{ marginHorizontal: 25 }}>

          <View style={{ flexDirection: "row", justifyContent: 'space-between', marginTop: 20, alignItems: 'center' }}>
            <View style={{ flexDirection: 'row' }}>
              <Image source={images.customer} style={{ width: 100, height: 100, borderRadius: 10 }} />
              <View style={{ marginLeft: 16 }}>
                <Text style={{ fontSize: 16, color: '#000', fontFamily: commonStyle.fontFamily.medium }}>Item</Text>
                <Text style={{ fontSize: 16, color: '#000', fontFamily: commonStyle.fontFamily.medium }}>2 packs</Text>
                <Text style={{ fontSize: 16, color: '#000', fontFamily: commonStyle.fontFamily.medium }}>R 25.6</Text>
              </View>
            </View>
            <TouchableOpacity style={{}}>
              <Image source={images.remove} style={{ width: 35, height: 35 }} />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row", justifyContent: 'space-between', marginTop: 20, alignItems: 'center' }}>
            <View style={{ flexDirection: 'row' }}>
              <Image source={images.customer} style={{ width: 100, height: 100, borderRadius: 10 }} />
              <View style={{ marginLeft: 16 }}>
                <Text style={{ fontSize: 16, color: '#000', fontFamily: commonStyle.fontFamily.medium }}>Item</Text>
                <Text style={{ fontSize: 16, color: '#000', fontFamily: commonStyle.fontFamily.medium }}>2 packs</Text>
                <Text style={{ fontSize: 16, color: '#000', fontFamily: commonStyle.fontFamily.medium }}>R 25.6</Text>
              </View>
            </View>
            <TouchableOpacity style={{}}>
              <Image source={images.remove} style={{ width: 35, height: 35 }} />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row", justifyContent: 'space-between', marginTop: 20, alignItems: 'center' }}>
            <View style={{ flexDirection: 'row' }}>
              <Image source={images.customer} style={{ width: 100, height: 100, borderRadius: 10 }} />
              <View style={{ marginLeft: 16 }}>
                <Text style={{ fontSize: 16, color: '#000', fontFamily: commonStyle.fontFamily.medium }}>Item</Text>
                <Text style={{ fontSize: 16, color: '#000', fontFamily: commonStyle.fontFamily.medium }}>2 packs</Text>
                <Text style={{ fontSize: 16, color: '#000', fontFamily: commonStyle.fontFamily.medium }}>R 25.6</Text>
              </View>
            </View>
            <TouchableOpacity style={{}}>
              <Image source={images.remove} style={{ width: 35, height: 35 }} />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row", justifyContent: 'space-between', marginTop: 20, alignItems: 'center' }}>
            <View style={{ flexDirection: 'row' }}>
              <Image source={images.customer} style={{ width: 100, height: 100, borderRadius: 10 }} />
              <View style={{ marginLeft: 16 }}>
                <Text style={{ fontSize: 16, color: '#000', fontFamily: commonStyle.fontFamily.medium }}>Item</Text>
                <Text style={{ fontSize: 16, color: '#000', fontFamily: commonStyle.fontFamily.medium }}>2 packs</Text>
                <Text style={{ fontSize: 16, color: '#000', fontFamily: commonStyle.fontFamily.medium }}>R 25.6</Text>
              </View>
            </View>
            <TouchableOpacity style={{}}>
              <Image source={images.remove} style={{ width: 35, height: 35 }} />
            </TouchableOpacity>
          </View>

          {/* :<ActivityIndicator style={{marginVertical: 30, marginTop: 70}} size={'large'} color={'green'} /> */}
          <View style={{ marginTop: 50, marginBottom: 30, flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <Text style={{ fontSize: 16, color: '#000', fontFamily: commonStyle.fontFamily.bold }}>Total</Text>
              <Text style={{ fontSize: 16, color: '#000', fontFamily: commonStyle.fontFamily.bold }}>R 25.6</Text>
            </View>
            <Button style={{ width: '70%' }} onClick={() => {
              handleCheckoutOrder()
            }} text={`Checkout`} />
          </View>
            <Button style={{ width: '40%' }} onClick={() => {
              navigation.navigate('Delivery Status')
            }} text={`Delivery Status`} />
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({

});
