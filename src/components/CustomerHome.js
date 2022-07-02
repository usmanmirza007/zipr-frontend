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
import HomeHeader from './HomeHeader';
import images from '../constants/images';
import TextInputs from './TextInputs';
import { useGetAllOrderQuery } from '../store/slice/api';


const CustomerHome = () => {
  const [search, setSearch] = useState('');
  const [selectTab, setSelectTab] = useState('follow');
  const [selectedTabButton, setSelectedTabButton] = useState('all');
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
      <HomeHeader title={'Welcome, Chris.'} image={images.frame} />
      <View style={{ marginHorizontal: 25, marginTop: 30, flexDirection: 'row', alignItems: 'center' }}>

        <TextInputs style={{ marginTop: 0, width: '84%' }} labelText={'Location'} state={search} setState={setSearch} icon={images.search} />
        <TouchableOpacity style={{ backgroundColor: '#F7F5F5', height: 50, width: 45, justifyContent: 'center', alignItems: 'center', borderRadius: 5, marginLeft: 10, }}>
          <Image resizeMode='contain' style={{ height: 30, width: 30 }} source={images.filter} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 14,
        }}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              setSelectedTabButton('all');
            }}
            style={[
              selectedTabButton === 'all' ? selectedTabButtonStyle : unSelectedTabStyle,
              {
                paddingHorizontal: 15,
                marginLeft: 25,
                height: 20,
                width: 'auto',
                height: 34,
                borderWidth: 1,
                borderRadius: 7,
                borderColor: '#E7EAE9',
                marginRight: 15,
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}>
            <Text
              style={[
                selectedTabButton === 'all' ? selectedTabButtonStyle : unSelectedTabStyle,
                { fontFamily: commonStyle.fontFamily.regular, fontSize: 14, },
              ]}>
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              setSelectedTabButton('tech');
            }}
            style={[
              selectedTabButton === 'tech' ? selectedTabButtonStyle : unSelectedTabStyle,
              {
                paddingHorizontal: 15,
                height: 20,
                width: 'auto',
                height: 34,
                borderWidth: 1,
                borderRadius: 7,
                borderColor: '#E7EAE9',
                marginRight: 15,
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}>
            <Text
              style={[
                selectedTabButton === 'tech' ? selectedTabButtonStyle : unSelectedTabStyle,
                { fontFamily: commonStyle.fontFamily.regular, fontSize: 14 },
              ]}>
              Tech
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              setSelectedTabButton('textbooks');
            }}
            style={[
              selectedTabButton === 'textbooks' ? selectedTabButtonStyle : unSelectedTabStyle,
              {
                paddingHorizontal: 15,
                height: 20,
                width: 'auto',
                height: 34,
                borderWidth: 1,
                borderRadius: 7,
                borderColor: '#E7EAE9',
                marginRight: 15,
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}>
            <Text
              style={[
                selectedTabButton === 'textbooks' ? selectedTabButtonStyle : unSelectedTabStyle,
                { fontFamily: commonStyle.fontFamily.regular, fontSize: 14 },
              ]}>
              Textbooks
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              setSelectedTabButton('AcademicServices');
            }}
            style={[
              selectedTabButton === 'AcademicServices' ? selectedTabButtonStyle : unSelectedTabStyle,
              {
                paddingHorizontal: 15,
                height: 20,
                width: 'auto',
                height: 34,
                borderWidth: 1,
                borderRadius: 7,
                borderColor: '#E7EAE9',
                marginRight: 15,
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}>
            <Text
              style={[
                selectedTabButton === 'AcademicServices' ? selectedTabButtonStyle : unSelectedTabStyle,
                { fontFamily: commonStyle.fontFamily.regular, fontSize: 14 },
              ]}>
              Academic Services
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <View style={{ flexDirection: 'row', marginHorizontal: 25, marginTop: 20 }}>
        <TouchableOpacity style={{}}
          onPress={() => {
            setSelectTab('follow')
          }}>
          <Text style={{ fontSize: 16, fontFamily: commonStyle.fontFamily.medium, color: '#000', }}>Following</Text>
          {selectTab === 'follow' && <View style={{ borderColor: '#403FFC', borderWidth: 2, marginTop: 5, borderRadius: 2 }} />}
        </TouchableOpacity>
        <TouchableOpacity style={{ marginLeft: 20 }}
          onPress={() => {
            setSelectTab('popular')
          }}>
          <Text style={{ fontSize: 16, fontFamily: commonStyle.fontFamily.medium, color: '#000', }}>Popular</Text>
          {selectTab === 'popular' && <View style={{ borderColor: '#403FFC', borderWidth: 2, marginTop: 5, borderRadius: 2 }} />}
        </TouchableOpacity>
        <TouchableOpacity style={{ marginLeft: 20 }}
          onPress={() => {
            setSelectTab('favorite')
          }}>
          <Text style={{ fontSize: 16, fontFamily: commonStyle.fontFamily.medium, color: '#000', }}>Favourites</Text>
          {selectTab === 'favorite' && <View style={{ borderColor: '#403FFC', borderWidth: 2, marginTop: 5, borderRadius: 2 }} />}
        </TouchableOpacity>
      </View>

      {
        Array.isArray(orders) && orders.length ? orders.map((order, index) => {
          return (

            <TouchableOpacity
              key={index}
              onPress={() => { navigation.navigate('OrderDetails') }}
              style={{
                elevation: 8,
                shadowColor: 'rgba(45, 45, 45,)',
                shadowOpacity: 0.1,
                borderRadius: 10,
                marginHorizontal: 25,
                backgroundColor: '#F7F5F5',
                height: 250,
                marginTop: 20,
              }}>
              <Image resizeMode='contain' style={{ height: 150, width: '100%', borderTopLeftRadius: 10, borderTopRightRadius: 10 }} source={{uri: order.picture}} />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, width: '100%' }}>
                <View style={{ marginLeft: 10 }}>
                  <Text
                    style={styles.boxText}>
                    {order.name}
                  </Text>
                  <Text
                    style={styles.boxText}>
                    {order.description}
                  </Text>
                  <Text
                    style={styles.price}>
                    {order.price}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )
        })
        : 
          <View style={{ alignItems: 'center',marginTop: 200, justifyContent: 'center'}}>
            <Text style={{
              fontSize: 18,
              color: '#000',
              fontFamily: commonStyle.fontFamily.bold,
            }}
            >No order yet!</Text>
          </View>
      }
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
export default CustomerHome;

