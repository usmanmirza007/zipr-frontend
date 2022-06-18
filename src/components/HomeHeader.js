import React from 'react';
import { Text, StatusBar, View, Image, TouchableOpacity } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useNavigation } from '@react-navigation/native';
import colors from '../constants/colors';

const HomeHeader = ({ title }) => {
  var navigation = useNavigation();

  return (
    <View
      style={{
        marginTop: StatusBar.currentHeight + getStatusBarHeight(true),
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: 20,
        alignItems: 'center',
        height: 60,
      }}>
      <StatusBar translucent barStyle={"dark-content"} backgroundColor={"#fff"} />

      <View>
        <Text
          style={{ color: '#000', fontFamily: 'Montserrat-Bold', fontSize: 18 }}
        >
          {title}
        </Text>
      </View>
      {/* <TouchableOpacity style={{ position: 'absolute', right: 0 }} onPress={() => navigation.toggleDrawer()}>
        <Image
          source={image}
          resizeMode={'contain'}
          style={{
            width: 30,
            height: 30,
            tintColor: theme ? '#000' : '#fff',
            alignSelf: 'center'
          }}
        />
      </TouchableOpacity> */}
    </View>
  )
}

export default HomeHeader