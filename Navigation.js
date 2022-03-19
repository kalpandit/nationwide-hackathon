import {Text, SafeAreaView, View, FlatList } from 'react-native';
import tw from 'twrnc';
import { StatusBar } from 'expo-status-bar';
import { Actions } from 'react-native-router-flux';
export default function Navigation() {
    return(
        <SafeAreaView style={tw`bg-white h-full`}>
     <View style={tw`p-4 pt-12 mt-0`}>
      <Text style={tw`text-4xl font-bold text-gray-800 py-2 pb-4`}>Let's be safe today</Text>
      <Text style={tw`text-xl font-semibold text-gray-800 py-2`}>Actions</Text>
      <View style={tw`bg-red-500 py-6 my-2 rounded-xl`}>
      <Text onPress={() => Actions.home()} style={tw`text-white pl-2 font-semibold`}>Safety Checklist</Text>
         </View>
         <View style={tw`bg-red-500 py-6 my-2 rounded-xl`}>
      <Text onPress={() => Actions.speedlimit()} style={tw`text-white pl-2 font-semibold`}>Drive Mode</Text>
         </View>
         <View style={tw`bg-red-500 py-6 my-2 rounded-xl`}>
      <Text onPress={() => Actions.leaderboard()} style={tw`text-white pl-2 font-semibold`}>Leaderboard</Text>
         </View>
      <StatusBar style="auto" />
      </View>
        </SafeAreaView>
    )
}