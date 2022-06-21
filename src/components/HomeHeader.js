import React from 'react';
import { Text, StatusBar, View, Image, TouchableOpacity } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useNavigation } from '@react-navigation/native';
import images from '../constants/images';
import MyStatusBar from './MyStatusBar';
import style from '../constants/style';

const HomeHeader = ({ title, image }) => {
  var navigation = useNavigation();

  return (
    <View
      style={{
        // marginTop: StatusBar.currentHeight + getStatusBarHeight(true),
      }}>
      <MyStatusBar
        translucent
        barStyle="light-content"
        backgroundColor="#403FFC"
      />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', marginLeft: 25, marginTop: 20 }}>
          <TouchableOpacity style={{ marginRight: 20 }} onPress={() => navigation.toggleDrawer()}>
            <Image
              source={images.menu}
              resizeMode={'contain'}
              style={{
                width: 30,
                height: 30,
                tintColor: '#000',
                alignSelf: 'center'
              }}
            />
          </TouchableOpacity>
          <Text
            style={{ color: '#000', fontFamily: 'Montserrat-Bold', fontSize: 18 }}
          >
            {title}
          </Text>
        </View>
        <TouchableOpacity style={[{ marginTop: 15, marginRight: 25, backgroundColor: '#fff', width: 50, elevation: 3, height: 50, borderRadius: 50 / 2, alignItems: 'center', justifyContent: 'center' }, style.shadow]} 
        onPress={() => { }}>

          <Image
            source={image}
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
    </View>
  )
}

export default HomeHeader