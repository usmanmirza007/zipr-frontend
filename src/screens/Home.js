import React from 'react';
import {
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import { useGetUserQuery } from '../store/slice/api';
import VendorHome from '../components/VendorHome';
import CustomerHome from '../components/CustomerHome';

const Home = () => {
  const navigation = useNavigation();
  const { data: userData, isLoading, isError, isFetching } = useGetUserQuery()
  const user = userData ?? {}
console.log('ususu', user);
  return (
    <View style={{  backgroundColor: '#fff' }}>
      <ScrollView>

      {/* {user.userType == "VENDOR" ? */}
         <CustomerHome />
        {/* <VendorHome /> */}
      </ScrollView>
    </View>
  );
};


export default Home;
