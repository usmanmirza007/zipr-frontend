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
import images from '../constants/images';
import { useGetAllOrdersQuery, useGetOrdersQuery, useGetUserQuery } from '../store/slice/api';
import Header from '../components/Header';
import { orderCaptured, vender } from '../constants/userType';


const PastOrders = () => {
  const [selectTab, setSelectTab] = useState('ongoing');
  const navigation = useNavigation();

  const { data: orderData, isLoading: isOrderLoading, isError, isFetching } = useGetAllOrdersQuery()
  const order = orderData ?? {}
  const { data: userData, isLoading: isUserLoading, } = useGetUserQuery()
  const user = userData ?? {}
  const captureOrders = useMemo(() => {
    if (Array.isArray(order.orders) && order.orders.length) {

      return order.orders.filter((order) => order.status === orderCaptured)
    }
  }, [order])

  // const TabView = (style) => {
  //   // if (allTab) {
  //   //   return <AcceptingOrders style={style} navigation={navigation} />;
  //   // } else if (preparingTab) {
  //   //   return <PreparingOrders style={style} navigation={navigation} />;
  //   // }else if (pickTab) {
  //   //   return <PickOrders style={style} navigation={navigation} />;
  //   // }
  // };

  return (
    <View style={{ flex: 1 }}>
      {/* <HomeHeader title={'Welcome, Chris.'} image={images.frame} navigateText='Checkout' /> */}
      <Header title={'Orders'} image={images.back} />

      <View
        style={{
          flexDirection: 'row',
          marginTop: 14,
          paddingLeft: 25,
          paddingRight: 25,
        }}>
        <ScrollView style={{ marginLeft: -25, marginRight: -25, paddingLeft: 25 }} horizontal={true} showsHorizontalScrollIndicator={false}>
          <TouchableOpacity style={{}}
            onPress={() => {
              setSelectTab('ongoing')
            }}>
            <Text style={{ fontSize: 16, fontFamily: commonStyle.fontFamily.medium, color: '#000', }}>Ongoing</Text>
            {selectTab === 'ongoing' && <View style={{ backgroundColor: '#403FFC', height: 3, marginTop: 5, borderRadius: 2 }} />}
          </TouchableOpacity>
          {user.userType === vender && <TouchableOpacity style={{ marginLeft: 20 }}
            onPress={() => {
              // setSelectTab('dispatched')
            }}>
            <Text style={{ fontSize: 16, fontFamily: commonStyle.fontFamily.medium, color: '#000', }}>Dispatched</Text>
            {selectTab === 'dispatched' && <View style={{ backgroundColor: '#403FFC', height: 3, marginTop: 5, borderRadius: 2 }} />}
          </TouchableOpacity>}
          {user.userType === vender && <TouchableOpacity style={{ marginLeft: 20 }}
            onPress={() => {
              // setSelectTab('delivered')
            }}>
            <Text style={{ fontSize: 16, fontFamily: commonStyle.fontFamily.medium, color: '#000', }}>Delivered</Text>
            {selectTab === 'delivered' && <View style={{ backgroundColor: '#403FFC', height: 3, marginTop: 5, borderRadius: 2 }} />}
          </TouchableOpacity>}
          <TouchableOpacity style={{ marginLeft: 20, paddingRight: 50 }}
            onPress={() => {
              // setSelectTab('completed');
            }}>
            <Text style={{ fontSize: 16, fontFamily: commonStyle.fontFamily.medium, color: '#000', }}>Completed</Text>
            {selectTab === 'completed' && <View style={{ backgroundColor: '#403FFC', height: 3, marginTop: 5, borderRadius: 2 }} />}
          </TouchableOpacity>
        </ScrollView>
      </View>

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
              {user.userType === vender && <TouchableOpacity style={{ width: 80, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 10, backgroundColor: '#403FFC' }}>
                <Text style={{ fontSize: 16, color: '#fff', fontFamily: commonStyle.fontFamily.regular }}>Accept</Text>
              </TouchableOpacity>}
            </View>

          )
        }) : isOrderLoading ?
          <ActivityIndicator style={{ marginVertical: 30, marginTop: 200 }} size={'large'} color={'green'} />
          :
          <View style={{ backgroundColor: 'red', alignItems: 'center', flex: 1, marginTop: 200, justifyContent: 'center' }}>
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

export default PastOrders;

