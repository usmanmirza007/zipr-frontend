import React from 'react';
import {
  Text,
  StyleSheet,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import HomeScreenView from './HomeScreenView';
import commonStyle from '../constants/commonStyle';
import HomeHeader from './HomeHeader';
import images from '../constants/images';
import { useGetOrdersQuery } from '../store/slice/api';

const VendorHome = () => {
  const navigation = useNavigation();
  const { data: orderData, isLoading, isError } = useGetOrdersQuery()
  const orders = orderData ?? []

  return (
    <View style={{ backgroundColor: '#fff', }}>
      <HomeHeader title={'Welcome, Chris.'} image={images.plus} navigateText={'AddOrder'} />
      <Text style={{ fontSize: 16, marginLeft: 25, color: '#000', fontFamily: commonStyle.fontFamily.semibold }}>All Published Items</Text>
      <ScrollView overScrollMode={'never'} showsVerticalScrollIndicator={false}>

        <View style={{ marginVertical: 20, paddingHorizontal: 25 }}>
          <HomeScreenView
            style={{ marginTop: 5 }}
            appData={orders}
          />
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
