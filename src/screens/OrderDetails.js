import React, { useState } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';
import { useSelector } from 'react-redux';

import commonStyle from '../constants/commonStyle';
import images from '../constants/images';
import Button from '../components/Button';
import MyStatusBar from '../components/MyStatusBar';
import { orderPending } from '../constants/userType';
import { useAddOrderMutation, useGetOrdersPendingQuery, useMakeFavoriteProductMutation } from '../store/slice/api';

const windowWidth = Dimensions.get('window').width;

const OrderDetails = ({ route }) => {
  const navigation = useNavigation();
  const product = route.params?.product

  const [quantity, setQuantity] = useState(1)
  const [addOrder] = useAddOrderMutation();
  const [makeFavoriteProduct] = useMakeFavoriteProductMutation();
  const { data: orderData, isLoading: isOrderLoading, } = useGetOrdersPendingQuery()
  const singlePendingOrder = orderData ?? {}
  const orderId = useSelector((state) => state.user.orderId)

  const handleAddOrder = async () => {

    if (product.name && product.description && product.price && product.picture && quantity) {
      const addOrderData = {
        name: product.name,
        description: product.description,
        price: product.price * quantity,
        pictures: product.picture,
        quantity: quantity,
        orderStatus: orderPending,
        orderId: singlePendingOrder && singlePendingOrder.OrderItem ? singlePendingOrder.OrderItem[0].orderId : null,
        productId: product.id
      }
      addOrder(addOrderData).unwrap()
        .then((data) => {
          Snackbar.show({
            text: "Product has been added in basket", duration: Snackbar.LENGTH_SHORT, textColor: '#fff', backgroundColor: '#24A9DF',
          });
          setQuantity(1)
        })
        .catch((error) => {
          console.log('err', error);
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
  const handleFavoriteProduct = async (product) => {

    if (product && product.id) {
      const addFavoriteData = {
        favorite: true,
        productId: product.id
      }
      makeFavoriteProduct(addFavoriteData).unwrap()
        .then((data) => {
          Snackbar.show({
            text: "Product has been favorite", duration: Snackbar.LENGTH_SHORT, textColor: '#fff', backgroundColor: '#24A9DF',
          });
        })
        .catch((error) => {
          console.log('err', error);
          Snackbar.show({
            text: error.data.message, duration: Snackbar.LENGTH_SHORT, textColor: '#fff', backgroundColor: '#24A9DF',
          });
        });

    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', }}>
      <MyStatusBar
        translucent
        barStyle="light-content"
        backgroundColor="#403FFC"
      />
      {!isOrderLoading ?
        <>
          <ScrollView horizontal={true} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
            {Array.isArray(product.picture) && product.picture.length && product.picture.map((image, index) => {
              return (
                <Image key={index} source={{ uri: image }} style={{ height: 300, width: windowWidth }} />
              )
            })
            }
          </ScrollView>
          <TouchableOpacity onPress={() => { navigation.goBack() }} style={[{ position: 'absolute', top: 50, left: 20, backgroundColor: '#fff', width: 50, elevation: 3, height: 50, borderRadius: 50 / 2 }, commonStyle.shadow]} >

            <Image source={images.back} style={{ width: 30, height: 30, tintColor: '#000', alignSelf: 'center', marginLeft: -4, marginTop: 10 }} />
          </TouchableOpacity>
          <ScrollView style={{ marginTop: -170, backgroundColor: '#fff', borderTopRightRadius: 15, borderTopLeftRadius: 15 }}>
            <View style={{ marginHorizontal: 25, }}>
              <Text style={{ fontSize: 24, marginTop: 16, color: '#000', fontFamily: commonStyle.fontFamily.medium }}>{product.name}</Text>
              <Text style={{ fontSize: 14, marginTop: 7, color: '#000', fontFamily: commonStyle.fontFamily.regular }}>{product.description}</Text>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 24 }}>

                <View style={{ flexDirection: 'row', width: 110, justifyContent: 'space-between', alignItems: 'center' }}>
                  <TouchableOpacity
                    disabled={quantity === 1}
                    onPress={() => {
                      if (quantity > 1) {
                        setQuantity(quantity - 1)
                      }
                    }}
                    style={{ backgroundColor: 'rgba(34, 0, 102, 0.12)', width: 32, height: 32, borderRadius: 32, alignItems: 'center', justifyContent: 'center' }}>
                    <Image resizeMode='contain' style={{ height: 15, width: 15 }} source={images.minus} />

                  </TouchableOpacity>
                  <Text style={{ fontSize: 24, color: '#000', fontFamily: commonStyle.fontFamily.regular }}>{quantity}</Text>

                  <TouchableOpacity
                    onPress={() => {
                      setQuantity(quantity + 1)

                    }}
                    style={{ backgroundColor: 'rgba(34, 0, 102, 0.12)', width: 32, height: 32, borderRadius: 32, alignItems: 'center', justifyContent: 'center' }}>
                    <Image resizeMode='contain' style={{ height: 15, width: 15, tintColor: '#220066' }} source={images.plus} />

                  </TouchableOpacity>
                </View>
                <Text style={{ fontSize: 24, color: '#000', fontFamily: commonStyle.fontFamily.medium }}>R {(product.price * quantity).toFixed(1)}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 30 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <View style={{ backgroundColor: '#D9D9D9', marginRight: 8, width: 32, height: 32, borderRadius: 32, alignItems: 'center', justifyContent: 'center' }} />
                  <Text style={{ fontSize: 18, color: '#000', fontFamily: commonStyle.fontFamily.regular }}>{product.vender.User[0]?.firstName}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                  <Text style={{ fontSize: 24, color: '#000', marginRight: 8, fontFamily: commonStyle.fontFamily.medium }}>{product.rating}</Text>
                  <Image resizeMode='contain' style={{ height: 30, width: 30 }} source={images.rating} />
                </View>

              </View>
              <Text style={{ fontSize: 14, marginTop: 7, color: '#000', fontFamily: commonStyle.fontFamily.regular }}>{product.vender.bio}</Text>
              <View style={{ borderColor: '#F3F3F3', opacity: 0.2, borderWidth: .5, marginTop: 20, }} />
              <ScrollView horizontal style={{ paddingVertical: 10, marginLeft: -25, paddingLeft: 25, paddingRight: 20 }} showsHorizontalScrollIndicator={false}>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                  {Array.isArray(product.tag) && product.tag.length ? product.tag.map((item, index) => {
                    return (
                      <View
                        key={index}
                        style={[
                          {
                            paddingHorizontal: 15,
                            width: 'auto',
                            height: 34,
                            marginRight: 8,
                            borderRadius: 10,
                            backgroundColor: '#FAFAFA',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row'
                          },
                        ]}>
                        <Text
                          style={[
                            { fontFamily: commonStyle.fontFamily.regular, fontSize: 14, },
                          ]}>
                          {item}
                        </Text>
                        <TouchableOpacity onPress={() => {
                          setAllTags([...allTags.filter((value) => value !== item)])
                        }}>
                        </TouchableOpacity>
                      </View>
                    )
                  })
                    : <Text style={{ fontSize: 15, textAlign: 'center', marginTop: 10, color: '#000', fontFamily: commonStyle.fontFamily.medium }}>No tag yet!</Text>

                  }
                </View>
              </ScrollView>

              <View style={{ flexDirection: 'row', marginTop: 35 }}>
                <TouchableOpacity
                  onPress={() => {
                    handleFavoriteProduct(product)
                  }} style={{ backgroundColor: '#D9D9D9', marginRight: 15, width: 50, height: 50, borderRadius: 50, alignItems: 'center', justifyContent: 'center' }}>
                  <Image resizeMode='stretch' style={{ height: 35, width: 35, marginTop: 10 }} source={images.heart} />
                </TouchableOpacity>
                <View style={{ width: '80%' }}>
                  <Button onClick={() => {
                    handleAddOrder()
                  }} text={`Add To Basket`} />
                </View>
              </View>
            </View>
          </ScrollView>
        </> : <ActivityIndicator style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} size={'large'} color={'green'} />}
    </View>
  )
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },

});

export default OrderDetails;
