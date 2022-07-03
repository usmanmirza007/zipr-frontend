import React, { useState } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  ImageBackground,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import commonStyle from '../constants/commonStyle';
import images from '../constants/images';
import Button from '../components/Button';


const OrderDetails = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', }}>
      <ImageBackground source={images.bike} style={{ zIndex: 0, height: 300 }} resizeMode='stretch' >
        <TouchableOpacity onPress={() => { navigation.goBack() }}>
          <Image source={images.back} style={{ width: 30, height: 30, tintColor: '#000', marginTop: 15, marginLeft: 20 }} />
        </TouchableOpacity>
      </ImageBackground>
      <ScrollView style={{ zIndex: 111, marginTop: -20, }}>
        <View style={{ backgroundColor: '#fff', borderTopRightRadius: 15, borderTopLeftRadius: 15 }}>

          <View style={{ marginHorizontal: 25, }}>
            <Text style={{ fontSize: 24, marginTop: 16, color: '#000', fontFamily: commonStyle.fontFamily.medium }}>Bicyle</Text>
            <Text style={{ fontSize: 14, marginTop: 7, color: '#000', fontFamily: commonStyle.fontFamily.regular }}>Item description - Lorem impsum gug  wacin igat  amarLorem ipsum dolor sit amet, consectetur adipiscing elit. </Text>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 24 }}>

              <View style={{ flexDirection: 'row', width: 110, justifyContent: 'space-between', alignItems: 'center' }}>
                <TouchableOpacity style={{ backgroundColor: 'rgba(34, 0, 102, 0.12)', width: 32, height: 32, borderRadius: 32, alignItems: 'center', justifyContent: 'center' }}>
                  <Image resizeMode='contain' style={{ height: 15, width: 15 }} source={images.minus} />

                </TouchableOpacity>
                <Text style={{ fontSize: 24, color: '#000', fontFamily: commonStyle.fontFamily.regular }}>1</Text>

                <TouchableOpacity style={{ backgroundColor: 'rgba(34, 0, 102, 0.12)', width: 32, height: 32, borderRadius: 32, alignItems: 'center', justifyContent: 'center' }}>
                  <Image resizeMode='contain' style={{ height: 15, width: 15, tintColor: '#220066' }} source={images.plus} />

                </TouchableOpacity>
              </View>
              <Text style={{ fontSize: 24, color: '#000', fontFamily: commonStyle.fontFamily.medium }}>R0.00</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 30 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ backgroundColor: '#D9D9D9', marginRight: 8, width: 32, height: 32, borderRadius: 32, alignItems: 'center', justifyContent: 'center' }} />
                <Text style={{ fontSize: 18, color: '#000', fontFamily: commonStyle.fontFamily.regular }}>Vender Name</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                <Text style={{ fontSize: 24, color: '#000', marginRight: 8, fontFamily: commonStyle.fontFamily.medium }}>4.2</Text>
                <Image resizeMode='contain' style={{ height: 30, width: 30 }} source={images.rating} />
              </View>

            </View>
            <Text style={{ fontSize: 14, marginTop: 7, color: '#000', fontFamily: commonStyle.fontFamily.regular }}>Vender Bio - Lorem impsum gug  wacin igat  amarLorem ipsum dolor sit amet,. </Text>
            <View style={{ borderColor: '#F3F3F3', opacity: 0.2, borderWidth: .5, marginTop: 20, }} />
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  setSelectedTabButton('all');
                }}
                style={[
                  {
                    paddingHorizontal: 15,
                    width: 'auto',
                    height: 34,
                    marginRight: 8,
                    borderRadius: 10,
                    backgroundColor: '#FAFAFA',
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                ]}>
                <Text
                  style={[
                    { fontFamily: commonStyle.fontFamily.regular, fontSize: 14, },
                  ]}>
                  Tag
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  setSelectedTabButton('all');
                }}
                style={[
                  {
                    paddingHorizontal: 15,
                    width: 'auto',
                    height: 34,
                    borderRadius: 10,
                    marginRight: 8,
                    backgroundColor: '#FAFAFA',
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                ]}>
                <Text
                  style={[
                    { fontFamily: commonStyle.fontFamily.regular, fontSize: 14, },
                  ]}>
                  Tag
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  setSelectedTabButton('all');
                }}
                style={[
                  {
                    paddingHorizontal: 15,
                    width: 'auto',
                    height: 34,
                    marginRight: 8,
                    borderRadius: 10,
                    backgroundColor: '#FAFAFA',
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                ]}>
                <Text
                  style={[
                    { fontFamily: commonStyle.fontFamily.regular, fontSize: 14, },
                  ]}>
                  Tag
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  setSelectedTabButton('all');
                }}
                style={[
                  {
                    paddingHorizontal: 15,
                    width: 'auto',
                    height: 34,
                    marginRight: 8,
                    borderRadius: 10,
                    backgroundColor: '#FAFAFA',
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                ]}>
                <Text
                  style={[
                    { fontFamily: commonStyle.fontFamily.regular, fontSize: 14, },
                  ]}>
                  Tag
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  setSelectedTabButton('all');
                }}
                style={[
                  {
                    paddingHorizontal: 15,
                    width: 'auto',
                    height: 34,
                    marginRight: 8,
                    borderRadius: 10,
                    backgroundColor: '#FAFAFA',
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                ]}>
                <Text
                  style={[
                    { fontFamily: commonStyle.fontFamily.regular, fontSize: 14, },
                  ]}>
                  Tag
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 35 }}>
              <TouchableOpacity style={{ backgroundColor: '#D9D9D9', marginRight: 15, width: 50, height: 50, borderRadius: 50, alignItems: 'center', justifyContent: 'center' }}>
                <Image resizeMode='stretch' style={{ height: 35, width: 35, marginTop: 10 }} source={images.heart} />
              </TouchableOpacity>
              <View style={{ width: '80%' }}>
                <Button onClick={() => {
                }} text={`Add To Basket`} />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },

});

export default OrderDetails;
