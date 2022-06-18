import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  StatusBar,
  View,
  Image,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import images from '../constants/images';
import Button from '../components/Button';
import style from '../constants/style';
import MyStatusBar from '../components/MyStatusBar';
const { width, height } = Dimensions.get('window');

export default function Welcome() {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <MyStatusBar
        translucent
        barStyle="light-content"
        backgroundColor="#403FFC"
      />
      <ScrollView>

        <Image source={images.welcome} style={{ height: 500, width: '100%' }} resizeMode='stretch' />
        <View style={{ marginHorizontal: 25 }}>
          <Text style={{ fontSize: 16, fontFamily: 'Poppins-Bold', color: '#000', marginTop: 40 }}>Tap into an exciting student market</Text>
          <Text style={{ fontSize: 16, marginTop: 8, color: '#000', fontFamily: style.fontFamily.regular }}>What ZIPR does!</Text>
          <View style={{ marginTop: (height - 650) }}>
            <Button onClick={() => {
              navigation.navigate("Login")
            }} text={`Let's Continue`} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})
