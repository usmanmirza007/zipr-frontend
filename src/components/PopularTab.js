import React, { useState, useMemo } from 'react';
import {
  Text,
  StyleSheet,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import commonStyle from '../constants/commonStyle';
import { useGetAllProductQuery, useGetCategoryQuery, useGetUserQuery } from '../store/slice/api';


const PopularTab = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const navigation = useNavigation();
  const { data: categoryData, isLoading: isOrderLoading, } = useGetCategoryQuery()
  const category = categoryData ?? {}

  const { data: productData, isLoading, isError } = useGetAllProductQuery()
  const products = productData ?? []
  const { data: userData, isUserLoading } = useGetUserQuery()
  const user = userData ?? {}
    

  const filterProducts = useMemo(() => {
    if (Array.isArray(products) && products.length) {
      let orderData = []
      products.filter((product) => {
        if (product.category == selectedCategory) {
          orderData.push(product)
          return orderData
        } 
      })

      if (Array.isArray(orderData) && orderData.length) {
        return orderData
      } else if(selectedCategory == "All") {
        return products
      } else {
        return []
      }
    }
  }, [products, selectedCategory])
  
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
    }  else {
      return []
    }
  }, [search, selectedCategory, filterProducts]);

  return (
    <View style={{ height: '100%' }}>
      <Text>test</Text>
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
export default PopularTab;

