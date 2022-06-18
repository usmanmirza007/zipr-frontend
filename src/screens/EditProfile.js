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

export default function EditProfile() {
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

        <View style={{ backgroundColor: '#403FFC', height: 300 }} >
          <TouchableOpacity onPress={() => { navigation.goBack() }}>
            <Image source={images.back} style={{ width: 30, height: 30, tintColor: '#fff', marginTop: 15, marginLeft: 20 }} />
          </TouchableOpacity>
          <View style={{ alignItems: 'center', marginTop: 80 }}>
            <View style={{ backgroundColor: '#D9D9D9', width: 50, height: 50, borderRadius: 50 / 2, alignItems: 'center', justifyContent: 'center' }}>

              <Image source={images.camera} style={{ width: 30, height: 30 }} />
            </View>
            <Text style={{ fontSize: 16, fontFamily: style.fontFamily.medium, color: '#fff', marginTop: 10 }}>Edit Profile Photo</Text>
          </View>
        </View>

        <View style={{ marginHorizontal: 25 }}>
          <Text style={{ fontSize: 15, fontFamily: style.fontFamily.medium, color: '#000', marginTop: 40 }}>Vendor name</Text>
          <TextInputs style={{ marginTop: 17, }} labelText={'Name'} state={email} setState={setEmail} />
          <Text style={{ fontSize: 15, fontFamily: style.fontFamily.medium, color: '#000', marginTop: 40 }}>Vendor Bio</Text>

            <TextInputs style={{ marginTop: 17 }} multiline={true} labelText={'Bio'} state={email} setState={setEmail} />
          <Text style={{ fontSize: 15, marginTop: 30, color: '#000', fontFamily: style.fontFamily.medium }}>Location</Text>
          <TextInputs style={{ marginTop: 17 }} labelText={'Location'} state={password} setState={setPassword} image={images.location}/>
          <Text style={{ fontSize: 15, marginTop: 30, color: '#000', fontFamily: style.fontFamily.medium }}>Email</Text>
          <TextInputs style={{ marginTop: 17, }} labelText={'Email'} state={email} setState={setEmail} keyBoardType={'email-address'} />

          <View style={{ marginTop: 100 }}>
            <Button onClick={() => {
              handleLogin
            }} text={`Continue`} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({

});
