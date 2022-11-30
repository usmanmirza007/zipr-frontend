import React, { useMemo } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Text,
  ActivityIndicator,
  Dimensions
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

import images from '../constants/images';
import Header from '../components/Header';
import { useGetChatListQuery, useGetUserQuery } from '../store/slice/api';
const { width, height } = Dimensions.get('window');

const MessagesList = () => {
  const { data: userData, isLoading, isError, refetch } = useGetUserQuery()
  const user = userData ?? {}
  const { data: chatListData, isLoading: isChatListLoading, } = useGetChatListQuery()
  const chatList = chatListData ?? []
  const navigation = useNavigation();
  
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
      }}
    >
      <Header title="Chat" image={images.back} />

      <View
        style={{
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderColor: '#E5E5E5',
          marginTop: 1,
        }} />
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <View style={{ padding: 15 }}>
          {Array.isArray(chatList) && chatList.length ? chatList.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  navigation.navigate('Message', { venderId: null, roomId: item.roomId, receiverId: item.user.id });
                }}
                style={[
                  {
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    flexDirection: 'row',
                    borderRadius: 7,
                    marginBottom: 10,
                    elevation: 3,
                    backgroundColor: 'white',
                    alignItems: 'center',
                  },
                ]}>
                <View
                  style={{
                    height: 75,
                    width: 75,
                    borderRadius: 50,
                    backgroundColor: '#E2E2E2',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Image
                    style={{
                      height: 40,
                      width: 40,
                      tintColor: 'grey',
                      resizeMode: 'contain',
                    }}
                    source={images.person_icon}
                  />
                </View>
                <View style={{ marginLeft: 10, flex: 1 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode={'tail'}
                      style={{
                        fontSize: 18,
                        flex: 1,
                        paddingRight: 10

                      }}
                    >
                      {item.user?.firstName + ' ' + item.user?.lastName}
                    </Text>

                    <Text
                      style={{
                        fontSize: 10,
                        color: '#D8D8D8',
                      }}
                    >
                      {moment(item.createdAt).fromNow()}
                    </Text>
                  </View>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode={'tail'}
                    style={{
                      fontSize: 13,
                      paddingRight: 30,
                      color: '#606060',
                      marginTop: 10,
                    }}
                  >
                    {item.message}
                  </Text>
                </View>
              </TouchableOpacity>
            )
          }) : !isChatListLoading && !chatList.length ?
            <Text style={{ color: 'grey', alignSelf: 'center', marginTop: 40 }}>You never chat any person yet.</Text> :
            <ActivityIndicator style={{ height: height / 2, flex: 1, justifyContent: 'flex-end', marginBottom: 30 }} size={'large'} color={'green'} />}
        </View>
      </ScrollView>
    </View>
  );
};
export default MessagesList;
