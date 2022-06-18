import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  ToastAndroid,
  StatusBar,
  View,
  Image,
  ActivityIndicator,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from 'react-native';
// import {AuthContext} from './Context';
import {useNavigation} from '@react-navigation/native';
import SpinnerScreen from './../components/SpinnerScreen';
import {ScrollView} from 'react-native-gesture-handler';
import images from '../constants/images';

// import auth from '@react-native-firebase/auth';
import Header from '../components/Header';
import TextInputs from '../components/TextInputs';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { store } from '../store/store';
import { saveProgram } from '../store/reducer/mainSlice';

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch()
  function validateNumber(phoneNumber) {
    const regex = /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/;
    return regex.test(phoneNumber);
  }
  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  const test = useSelector(state => state.user.isLoggedIn)
  console.log('fooffo',test);
  useEffect(() => {
    dispatch(saveProgram())
  }, []);
  return (
    <View style={{flex: 1}}>
    <Text>sdkfjl</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  welcomeText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 25,
  },
  OrText: {
    color: '#000',
    marginBottom: 20,
    fontSize: 13,
    alignSelf: 'center',
  },
  forgot: {
    color: '#0A0A0A',
    fontSize: 14,
    alignSelf: 'flex-end',
  },
  loginBtn: {
    borderRadius: 5,
    height: 50,
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  loginGoogleBtn: {
    backgroundColor: '#202020',
    borderRadius: 5,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 10,
  },
  loginText: {
    color: '#000',
    alignSelf: 'center',
  },
  signUpText: {
    color: '#000',

    alignSelf: 'center',
  },
  googleText: {
    marginLeft: 10,
    color: '#fff',
  },
});
