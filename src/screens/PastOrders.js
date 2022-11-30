import React, { useState } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import commonStyle from '../constants/commonStyle';
import images from '../constants/images';
import { useGetUserQuery } from '../store/slice/api';
import Header from '../components/Header';
import { vender } from '../constants/userType';
import OngoingTab from '../components/OngoinTab';
import DispatchedTab from '../components/DispatchedTab';
import DeliveredTab from '../components/DeliveredTab';
import CompletedTab from '../components/CompletedTab';

const PastOrders = () => {
  const [selectTab, setSelectTab] = useState('ongoing');
  const navigation = useNavigation();

  const { data: userData, isLoading: isUserLoading, } = useGetUserQuery()
  const user = userData ?? {}

  const TabView = () => {
    if (selectTab === 'ongoing') {
      return <OngoingTab />;
    } else if (selectTab === 'dispatched') {
      return <DispatchedTab />;
    } else if (selectTab === 'delivered') {
      return <DeliveredTab />;
    } else if (selectTab === 'completed') {
      return <CompletedTab />;

    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title={'Orders'} image={images.back} />
      <View
        style={{
          flexDirection: 'row',
          marginTop: 14,
          paddingLeft: 25,
          paddingRight: 25,
        }}>
        <ScrollView style={{ marginLeft: -25, marginRight: -25, paddingLeft: 25 }} horizontal={true} showsHorizontalScrollIndicator={false}>
          <TouchableOpacity style={{}}
            onPress={() => {
              setSelectTab('ongoing')
            }}>
            <Text style={{ fontSize: 16, fontFamily: commonStyle.fontFamily.medium, color: '#000', }}>Ongoing</Text>
            {selectTab === 'ongoing' && <View style={{ backgroundColor: '#403FFC', height: 3, marginTop: 5, borderRadius: 2 }} />}
          </TouchableOpacity>
          {user.userType === vender && <TouchableOpacity style={{ marginLeft: 20 }}
            onPress={() => {
              setSelectTab('dispatched')
            }}>
            <Text style={{ fontSize: 16, fontFamily: commonStyle.fontFamily.medium, color: '#000', }}>Dispatched</Text>
            {selectTab === 'dispatched' && <View style={{ backgroundColor: '#403FFC', height: 3, marginTop: 5, borderRadius: 2 }} />}
          </TouchableOpacity>}
          {<TouchableOpacity style={{ marginLeft: 20 }}
            onPress={() => {
              setSelectTab('delivered')
            }}>
            <Text style={{ fontSize: 16, fontFamily: commonStyle.fontFamily.medium, color: '#000', }}>Delivered</Text>
            {selectTab === 'delivered' && <View style={{ backgroundColor: '#403FFC', height: 3, marginTop: 5, borderRadius: 2 }} />}
          </TouchableOpacity>}
          <TouchableOpacity style={{ marginLeft: 20, paddingRight: 50 }}
            onPress={() => {
              setSelectTab('completed');
            }}>
            <Text style={{ fontSize: 16, fontFamily: commonStyle.fontFamily.medium, color: '#000', }}>Completed</Text>
            {selectTab === 'completed' && <View style={{ backgroundColor: '#403FFC', height: 3, marginTop: 5, borderRadius: 2 }} />}
          </TouchableOpacity>
        </ScrollView>
      </View>
      {TabView()}
    </View>
  )
};

export default PastOrders;

