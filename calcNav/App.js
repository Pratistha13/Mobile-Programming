import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack'
import CalculatorScreen from './CalculatorScreen';
import HistoryScreen from './HistoryScreen';


const MyApp= createStackNavigator(
  {CalculatorScreen:{screen:CalculatorScreen},
  HistoryScreen:{screen:HistoryScreen}}
  );

const AppContainer =  createAppContainer(MyApp);
export default function App() {
  return(
  <AppContainer/>
  )};
