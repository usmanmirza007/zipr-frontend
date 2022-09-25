import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import images from '../constants/images';

import commonStyle from '../constants/commonStyle';
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

  const handleSignup = () => {
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
      <ScrollView contentContainerStyle={{ flex: 1 }}>

      <View style={{ height: 200, backgroundColor: '#403FFC',  }} >

        </View>
        <Text style={{ fontSize: 28, fontFamily: commonStyle.fontFamily.bold, color: '#000', marginTop: 30, marginLeft: 25 }}>Sign Up</Text>

        <View style={{ marginHorizontal: 25 }}>
          <View style={{ alignItems: 'center' }}>
            <RadioButton
              style={{ marginVertical: 30 }}
              formHorizontal={false}
              buttonColor='grey'
              selectedButtonColor='#403FFC'
              buttonOuterSize={30}
              buttonSize={20}
              labelStyle={{ fontSize: 16, marginLeft: 20, marginTop: -8, color: '#000', padding: 15, fontFamily: commonStyle.fontFamily.medium, }}
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
          <Text style={{ fontSize: 13, marginTop: 0, textAlign: 'center', color: '#000', fontFamily: commonStyle.fontFamily.regular }}>Already have a profile? <Text onPress={() => navigation.navigate('Login')} style={{ fontSize: 13, textDecorationLine: 'underline', color: '#403FFC', fontFamily: commonStyle.fontFamily.regular }}>Login</Text></Text>

        </View>
        <View style={{ flexGrow: 1, justifyContent: 'flex-end', marginHorizontal: 25, marginBottom: 30 }}>
          <Button onClick={() => {
            handleSignup()
          }} text={`Let's Continue`} />
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({

});
