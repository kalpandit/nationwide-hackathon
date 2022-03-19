import React from 'react';
import {SafeAreaView} from 'react-native';
import tw from 'twrnc';
import LimitsView from './LimitsView';
function Geolocation() {
  /* 
   <View style={tw`h-1/3 py-12 m-auto`}>
   <Text> speed: {round(x,z)} mph
  </Text>
  </View>
      */
    return(
      <SafeAreaView style={tw`h-full`}>
        <LimitsView></LimitsView>
    </SafeAreaView>
  )
  }
export default Geolocation;
