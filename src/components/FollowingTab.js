import React, { useState, useMemo } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  View,
  Image,
  StatusBar,
  Modal,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import commonStyle from '../constants/commonStyle';
import { useGetAllProductQuery, useGetAllTagsQuery, useGetCategoryQuery, useGetSearchProductQuery } from '../store/slice/api';
import TextInputs from './TextInputs';
import images from '../constants/images';
import { Picker } from '@react-native-picker/picker';
import Button from './Button';
import { skipToken } from '@reduxjs/toolkit/dist/query';
const { width, height } = Dimensions.get('window');


const FollowingTab = () => {

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTag, setSelectedTag] = useState('None');
  const [searchModalShow, setSearchModalShow] = useState(false);

  const navigation = useNavigation();
  const { data: categoryData, isLoading: isOrderLoading, } = useGetCategoryQuery()
  const category = categoryData ?? {}
  const { data: tagData, isLoading: isTagLoading, } = useGetAllTagsQuery()
  const tags = tagData ?? {}
  const { data: searchProductData, isLoading: isSearchLoading, } = useGetSearchProductQuery(selectedTag)
  const searchProduct = searchProductData ?? {}

  const { data: productData, isLoading, isError } = useGetAllProductQuery()
  const products = productData ?? []
  
  const categories = useMemo(() => {
    let addCategory = []
    if (Array.isArray(category) && category.length) {
      addCategory.push(...category, { label: "Other", value: "Other" })
    }
    return addCategory
  }, [category])

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
      } else if (selectedCategory == "All") {
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
    } else {
      return []
    }
  }, [search, selectedCategory, filterProducts]);
  let data = selectedTag === 'None' ? filterBySearchProduct : Array.isArray(searchProduct) && searchProduct.length ? searchProduct : filterBySearchProduct;
  return (
    <View style={{ height: '100%' }}>
      <View style={{ marginHorizontal: 25, marginTop: 30, flexDirection: 'row', alignItems: 'center' }}>

        <TextInputs style={{ flex: 1, flexGrow: 1 }} labelText={'Search'} state={search} setState={setSearch} image={images.search} />
        <TouchableOpacity
          onPress={() => {
            if (selectedTag === "None" || selectedTag === '') {
              setSearchModalShow(true)
            } else {
              setSelectedTag('None')
            }

          }} style={{ backgroundColor: '#F7F5F5', height: 50, width: 45, justifyContent: 'center', alignItems: 'center', borderRadius: 5, marginLeft: 10, }}>
          {selectedTag !== "None" && <Image resizeMode='contain' style={{ height: 30, width: 30 }} source={images.circular} />}
          {selectedTag === "None" && <Image resizeMode='contain' style={{ height: 30, width: 30 }} source={images.filter} />}
        </TouchableOpacity>
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
      {Array.isArray(data) && data.length ? data.map((product, index) => {
        let itemStyle = {}
        if (index == data.length - 1) {
          itemStyle = { marginBottom: 20 }
        }
        return (

          <TouchableOpacity
            key={index}
            onPress={() => { navigation.navigate('OrderDetails', { product: product }) }}
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
            <Image style={{ height: 150, borderTopLeftRadius: 10, borderTopRightRadius: 10 }} source={{ uri: product.picture[0] }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, width: '100%' }}>
              <View style={{ marginLeft: 10 }}>
                <Text
                  style={styles.boxText}>
                  {product.name}
                </Text>
                <Text
                  ellipsizeMode='tail'
                  numberOfLines={1}
                  style={styles.boxText}>
                  {product.description}
                </Text>
                <Text
                  style={styles.price}>
                  {parseFloat(product.price).toFixed(2)}
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
          >No product yet!</Text>
        </View>
      }


      <Modal
        animationType="fade"
        transparent={true}
        visible={searchModalShow}>
        <StatusBar
          backgroundColor="rgba(4, 45, 84, 0.8)"
          barStyle="dark-content"
        />
        <TouchableOpacity
          style={{
            width: '100%',
            height: '100%',
            zIndex: 1,
            backgroundColor: 'rgba(4, 45, 84, 0.8)',
          }}
          onPress={() => setSearchModalShow(false)}
        />
        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: 2,
            justifyContent: 'center',
          }}>
          <View
            style={{
              marginHorizontal: 16,
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'flex-end',
              marginBottom: 19,
              backgroundColor: '#fff',
              borderRadius: 45,
              width: 45,
              height: 45
            }}>
            <TouchableOpacity onPress={() => setSearchModalShow(false)}>
              <Image source={images.cross} style={{ width: 25, height: 25 }} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginHorizontal: 16,
              zIndex: 3,
            }}>
            <View
              style={{
                backgroundColor: '#fff',
                borderRadius: 16,
              }}>
              <View
                style={{
                  marginVertical: 16,
                  marginHorizontal: 25,
                }}>
                <Text style={{ fontSize: 15, marginTop: 30, color: '#000', fontFamily: commonStyle.fontFamily.medium }}>Select the tag</Text>
                <View style={{ backgroundColor: '#F7F5F5', borderRadius: 5, marginTop: 17, marginHorizontal: 0 }}>
                  <Picker
                    selectedValue={selectedTag}
                    mode={'dropdown'}
                    onValueChange={(itemValue, itemIndex) => {
                      if (itemValue != "Select tag") {
                        setSearch('')
                        setSelectedTag(itemValue)
                      }
                    }}>
                    <Picker.Item label={'Select tag'} value={'Select tag'} style={{ color: '#757575', fontFamily: commonStyle.fontFamily.medium }} />
                    {Array.isArray(tags) && tags.map((cate, index) => {
                      return (
                        <Picker.Item key={index} label={cate} value={cate} style={{ color: "#000", fontFamily: commonStyle.fontFamily.medium }} />
                      )
                    })}
                  </Picker>
                </View>
              </View>

              <View
                style={{
                  marginBottom: 24,
                  marginHorizontal: 16,
                  marginTop: 30
                }}>

                <Button
                  text="Search"
                  style={{
                  }}
                  onClick={() => {
                    setSearchModalShow(false);
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
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
export default FollowingTab;

