import React, { useRef, useEffect, useImperativeHandle, useState } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  Dimensions,
  TextInput,
  Text,
  StatusBar,
  ActivityIndicator
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
// import * as ImagePicker from 'react-native-image-picker';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
import moment from 'moment';

import RecieverMsg from '../components/Chats/RecieverMsg';
import SenderMsg from '../components/Chats/SenderMsg';
import images from '../constants/images';
import commonStyle from '../constants/commonStyle';
import { socket } from './Home';
import { useGetChatListQuery, useGetSingleUserChatQuery, useGetSingleUserQuery, useGetUserQuery } from '../store/slice/api';
import Snackbar from 'react-native-snackbar';
import { useMemo } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
const { width, height } = Dimensions.get('screen');

const Message = ({ route }) => {
  const navigation = useNavigation();
  const modalRef = useRef();
  const scrollViewRef = useRef();

  const [modalShow, setModalShow] = useState(false);
  const [message, setMessage] = useState('');
  const [focuse, setFocuse] = useState(false);

  const { data: userData, isUserLoading } = useGetUserQuery()
  const user = userData ?? {}

  // when user come from product details page
  const venderId = route.params?.venderId
  // when user come from chat list page
  const receiverId = route.params?.receiverId

  const roomId = route.params?.roomId
  
  const { data: data, isLoading } = useGetSingleUserQuery(receiverId ? receiverId : venderId)
  const receiverUser = data ?? {}

  const roomIdFirstTime = useMemo(() => {
    let roomId = "0"
    if (venderId) {
      if (user.id > venderId) {
        roomId = venderId.toString()
        roomId = `${roomId}${user.id}`
      } else {
        roomId = user.id
        roomId = `${roomId}${venderId}`
      }
      return roomId
    } else {
      return null
    }
  })

  const { data: chatData, isLoading: isChatLoading, refetch } = useGetSingleUserChatQuery(roomId ? roomId : roomIdFirstTime)
  const userChat = chatData ?? []
 
  const { data: chatListData, isLoading: isChatListLoading, refetch: refetchChatList} = useGetChatListQuery()
  const chatList = chatListData ?? []

  const [userMessage, setUserMessage] = useState([]);

  // const launchCamera = () => {
  //     ImagePicker.launchCamera(
  //         {
  //             mediaType: 'photo',
  //             includeBase64: false,
  //             maxHeight: 200,
  //             maxWidth: 200,
  //         },
  //         (response) => {
  //             if (response.didCancel) {
  //                 console.log('User cancelled photo picker');
  //             } else if (response.error) {
  //                 console.log('ImagePicker Error: ', response.error);
  //             } else {
  //                 // setImageDetails([...imageDetails, response])
  //                 setModalShow(false);
  //             }
  //         }
  //     );
  // };

  // const launchImageLibrary = () => {
  //     ImagePicker.launchImageLibrary(
  //         {
  //             mediaType: 'photo',
  //             includeBase64: false,
  //             maxHeight: 200,
  //             maxWidth: 200,
  //         },
  //         (response) => {
  //             if (response.didCancel) {
  //                 console.log('User cancelled photo picker');
  //             } else if (response.error) {
  //                 console.log('ImagePicker Error: ', response.error);
  //             } else {
  //                 // setImageDetails([...imageDetails, response])
  //                 setModalShow(false);
  //             }
  //         }
  //     );
  // };
  // const PickerModal = () => {
  //     return (
  //         <Modal
  //             animationType={'none'}
  //             transparent={true}
  //             visible={modalShow}
  //         >
  //             <StatusBar
  //                 translucent={true}
  //                 barStyle="dark-content"
  //                 backgroundColor="rgba(39, 44, 63, 0.5)"
  //             />
  //             <View
  //                 style={{
  //                     flex: 1,
  //                     justifyContent: 'center',
  //                 }}
  //             >
  //                 <TouchableOpacity
  //                     activeOpacity={0.5}
  //                     style={{
  //                         width: '100%',
  //                         height: '100%',
  //                         zIndex: 5,
  //                         backgroundColor: '#272C3F',
  //                         opacity: 0.5,
  //                     }}
  //                     onPress={() => setModalShow(false)}
  //                 ></TouchableOpacity>

  //                 <View
  //                     style={{
  //                         left: 25,
  //                         right: 25,
  //                         justifyContent: 'center',
  //                         height: 373,
  //                         borderRadius: 10,
  //                         position: 'absolute',
  //                         zIndex: 10,
  //                     }}
  //                 >
  //                     <View style={{ backgroundColor: '#fff' }}>
  //                         <Text
  //                             style={{
  //                                 fontSize: 20,
  //                                 marginVertical: 25,
  //                                 fontFamily: commonStyle.fontFamily.bold,
  //                                 marginHorizontal: 25,
  //                             }}
  //                         >
  //                             Select a Photo
  //                         </Text>

  //                         <TouchableOpacity
  //                             onPress={launchCamera}
  //                             style={{
  //                                 backgroundColor: '#fff',
  //                                 justifyContent: 'center',
  //                                 marginBottom: 5,
  //                                 marginHorizontal: 25,
  //                             }}
  //                         >
  //                             <Text
  //                                 style={{
  //                                     fontSize: 20,
  //                                     fontFamily:
  //                                         commonStyle.fontFamily.medium,
  //                                 }}
  //                             >
  //                                 Camera
  //                             </Text>
  //                         </TouchableOpacity>

  //                         <TouchableOpacity
  //                             onPress={launchImageLibrary}
  //                             style={{
  //                                 backgroundColor: '#fff',
  //                                 justifyContent: 'center',
  //                                 marginTop: 25,
  //                                 marginHorizontal: 25,
  //                             }}
  //                         >
  //                             <Text
  //                                 style={{
  //                                     fontSize: 20,
  //                                     fontFamily:
  //                                         commonStyle.fontFamily.medium,
  //                                 }}
  //                             >
  //                                 Gallery
  //                             </Text>
  //                         </TouchableOpacity>
  //                         <TouchableOpacity
  //                             onPress={() => setModalShow(false)}
  //                             style={{
  //                                 backgroundColor: '#fff',
  //                                 justifyContent: 'center',
  //                                 marginBottom: 5,
  //                                 marginHorizontal: 25,
  //                                 alignItems: 'flex-end',
  //                                 marginBottom: 25,
  //                                 marginTop: 15,
  //                             }}
  //                         >
  //                             <Text
  //                                 style={{
  //                                     fontSize: 20,
  //                                     fontFamily:
  //                                         commonStyle.fontFamily.semibold,
  //                                 }}
  //                             >
  //                                 Cancel
  //                             </Text>
  //                         </TouchableOpacity>
  //                     </View>
  //                 </View>
  //             </View>
  //         </Modal>
  //     );
  // };

  useImperativeHandle(modalRef, () => ({
    getAlert() {
      setModalShow(true);
    },
  }));

  useEffect(() => {
    refetchChatList()
  }, [socket])

  useEffect(() => {
    refetch()
    if (Array.isArray(userChat) && userChat.length) {
      setUserMessage(userChat)
    }
  }, [roomId, userChat])

  const onFocusChange = () => {
    setFocuse(true);
    scroll();
  };
  const onBlur = () => {
    setFocuse(false);
  };
  const scroll = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  useEffect(() => {
    socket.on("sender_message", (receiverId, senderId, message) => {
      setUserMessage((oldUsermessages) => [...oldUsermessages, {
        receiverId: receiverId,
        senderId: senderId,
        message: message
      }])
      Snackbar.show({
        text: 'You receive a message',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: '#24A9DF',
      });
    });
    return () => {
      socket.off('sender_message');
    };
  }, [socket, userMessage]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: '#F5F5F5',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            backgroundColor: '#403FFC',
            marginTop: StatusBar.currentHeight + getStatusBarHeight(true),
            alignItems: 'center',
            height: 70,
          }}>
          <StatusBar translucent barStyle={"light-content"} backgroundColor={'#403FFC'} />

          <TouchableOpacity style={{ position: 'absolute', left: 20 }} onPress={() => navigation.navigate('MessageList')}>
            <Image
              source={images.back}
              resizeMode={'contain'}
              style={{
                width: 30,
                height: 30,
                tintColor: '#fff',
                alignSelf: 'center'
              }}
            />
          </TouchableOpacity>
          <View>
            <Text
              style={{ color: '#fff', fontFamily: commonStyle.fontFamily.medium, fontSize: 18 }}
            >
              {receiverUser?.firstName + ' ' + receiverUser?.lastName}
            </Text>
          </View>
        </View>

        <View
          style={{
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderColor: '#E5E5E5',
            marginTop: 1,
          }}
        />
        {Array.isArray(userMessage) && userMessage.length ?
          <ScrollView
            ref={scrollViewRef}
            onContentSizeChange={scroll}
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}>
            <View style={{ padding: 25 }}>
              {userMessage.map((item, index) => {
                if (item.senderId == user.id) {
                  return (
                    <SenderMsg index={index} message={item.message} time={item.createdAt} />
                  )
                } else {
                  return (
                    <RecieverMsg index={index} message={item.message} time={item.createdAt} />
                  )
                }
              })}
            </View>
            {/* <PickerModal /> */}
          </ScrollView>
          : !userMessage.length && isChatListLoading ?
            <ActivityIndicator style={{ marginTop: height / 2 - 100, marginBottom: 30 }} size={'large'} color={'green'} />
            :
            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
              <Text style={{ color: 'grey' }}>Start your conversation</Text>
            </View>
        }

        <View style={{ flexGrow: 1, justifyContent: 'flex-end' }}>
          <View
            style={{ backgroundColor: '#fff', height: 90, justifyContent: 'center', alignItems: 'center' }}>
            <View
              style={{
                backgroundColor: focuse ? 'rgba(36, 169, 223, 0.1)' : '#F2F4F6',
                borderWidth: focuse ? 1 : 1,
                borderColor: focuse ? '#24A9DF' : 'rgba(4, 45, 84, 0.05)',
                borderRadius: 12,
                marginHorizontal: 16,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TextInput
                placeholder="Type here..."
                placeholderTextColor="#8196A9"
                onFocus={onFocusChange}
                onBlur={onBlur}
                value={message}
                blurOnSubmit={false}
                onChangeText={(txt) => setMessage(txt)}
                // multiline={false}
                // numberOfLines={2}  
                // onSubmitEditing={() => {
                //   if (message) {
                //     // if (route.route?.params?.path) {
                //     //   dispatch(respondToRequest(userData.su_id, request_id, message, userDetail.id))
                //     //   dispatch(getChat(userData.su_id))
                //     //   socket.emit("receiver_message", userData.su_id, userDetail.id, message);
                //     //   setMessage('');
                //     // } 
                //     // else {
                //     socket.emit("receiver_message", user.id, venderId, message);
                //     setUserMessage((oldUsermessages) => [...oldUsermessages, {
                //       senderId: user.id,
                //       receiverId: venderId,
                //       msg: message
                //     }])
                //     setMessage('');
                //     // }
                //   }
                // }}
                style={{
                  fontSize: 12,
                  fontFamily: 'Comfortaa-Regular',
                  color: '#042D54',
                  marginLeft: 5,
                  width: '83%',
                }}
              />
              <TouchableOpacity
                style={[{ marginLeft: 10, width: 40, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }]}
                onPress={() => {
                  if (receiverId) {
                    socket.emit("receiver_message", user.id, receiverId, message);
                    setUserMessage((oldUsermessages) => [...oldUsermessages, {
                      senderId: user.id,
                      receiverId: receiverId,
                      message: message
                    }])
                    setMessage('');
                  } else if (venderId) {
                    socket.emit("receiver_message", user.id, venderId, message);
                    setUserMessage((oldUsermessages) => [...oldUsermessages, {
                      senderId: user.id,
                      receiverId: venderId,
                      message: message
                    }])
                    setMessage('');
                  } else {
                    console.log('error');
                  }
                  refetchChatList()

                }}
              >
                <Image
                  style={{ height: 25, tintColor: '#403FFC', width: 25 }}
                  source={images.send}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

      </View>
    </KeyboardAvoidingView>
  );
};
export default Message;
