import React, { useState, useMemo, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import images from '../constants/images';

import commonStyle from '../constants/commonStyle';
import Button from '../components/Button';
import Snackbar from 'react-native-snackbar';
import { useDeleteOrderMutation, useGetOrdersQuery } from '../store/slice/api';
import Header from '../components/Header';
import { orderPending } from '../constants/userType';
import AddCardModal from '../components/AddCard';

export default function Checkout() {

  const navigation = useNavigation();
  const [deleteProducct] = useDeleteOrderMutation();
  const { data: orderData, isLoading: isOrderLoading, isError, isFetching } = useGetOrdersQuery()
  const orders = orderData ?? {}
  const modalRef = useRef();

  const pendingOrders = useMemo(() => {

    if (Array.isArray(orders) && orders.length) {
      return orders.filter((order) => order.status == orderPending)
    }
  }, [orders])
  // const totalPrice = useMemo(() => {
  //   let price = 0
  //   if (Array.isArray(pendingOrders) && pendingOrders.length) {
  //     for (const order of pendingOrders) {
  //       price += order.price
  //     }
  //   }
  //   return price
  // }, [orders])

  const handleDeleteOrder = async (orderId) => {

    deleteProducct(orderId).unwrap()
      .then(() => {
        Snackbar.show({
          text: "Order has been delete from basket", duration: Snackbar.LENGTH_SHORT, textColor: '#fff', backgroundColor: '#24A9DF',
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
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header title={'My Basket'} image={images.back} />
      <ScrollView>

        <View style={{ marginHorizontal: 25 }}>

          {Array.isArray(pendingOrders) && pendingOrders.length ? pendingOrders.map((order, index) => {
            let itemStyle = {}
            if (index == pendingOrders.length - 1) {
              itemStyle = { marginBottom: 20 }
            }
            return (

              <View key={index} style={{ flexDirection: "row", justifyContent: 'space-between', marginTop: 20, alignItems: 'center' }}>
                <View style={{ flexDirection: 'row' }}>
                  <Image source={{ uri: order?.picture[0] }} style={{ width: 100, height: 100, borderRadius: 10 }} />
                  <View style={{ marginLeft: 16 }}>
                    <Text style={{ fontSize: 16, color: '#000', fontFamily: commonStyle.fontFamily.medium }}>{order.name}</Text>
                    <Text style={{ fontSize: 16, color: '#000', fontFamily: commonStyle.fontFamily.medium }}>{order.quantity} packs</Text>
                    <Text style={{ fontSize: 16, color: '#000', fontFamily: commonStyle.fontFamily.medium }}>R {parseFloat(order.price).toFixed(2)}</Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => { handleDeleteOrder(order.orderItemId) }} style={{}}>
                  <Image source={images.remove} style={{ width: 35, height: 35 }} />
                </TouchableOpacity>
              </View>
            )
          }) : isOrderLoading ?
            <ActivityIndicator style={{ marginVertical: 30, marginTop: 200 }} size={'large'} color={'green'} />
            :
            <View style={{ alignItems: 'center', marginTop: 200, justifyContent: 'center' }}>
              <Text style={{
                fontSize: 18,
                color: '#000',
                fontFamily: commonStyle.fontFamily.bold,
              }}
              >No order yet!</Text>
            </View>
          }

          <View style={{ marginTop: 50, marginBottom: 30, flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <Text style={{ fontSize: 16, color: '#000', fontFamily: commonStyle.fontFamily.bold }}>Total</Text>
              <Text style={{ fontSize: 16, color: '#000', fontFamily: commonStyle.fontFamily.bold }}>R {pendingOrders && pendingOrders[0]?.totalPrice?.toFixed(2)}</Text>
            </View>
            <Button style={{ width: '70%' }} onClick={() => {
              modalRef.current.getAlert();

            }} text={`Checkout`} />
          </View>
          <AddCardModal
            ref={modalRef} totalPrice={pendingOrders && pendingOrders[0]?.totalPrice} />
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({

});
