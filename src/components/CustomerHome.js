import React, { useState } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import commonStyle from '../constants/commonStyle';
import HomeHeader from './HomeHeader';
import images from '../constants/images';
import { useGetUserQuery } from '../store/slice/api';
import FollowingTab from './FollowingTab';
import PopularTab from './PopularTab';
import FavouriteTab from './FavouriteTab';


const CustomerHome = () => {
  const [selectTab, setSelectTab] = useState('follow');

  const navigation = useNavigation();
  const { data: userData, isUserLoading } = useGetUserQuery()
  const user = userData ?? {}

  const TabView = () => {
    if (selectTab == 'follow') {
      return <FollowingTab />;
    } else if (selectTab == 'popular') {
      return <FollowingTab />;
    } else {
      return <FavouriteTab />;
    }
  };

  return (
    <View style={{ height: '100%' }}>
      <HomeHeader title={`Welcome, ${user?.firstName ? user.firstName : ''}`} image={images.frame} navigateText='Checkout' />


      <View style={{ flexDirection: 'row', marginHorizontal: 25, marginTop: 17 }}>
        <TouchableOpacity style={{}}
          onPress={() => {
            setSelectTab('follow')
          }}>
          <Text style={{ fontSize: 16, fontFamily: commonStyle.fontFamily.medium, color: '#000', }}>Following</Text>
          {selectTab === 'follow' && <View style={{ backgroundColor: '#403FFC', height: 3, marginTop: 5, borderRadius: 2 }} />}
        </TouchableOpacity>
        <TouchableOpacity style={{ marginLeft: 20 }}
          onPress={() => {
            setSelectTab('popular')
          }}>
          <Text style={{ fontSize: 16, fontFamily: commonStyle.fontFamily.medium, color: '#000', }}>Popular</Text>
          {selectTab === 'popular' && <View style={{ backgroundColor: '#403FFC', height: 3, marginTop: 5, borderRadius: 2 }} />}
        </TouchableOpacity>
        <TouchableOpacity style={{ marginLeft: 20 }}
          onPress={() => {
            setSelectTab('favorite')
          }}>
          <Text style={{ fontSize: 16, fontFamily: commonStyle.fontFamily.medium, color: '#000', }}>Favourites</Text>
          {selectTab === 'favorite' && <View style={{ backgroundColor: '#403FFC', height: 3, marginTop: 5, borderRadius: 2 }} />}
        </TouchableOpacity>
      </View>
      {TabView()}
    </View>
  )
};

export default CustomerHome;

