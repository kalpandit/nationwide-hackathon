import { StatusBar } from 'expo-status-bar';
import {Text, SafeAreaView, View, FlatList } from 'react-native';
import tw from 'twrnc';
import { Actions } from 'react-native-router-flux';
export const DATA = [
    {
        id: 1,
        title: "Learn about hydroplaning",
        description: "",
        youtubeId: "1txOggiJIoA",
    },
    {
        id: 2,
        title: "Change your smoke detector batteries",
        description: "",
        youtubeId: "",
    },
    {
        id: 3,
        title: "Get a fire extinguisher",
        description: "Getting a fire extinguisher is necessary to ensure fire safet",
        youtubeId: "",
    },
    {
        id: 4,
        title: "Change your smoke detector batteries",
        description: "",
        youtubeId: "",
    },
    {
        id: 5,
        title: "Deez nutz",
        description: "",
        youtubeId: "",
    },
    {
        id: 6,
        title: "hfujdsopfidhufjkndlajio",
        description: "",
        youtubeId: "",
    },
    {
      id: 7,
      title: "hfujdsopfidhufjkndlajio",
      description: "",
      youtubeId: "",
  }
]


export default function Home(points) {
  const Item = ({ title }) => (
    <View style={tw`bg-red-500 py-6 my-2 rounded-xl`}>
      <Text onPress={() => Actions.challenge()} style={tw`text-white pl-2 font-semibold`}>{title}</Text>
    </View>
  );
  const renderItem = ({ item }) => (
    <Item title={item.title} />
  );
  return (
    <SafeAreaView>
      <View style={tw`p-4 mt-0 bg-white`}>
      <Text style={tw`text-xl font-bold text-gray-800 py-2`}>Your missions</Text>
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
