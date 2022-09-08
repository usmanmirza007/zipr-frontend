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
  ActivityIndicator,
} from 'react-native';

import images from '../constants/images';
import Button from './Button';
import { useNavigation } from '@react-navigation/native';
import TextInputs from './TextInputs';
import commonStyle from '../constants/commonStyle';
import DateTimesPicker from './DatePicker';
import { useAddPaymentMutation } from '../store/slice/api';
import Snackbar from 'react-native-snackbar';

const AddCardModal = forwardRef((props, ref) => {
  const [addressModalShow, setAddressModalShow] = useState(false);
  const [paymentModalShow, setPaymentModalShow] = useState(false);

  const [name, setName] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [date, setDate] = useState('');
  const [addPayment, { isLoading }] = useAddPaymentMutation();

  const navigation = useNavigation();
  const setDateTime = (dateTime) => { setDate(dateTime) };

  useImperativeHandle(ref, () => ({
    getAlert() {
      setAddressModalShow(true);
    },
    jobDelete() {
      setPaymentModalShow(true);
      setAddressModalShow(false);
    },
  }));

  const handleCheckoutOrder = async () => {

    if (name && cardNumber && date && cvv && props?.totalPrice) {
     
      const checkCvv = cvv % 1
      if (checkCvv) {
        Snackbar.show({
          text: "Please enter a valid cvv", duration: Snackbar.LENGTH_SHORT, textColor: '#fff', backgroundColor: '#24A9DF',
        });
        return
      }

      const checkCard = cardNumber % 1

      if (checkCard) {
        Snackbar.show({
          text: "Please enter a valid card", duration: Snackbar.LENGTH_SHORT, textColor: '#fff', backgroundColor: '#24A9DF',
        });
        return
      }

      const addPaymentData = {
        name: name,
        price: props.totalPrice,
        cardNumber: cardNumber,
        cvv: cvv,
        expireDate: date
      }
      addPayment(addPaymentData).unwrap()
        .then(() => {
          Snackbar.show({
            text: "Payment added successfully.", duration: Snackbar.LENGTH_SHORT, textColor: '#fff', backgroundColor: '#24A9DF',
          });
          navigation.navigate('CompleteOrder')

        })
        .catch((error) => {
          console.log('err', error);
          Snackbar.show({
            text: error.data.raw.message, duration: Snackbar.LENGTH_SHORT, textColor: '#fff', backgroundColor: '#24A9DF',
          });
        });

    } else {
      Snackbar.show({
        text: 'Please fill all fields',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: '#24A9DF',
      });
    }
  }
  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={paymentModalShow}>
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
          onPress={() => setPaymentModalShow(false)}
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
            <TouchableOpacity onPress={() => setPaymentModalShow(false)}>
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
                <TextInputs style={{ marginTop: 17 }} keyBoardType={'numeric'} maxLength={16} labelText={'2325 2365 2124 3265'} state={cardNumber} setState={setCardNumber} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 40 }}>
                  <View>
                    <Text style={{ fontSize: 15, fontFamily: commonStyle.fontFamily.medium, color: '#000', }}>Date</Text>
                    <View style={{
                      marginTop: 17,
                      width: 130,
                      backgroundColor: '#F7F5F5',
                      borderRadius: 5,
                      height: 50,
                      justifyContent: 'center',
                    }}>
                      <DateTimesPicker updateDate={setDateTime} />
                    </View>
                  </View>
                  <View>
                    <Text style={{ fontSize: 15, fontFamily: commonStyle.fontFamily.medium, color: '#000', }}>CVV</Text>
                    <TextInputs style={{ marginTop: 17, width: 130 }} maxLength={3} keyBoardType={'numeric'} labelText={'232'} state={cvv} setState={setCvv} />
                  </View>
                </View>
              </View>

              <View
                style={{
                  marginBottom: 24,
                  marginHorizontal: 16,
                  marginTop: 30
                }}>

                {!isLoading ? <Button
                  text="Complete order"
                  style={{
                  }}
                  onClick={() => {
                    //api call to delete the modal
                    handleCheckoutOrder()
                    // setPaymentModalShow(true);
                    // setAddressModalShow(false);
                  }}
                /> : <ActivityIndicator style={{ marginVertical: 20 }} size={'large'} color={'green'} />}
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* JobRemoveModal */}
      <Modal
        animationType="fade"
        transparent={true}
        onRequestClose={() => setAddressModalShow(false)}
        visible={addressModalShow}>
        <StatusBar backgroundColor="#E9F6FC" barStyle="dark-content" />
        <TouchableOpacity
          style={{
            width: '100%',
            height: '100%',
            zIndex: 1,
            backgroundColor: 'rgba(4, 45, 84, 0.8)',
          }}
          onPress={() => setAddressModalShow(false)}
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
            <TouchableOpacity onPress={() => setAddressModalShow(false)}>
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
                  textStyle={{ color: "#403FFC" }}
                  onClick={() => {
                    //api call to delete the modal
                    setAddressModalShow(false);
                  }}
                />

                <Button
                  text="Pay with card"
                  style={{
                    width: '45%',
                    backgroundColor: '#e8e8ff'
                  }}
                  textStyle={{ color: "#403FFC" }}
                  onClick={() => {
                    //api call to delete the modal
                    setAddressModalShow(false);
                    setPaymentModalShow(true)
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
