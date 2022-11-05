import React, { useMemo, useState } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  ActivityIndicator,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import commonStyle from '../constants/commonStyle';
import { useGetAllOrdersQuery, useGetUserQuery, useUpdateOrderStatusMutation } from '../store/slice/api';
import { orderCaptured, orderDispatched, vender } from '../constants/userType';
import Snackbar from 'react-native-snackbar';


const OngoingTab = () => {
  const navigation = useNavigation();

  const { data: orderData, isLoading: isOrderLoading, isError, isFetching } = useGetAllOrdersQuery()
  const order = orderData ?? {}
  const { data: userData, isLoading: isUserLoading, } = useGetUserQuery()
  const user = userData ?? {}
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const captureOrders = useMemo(() => {
    if (Array.isArray(order.orders) && order.orders.length) {

      return order.orders.filter((order) => order.status === orderCaptured)
    }
  }, [order])

  const handleUpdateOrderStatus = async (orderId) => {

    const updateOrderStatusData = {
      orderStatus: orderDispatched,
      orderId: orderId,
    }
    updateOrderStatus(updateOrderStatusData).unwrap()
      .then(() => {
        Snackbar.show({
          text: "Order status has been update!", duration: Snackbar.LENGTH_SHORT, textColor: '#fff', backgroundColor: '#24A9DF',
        });

      })
      .catch((error) => {
        console.log('err', error);
      });
  }

  return (
    <View style={{ flex: 1 }}>

      <View style={{ marginHorizontal: 25 }}>

        {Array.isArray(captureOrders) && captureOrders.length ? captureOrders.map((order, index) => {
          let itemStyle = {}
          if (index == captureOrders.length - 1) {
            itemStyle = { marginBottom: 20 }
          }
          return (

            <View key={index} style={{ flexDirection: "row", justifyContent: 'space-between', marginTop: 20, alignItems: 'center' }}>
              <TouchableOpacity onPress={() => {
                navigation.navigate('DeliveryStatus', { status: order.status })
              }} style={{ flexDirection: 'row' }}>
                {/* reduce the picture code */}
                <Image source={{ uri: order?.OrderItem[0]?.product?.picture[0] }} style={{ width: 100, height: 100, borderRadius: 10 }} />
                <View style={{ marginLeft: 16 }}>
                  <Text style={{ fontSize: 16, color: '#000', fontFamily: commonStyle.fontFamily.medium }}>Item</Text>
                  <Text style={{ fontSize: 16, color: '#000', fontFamily: commonStyle.fontFamily.medium }}>{order.OrderItem && order.OrderItem.length} packs</Text>
                  <Text style={{ fontSize: 16, color: '#000', fontFamily: commonStyle.fontFamily.medium }}>R {parseFloat(order.price).toFixed(2)}</Text>
                </View>
              </TouchableOpacity>
              {user.userType === vender && <TouchableOpacity onPress={() => {
                handleUpdateOrderStatus(order.id)
              }} style={{ width: 'auto', height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 10, backgroundColor: '#403FFC' }}>
                <Text style={{ fontSize: 16, color: '#fff', fontFamily: commonStyle.fontFamily.regular, paddingHorizontal: 10 }}>Accept</Text>
              </TouchableOpacity>}
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
            >No ongoin order yet!</Text>
          </View>
        }

      </View>
    </View>
  )
};

export default OngoingTab;

