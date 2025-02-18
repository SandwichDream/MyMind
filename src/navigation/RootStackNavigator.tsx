import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from '../screens/MainScreen';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import CustomHeader from '../components/CustomHeader';
import GameScreen from '../screens/GameScreen';

const Stack = createNativeStackNavigator();

function RootStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Main" screenOptions={{ animation: 'none' }}>
      <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={HomeScreen} options={() => ({ header: () => <CustomHeader/>})} />
      <Stack.Screen name="Details" component={DetailsScreen} options={() => ({ header: () => <CustomHeader/>})} />
      <Stack.Screen name="Game" component={GameScreen} initialParams={{ gameStyle: 0 }} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default RootStackNavigator;