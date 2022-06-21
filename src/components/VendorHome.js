import React from 'react';
import {
  Text,
  StyleSheet,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import HomeScreenView from './HomeScreenView';
import style from '../constants/style';
import HomeHeader from './HomeHeader';
import images from '../constants/images';

const VendorHome = () => {
  const navigation = useNavigation();

  const twoColumnViewDummyData = [
    {text: 'Item', price: 'Rs 12.25', icon: images.option, itemImage: images.vender},
    {text: 'Item', price: 'Rs 12.25', icon: images.option, itemImage: images.vender},
    {text: 'Item', price: 'Rs 12.25', icon: images.option, itemImage: images.vender},
    {text: 'Item', price: 'Rs 12.25', icon: images.option, itemImage: images.vender},
    {text: 'Item', price: 'Rs 12.25', icon: images.option, itemImage: images.vender},
    {text: 'Item', price: 'Rs 12.25', icon: images.option, itemImage: images.vender},
    {text: 'Item', price: 'Rs 12.25', icon: images.option, itemImage: images.vender},
    {text: 'Item', price: 'Rs 12.25', icon: images.option, itemImage: images.vender},
    {text: 'Item', price: 'Rs 12.25', icon: images.option, itemImage: images.vender},
    {text: 'Item', price: 'Rs 12.25', icon: images.option, itemImage: images.vender},
    {text: 'Item', price: 'Rs 12.25', icon: images.option, itemImage: images.vender},
  ];

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <HomeHeader title={'Welcome, Chris.'} image={images.plus} />
      <Text style={{fontSize: 16,marginLeft: 25,color: '#000', fontFamily: style.fontFamily.semibold}}>All Published Items</Text>
      <ScrollView overScrollMode={'never'} showsVerticalScrollIndicator={false}>
       
        <View style={{marginVertical: 20, paddingHorizontal: 25}}>
          <HomeScreenView
            style={{marginTop: 5}}
            appData={twoColumnViewDummyData}
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
