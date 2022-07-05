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
  const [picture, setPicture] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  const navigation = useNavigation();
  const [editUser] = useEditUserMutation();

  useEffect(() => {
    if (user.userType == "VENDER") {
      setEmail(user?.email)
      setVendorName(user?.venderName)
      setBio(user?.bio)
      setLocation(user?.location)
    } else {
      setEmail(user?.email)
      setName(user?.firstName)
      setSurename(user?.lastName)
    }
  }, [user]);

  let imageName = useRef('')

  const handleEditProfile = async () => {

    if (location && vendorName && bio) {

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
        picture: url
      }
      editUser(editUserData).unwrap()
        .then((data) => {
          if (data.success) {
            Snackbar.show({
              text: "User profile has been updated", duration: Snackbar.LENGTH_SHORT, textColor: '#fff', backgroundColor: '#24A9DF',
            });
            navigation.navigate("Home")
            setLoading(false)
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
      <ScrollView>

        <ImageBackground source={{ uri: picture }} style={{ backgroundColor: '#403FFC', height: 300 }} >
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
        </ImageBackground>

        <View style={{ marginHorizontal: 25 }}>
          <Text style={{ fontSize: 15, fontFamily: commonStyle.fontFamily.medium, color: '#000', marginTop: 40 }}>Vendor name</Text>
          <TextInputs style={{ marginTop: 17, }} labelText={'Name'} state={vendorName} setState={setVendorName} />
          <Text style={{ fontSize: 15, fontFamily: commonStyle.fontFamily.medium, color: '#000', marginTop: 40 }}>Vendor Bio</Text>

          <TextInputs style={{ marginTop: 17 }} multiline={true} labelText={'Bio'} state={bio} setState={setBio} />
          <Text style={{ fontSize: 15, marginTop: 30, color: '#000', fontFamily: commonStyle.fontFamily.medium }}>Location</Text>
          <TextInputs style={{ marginTop: 17 }} labelText={'Location'} state={location} setState={setLocation} image={images.location} />
          <Text style={{ fontSize: 15, marginTop: 30, color: '#000', fontFamily: commonStyle.fontFamily.medium }}>Email</Text>
          <TextInputs style={{ marginTop: 17, }} labelText={'Email'} disable={false} state={email} setState={setEmail} keyBoardType={'email-address'} />

          {!loading ? <View style={{ marginTop: 70, marginBottom: 30 }}>
            <Button onClick={() => {
              handleEditProfile()
            }} text={`Continue`} />
          </View> : <ActivityIndicator style={{ marginVertical: 30, marginTop: 70 }} size={'large'} color={'green'} />}


        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({

});
