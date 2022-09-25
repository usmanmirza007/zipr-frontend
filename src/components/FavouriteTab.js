import React, { useState, useMemo } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  View,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import commonStyle from '../constants/commonStyle';
import { useGetCategoryQuery, useGetFavoriteProductQuery } from '../store/slice/api';
import TextInputs from './TextInputs';
import images from '../constants/images';
import { Picker } from '@react-native-picker/picker';


const FavouriteTab = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const navigation = useNavigation();
  const { data: categoryData, isLoading: isOrderLoading, } = useGetCategoryQuery()
  const category = categoryData ?? {}
  const { data: favoriteProductData, isLoading, isError } = useGetFavoriteProductQuery()
  const favoriteProducts = favoriteProductData ?? []

  const categories = useMemo(() => {
    let addCategory = []
    if (Array.isArray(category) && category.length) {
      addCategory.push(...category, { label: "Other", value: "Other" })
    }
    return addCategory
  }, [category])
  const filterProducts = useMemo(() => {
    if (Array.isArray(favoriteProducts) && favoriteProducts.length) {
      let orderData = []
      favoriteProducts.filter((item) => {
        if (item.category == selectedCategory) {
          orderData.push(item)
          return orderData
        }
      })

      if (Array.isArray(orderData) && orderData.length) {
        return orderData
      } else if (selectedCategory == "All") {
        return favoriteProducts
      } else {
        return []
      }
    }
  }, [favoriteProducts, selectedCategory])

  const filterBySearchProduct = useMemo(() => {
    var searchArray = [];
    if (Array.isArray(filterProducts) && filterProducts.length) {
      searchArray = filterProducts.filter(txt => {
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
  }, [search, selectedCategory, filterProducts]);

  return (
    <View style={{ height: '100%' }}>
      <View style={{ marginHorizontal: 25, marginTop: 30, flexDirection: 'row', alignItems: 'center' }}>

        <TextInputs style={{}} labelText={'Search'} state={search} setState={setSearch} image={images.search} />
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
      {Array.isArray(filterBySearchProduct) && filterBySearchProduct.length ? filterBySearchProduct.map((favoriteProduct, index) => {
        let itemStyle = {}
        if (index == filterBySearchProduct.length - 1) {
          itemStyle = { marginBottom: 20 }
        }
        return (

          <TouchableOpacity
            key={index}
            onPress={() => { navigation.navigate('OrderDetails', { product: favoriteProduct }) }}
            style={[{
              elevation: 8,
              shadowColor: 'rgba(45, 45, 45,)',
              shadowOpacity: 0.1,
              borderRadius: 10,
              marginHorizontal: 25,
              backgroundColor: '#F7F5F5',
              height: 250,
              marginTop: 20,
            }, itemStyle]}>
            <Image style={{ height: 150, borderTopLeftRadius: 10, borderTopRightRadius: 10 }} source={{ uri: favoriteProduct.picture[0] }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, width: '100%' }}>
              <View style={{ marginLeft: 10 }}>
                <Text
                  style={styles.boxText}>
                  {favoriteProduct.name}
                </Text>
                <Text
                  ellipsizeMode='tail'
                  numberOfLines={1}
                  style={styles.boxText}>
                  {favoriteProduct.description}
                </Text>
                <Text
                  style={styles.price}>
                  {parseFloat(favoriteProduct.price).toFixed(2)}
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
          >No favorite product yet!</Text>
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
export default FavouriteTab;
