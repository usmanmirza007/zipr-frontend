import React, { useState, useEffect, useRef, useMemo } from 'react';
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
import { useSelector } from 'react-redux';
import { Picker } from '@react-native-picker/picker';

import TextInputs from '../components/TextInputs';
import commonStyle from '../constants/commonStyle';
import Button from '../components/Button';
import Snackbar from 'react-native-snackbar';
import MyStatusBar from '../components/MyStatusBar';
import { useEditProductMutation, useGetCategoryQuery, useGetSingleProductQuery } from '../store/slice/api';
import { store } from '../store/store';
import { editProductImageEmpty } from '../store/reducer/mainSlice';

const windowWidth = Dimensions.get('window').width;

export default function EditOrder({ route }) {

  const productId = route.params.orderId
  const { data: productData, isLoading: isProductLoading, isError, isFetching } = useGetSingleProductQuery(productId)
  const product = productData ?? {}
  const editProductImages = useSelector((state) => state.user.editProductImages)

  const { data: categoryData, isLoading: isCategoryLoading, } = useGetCategoryQuery()
  const category = categoryData ?? {}
  const categories = useMemo(() => {
    let addCategory = []
    if (Array.isArray(category) && category.length) {
      addCategory.push(...category, { label: "Other", value: "Other" })
    }
    return addCategory
  }, [category])

  const [name, setName] = useState('');
  const [price, setPrice] = useState(product.price);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [addTag, setAddTag] = useState('');
  const [allTags, setAllTags] = useState([]);
  const [enable, setEnable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addCategory, setAddCategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const navigation = useNavigation();
  const [editProduct] = useEditProductMutation();

  useEffect(() => {
    setName(product.name)
    setPrice(parseFloat(product.price))
    setDescription(product.description)
    setLocation(product.location)
    setAllTags(product.tag)
    setAddCategory(product.category)
    setSelectedCategory(product.category)
  }, [product]);

  const handleEditProduct = async () => {
    
    const combineImages = product.picture.concat(editProductImages)
    if ((Array.isArray(combineImages) && !combineImages.length)) {
      Snackbar.show({
        text: "Please select the product images", duration: Snackbar.LENGTH_SHORT, textColor: '#fff', backgroundColor: '#24A9DF',
      });
      return
    }
    if (name && description && price && location && allTags) {
      setLoading(true)
      // product.picture and redux picture merge then edit product
      const editProductData = {
        category: addCategory ? addCategory : selectedCategory,
        name: name,
        description: description,
        location: location,
        price: price,
        tags: allTags,
        picture: combineImages,
        productId: productId
      }
      editProduct(editProductData).unwrap()
        .then(() => {
          Snackbar.show({
            text: "Product has been updated!", duration: Snackbar.LENGTH_SHORT, textColor: '#fff', backgroundColor: '#24A9DF',
          });
          setLoading(false)
          store.dispatch(editProductImageEmpty())
          navigation.navigate('Home')

        })
        .catch((error) => {
          console.log('err', error);
          setLoading(false)
          Snackbar.show({
            text: error.data.message, duration: Snackbar.LENGTH_SHORT, textColor: '#fff', backgroundColor: '#24A9DF',
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
      {!isProductLoading ? <ScrollView>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {Array.isArray(product.picture) && product.picture.length ? product.picture.map((image, index) => {
            return (
              <ImageBackground key={index} source={{ uri: image }} style={{ backgroundColor: '#403FFC', height: 300, width: windowWidth }} >
                <View style={{ alignItems: 'center', marginTop: 80 }}>
                  <TouchableOpacity onPress={() => {
                    navigation.navigate('ImagesGallery', { isServerImage: true, product: product, newProduct: false });
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
                  navigation.navigate('ImagesGallery', { isServerImage: false, product: null, newProduct: false})
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
                // setAddCategory('')
              }}>
              <Picker.Item label={'Select Category'} value={'Select Category'} style={{ color: '#757575', fontFamily: commonStyle.fontFamily.medium }} />
              {categories.map((cate, index) => {
                return (
                  <Picker.Item key={index} label={cate.label} value={cate.value} style={{ color: "#000", fontFamily: commonStyle.fontFamily.medium }} />
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
            <TextInputs style={{ width: 200 }} labelText={'0.00'} keyBoardType={'numeric'} state={price?.toString()} setState={setPrice} />
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
              handleEditProduct()
            }} text={`Save`} />
          </View> : <ActivityIndicator style={{ marginVertical: 30, marginTop: 70 }} size={'large'} color={'green'} />}
        </View>
      </ScrollView> : <ActivityIndicator style={{flex: 1, justifyContent: 'center', alignItems: 'center' }} size={'large'} color={'green'} />}
    </View>
  );
}
const styles = StyleSheet.create({

});
