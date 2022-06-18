import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  ToastAndroid,
  StatusBar,
  View,
  Dimensions,
  Image,
  ActivityIndicator,
  ImageBackground,
  TouchableOpacity,
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

const { width, height } = Dimensions.get('window');

export default function VenderSignup() {
  const [name, setName] = useState('');
  const [surename, setSurename] = useState('');
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
    if (email && password && name && surename) {
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
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <MyStatusBar
        translucent
        barStyle="light-content"
        backgroundColor="#403FFC"
      />
      <ScrollView>

        <ImageBackground source={images.vender} style={{ height: 200 }} resizeMode='stretch' >
          <TouchableOpacity onPress={() => {navigation.goBack()}}>
          <Image source={images.back}  style={{width: 30, height: 30,tintColor: '#fff', marginTop: 15, marginLeft: 20 }} />
          </TouchableOpacity>
          <Text style={{ fontSize: 28, fontFamily: style.fontFamily.bold, color: '#fff', marginTop: 100, marginLeft: 25 }}>Vendor Sign Up</Text>
        </ImageBackground>

        <View style={{ marginHorizontal: 25 }}>
          <Text style={{ fontSize: 15, fontFamily: style.fontFamily.medium, color: '#000', marginTop: 40 }}>What is your vendor name?</Text>
          <TextInputs style={{ marginTop: 17,  }} labelText={'Mary’s Textbooks'} state={email} setState={setEmail} />
          <Text style={{ fontSize: 15, fontFamily: style.fontFamily.medium, color: '#000', marginTop: 40 }}>What is your full name?</Text>
         <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>

          <TextInputs style={{ marginTop: 17, width: '45%' }} labelText={'Name'} state={email} setState={setEmail}  />
          <TextInputs style={{ marginTop: 17, width: '45%' }} labelText={'Surename'} state={email} setState={setEmail} />
         </View>
          <Text style={{ fontSize: 15, marginTop: 30, color: '#000', fontFamily: style.fontFamily.medium }}>What is your registered university email?</Text>
          <TextInputs style={{ marginTop: 17,  }} labelText={'Email'} state={email} setState={setEmail} keyBoardType={'email-address'} />
          <Text style={{ fontSize: 15, marginTop: 30, color: '#000', fontFamily: style.fontFamily.medium }}>What is your registered university password?</Text>
          <TextInputs style={{ marginTop: 17 }} labelText={'Enter Password'} state={password} setState={setPassword} secure={true} />

          <View style={{ marginTop: 100 }}>
            <Button onClick={() => {
              handleLogin
            }} text={`Create Account`} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({

});
