import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, StyleSheet, View, Image, Switch, } from "react-native";

import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import images from '../constants/images';
import HomeHeader from "../components/HomeHeader";

const Profile = () => {



  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <View style={{flex: 1}}>
      <HomeHeader title={"Profile"} />
      <ScrollView overScrollMode={'never'}>
      
      </ScrollView>
    </View>
  )
}

const lightStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginTop: 10
  },
  proText: {
    fontSize: 18,
    color: '#000',
  },
  image: {
    alignSelf: 'center',
    width: 30,
    height: 30,
    tintColor: 'rgba(117, 117, 117, 1)',
    marginRight: 12
  },
  title: {
    color: '#9E9E9E',
    fontSize: 15
  }
});

const drakStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 10
  },
  proText: {
    fontSize: 18,
    color: '#fff',
  },
  image: {
    alignSelf: 'center',
    width: 30,
    height: 30,
    tintColor: '#048bf8',
    marginRight: 12
  },
  title: {
    color: '#9E9E9E',
    fontSize: 15
  }
});
export default Profile;