import React from 'react';
import {
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import { useGetUserQuery } from '../store/slice/api';
import VendorHome from '../components/VendorHome';
import CustomerHome from '../components/CustomerHome';
import { store } from '../store/store';

const Home = () => {
  const navigation = useNavigation();
  const { data: userData, isLoading, isError } = useGetUserQuery()
  const user = userData ?? {}
  const token = store.getState().user.isLoggedIn
  return (
    <View style={{flex: 1,  backgroundColor: '#fff' }}>
      <ScrollView>

        {token.userType == "CUSTOMER" ?
          <CustomerHome /> :
          <VendorHome />}
      </ScrollView>
    </View>
  );
};


export default Home;
