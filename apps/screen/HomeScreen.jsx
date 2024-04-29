import { View, Text, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { gql, useQuery } from '@apollo/client';

const getCountyData = gql`
  query getCountry {
    countries {
      name
      city
      language
    }
  }
`;


export default function HomeScreen() {
const {data,loading}= useQuery(getCountyData)
  useEffect(()=>{
    console.log('Graphql===',data.countries)
  })

  return (
    <View>
      <Text>HomeScreen</Text>
      <FlatList 
      data={data.countries}
      renderItem={({item})=>{
        return(
          <Text>{item.name}</Text>
        )
      }}
      />
    </View>
  )
}