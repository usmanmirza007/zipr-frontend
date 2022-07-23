import React, { useState, useRef, useMemo } from 'react';
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
import {Picker} from '@react-native-picker/picker';
import { useSelector } from 'react-redux';

import TextInputs from '../components/TextInputs';
import commonStyle from '../constants/commonStyle';
import Button from '../components/Button';
import Snackbar from 'react-native-snackbar';
import MyStatusBar from '../components/MyStatusBar';
import { useAddProductMutation, useGetCategoryQuery } from '../store/slice/api';
import { store } from '../store/store';
import { newProductImageEmpty } from '../store/reducer/mainSlice';
import PriceModal from '../components/PriceModal';
const windowWidth = Dimensions.get('window').width;

export default function AddOrder() {

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [addTag, setAddTag] = useState('');
  const [addCategory, setAddCategory] = useState('');
  const [allTags, setAllTags] = useState([]);
  const [enable, setEnable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const { data: categoryData, isLoading: isOrderLoading, isError, isFetching } = useGetCategoryQuery()
  const category = categoryData ?? {}
  const [addProduct] = useAddProductMutation();
  
  const imageData = useSelector((state) => state.user.newProductImages)
  const navigation = useNavigation();
  const modalRef = useRef();

  const categories = useMemo(() => {
    let addCategory = []
    if (Array.isArray(category) && category.length) {
      addCategory.push(...category, { label: "Other", value: "Other"})
    }
    return addCategory
  },[category])

  const handleAddProduct = async () => {

    if (!selectedCategory || selectedCategory == "Select Category") {
      Snackbar.show({
        text: "Please select the category", duration: Snackbar.LENGTH_SHORT, textColor: '#fff', backgroundColor: '#24A9DF',
      });
      return
    }

    if (name && description && price && location && allTags && imageData) {
      setLoading(true)
      const addProductData = {
        category: addCategory ? addCategory : selectedCategory,
        name: name,
        description: description,
        location: location,
        price: price,
        tags: allTags,
        pictures: imageData
      }
      addProduct(addProductData).unwrap()
        .then(() => {
          Snackbar.show({
            text: "Product has been added successfuly", duration: Snackbar.LENGTH_SHORT, textColor: '#fff', backgroundColor: '#24A9DF',
          });
          setLoading(false)
          setName('')
          setPrice('')
          setDescription('')
          setLocation('')
          setAddTag('')
          setAllTags([])
          store.dispatch(newProductImageEmpty())
          modalRef.current.getAlert();
          // navigation.navigate('Home')
        })
        .catch((error) => {
          console.log('err', error);
          Snackbar.show({
            text: error.data.message, duration: Snackbar.LENGTH_SHORT, textColor: '#fff', backgroundColor: '#24A9DF',
          });
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

  const handleTag = () => {
    setAllTags([...allTags, addTag])
    setEnable(false)
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <MyStatusBar
        translucent
        barStyle="light-content"
        backgroundColor="#403FFC"
      />
      <ScrollView>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {Array.isArray(imageData) && imageData.length ? imageData.map((image, index) => {
            return (
              <ImageBackground source={{ uri: image }} style={{ backgroundColor: '#403FFC', height: 300, width: windowWidth }} >
                <View style={{ alignItems: 'center', marginTop: 80 }}>
                  <TouchableOpacity onPress={() => {
                    navigation.navigate('ImagesGallery', { isServerImage: false, product: null, newProduct: true})
                  }} style={{ backgroundColor: '#D9D9D9', width: 50, height: 50, borderRadius: 50 / 2, alignItems: 'center', justifyContent: 'center' }}>

                    <Image source={images.camera} style={{ width: 30, height: 30 }} />
                  </TouchableOpacity>
                  <Text style={{ fontSize: 16, fontFamily: commonStyle.fontFamily.medium, color: '#fff', marginTop: 10 }}>Set Photo</Text>
                </View>
              </ImageBackground>
            )
          }) :
            <View style={{ backgroundColor: '#403FFC', height: 300, width: windowWidth }} >
              <View style={{ alignItems: 'center', marginTop: 80 }}>
                <TouchableOpacity onPress={() => {
                  navigation.navigate('ImagesGallery', { isServerImage: false, product: null, newProduct: true})
                }} style={{ backgroundColor: '#D9D9D9', width: 50, height: 50, borderRadius: 50 / 2, alignItems: 'center', justifyContent: 'center' }}>

                  <Image source={images.camera} style={{ width: 30, height: 30 }} />
                </TouchableOpacity>
                <Text style={{ fontSize: 16, fontFamily: commonStyle.fontFamily.medium, color: '#fff', marginTop: 10 }}>Set Photo</Text>
              </View>
            </View>
          }
        </ScrollView>
        <TouchableOpacity style={{ position: 'absolute', top: 10, left: 0, }} onPress={() => { navigation.goBack() }}>
          <Image source={images.back} style={{ width: 30, height: 30, tintColor: '#fff', marginTop: 15, marginLeft: 20 }} />
        </TouchableOpacity>
        <View style={{ marginHorizontal: 25 }}>
        <Text style={{ fontSize: 15, fontFamily: commonStyle.fontFamily.medium, color: '#000', marginTop: 40 }}>Category</Text>

          <View style={{ backgroundColor: '#F7F5F5', borderRadius: 5, marginTop: 17 }}>
            <Picker
              selectedValue={selectedCategory}
              mode={'dropdown'}
              onValueChange={(itemValue, itemIndex) => {
                setSelectedCategory(itemValue)
                setAddCategory('')
              }}>
              <Picker.Item label={'Select Category'} value={'Select Category'} style={{color: '#757575', fontFamily: commonStyle.fontFamily.medium}} />
              {categories.map((cate, index) => {
                return (
                  <Picker.Item key={index} label={cate.label} value={cate.value} style={{color: "#000", fontFamily: commonStyle.fontFamily.medium }} />
                )
              })}
            </Picker>
          </View>
          {selectedCategory == "Other" && <Text style={{ fontSize: 15, fontFamily: commonStyle.fontFamily.medium, color: '#000', marginTop: 40 }}>Add Category</Text>}
          {selectedCategory == "Other" && <TextInputs style={{ marginTop: 17, }} labelText={'Category'} state={addCategory} setState={setAddCategory} />  }
          <Text style={{ fontSize: 15, fontFamily: commonStyle.fontFamily.medium, color: '#000', marginTop: 40 }}>Name</Text>
          <TextInputs style={{ marginTop: 17, }} labelText={'Enter Product / service name...'} state={name} setState={setName} />
          <Text style={{ fontSize: 15, fontFamily: commonStyle.fontFamily.medium, color: '#000', marginTop: 40 }}>Description</Text>
          <TextInputs style={{ marginTop: 17 }} multiline={true} labelText={'Enter Product / service description...'} state={description} setState={setDescription} />
          <Text style={{ fontSize: 15, marginTop: 30, color: '#000', fontFamily: commonStyle.fontFamily.medium }}>Set Price</Text>
          <View style={{ flexDirection: 'row', marginTop: 17, alignItems: 'center' }}>
            <Text style={{ fontSize: 15, color: '#000', fontFamily: commonStyle.fontFamily.medium, marginRight: 10 }}>R</Text>
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
              handleAddProduct()
            }} text={`Upload`} />
          </View> : <ActivityIndicator style={{ marginVertical: 30, marginTop: 70 }} size={'large'} color={'green'} />}
          <PriceModal
          ref={modalRef} />
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({

});
