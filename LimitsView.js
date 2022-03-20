import React, { Component, useState, useEffect } from "react";
import { Accelerometer } from 'expo-sensors';

import { Text, View } from "react-native";
import Animated from "react-native-maps";
import * as Location from "expo-location";
import tw from 'twrnc';

export default function LimitsView() {
  // 25 speed limit is a placeholder for test purposes only
    const [speedLimit, setSpeedLimit] = useState(25);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    const [data, setData] = useState({
        x: 0,
        y: 0,
        z: 0,
      });
      const [subscription, setSubscription] = useState(null);
      Accelerometer.setUpdateInterval(2500);
      const _subscribe = () => {
        setSubscription(
          Accelerometer.addListener(accelerometerData => {
            setData(accelerometerData);
          })
        );
      };
      const _unsubscribe = () => {
        subscription && subscription.remove();
        setSubscription(null);
      };
      useEffect(() => {
        _subscribe();
        return () => _unsubscribe();
      }, []);
      let text = "--";
      if (errorMsg) {
        text = errorMsg;
      } else if (location) {
        text = JSON.stringify(location);
      }
      const { x, y, z } = data;
      function round(x) {
        if (x < 0) return Math.floor(Math.abs(x * 22));
        return Math.floor(x * 22);
      }
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('no location access');
        return;
      }
      this.location = await Location.watchPositionAsync(
        {
          enableHighAccuracy: false,
          distanceInterval: 5,
          timeInterval: 50000
        },
        newLocation => {
          // Commented out for testing purposes. Use an API to fetch speed limits for a region and if undefined, output ---
          let { coords } = newLocation;
          /*setLatitude(coords.latitude)
          setLongitude(coords.longitude);
          setLocation(coords);
          fetch(`https://dev.virtualearth.net/REST/v1/Routes/SnapToRoad?points=${latitude},${longitude}&includeTruckSpeedLimit=false&IncludeSpeedLimit=true&speedUnit=MPH&travelMode=driving&key=XXXXXXXXXXX`)
          .then(res => 
            {
                if (!res.ok) {
                    setSpeedLimit("---");
                    console.log("ERROR");
                }
                else {
                    res.json().then(json => {
                        if (json.resourceSets[0].resources !== undefined) {
                        setSpeedLimit(json.resourceSets[0].resources[0].snappedPoints[0].speedLimit);
                        }
                        else setSpeedLimit("---")
                    });
                }
            })*/
          })
    })();
  }, 
  []);
    return (
      <View style={tw`h-full p-2`}>
          <View style={tw`h-1/2 mb-3`}>
          <Animated
          animateToRegion={{
            latitude: 0,
            longitude: -74.4580713192048,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
          showsCompass={true}
          followsUserLocation={false}
          showsUserLocation={true}
          rotateEnabled={false}
          style={tw`flex-1 h-1/2`}
        />
          </View>
        <View style={tw`flex flex-row`}>
        <View style={tw`bg-white w-36 h-42 flex text-center flex-1`}>
          <Text style={tw`text-2xl px-3 text-center m-auto font-bold`}>SPEED LIMIT</Text>
          <Text style={tw`text-6xl text-center m-auto font-bold`}>{speedLimit}</Text>
          </View>
          <View style={tw`bg-blue-500 w-36 h-42 flex text-center flex-1`}>
          <Text style={tw`text-2xl text-white px-3 text-center m-auto font-bold`}>YOUR SPEED</Text>
          <Text style={tw`text-6xl text-white text-center m-auto font-bold`}>{round(x)}</Text>
          </View>
        </View>
        <Text style={tw`text-2xl text-black px-3 text-center m-auto font-semibold`}>Be safe when driving -- don't type and drive</Text>
      </View>
    );
};
