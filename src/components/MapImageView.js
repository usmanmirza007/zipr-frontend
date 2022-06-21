import React from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import style from '../constants/style';


const MapImageView = ({ data }) => {

  const navigation = useNavigation();
  const dispatch = useDispatch();



  return (
    <TouchableOpacity
      onPress={() => { }}
      style={{
        elevation: 8,
        shadowColor: 'rgba(45, 45, 45,)',
        shadowOpacity: 0.1,
        borderRadius: 10,
        backgroundColor: '#F7F5F5',
        flex: 0.48,
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image resizeMode='contain' style={{ height: 80, width: '100%', borderTopLeftRadius: 10, borderTopRightRadius: 10 }} source={data.itemImage} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, width: '100%' }}>
        <View style={{ marginLeft: 10 }}>
          <Text
            style={lightStyle.boxText}>
            {data.text}
          </Text>
          <Text
            style={lightStyle.price}>
            {data.price}
          </Text>
        </View>
        <Image resizeMode='contain' style={{ marginRight: 10, width: 30, height: 30 }} source={data.icon} />
      </View>
    </TouchableOpacity>

  )
};


const lightStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },

  boxText: {
    fontSize: 14,
    color: '#000',
    fontFamily: style.fontFamily.medium,
  },
  price: {
    fontSize: 10,
    color: '#403FFC',
    fontFamily: style.fontFamily.medium,
  },
});

export default MapImageView;
