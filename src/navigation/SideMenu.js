import React, { useState, useEffect } from 'react';
import { View, Image, ToastAndroid, StatusBar, TouchableOpacity, Text, StyleSheet, Switch } from 'react-native';

import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import images from './../constants/images'

import { DrawerActions } from '@react-navigation/native';
// import auth from '@react-native-firebase/auth';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';


const SideMenu = () => {
  const navigation = useNavigation()
  // GoogleSignin.configure({
  //   webClientId: '363499471423-vdbo631kvig4rtbv0sgifen745qe3h49.apps.googleusercontent.com',
  // });



  return (
    <View style={{ flex: 1, backgroundColor: '#131313', }}>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="#000"
      />
      {/* <ScrollView style={{}}>
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.closeDrawer())} style={{ marginTop: 40, marginLeft: 15 }}>
          <Image resizeMode='contain' style={{ height: 20, width: 20, tintColor: '#9F9F9F' }} source={images.cross} />
        </TouchableOpacity>
        <View style={{ borderColor: '#2D2D2D', opacity: 0.2, borderWidth: .5, marginTop: 50, }} />
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} style={{ marginLeft: 15, marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
          <Image resizeMode='contain' style={{ height: 25, width: 25, marginRight: 15, tintColor: '#9F9F9F' }} source={images.home} />
          <Text style={{ fontSize: 15, color: '#9F9F9F' }}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} style={{ marginLeft: 15, marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>

          <Switch

            trackColor={{ false: '#767577', true: '#18ad86' }}
            // thumbColor={enabled ? '#f4f3f4' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            style={{ marginTop: 5, transform: [{ scaleX: .9 }, { scaleY: .9 }] }}
            value={enable}
          />
          <Text style={{ fontSize: 15, color: '#9F9F9F' }}>Change Theme</Text>
        </TouchableOpacity>
        <View style={{ borderColor: '#2D2D2D', opacity: 0.2, borderWidth: .5, marginTop: 10, }} />
        <TouchableOpacity style={{ marginLeft: 15, marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
          <Image resizeMode='contain' style={{ height: 25, width: 25, marginRight: 15, tintColor: '#9F9F9F' }} source={images.settings} />
          <Text style={{ fontSize: 15, color: '#9F9F9F' }}>Settings</Text>
        </TouchableOpacity>
        <View style={{ borderColor: '#2D2D2D', opacity: 0.2, borderWidth: .5, marginTop: 10, }} />
        <TouchableOpacity style={{ marginLeft: 15, marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
          <Image resizeMode='contain' style={{ height: 25, width: 25, marginRight: 15, tintColor: '#9F9F9F' }} source={images.information} />
          <Text style={{ fontSize: 15, color: '#9F9F9F' }}>About</Text>
        </TouchableOpacity>
        <View style={{ borderColor: '#2D2D2D', opacity: 0.2, borderWidth: .5, marginTop: 10, }} />
        <TouchableOpacity onPress={async () => {
          context.signOut()
          await GoogleSignin.signOut()
        }}
          style={{ marginLeft: 15, marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
          <Image resizeMode='contain' style={{ height: 25, width: 25, marginRight: 15, tintColor: '#9F9F9F' }} source={images.logout} />
          <Text style={{ fontSize: 15, color: '#9F9F9F' }}>Logout</Text>
        </TouchableOpacity>
        <View style={{ borderColor: '#2D2D2D', opacity: 0.2, borderWidth: .5, marginTop: 10, }} />
      </ScrollView> */}
    </View>
  );
}

// export default sideMenu
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