import React from 'react';
import {SafeAreaView} from 'react-native';
import tw from 'twrnc';
import LimitsView from './LimitsView';
function Geolocation() {
    return(
      <SafeAreaView style={tw`h-full`}>
        <LimitsView></LimitsView>
    </SafeAreaView>
  )
  }
export default Geolocation;
