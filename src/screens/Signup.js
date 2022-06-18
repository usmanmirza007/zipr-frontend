import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  ToastAndroid,
  StatusBar,
  View,
  Image,
  ActivityIndicator,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import images from '../constants/images';

import style from '../constants/style';
import Button from '../components/Button';
import MyStatusBar from '../components/MyStatusBar';
import RadioButton from 'react-native-simple-radio-button';
var radio_props = [
  { label: 'Create a customer profile', value: 0 },
  { label: 'Create a vendor profile', value: 1 }
];
const { width, height } = Dimensions.get('window');
export default function Signup() {
  const [first, setFirst] = useState(true);
  const [second, setSecond] = useState(false);

  const navigation = useNavigation();

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const handleSingup = () => {
    if (first) {
      navigation.navigate("CustomerSignup")
    } else if (second) {
      navigation.navigate("VenderSignup")
    }
  }
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <MyStatusBar
        translucent
        barStyle="light-content"
        backgroundColor="#403FFC"
      />
      <ScrollView>

        <ImageBackground source={images.vender} style={{ height: 200 }} resizeMode='stretch' >
        </ImageBackground>
        <Text style={{ fontSize: 28, fontFamily: style.fontFamily.bold, color: '#000', marginTop: 30, marginLeft: 25 }}>Sign Up</Text>

        <View style={{ marginHorizontal: 25 }}>
          <View style={{}}>
            <RadioButton
              style={{ marginVertical: 30 }}
              formHorizontal={false}
              buttonColor='grey'
              selectedButtonColor='#403FFC'
              buttonOuterSize={30}
              buttonSize={20}
              labelStyle={{ fontSize: 16, marginLeft: 20, marginTop: -8, color: '#000', padding: 15, fontFamily: style.fontFamily.medium, }}
              radio_props={radio_props}
              initial={0}
              onPress={(value) => {
                if (value == 0) {
                  setFirst(true)
                  setSecond(false)
                } else if (value == 1) {
                  setFirst(false)
                  setSecond(true)
                }

              }}
            />
          </View>
          <Text style={{ fontSize: 13, marginTop: 0, textAlign: 'center', color: '#000', fontFamily: style.fontFamily.regular }}>Already have a profile? <Text onPress={() => navigation.navigate('Login')} style={{ fontSize: 13, textDecorationLine: 'underline', color: '#403FFC', fontFamily: style.fontFamily.regular }}>Login</Text></Text>

          <View style={{ marginTop: (height - 650) }}>
            <Button onClick={() => {
              handleSingup()
            }} text={`Let's Continue`} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({

});
