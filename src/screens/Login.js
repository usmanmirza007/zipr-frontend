import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  ToastAndroid,
  StatusBar,
  View,
  Image,
  ActivityIndicator,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import images from '../constants/images';

import TextInputs from '../components/TextInputs';
import { useSelector, useDispatch } from 'react-redux';
import style from '../constants/style';
import Button from '../components/Button';
import Snackbar from 'react-native-snackbar';
import MyStatusBar from '../components/MyStatusBar';
import { useLoginMutation } from '../store/slice/api';
import { loggedIn } from '../store/reducer/mainSlice';
import { store } from '../store/store';

const { width, height } = Dimensions.get('window');

export default function Login() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch()
  
  const [login] = useLoginMutation();

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const handleLogin = () => {

    if (email && password) {
      if (!validateEmail(email)) {
        Snackbar.show({
          text: 'Please enter valid email',duration: Snackbar.LENGTH_SHORT,textColor: '#fff', backgroundColor: '#24A9DF',
        });
      } else {
        const loginData = {
          email: email,
          password: password,
        }
        login(loginData).unwrap()
          .then((data) => {
            if (data) {
              Snackbar.show({
                text: `${data.type.toLowerCase()} has been login succssfuly`, duration: Snackbar.LENGTH_SHORT,textColor: '#fff',  backgroundColor: '#24A9DF',
              });
              dispatch(loggedIn({
                token: data.token,
                type: data.type
              }))
            }
          })
          .catch((error) => {
            Snackbar.show({
              text: error.data.message, duration: Snackbar.LENGTH_SHORT,textColor: '#fff', backgroundColor: '#24A9DF',
            });
          });
      }
    } else {
      Snackbar.show({
        text: 'Please fill all fields',
        duration: Snackbar.LENGTH_SHORT,textColor: '#fff', 
        backgroundColor: '#24A9DF',
      });
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
          <Text style={{ fontSize: 28, fontFamily: style.fontFamily.bold, color: '#fff', marginTop: 140, marginLeft: 25 }}>Login</Text>
        </ImageBackground>

        <View style={{ marginHorizontal: 25 }}>
          <Text style={{ fontSize: 16, fontFamily: style.fontFamily.medium, color: '#000', marginTop: 40 }}>Email</Text>
          <TextInputs style={{ marginTop: 17 }} labelText={'Enter Email'} state={email} setState={setEmail} keyBoardType={'email-address'} />
          <Text style={{ fontSize: 16, marginTop: 30, color: '#000', fontFamily: style.fontFamily.medium }}>Password</Text>
          <TextInputs style={{ marginTop: 17 }} labelText={'Enter Password'} state={password} setState={setPassword} secure={true} />
          <Text style={{ fontSize: 13, marginTop: 50, textAlign: 'center', color: '#000', fontFamily: style.fontFamily.regular }}>Don’t have a profile?  <Text onPress={() => navigation.navigate('Signup')} style={{ fontSize: 13, textDecorationLine: 'underline', color: '#403FFC', fontFamily: style.fontFamily.regular }}>Sign Up</Text></Text>

          <View style={{ marginTop: (height - 650) }}>
            <Button onClick={() => {
              handleLogin()
            }} text={`Login`} />
          </View>
        </View>
      </ScrollView>

    </View>
  );
}
const styles = StyleSheet.create({

});
