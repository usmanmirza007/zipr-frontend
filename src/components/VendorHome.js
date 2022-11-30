import React from 'react';
import {
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  View,
  Dimensions,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import HomeScreenView from './HomeScreenView';
import commonStyle from '../constants/commonStyle';
import HomeHeader from './HomeHeader';
import images from '../constants/images';
import { useGetProductsQuery, useGetUserQuery } from '../store/slice/api';
const { width, height } = Dimensions.get('window');

const VendorHome = () => {
  const navigation = useNavigation();
  const { data: productData, isLoading, isError } = useGetProductsQuery()
  const products = productData ?? []
  const { data: userData, isUserLoading } = useGetUserQuery()
  const user = userData ?? {}
  return (
    <View style={{ backgroundColor: '#fff', height: height }}>
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
      <TouchableOpacity style={[{ backgroundColor: '#fff', position: 'absolute', zIndex: 111, bottom: 5, right: 25, width: 50, elevation: 3, height: 50, borderRadius: 50 / 2, alignItems: 'center', justifyContent: 'center' }, commonStyle.shadow]}
        onPress={() => { navigation.navigate('MessageList') }}>

        <Image
          source={images.chat}
          resizeMode={'contain'}
          style={{
            width: 25,
            height: 25,
            tintColor: '#403FFC',
            alignSelf: 'center',
          }}
        />
      </TouchableOpacity>
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
