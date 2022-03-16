import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import Home from './Home';
import Geolocation from './Geolocation';
import CameraScreen from './CameraScreen';

const App = () => {
  return (
    <Router>
      <Scene key="root">
        <Scene key="home" component={Home} title="Safety Checklist" initial></Scene>
        <Scene key="challenge" component={CameraScreen} title="Challenge"></Scene>
        <Scene key="speedlimit" component={Geolocation} title="Speed Tracking"></Scene>
      </Scene>
    </Router>
  );
}
export default App;
