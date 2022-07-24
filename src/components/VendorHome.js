import React from 'react';
import {
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import HomeScreenView from './HomeScreenView';
import commonStyle from '../constants/commonStyle';
import HomeHeader from './HomeHeader';
import images from '../constants/images';
import { useGetProductsQuery, useGetUserQuery } from '../store/slice/api';

const VendorHome = () => {
  const navigation = useNavigation();
  const { data: productData, isLoading, isError } = useGetProductsQuery()
  const products = productData ?? []
  const { data: userData, isUserLoading } = useGetUserQuery()
  const user = userData ?? {}
  return (
    <View style={{ backgroundColor: '#fff', }}>
      <HomeHeader title={`Welcome, ${user?.firstName ? user.firstName : ''}`} image={images.plus} navigateText={'AddOrder'} />
      <Text style={{ fontSize: 16, marginLeft: 25, color: '#000', fontFamily: commonStyle.fontFamily.semibold }}>All Published Items</Text>
      <ScrollView overScrollMode={'never'} showsVerticalScrollIndicator={false}>

        <View style={{ marginVertical: 20, paddingHorizontal: 25 }}>
          {
            Array.isArray(products) && products.length ?
              <HomeScreenView
                style={{ marginTop: 5 }}
                appData={products}
              />
              : isLoading ?
                <ActivityIndicator style={{ marginVertical: 30, marginTop: 200 }} size={'large'} color={'green'} />
                :
                <View style={{ alignItems: 'center', marginTop: 250, justifyContent: 'center' }}>
                  <Text style={{
                    fontSize: 18,
                    color: '#000',
                    fontFamily: commonStyle.fontFamily.bold,
                  }}
                  >No product yet!</Text>
                </View>
          }
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default VendorHome;
