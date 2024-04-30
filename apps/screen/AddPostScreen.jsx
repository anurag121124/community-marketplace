import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ToastAndroid, ActivityIndicator, StyleSheet } from 'react-native';
import { app } from '../../firebaseconfig';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { Formik } from 'formik';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { Button } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
export default function AddPostScreen() {
  const db = getFirestore(app);
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'category'));
      const categories = querySnapshot.docs.map(doc => doc.data());
      setCategoryList(categories);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setLoading(false);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  };
  const onSubmitMethod = async (values) => {
    try {
      if (!image) {
        throw new Error('Please select an image');
      }
      const timestamp = Date.now(); // Get current timestamp
      const resp = await fetch(image);
      const blob = await resp.blob();
      const filename = `communityPost/${timestamp}.jpg`; // Construct filename
      const storageRef = ref(getStorage(app), filename);
      setUploading(true);
      await uploadBytes(storageRef, blob);
      const downloadUrl = await getDownloadURL(storageRef);
      console.log(downloadUrl);
      console.log('Uploaded a blob or file!');
      setUploading(false);
    } catch (error) {
      console.error('Error uploading image:', error.message);
      setUploading(false);
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
  };
  const removeImage = () => {
    setImage(null);
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Post</Text>
      <Text style={styles.subtitle}>Create a new post and start selling</Text>

      <Formik
        initialValues={{
          title: '',
          dec: '',
          category: '',
          address: '',
          price: '',
        }}
        onSubmit={onSubmitMethod}
        validate={(values) => {
          const errors = {};
          if (!values.title) {
            errors.title = 'Title is required';
          }
          return errors;
        }}
      >
        {({ handleChange, handleSubmit, values, errors }) => (
          <View>
            <TouchableOpacity onPress={pickImage}>
              {image ? (
                <View style={styles.imageContainer}>
                  <AntDesign name="closecircle" size={24} color="black" className="pt-10 p-5" onPress={removeImage} />
                  <Image source={{ uri: image }} style={{ width: 100, height: 100, borderRadius: 15 }} />
                </View>
              ) : (
                <Image
                  source={require('../../assets/images/placeholder-image.webp')}
                  style={{ width: 100, height: 100, borderRadius: 15 }}
                />
              )}
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
            {/* Add TextInput components for other fields */}

            {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}
            {errors.price && <Text style={styles.errorText}>{errors.price}</Text>}
            {errors.dec && <Text style={styles.errorText}>{errors.dec}</Text>}
            {errors.category && <Text style={styles.errorText}>{errors.category}</Text>}
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
      {uploading && <ActivityIndicator size="large" color="#0000ff" />}
      {uploadedImageUrl && (
        <View style={styles.uploadedImageContainer}>
          <Text style={styles.uploadedText}>Image Uploaded Successfully!</Text>
          <Image source={{ uri: uploadedImageUrl }} style={styles.uploadedImage} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 17,
    fontSize: 17,
    marginBottom: 10,
    marginTop: 5
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
  uploadedImageContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  uploadedText: {
    fontSize: 16,
    marginBottom: 10,
  },
  uploadedImage: {
    width: 200,
    height: 200,
    borderRadius: 15,
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
  },
  removeButton: {
    backgroundColor: 'red',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 5,
  },

});

