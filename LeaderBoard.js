
import { StatusBar } from 'expo-status-bar';
import {Text, SafeAreaView, View, FlatList } from 'react-native';
import tw from 'twrnc';
import { Actions } from 'react-native-router-flux';
export const DATA = [

    {
        id: 1,
        title: "Ben",
        description: "You're #1! Keep your standing by learning about hydroplaning.",
    },
    {
        id: 2,
        title: "Samantha",
        description: "Way to be on our side! Gain the #1 spot by learning about the usage of a fire extinguisher.",
    },
    {
        id: 3,
        title: "Charles",
        description: "Excellent! To improve your ranking, learn about hydroplaning and the usage of a fire extinguisher",
    },
    {
        id: 4,
        title: "John",
        description: "Good progress! Watch the video on the Nationwide Car Concierge to improve your ranking to #3.",
    },
    {
        id: 5,
        title: "Manny",
        description: "You're getting there! Watch the video on the Nationwide Car Concierge to improve your ranking to #4.",
    },
    {
        id: 6,
        title: "Cynthia",
        description: "Welcome to the team! Start off by watching any of the video modules.",
    },
]


export default function LeaderBoard(points) {
  const Item = ({id, title, description}) => (
    <View style={tw`py-1`}>
        <View style={tw`my-2 py-3 bg-green-500 rounded-xl`}>
        <Text style={tw`text-white text-2xl pl-2 font-semibold`}>{id}. {title}</Text>
        </View>
        <Text>{description}</Text>
    </View>
  );
  const renderItem = ({ item }) => (
    <Item id={item.id} title={item.title} description={item.description}/>
  );
  return (
    <SafeAreaView>
      <View style={tw`p-4 mt-0 bg-white`}>
      <Text style={tw`text-xl font-bold text-gray-800 py-2`}>Safety Leaderboard</Text>
      <FlatList
        style={tw`h-full`}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}