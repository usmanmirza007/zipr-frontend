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
import { useEditOrderMutation, useGetSingleOrderQuery } from '../store/slice/api';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';

const { width, height } = Dimensions.get('window');

export default function EditOrder({route}) {

  const orderId = route.params.orderId
  const { data: orderData, isLoading: isOrderLoading, isError, isFetching } = useGetSingleOrderQuery(orderId)
  const order = orderData ?? {}

  const [name, setName] = useState('');
  const [price, setPrice] = useState(order.price);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [addTag, setAddTag] = useState('');
  const [picture, setPicture] = useState(null);
  const [allTags, setAllTags] = useState([]);
  const [enable, setEnable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  let imageName = useRef('')
  const navigation = useNavigation();
  const [editOrder] = useEditOrderMutation();

  useEffect(() => {
    setName(order.name)
    setPrice(parseFloat(order.price))
    setDescription(order.description)
    setLocation(order.location)
    setPicture(order.picture)
    setAllTags(order.Tag)
  }, [order]);

  const handleAddOrder = async () => {
    
    if (name && description && price && location && allTags) {
      setLoading(true)
      let url 
      if (imageName.current) {
        url = await storage().ref(imageName.current).getDownloadURL();
      }

        const addOrderData = {  
          name: name,
          description: description,
          location: location,
          price: price,
          tags: allTags,
          picture: url,
          orderId: orderId
        }
        editOrder(addOrderData).unwrap()
          .then(() => {
              Snackbar.show({
                text: "Order has been updated!", duration: Snackbar.LENGTH_SHORT, textColor: '#fff', backgroundColor: '#24A9DF',
              });
              setLoading(false)
              navigation.navigate('Home')

          })
          .catch((error) => {
            console.log('err', error);
            setLoading(false)
            Snackbar.show({
              text: error.message, duration: Snackbar.LENGTH_SHORT, textColor: '#fff', backgroundColor: '#24A9DF',
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

  const handleTag = () => {
    setAllTags([...allTags, addTag])
    setEnable(false)
  }
  // position: 'absolute',
  // left: 0,
  // right: 0,
  // top: 0,
  // bottom: 0,
  // alignItems: 'center',
  // justifyContent: 'center'
  if (imageLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
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
        <ImageBackground source={{uri: picture}} style={{ backgroundColor: '#403FFC', height: 300 }}>
          <TouchableOpacity onPress={() => { navigation.goBack() }}>
            <Image source={images.back} style={{ width: 30, height: 30, tintColor: '#fff', marginTop: 15, marginLeft: 20 }} />
          </TouchableOpacity>
          <View style={{ alignItems: 'center', marginTop: 80 }}>
            <TouchableOpacity onPress={() => {openCamera()}} style={{ backgroundColor: '#D9D9D9', width: 50, height: 50, borderRadius: 50 / 2, alignItems: 'center', justifyContent: 'center' }}>

              <Image source={images.camera} style={{ width: 30, height: 30 }} />
            </TouchableOpacity>
            <Text style={{ fontSize: 16, fontFamily: commonStyle.fontFamily.medium, color: '#fff', marginTop: 10 }}>Set Photo</Text>
          </View>
        </ImageBackground>

        <View style={{ marginHorizontal: 25 }}>
          <Text style={{ fontSize: 15, fontFamily: commonStyle.fontFamily.medium, color: '#000', marginTop: 40 }}>Name</Text>
          <TextInputs style={{ marginTop: 17, }} labelText={'Enter Product / service name...'} state={name} setState={setName} />
          <Text style={{ fontSize: 15, fontFamily: commonStyle.fontFamily.medium, color: '#000', marginTop: 40 }}>Description</Text>

          <TextInputs style={{ marginTop: 17 }} multiline={true} labelText={'Enter Product / service description...'} state={description} setState={setDescription} />
          <Text style={{ fontSize: 15, marginTop: 30, color: '#000', fontFamily: commonStyle.fontFamily.medium }}>Set Price</Text>
          <View style={{ flexDirection: 'row', marginTop: 17, alignItems: 'center' }}>
            <Text style={{ fontSize: 15, color: '#000', fontFamily: commonStyle.fontFamily.medium, marginRight: 10 }}>Rs</Text>
            <TextInputs style={{ width: 200 }} labelText={'0.00'} state={price} setState={setPrice} />
          </View>
          <Text style={{ fontSize: 15, marginTop: 30, color: '#000', fontFamily: commonStyle.fontFamily.medium }}>Location</Text>
          <TextInputs style={{ marginTop: 17 }} labelText={'Location'} state={location} setState={setLocation} image={images.location} />
          <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontSize: 15, color: '#000', fontFamily: commonStyle.fontFamily.medium }}>Tags</Text>
            <TouchableOpacity onPress={() => { setEnable(!enable) }}>

              <Image source={images.edit} style={{ width: 25, height: 25 }} />
            </TouchableOpacity>
          </View>
          {enable &&
            <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between' }}>

              <TextInputs style={{ width: '70%' }} labelText={'Enter Tag'} state={addTag} setState={setAddTag} />
              <View style={{ width: '20%' }}>
                <Button onClick={() => {
                  handleTag()
                  setAddTag('')
                }} text={`Add`} />
              </View>
            </View>
          }
          <ScrollView horizontal style={{ paddingVertical: 10, marginLeft: -25, paddingLeft: 25, paddingRight: 20 }} showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              {Array.isArray(allTags) && allTags.length ? allTags.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={[
                      {
                        paddingHorizontal: 15,
                        width: 'auto',
                        height: 34,
                        marginRight: 8,
                        borderRadius: 10,
                        backgroundColor: '#FAFAFA',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row'
                      },
                    ]}>
                    <Text
                      style={[
                        { fontFamily: commonStyle.fontFamily.regular, fontSize: 14, },
                      ]}>
                      {item}
                    </Text>
                    <TouchableOpacity onPress={() => {
                      setAllTags([...allTags.filter((value) => value !== item)])
                    }}>
                      <Image source={images.cross} style={{ marginLeft: 10, width: 15, height: 15, tintColor: '#9C9C9C' }} />
                    </TouchableOpacity>
                  </View>
                )
              })
                : <Text style={{ fontSize: 15, textAlign: 'center', marginTop: 10, color: '#000', fontFamily: commonStyle.fontFamily.medium }}>No tag yet!</Text>

              }
            </View>
          </ScrollView>

          {!loading ? <View style={{ marginTop: 50, marginBottom: 30 }}>
            <Button onClick={() => {
              handleAddOrder()
            }} text={`Save`} />
          </View> :<ActivityIndicator style={{marginVertical: 30, marginTop: 70}} size={'large'} color={'green'} />}
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({

});
