import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

export default function Slider({ sliderList }) {
  return (
    <View>
      <FlatList 
        data={sliderList} 
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View >
            <Image 
              source={{ uri: item?.image }}
              className ="h-[200px] w-[300px] mr-5 rounded-lg object-contain mt-5"
            />
          </View>
        )}
      />
    </View>
  );
}
