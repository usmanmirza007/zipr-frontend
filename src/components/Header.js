import React from 'react';
import { Text, StatusBar, View, Image, TouchableOpacity } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useNavigation } from '@react-navigation/native';
import colors from '../constants/colors';

const Header = ({ title, image }) => {
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
      <StatusBar translucent barStyle={"light-content"} backgroundColor={ '#000'} />


      <TouchableOpacity style={{ position: 'absolute', left: 0 }} onPress={() => navigation.goBack()}>
        <Image
          source={image}
          resizeMode={'contain'}
          style={{
            width: 30,
            height: 30,
            tintColor: '#000' ,
            alignSelf: 'center'
          }}
        />
      </TouchableOpacity>
      <View>
        <Text
          style={{ color: '#000' , fontFamily: 'Montserrat-Bold', fontSize: 18 }}
        >
          {title}
        </Text>
      </View>
    </View>
  )
}

export default Header