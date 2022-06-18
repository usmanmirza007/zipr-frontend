import React, {useContext} from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  TextInput,
  ImageBackground,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
// import Swiper from 'react-native-web-swiper';

import HomeScreenView from '../components/HomeScreenView';
import images from '../constants/images';
import HomeHeader from '../components/HomeHeader';

const HomeScreen = () => {
  const navigation = useNavigation();

 

  const twoColumnViewDummyData = [
    {text: 'Films', icon: images.film},
    {text: 'TV', icon: images.television},
    {text: 'Live Platform', icon: images.list},
    {text: 'Trailers', icon: images.trailer},
    {text: 'Meetup', icon: images.meetup, premium: true},
    {text: 'Film Career', icon: images.watermark, premium: true},
    {text: 'Fan Page', icon: images.meetup},
    {text: 'Film News', icon: images.meetup},
    {text: 'Celebrities Hub', icon: images.celebrities},
    {text: 'FilmStack Production', icon: images.meetup},
  ];

  return (
    <View style={{flex: 1}}>
      <HomeHeader title={'Home'} />
      <ScrollView overScrollMode={'never'} showsVerticalScrollIndicator={false}>
       
        <View style={{marginVertical: 20, paddingHorizontal: 25}}>
          <HomeScreenView
            style={{marginTop: 5}}
            appData={twoColumnViewDummyData}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const lightStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchImage: {
    marginRight: 15,
    height: 20,
    width: 20,
    marginLeft: 15,
    tintColor: '#757575',
  },
  welcomeText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 25,
  },
  input: {
    fontSize: 16,
    marginLeft: 5,
    width: '80%',
    color: '#000',
  },
});

const drakStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  searchImage: {
    marginRight: 15,
    height: 20,
    width: 20,
    marginLeft: 15,
    tintColor: '#757575',
  },
  welcomeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 25,
  },
  input: {
    fontSize: 16,
    marginLeft: 5,
    width: '80%',
    color: 'white',
  },
});

export default HomeScreen;
