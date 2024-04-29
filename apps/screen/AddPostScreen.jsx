import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ToastAndroid } from 'react-native';
import { app } from '../../firebaseconfig';
import { getFirestore } from 'firebase/firestore';
import { collection, getDocs } from 'firebase/firestore';
import { Formik } from 'formik';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker'
import * as ImagePicker from 'expo-image-picker';

export default function AddPostScreen() {
  const db = getFirestore(app); // Assuming 'app' is defined somewhere
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = async () => {
    const querySnapshot = await getDocs(collection(db, 'category'));
    const categories = querySnapshot.docs.map(doc => doc.data());
    setCategoryList(categories);
    setLoading(false);
  };

  const handleSubmit = (values) => {
    // Implement form submission logic here, e.g., save to Firestore
    console.log('Submitted values:', values);
  };


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
   
  const onSubmitMethod =(value)=>{
    value.image=image;
    console.log(value)
  }


  return (
    <View style={styles.container} className="p-8">
      <Text className="text-[22px] font-bold"> Add New Post</Text>
      <Text className="text-[16px] text-gray-500 p-1 mb-5" >Create new Post and start selling</Text>

      <Formik
        initialValues={{
          title: '',
          dec: '',
          category: '',
          address: '',
          price: '',
          image: ''
        }}
        onSubmit={onSubmitMethod}
        validate={(values)=>{
          const errors={}
            if(!values.title){
              console.log("Title is not Present");
              ToastAndroid.show('Title must be There',ToastAndroid.SHORT)
      
              errors.name="Title must be there"
            }
            return errors
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values ,setFieldValue,errors}) => (
          <View>
            <TouchableOpacity onPress={pickImage}>
              {image ?
                <Image source={{ uri: image }} style={{ width: 100, height: 100, borderRadius: 15 }} /> :
                <Image source={require("../../assets/images/placeholder-image.webp")} style={{ width: 100, height: 100, borderRadius: 15 }} />
              }
            </TouchableOpacity>

            <TextInput
              style={styles.input}
              placeholder='Title'
              value={values.title}
              onChangeText={handleChange('title')}
            />
            <TextInput
              style={styles.input}
              placeholder='Address'
              value={values.address}
              onChangeText={handleChange('address')}
            />
            <View style={{ borderWidth: 1, borderRadius: 10, marginTop: 10, marginBottom: 10 }}>
              <Picker
                selectedValue={values?.category}
                onValueChange={handleChange('category')}
              >
                {categoryList && categoryList.map((item, index) => (
                  <Picker.Item key={index} label={item.name} value={item.name} />
                ))}
              </Picker>
            </View>
            <TextInput
              style={styles.input}
              placeholder='Description'
              value={values.dec}
              onChangeText={handleChange('dec')}
              numberOfLines={5}
            />
            <TextInput
              style={styles.input}
              placeholder='Price'
              value={values.price}
              onChangeText={handleChange('price')}
              keyboardType='number-pad'
            />
            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 17,
    fontSize: 17,
    marginBottom: 10,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#444544',
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },

});