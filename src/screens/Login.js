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
} from 'react-native';
// import {AuthContext} from './Context';
import { useNavigation } from '@react-navigation/native';
import SpinnerScreen from './../components/SpinnerScreen';
import { ScrollView } from 'react-native-gesture-handler';
import images from '../constants/images';

// import auth from '@react-native-firebase/auth';
import Header from '../components/Header';
import TextInputs from '../components/TextInputs';
import { Provider, useSelector, useDispatch } from 'react-redux';
import style from '../constants/style';
import Button from '../components/Button';
import Snackbar from 'react-native-snackbar';

export default function Login() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch()

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const handleLogin = () => {
    navigation.navigate("Login")

    return
    if (email && password) {
      if (!validateEmail(email)) {
        Snackbar.show({
          text: 'Please enter valid email',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: '#24A9DF',
        });
      } else {
        navigation.navigate("Login")
      }
    } else {
      Snackbar.show({
        text: 'Please fill all fields',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: '#24A9DF',
      });
    }

  }
  return (
    <View style={styles.container}>
      <ScrollView>

        <ImageBackground source={images.vender} style={{ height: 250, width: '100%' }} resizeMode='stretch' >
          <Text style={{ fontSize: 28, fontFamily: style.fontFamily.bold, color: '#fff', marginTop: 40 }}>Login</Text>
        </ImageBackground>

        <View style={{ marginHorizontal: 25 }}>
          <Text style={{ fontSize: 16, fontFamily: style.fontFamily.medium, color: '#000', marginTop: 40 }}>Email</Text>
          <TextInputs labelText={'Email'} state={email} setState={setEmail} keyBoardType={'email-address'} />
          <Text style={{ fontSize: 16, marginTop: 8, color: '#000', fontFamily: style.fontFamily.medium }}>Password</Text>
          <TextInputs labelText={'Password'} state={password} setState={setPassword} secure={true} />
          <Text style={{ fontSize: 13, marginTop: 8, color: '#000', fontFamily: style.fontFamily.regular }}>Don’t have a profile?  <Text onPress={() => navigation.navigate('Signup')} style={{ fontSize: 13, marginTop: 8, textDecorationLine: 'underline', color: '#403FFC', fontFamily: style.fontFamily.regular }}>Sign Up</Text></Text>

          <View style={{ marginTop: 120 }}>
            <Button onClick={() => {
              handleLogin
            }} text={`Login`} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({

});
