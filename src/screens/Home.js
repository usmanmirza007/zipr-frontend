import React, { useEffect } from 'react';
import {
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import { useGetUserQuery } from '../store/slice/api';
import VendorHome from '../components/VendorHome';
import CustomerHome from '../components/CustomerHome';
import { store } from '../store/store';

import { io } from 'socket.io-client';

const server_url = 'http://zipr.co.za:8000';
// const server_url = 'https://c9da-182-191-158-168.ngrok.io';

export const socket = io(server_url, {transports: ['websocket']});
const Home = () => {
  const navigation = useNavigation();
  const { data: userData, isLoading, isError, refetch } = useGetUserQuery()
  const user = userData ?? {}
  useEffect(() => {
    
    if (user && user.id) {
      socket.on('connect', () => {
        socket.emit('connectionDetail', {"socketId" : socket.id, "userId" : user.id});
      });
    }
  },[socket, user]);

  useEffect(() => {
    refetch()
  }, [user]);

  const token = store.getState().user.isLoggedIn
  socket.connect();
 
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView>

        {token.userType == "CUSTOMER" ?
          <CustomerHome /> :
          <VendorHome />}
      </ScrollView>
    </View>
  );
};


export default Home;
