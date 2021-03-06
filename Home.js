import {Text, SafeAreaView, View, FlatList } from 'react-native';
import tw from 'twrnc';
import { Actions } from 'react-native-router-flux';
export const DATA = [
    {
        id: 1,
        title: "Learn about hydroplaning",
        description: "The weather's getting rainy recently, so make sure you know what to do and what not to do to prevent and deal with hydroplaning.",
        youtubeId: "1txOggiJIoA",
        isCameraNeeded: true,
    },
]
export default function Home(points) {
  const Item = ({ title, description, youtubeId, isCameraNeeded}) => (
    <View style={tw`bg-red-500 py-6 my-2 rounded-xl`}>
      <Text onPress={() => Actions.challenge({action: title, steps: description, ytid: youtubeId, isCameraUsed: isCameraNeeded})} style={tw`text-white pl-2 font-semibold`}>{title}</Text>
    </View>
  );
  const renderItem = ({ item }) => (
    <Item title={item.title} description={item.description} youtubeId={item.youtubeId} isCameraNeeded={item.isCameraNeeded}/>
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
      </View>
    </SafeAreaView>
  );
}
