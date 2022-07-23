import React, { useState, useMemo } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  View,
  Image,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import commonStyle from '../constants/commonStyle';
import HomeHeader from './HomeHeader';
import images from '../constants/images';
import TextInputs from './TextInputs';
import { useGetAllOrderQuery, useGetCategoryQuery, useGetUserQuery } from '../store/slice/api';
import { Picker } from '@react-native-picker/picker';


const CustomerHome = () => {
  const [search, setSearch] = useState('');
  const [selectTab, setSelectTab] = useState('follow');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const navigation = useNavigation();
  const { data: categoryData, isLoading: isOrderLoading, } = useGetCategoryQuery()
  const category = categoryData ?? {}

  const { data: orderData, isLoading, isError } = useGetAllOrderQuery()
  const orders = orderData ?? []

  const { data: userData, isUserLoading } = useGetUserQuery()
  const user = userData ?? {}
    
  const categories = useMemo(() => {
    let addCategory = []
    if (Array.isArray(category) && category.length) {
      addCategory.push(...category, { label: "Other", value: "Other" })
    }
    return addCategory
  }, [category])

  const filterOrder = useMemo(() => {
    if (Array.isArray(orders) && orders.length) {
      let orderData = []
      orders.filter((order) => {
        if (order.category == selectedCategory) {
          orderData.push(order)
          return orderData
        } 
      })

      if (Array.isArray(orderData) && orderData.length) {
        return orderData
      } else if(selectedCategory == "All") {
        return orders
      } else {
        return []
      }
    }
  }, [orders, selectedCategory])

  const filterData = useMemo(() => {
    var searchArray = [];
    if (Array.isArray(filterOrder) && filterOrder.length) {
      searchArray = filterOrder.filter(txt => {
        const text = txt?.name ? txt?.name.toUpperCase() : ''.toUpperCase();
        const textSearch = search.toUpperCase();
        return text.indexOf(textSearch) > -1;
      });
    }
    if (searchArray.length) {
      return searchArray
    } else {
      return []
    }
  }, [search, selectedCategory, filterOrder]);

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
      <HomeHeader title={`Welcome, ${user?.firstName ? user.firstName : ''}`} image={images.frame} navigateText='Checkout' />
      <View style={{ marginHorizontal: 25, marginTop: 30, flexDirection: 'row', alignItems: 'center' }}>

        <TextInputs style={{  }} labelText={'Search'} state={search} setState={setSearch} image={images.search} />
        {/* <TouchableOpacity style={{ backgroundColor: '#F7F5F5', height: 50, width: 45, justifyContent: 'center', alignItems: 'center', borderRadius: 5, marginLeft: 10, }}>
          <Image resizeMode='contain' style={{ height: 30, width: 30 }} source={images.filter} />
        </TouchableOpacity> */}
      </View>
      <View style={{ backgroundColor: '#F7F5F5', borderRadius: 5, marginTop: 17, marginHorizontal: 25 }}>
        <Picker
          selectedValue={selectedCategory}
          mode={'dropdown'}
          onValueChange={(itemValue, itemIndex) => {
            if (itemValue != "Select Category") {
              setSelectedCategory(itemValue)
            }
          }}>
          <Picker.Item label={'Select Category'} value={'Select Category'} style={{ color: '#757575', fontFamily: commonStyle.fontFamily.medium }} />
          {categories.map((cate, index) => {
            return (
              <Picker.Item key={index} label={cate.label} value={cate.value} style={{ color: "#000", fontFamily: commonStyle.fontFamily.medium }} />
            )
          })}
        </Picker>
      </View>


      <View style={{ flexDirection: 'row', marginHorizontal: 25, marginTop: 17 }}>
        <TouchableOpacity style={{}}
          onPress={() => {
            setSelectTab('follow')
          }}>
          <Text style={{ fontSize: 16, fontFamily: commonStyle.fontFamily.medium, color: '#000', }}>Following</Text>
          {selectTab === 'follow' && <View style={{ backgroundColor: '#403FFC', height: 3, marginTop: 5, borderRadius: 2 }} />}
        </TouchableOpacity>
        <TouchableOpacity style={{ marginLeft: 20 }}
          onPress={() => {
            setSelectTab('popular')
          }}>
          <Text style={{ fontSize: 16, fontFamily: commonStyle.fontFamily.medium, color: '#000', }}>Popular</Text>
          {selectTab === 'popular' && <View style={{ backgroundColor: '#403FFC', height: 3, marginTop: 5, borderRadius: 2 }} />}
        </TouchableOpacity>
        <TouchableOpacity style={{ marginLeft: 20 }}
          onPress={() => {
            setSelectTab('favorite')
          }}>
          <Text style={{ fontSize: 16, fontFamily: commonStyle.fontFamily.medium, color: '#000', }}>Favourites</Text>
          {selectTab === 'favorite' && <View style={{ backgroundColor: '#403FFC', height: 3, marginTop: 5, borderRadius: 2 }} />}
        </TouchableOpacity>
      </View>

      { Array.isArray(filterData) && filterData.length ? filterData.map((order, index) => {
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
              <Image style={{ height: 150, borderTopLeftRadius: 10, borderTopRightRadius: 10 }} source={{ uri: order.picture[0] }} />
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
        }) : isLoading ? 
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

