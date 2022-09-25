import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ActivityIndicator,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import images from '../constants/images';

import TextInputs from '../components/TextInputs';
import commonStyle from '../constants/commonStyle';
import Button from '../components/Button';
import Snackbar from 'react-native-snackbar';
import MyStatusBar from '../components/MyStatusBar';
import { useEditUserMutation, useGetUserQuery } from '../store/slice/api';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import { customer, vender } from '../constants/userType';
import { store } from '../store/store';

const { width, height } = Dimensions.get('window');

export default function EditProfile() {
  const { data: userData, isLoading: isUserLoading, isError, isFetching } = useGetUserQuery()
  const user = userData ?? {}
  const [name, setName] = useState('');
  const [surename, setSurename] = useState('');
  const [email, setEmail] = useState('');
  const [vendorName, setVendorName] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [picture, setPicture] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();
  const [editUser] = useEditUserMutation();

  useEffect(() => {
    if (user.userType == vender) {
      setBio(user?.vender?.bio)
      setLocation(user?.vender?.location)
      setEmail(user?.email)
      setName(user?.firstName)
      setSurename(user?.lastName)
    } else {
      setEmail(user?.email)
      setName(user?.firstName)
      setSurename(user?.lastName)
    }
  }, [user]);


  let imageName = useRef('')

  const handleEditProfile = async () => {

    if (location || bio || name || surename || picture) {

      if (password !== confirmPassword) {
        return Snackbar.show({
          text: "Password does not match", duration: Snackbar.LENGTH_SHORT, textColor: '#fff', backgroundColor: '#24A9DF',
        });
      }
      setLoading(true)
      let url
      if (imageName.current) {
        url = await storage().ref(imageName.current).getDownloadURL();
      }
      const editUserData = {
        firstName: name,
        lastName: surename,
        vendorName: vendorName,
        bio: bio,
        location: location,
        picture: url,
        password: password,
      }
      editUser(editUserData).unwrap()
        .then((data) => {
          if (data.success) {
            Snackbar.show({
              text: "User profile has been updated", duration: Snackbar.LENGTH_SHORT, textColor: '#fff', backgroundColor: '#24A9DF',
            });
            navigation.navigate("Home")
            setLoading(false)
            setPicture(null)
          }
        })
        .catch((error) => {
          console.log('err', error);
          Snackbar.show({
            text: error.data.message, duration: Snackbar.LENGTH_SHORT, textColor: '#fff', backgroundColor: '#24A9DF',
          });
          console.log(error, 'error');
          setLoading(false)
        });

    } else {
      Snackbar.show({
        text: 'Please fill all fields',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: '#24A9DF',
      });
    }
  }

  const openCamera = () => {
    ImagePicker.openPicker({
      // includeExif: true,
      mediaType: 'photo',
      width: 300,
      height: 400,
    })
      .then((image) => {
        setPicture(image.path)
        uploadImage(image.path)
      })
      .catch((e) => alert(e));
  };

  const uploadImage = async (path) => {
    setImageLoading(true)
    const filename = path.substring(path.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? path.replace('file://', '') : path
    try {
      const task = await storage().ref(filename).putFile(uploadUri)
      if (task.metadata) {
        imageName.current = task.metadata.fullPath
      }
      setImageLoading(false)
    } catch (error) {
      setImageLoading(false)
      console.log('error', error);
    }
  }
  // position: 'absolute',
  //   left: 0,
  //   right: 0,
  //   top: 0,
  //   bottom: 0,
  //   alignItems: 'center',
  //   justifyContent: 'center'
  if (imageLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {/* <ActivityIndicator style={{marginVertical: 30, marginTop: 70}} size={'large'} color={'green'} /> */}
        <Text>Uploading...</Text>
      </View>
    )
  }
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <MyStatusBar
        translucent
        barStyle="light-content"
        backgroundColor="#403FFC"
      />
      {!isUserLoading ?
        <ScrollView>
          <TouchableOpacity onPress={() => {
            setModalVisible(true)
          }}>
            {!modalVisible && <ImageBackground source={{ uri: picture ? picture : user.picture }} style={{ backgroundColor: '#403FFC', height: 300 }} >
              <TouchableOpacity onPress={() => { navigation.goBack() }}>
                <Image source={images.back} style={{ width: 30, height: 30, tintColor: '#fff', marginTop: 15, marginLeft: 20 }} />
              </TouchableOpacity>
              <View style={{ alignItems: 'center', marginTop: 80 }}>
                <TouchableOpacity onPress={() => { openCamera() }} style={{ backgroundColor: '#D9D9D9', width: 50, height: 50, borderRadius: 50 / 2, alignItems: 'center', justifyContent: 'center' }}>
                  <Image
                    source={images.camera}
                    style={{ width: 30, height: 30 }} />
                </TouchableOpacity>
                <Text style={{ fontSize: 16, fontFamily: commonStyle.fontFamily.medium, color: '#fff', marginTop: 10 }}>Edit Profile Photo</Text>
              </View>
            </ImageBackground>}
          </TouchableOpacity>
          {modalVisible ? <>
            {/* <StatusBar backgroundColor='#403FFC' barStyle='light-content' /> */}
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <ImageBackground
                  resizeMode='contain'
                  style={{
                    width: width,
                    height: height,
                    justifyContent: 'flex-start',
                    alignItems: 'flex-end'
                  }}
                  source={{ uri: user?.picture ? user.picture : picture }}>

                  <TouchableOpacity
                    style={{
                      position: 'absolute',
                      top: Platform.OS == 'ios' ? 40 : 20,
                      right: 20,
                      backgroundColor: '#fff',
                      width: 50,
                      height: 50,
                      borderRadius: 50,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => {
                      setModalVisible(false)
                    }}>
                    <Image
                      source={images.cross}
                      style={{ height: 20, width: 20, tintColor: '#18ad86' }}
                    />
                  </TouchableOpacity>
                </ImageBackground>
              </View>
            </View>
          </> : null}
          <View style={{ marginHorizontal: 25 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 40 }}>
              <View style={{ width: '45%' }}>
                <Text style={{ fontSize: 15, fontFamily: commonStyle.fontFamily.medium, color: '#000', }}>First Name</Text>
                <TextInputs style={{ marginTop: 17 }} labelText={'Name'} state={name} setState={setName} />
              </View>
              <View style={{ width: '45%' }}>
                <Text style={{ fontSize: 15, fontFamily: commonStyle.fontFamily.medium, color: '#000', }}>Last Name</Text>
                <TextInputs style={{ marginTop: 17 }} labelText={'Surname'} state={surename} setState={setSurename} />
              </View>
            </View>
            {user.userType == vender ?
              <>
                <Text style={{ fontSize: 15, fontFamily: commonStyle.fontFamily.medium, color: '#000', marginTop: 40 }}>Vendor Bio</Text>
                <TextInputs style={{ marginTop: 17 }} multiline={true} labelText={'Bio'} state={bio} setState={setBio} />
                <Text style={{ fontSize: 15, marginTop: 30, color: '#000', fontFamily: commonStyle.fontFamily.medium }}>Location</Text>
                <TextInputs style={{ marginTop: 17 }} labelText={'Location'} state={location} setState={setLocation} image={images.location} />
              </>
              : null
            }

            <Text style={{ fontSize: 15, marginTop: 30, color: '#000', fontFamily: commonStyle.fontFamily.medium }}>Email</Text>
            <TextInputs style={{ marginTop: 17, }} labelText={'Email'} disable={false} state={email} setState={setEmail} keyBoardType={'email-address'} />
            <Text style={{ fontSize: 15, marginTop: 30, color: '#000', fontFamily: commonStyle.fontFamily.medium }}>Password</Text>
            <TextInputs style={{ marginTop: 17, }} labelText={'Password'} state={password} setState={setPassword} secure={true} />
            <Text style={{ fontSize: 15, marginTop: 30, color: '#000', fontFamily: commonStyle.fontFamily.medium }}>Confirm Password</Text>
            <TextInputs style={{ marginTop: 17, }} labelText={'Confirm Password'} state={confirmPassword} setState={setConfirmPassword} secure={true} />

            {!loading ? <View style={{ marginTop: 70, marginBottom: 30 }}>
              <Button onClick={() => {
                handleEditProfile()
              }} text={`Update`} />
            </View> : <ActivityIndicator style={{ marginVertical: 30, marginTop: 70 }} size={'large'} color={'green'} />}


          </View>

        </ScrollView> : <ActivityIndicator style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} size={'large'} color={'green'} />}
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: 'grey',
    marginBottom: 75
  },
  modalView: {
    backgroundColor: "black",
    width: width,
    height: height + 10
  },
});