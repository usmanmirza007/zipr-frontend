import React, { useState } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import commonStyle from '../constants/commonStyle';
import images from '../constants/images';
import { useGetAllOrderQuery } from '../store/slice/api';
import Header from '../components/Header';


const PastOrders = () => {
  const [search, setSearch] = useState('');
  const [selectTab, setSelectTab] = useState('follow');
  const navigation = useNavigation();

  const { data: orderData, isLoading, isError } = useGetAllOrderQuery()
  const orders = orderData ?? []

  var selectedTabButtonStyle = {
    backgroundColor: '#403FFC',
    color: 'white',
  };
  var unSelectedTabStyle = {
    backgroundColor: '#fff',
    color: 'black',
  };
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
    <View style={{ height: '100%' }}>
      {/* <HomeHeader title={'Welcome, Chris.'} image={images.frame} navigateText='Checkout' /> */}
      <Header title={'Orders'} image={images.back} />


      <View style={{ flexDirection: 'row', marginHorizontal: 25, marginTop: 20 }}>
        <TouchableOpacity style={{}}
          onPress={() => {
            setSelectTab('follow')
          }}>
          <Text style={{ fontSize: 16, fontFamily: commonStyle.fontFamily.medium, color: '#000', }}>Ongoing</Text>
          {selectTab === 'follow' && <View style={{ backgroundColor: '#403FFC', height: 3, marginTop: 5, borderRadius: 2 }} />}
        </TouchableOpacity>
        <TouchableOpacity style={{ marginLeft: 20 }}
          onPress={() => {
            setSelectTab('popular')
          }}>
          <Text style={{ fontSize: 16, fontFamily: commonStyle.fontFamily.medium, color: '#000', }}>Completed</Text>
          {selectTab === 'popular' && <View style={{ backgroundColor: '#403FFC', height: 3, marginTop: 5, borderRadius: 2 }} />}
        </TouchableOpacity>
      </View>
      <View style={{ marginHorizontal: 25 }}>

        <View style={{ flexDirection: "row", justifyContent: 'space-between', marginTop: 20, alignItems: 'center' }}>
          <View style={{ flexDirection: 'row' }}>
            <Image source={images.customer} style={{ width: 100, height: 100, borderRadius: 10 }} />
            <View style={{ marginLeft: 16 }}>
              <Text style={{ fontSize: 16, color: '#000', fontFamily: commonStyle.fontFamily.medium }}>Item</Text>
              <Text style={{ fontSize: 16, color: '#000', fontFamily: commonStyle.fontFamily.medium }}>2 packs</Text>
              <Text style={{ fontSize: 16, color: '#000', fontFamily: commonStyle.fontFamily.medium }}>R 256.6</Text>
            </View>
          </View>
          <TouchableOpacity style={{ width: 80, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 10, backgroundColor: '#403FFC' }}>
            <Text style={{ fontSize: 16, color: '#fff', fontFamily: commonStyle.fontFamily.regular }}>Accept</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", justifyContent: 'space-between', marginTop: 20, alignItems: 'center' }}>
          <View style={{ flexDirection: 'row' }}>
            <Image source={images.customer} style={{ width: 100, height: 100, borderRadius: 10 }} />
            <View style={{ marginLeft: 16 }}>
              <Text style={{ fontSize: 16, color: '#000', fontFamily: commonStyle.fontFamily.medium }}>Item</Text>
              <Text style={{ fontSize: 16, color: '#000', fontFamily: commonStyle.fontFamily.medium }}>2 packs</Text>
              <Text style={{ fontSize: 16, color: '#000', fontFamily: commonStyle.fontFamily.medium }}>R 256.6</Text>
            </View>
          </View>
          <TouchableOpacity style={{ width: 80, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 10, backgroundColor: '#403FFC' }}>
            <Text style={{ fontSize: 16, color: '#fff', fontFamily: commonStyle.fontFamily.regular }}>Accept</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", justifyContent: 'space-between', marginTop: 20, alignItems: 'center' }}>
          <View style={{ flexDirection: 'row' }}>
            <Image source={images.customer} style={{ width: 100, height: 100, borderRadius: 10 }} />
            <View style={{ marginLeft: 16 }}>
              <Text style={{ fontSize: 16, color: '#000', fontFamily: commonStyle.fontFamily.medium }}>Item</Text>
              <Text style={{ fontSize: 16, color: '#000', fontFamily: commonStyle.fontFamily.medium }}>2 packs</Text>
              <Text style={{ fontSize: 16, color: '#000', fontFamily: commonStyle.fontFamily.medium }}>R 256.6</Text>
            </View>
          </View>
          <TouchableOpacity style={{ width: 80, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 10, backgroundColor: '#403FFC' }}>
            <Text style={{ fontSize: 16, color: '#fff', fontFamily: commonStyle.fontFamily.regular }}>Accept</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* {
        : 
          <View style={{ alignItems: 'center',marginTop: 200, justifyContent: 'center'}}>
            <Text style={{
              fontSize: 18,
              color: '#000',
              fontFamily: commonStyle.fontFamily.bold,
            }}
            >No order yet!</Text>
          </View>
      } */}
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },

  boxText: {
    fontSize: 14,
    color: '#000',
    fontFamily: commonStyle.fontFamily.medium,
  },
  price: {
    fontSize: 10,
    color: '#403FFC',
    fontFamily: commonStyle.fontFamily.medium,
  },
});
export default PastOrders;

