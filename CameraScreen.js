import { Modal, Text, ScrollView, View, Image} from 'react-native';
import tw from 'twrnc';
import React, { useState, useEffect, useCallback  } from 'react';
import YoutubePlayer from "react-native-youtube-iframe";
import { Camera } from 'expo-camera';
import { Actions } from 'react-native-router-flux';
// Button for end -- change if camera is an option, otherwise leave it
function Button(props) {
    const isCameraUsed = props.isCameraUsed;
    const cameraModalVisible = props.cameraModalVisible;
    const setCameraModalVisible = props.setCameraModalVisible;
    if (isCameraUsed === true) {
        return(
            <View style={tw`h-24 items-center flex-row`}>
            <Text onPress={() => {setCameraModalVisible(!cameraModalVisible)}} style={tw`bg-gray-800 justify-center text-center rounded-xl p-4 text-white flex-1`}>Camera</Text>
            <Text onPress={() => Actions.pop()} style={tw`bg-red-600 shadow-xl justify-center text-center rounded-xl p-4 text-white flex-1`}>Exit</Text>
        </View>
        );
    }
    return(
        <View style={tw`h-24 items-center flex-row`}>
        <Text onPress={() => Actions.pop()} style={tw`bg-red-800 justify-center text-center rounded-xl p-4 text-white flex-1`}>Exit challenge</Text>
    </View>
    );
}
const CameraScreen = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [cameraModalVisible, setCameraModalVisible] = useState(false);
    const onStateChange = useCallback((state) => {
        if (state === "ended") {
          setPlaying(false);
          setModalVisible(!modalVisible);
        }
      }, []);
    const [playing, setPlaying] = useState(false);
    const [isPermitted, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
  /* Granting camera permissions and checking if we have them */
    useEffect(() => {
      (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);
    if (isPermitted === null) {
      isCameraUsed = false;
      }
    if (isPermitted === false) {
      isCameraUsed = false;
    }
    return (
        /* Header*/
        <View style={tw`flex-1`}>
         <View style={tw`h-full bg-white content-end`}>
             <ScrollView style={tw`h-full bg-white`}>
             <Text style={tw`text-black text-2xl px-2 py-2 font-bold`}>{props.action}</Text>
             <Text style={tw`text-black px-2 pb-3`}>To unlock this badge, watch the video or (if applicable) use the camera to document.</Text>
             <YoutubePlayer
        height={230}
        play={playing}
        videoId={"1txOggiJIoA"}
        onChangeState={onStateChange}
      />
           <Text style={tw`text-black text-lg px-2 pb-3`}>{props.steps}</Text>
             </ScrollView>
             <Button cameraModalVisible={cameraModalVisible} setCameraModalVisible={setCameraModalVisible} isCameraUsed={props.isCameraUsed}></Button>
         </View>

         <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
          <View style={tw`h-full px-4 bg-green-900 flex-1 items-center justify-center`}>
                <Text style={tw`text-white font-bold text-7xl pb-10`}>🎉</Text>
              <Text style={tw`text-white font-bold text-2xl py-1`}>All done!</Text>
              <Text style={tw`text-white text-xl text-center`}>You've successfully completed this challenge. Great work -- you're making your life safer with every step!</Text>
              <Text onPress={() => Actions.pop()} style={tw`text-green-900 text-lg font-bold rounded p-3 text-center bg-white my-6`}>Back to main menu</Text>
          </View>
      </Modal>

      <Modal
         animationType="slide"
         transparent={true}
         visible={cameraModalVisible}
          onRequestClose={() => {
           setCameraModalVisible(!cameraModalVisible);
          }}>
            <Camera style={tw`flex-1`} type={type}>
            </Camera>
            <View style={tw`h-32 bg-white items-center px-2 flex-row justify-center`}>
            <Text onPress={() => setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              )} style={tw`bg-gray-800 justify-center text-center rounded-xl p-4 text-white mx-1`}>Flip</Text>
            <Text onPress={() => setCameraModalVisible(!cameraModalVisible)} style={tw`bg-gray-800 justify-center text-center rounded-xl p-4 text-white mx-1`}>Exit</Text>
            <Text onPress={() => {
                async () => {
                    if (this.camera) {
                      let photo = await this.camera.takePictureAsync({base64: true});
                    }
                  };
                setCameraModalVisible(!cameraModalVisible);
                setModalVisible(true);
              }} 
                style={tw`bg-gray-800 justify-center text-center rounded-xl p-4 text-white mx-1`}>Take Photo</Text>
            </View>
          </Modal>
        </View>
    );
}
export default CameraScreen;
