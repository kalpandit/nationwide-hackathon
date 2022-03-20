import React, { Component } from 'react';
import { Actions, Router, Scene } from 'react-native-router-flux';
import Home from './Home';
import Geolocation from './Geolocation';
import Navigation from './Navigation';
import CameraScreen from './CameraScreen';
import LeaderBoard from './LeaderBoard';

console.disableYellowBox = true;
const App = () => {
  return (
    <Router>
      <Scene key="root">
      <Scene key="nav" component={Navigation} title="Home" hideNavBar initial={true}></Scene>
        <Scene key="home" component={Home} back={true} title="Safety Checklist"></Scene>
        <Scene key="challenge" component={CameraScreen} back={true} title="Challenge"></Scene>
        <Scene key="speedlimit" component={Geolocation} back={true} title="Speed Tracking"></Scene>
        <Scene key="leaderboard" component={LeaderBoard} title="Leaderboard" back={true}></Scene>
      </Scene>
    </Router>
  );
}
export default App;
