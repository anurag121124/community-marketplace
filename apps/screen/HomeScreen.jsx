import React, { useEffect, useState } from "react";
import { View } from "react-native";
import Header from "../Components/Home/Header";
import Slider from "../Components/Slider";
import { getFirestore, collection, getDocs } from "firebase/firestore"; // Importing necessary functions
import { app } from "../../firebaseconfig";


export default function HomeScreen() {
  const db = getFirestore(app);
  const [sliderList, setSliderList] = useState([]);

  useEffect(() => {
    async function fetchSlider() {
      const querySnapshot = await getDocs(collection(db, "slider"));
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setSliderList(data);
    }

    fetchSlider();
  }, [db]); // Dependency array added with db

  return (
    <View style={{ flex: 1, backgroundColor: "white", padding: 10 }} className ="border-solid shadow-lg">
      <Header />
      <Slider sliderList={sliderList} />
      
    </View>
  );
}