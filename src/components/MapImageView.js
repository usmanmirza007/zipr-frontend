import React from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

// import * as Actions from './../redux/action';

const MapImageView = ({ data }) => {

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const navigate = (text) => {

    if (text == 'Films') {
      navigation.navigate('Film')
    }
    else if (text == 'Trailers') {
      navigation.navigate('Trailors')
    }
    else if (text == 'Live Platform') {
      navigation.navigate('AllTvList')
    }
    else if (text == 'TV') {
      navigation.navigate('Tv')
    }
    else if (text == 'Production') {
      navigation.navigate('FilmProduction')
    }
    else if (text == 'FilmStack Production') {
      navigation.navigate('FilmStackProduction')
    }
    else if (text == 'Fan Page') {
      navigation.navigate('FanClub')
    }
    else if (text == 'LifeStyle') {
      navigation.navigate('LifeStyleSubCategory')
    }
    else if (text == 'Celebrities Hub') {
      navigation.navigate('CelebritiesHub');
      // dispatch(Actions.searchCelebrity('Michael'));
    }
    else if (text == 'Meetup') {
      navigation.navigate('MeetUpPlan')
    }
  }

  return (
    <TouchableOpacity
      onPress={() => navigate(data.text)}
      style={{
        elevation: 8,
        shadowColor: 'rgba(45, 45, 45,)',
        shadowOpacity: 0.1,
        borderRadius: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.12)',
        flex: 0.48,
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
      }}>

      {data.premium ?
        <View
          style={{
            flex: 1,
            alignItems: 'center',
          }}>
          <View
            style={{ backgroundColor: 'rgba(4, 139, 248, 0.4)', width: '100%', height: 10, position: 'absolute', borderTopLeftRadius: 10, borderTopRightRadius: 10, top: 0, padding: 10 }}>
            <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
              <Text style={{ textAlign: 'right', marginTop: 0, color: '#fff', fontSize: 12 }}>PREMIUM</Text>
            </View>
            <View style={{ alignItems: 'center', marginTop: 30, }}>
              <Image resizeMode='contain' style={lightStyle.searchImage} source={data.icon} />
              <Text style={lightStyle.boxText}>
                {data.text}
              </Text>
            </View>
          </View>
        </View>
        :
        <View
          style={{
            alignItems: 'center',
          }}>
          {data.icon && <Image resizeMode='contain' style={lightStyle.searchImage} source={data.icon} />}
          <Text
            style={lightStyle.boxText}>
            {data.text}
          </Text>
        </View>
      }
    </TouchableOpacity>

  )
};


const lightStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  searchImage: {
    width: 40,
    height: 40,
    tintColor: '#757575'
  },
  welcomeText: {
    fontSize: 15,
    marginTop: 10,
    color: '#000'
  },
  boxText: {
    marginTop: 10,
    color: '#000',
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
    marginHorizontal: 2
  },
});

const drakStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  searchImage: {
    width: 40,
    height: 40,
    tintColor: '#757575'
  },
  welcomeText: {
    fontSize: 15,
    marginTop: 10,
    color: 'white'
  },
  boxText: {
    marginTop: 10,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
    marginHorizontal: 2
  },
});

export default MapImageView;
