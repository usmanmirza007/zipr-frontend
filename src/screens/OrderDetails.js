import React, { useState } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import commonStyle from '../constants/commonStyle';
import images from '../constants/images';
import Button from '../components/Button';
import MyStatusBar from '../components/MyStatusBar';

const windowWidth = Dimensions.get('window').width;

const OrderDetails = ({ route }) => {
  const navigation = useNavigation();
  const product = route.params?.order

  const [count, setCount] = useState(1)
  return (
    <View style={{ flex: 1, backgroundColor: '#fff', }}>
      <MyStatusBar
        translucent
        barStyle="light-content"
        backgroundColor="#403FFC"
      />
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {Array.isArray(product.picture) && product.picture.length && product.picture.map((image, index) => {
          return (
            <Image key={index} source={{ uri: image }} style={{ height: 300, width: windowWidth }} />
          )
        })
        }
      </ScrollView>
      <ScrollView style={{ zIndex: 111, marginTop: -20, }}>
        <View style={{ backgroundColor: '#fff', borderTopRightRadius: 15, borderTopLeftRadius: 15 }}>

          <View style={{ marginHorizontal: 25, }}>
            <Text style={{ fontSize: 24, marginTop: 16, color: '#000', fontFamily: commonStyle.fontFamily.medium }}>{product.name}</Text>
            <Text style={{ fontSize: 14, marginTop: 7, color: '#000', fontFamily: commonStyle.fontFamily.regular }}>{product.description}</Text>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 24 }}>

              <View style={{ flexDirection: 'row', width: 110, justifyContent: 'space-between', alignItems: 'center' }}>
                <TouchableOpacity 
                disabled={count === 1}
                onPress={() => {
                  if (count > 1) {
                    setCount(count - 1)
                  }
                }}
                style={{ backgroundColor: 'rgba(34, 0, 102, 0.12)', width: 32, height: 32, borderRadius: 32, alignItems: 'center', justifyContent: 'center' }}>
                  <Image resizeMode='contain' style={{ height: 15, width: 15 }} source={images.minus} />

                </TouchableOpacity>
                <Text style={{ fontSize: 24, color: '#000', fontFamily: commonStyle.fontFamily.regular }}>{count}</Text>

                <TouchableOpacity 
                onPress={() => {
                  setCount(count + 1)

                }}
                style={{ backgroundColor: 'rgba(34, 0, 102, 0.12)', width: 32, height: 32, borderRadius: 32, alignItems: 'center', justifyContent: 'center' }}>
                  <Image resizeMode='contain' style={{ height: 15, width: 15, tintColor: '#220066' }} source={images.plus} />

                </TouchableOpacity>
              </View>
              <Text style={{ fontSize: 24, color: '#000', fontFamily: commonStyle.fontFamily.medium }}>R {product.price}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 30 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ backgroundColor: '#D9D9D9', marginRight: 8, width: 32, height: 32, borderRadius: 32, alignItems: 'center', justifyContent: 'center' }} />
                <Text style={{ fontSize: 18, color: '#000', fontFamily: commonStyle.fontFamily.regular }}>{product.vender.User[0]?.firstName}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                <Text style={{ fontSize: 24, color: '#000', marginRight: 8, fontFamily: commonStyle.fontFamily.medium }}>4.2</Text>
                <Image resizeMode='contain' style={{ height: 30, width: 30 }} source={images.rating} />
              </View>

            </View>
            <Text style={{ fontSize: 14, marginTop: 7, color: '#000', fontFamily: commonStyle.fontFamily.regular }}>{product.vender.bio}</Text>
            <View style={{ borderColor: '#F3F3F3', opacity: 0.2, borderWidth: .5, marginTop: 20, }} />
            <ScrollView horizontal style={{ paddingVertical: 10, marginLeft: -25, paddingLeft: 25, paddingRight: 20 }} showsHorizontalScrollIndicator={false}>
              <View style={{ flexDirection: 'row', marginTop: 10 }}>
                {Array.isArray(product.tag) && product.tag.length ? product.tag.map((item, index) => {
                  return (
                    <View
                      key={index}
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
                          flexDirection: 'row'
                        },
                      ]}>
                      <Text
                        style={[
                          { fontFamily: commonStyle.fontFamily.regular, fontSize: 14, },
                        ]}>
                        {item}
                      </Text>
                      <TouchableOpacity onPress={() => {
                        setAllTags([...allTags.filter((value) => value !== item)])
                      }}>
                      </TouchableOpacity>
                    </View>
                  )
                })
                  : <Text style={{ fontSize: 15, textAlign: 'center', marginTop: 10, color: '#000', fontFamily: commonStyle.fontFamily.medium }}>No tag yet!</Text>

                }
              </View>
            </ScrollView>

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
