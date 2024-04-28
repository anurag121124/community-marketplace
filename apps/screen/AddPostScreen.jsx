import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { app } from '../../firebaseconfig';
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";



export default function AddPostScreen() {
    const db = getFirestore(app);
    useEffect(()=>{
        getCategoryList();
        
    },[])
    const getCategoryList= async ()=>{
    const  querySnapshot = await getDocs(collection(db,'category'));
    querySnapshot.forEach((doc) =>{
        console.log(doc.id,"=>",doc.data());
    })
    }
    return (

  
    <View>
      <Text>AddPostScreen</Text>
    </View>
  )
}