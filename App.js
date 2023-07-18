import ReactDOM from 'react-dom';
import 'react-native-gesture-handler';
import React,{useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes/index';
//import WebRoutes from './src/web/webRoutes/webIndex';

const App = () => {
    return (
    <NavigationContainer>
      <Routes/>
    </NavigationContainer>
  );
}

export default App;