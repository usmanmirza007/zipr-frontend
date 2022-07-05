import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useRef,
  useEffect,
} from 'react';
import {
  StatusBar,
  Modal,
  TouchableOpacity,
  View,
  Image,
  Text,
} from 'react-native';

import images from '../constants/images';
import Button from './Button';
import { useNavigation } from '@react-navigation/native';
import TextInputs from './TextInputs';
import commonStyle from '../constants/commonStyle';

const AddCardModal = forwardRef((props, ref) => {
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [jobRemoveModalShow, setJobRemoveModalShow] = useState(false);

  const [name, setName] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [date, setDate] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const navigation = useNavigation();

  useImperativeHandle(ref, () => ({
    getAlert() {
      setDeleteModalShow(true);
    },
    jobDelete() {
      setJobRemoveModalShow(true);
      setDeleteModalShow(false);
    },
    // passData(user_id, request_id){
    //   setUserId(user_id)
    //   setRequestId(request_id)
    // }
  }));

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        onRequestClose={() => setDeleteModalShow(false)}
        visible={deleteModalShow}>
        <StatusBar
          backgroundColor="rgba(4, 45, 84, 0.8)"
          barStyle="dark-content"
        />
        <TouchableOpacity
          style={{
            width: '100%',
            height: '100%',
            zIndex: 1,
            backgroundColor: 'rgba(4, 45, 84, 0.8)',
          }}
          onPress={() => setDeleteModalShow(false)}
        />
        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: 2,
            justifyContent: 'center',
          }}>
          <View
            style={{
              marginHorizontal: 16,
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'flex-end',
              marginBottom: 19,
              backgroundColor: '#fff',
              borderRadius: 45,
              width: 45,
              height: 45
            }}>
            <TouchableOpacity onPress={() => setDeleteModalShow(false)}>
              <Image source={images.cross} style={{ width: 25, height: 25 }} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginHorizontal: 16,
              zIndex: 3,
            }}>
            <View
              style={{
                backgroundColor: '#fff',
                borderRadius: 16,
              }}>
              <View
                style={{
                  marginVertical: 16,
                  marginHorizontal: 25,
                }}>
                <Text style={{ fontSize: 15, marginTop: 30, color: '#000', fontFamily: commonStyle.fontFamily.medium }}>Card holder’s name</Text>
                <TextInputs style={{ marginTop: 17, }} labelText={'Name'} state={name} setState={setName} />
                <Text style={{ fontSize: 15, marginTop: 30, color: '#000', fontFamily: commonStyle.fontFamily.medium }}>Card number</Text>
                <TextInputs style={{ marginTop: 17 }} labelText={'2325 2365 2124 3265'} state={cardNumber} setState={setCardNumber} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 40 }}>
                  <View>
                    <Text style={{ fontSize: 15, fontFamily: commonStyle.fontFamily.medium, color: '#000', }}>Date</Text>
                    <TextInputs style={{ marginTop: 17, width: 130 }} labelText={'Date'} state={date} setState={setDate} />
                  </View>
                  <View>
                    <Text style={{ fontSize: 15, fontFamily: commonStyle.fontFamily.medium, color: '#000', }}>CVV</Text>
                    <TextInputs style={{ marginTop: 17, width: 130 }} labelText={'232'} state={cvv} setState={setCvv} />
                  </View>
                </View>
              </View>

              <View
                style={{
                  marginBottom: 24,
                  marginHorizontal: 16,
                  marginTop: 30
                }}>

                <Button
                  text="Complete order"
                  style={{
                  }}
                  onClick={() => {
                    //api call to delete the modal
                    // dispatch(hideJob(userId, requestId))
                    setJobRemoveModalShow(true);
                    setDeleteModalShow(false);
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* JobRemoveModal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={jobRemoveModalShow}>
        <StatusBar backgroundColor="#E9F6FC" barStyle="dark-content" />
        <TouchableOpacity
          style={{
            width: '100%',
            height: '100%',
            zIndex: 1,
            backgroundColor: 'rgba(4, 45, 84, 0.8)',
          }}
          onPress={() => setJobRemoveModalShow(false)}
        />
        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: 2,
            justifyContent: 'center',
          }}>
          <View
            style={{
              marginHorizontal: 16,
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'flex-end',
              marginBottom: 19,
              backgroundColor: '#fff',
              borderRadius: 45,
              width: 45,
              height: 45
            }}>
            <TouchableOpacity onPress={() => setJobRemoveModalShow(false)}>
              <Image source={images.cross} style={{ width: 25, height: 25 }} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginHorizontal: 16,
              zIndex: 3,
            }}>
            <View
              style={{
                backgroundColor: '#fff',
                borderRadius: 16,
              }}>
              <View
                style={{
                  marginVertical: 16,
                  marginHorizontal: 25,
                }}>
                <Text style={{ fontSize: 15, marginTop: 30, color: '#000', fontFamily: commonStyle.fontFamily.medium }}>Your delivery address</Text>
                <TextInputs style={{ marginTop: 17, }} labelText={'10th avenue, Rosebank, 7700'} state={address} setState={setAddress} />
                <Text style={{ fontSize: 15, marginTop: 30, color: '#000', fontFamily: commonStyle.fontFamily.medium }}>Number we can call</Text>
                <TextInputs style={{ marginTop: 17 }} labelText={'09090909090'} state={phoneNumber} setState={setPhoneNumber} />

              </View>

              <View
                style={{
                  marginBottom: 24,
                  marginHorizontal: 16,
                  marginTop: 30,
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}>

                <Button
                  text="Pay on delivery"
                  style={{
                    width: '45%',
                    backgroundColor: '#e8e8ff'
                  }}
                  textStyle={{color: "#403FFC"}}
                  onClick={() => {
                    //api call to delete the modal
                    setJobRemoveModalShow(false);
                  }}
                />

                <Button
                  text="Pay with card"
                  style={{
                    width: '45%',
                    backgroundColor: '#e8e8ff'
                  }}
                  textStyle={{color: "#403FFC"}}
                  onClick={() => {
                    //api call to delete the modal
                    setJobRemoveModalShow(false);
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
});

export default AddCardModal;
