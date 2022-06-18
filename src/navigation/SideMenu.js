import React, { useState, useEffect } from 'react';
import { View, Image, ToastAndroid, StatusBar, TouchableOpacity, Text, StyleSheet, Switch } from 'react-native';

import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import images from './../constants/images'

import { DrawerActions } from '@react-navigation/native';
import MyStatusBar from '../components/MyStatusBar';
import style from '../constants/style';
// import auth from '@react-native-firebase/auth';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';


const SideMenu = () => {
  const navigation = useNavigation()
  // GoogleSignin.configure({
  //   webClientId: '363499471423-vdbo631kvig4rtbv0sgifen745qe3h49.apps.googleusercontent.com',
  // });



  return (
    <View style={{ flex: 1, backgroundColor: '#fff', }}>
      <MyStatusBar
        translucent
        barStyle="light-content"
        backgroundColor="#403FFC"
      />
      <ScrollView style={{}}>
        <TouchableOpacity onPress={() => navigation.navigate('EditProfile')} style={{ marginLeft: 15, marginTop: 20 }}>
          <Text style={{ fofontSize: 16, color: '#000', fontFamily: style.fontFamily.medium,  }}>Edit Profile</Text>
        </TouchableOpacity>
        <View style={{ borderColor: '#2D2D2D', opacity: 0.2, borderWidth: .5, marginTop: 20, }} />
        <TouchableOpacity onPress={() => {}} style={{ marginLeft: 15, marginTop: 20 }}>
          <Text style={{ fofontSize: 16, color: '#000', fontFamily: style.fontFamily.medium,  }}>Settings</Text>
        </TouchableOpacity>
        <View style={{ borderColor: '#2D2D2D', opacity: 0.2, borderWidth: .5, marginTop: 20, }} />
        <TouchableOpacity onPress={() => {}} style={{ marginLeft: 15, marginTop: 20 }}>
          <Text style={{ fofontSize: 16, color: '#000', fontFamily: style.fontFamily.medium,  }}>Orders</Text>
        </TouchableOpacity>
        <View style={{ borderColor: '#2D2D2D', opacity: 0.2, borderWidth: .5, marginTop: 20, }} />

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1
  },
  colortext: {
    color: 'white'
  },

});

export default SideMenu