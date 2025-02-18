import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import RootStackNavigator from './src/navigation/RootStackNavigator';
import { View, Text, Button, PermissionsAndroid, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import WebView from 'react-native-webview';

function App(): React.JSX.Element {
  const [country, setCountry] = useState('');

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const getLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) return;

    Geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );
        const data = await response.json();
        setCountry(data.address?.country || 'Unknown');
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  if (country === "") {
    getLocation();
  }
  
  if (country === "Україна") {
    return (
      <NavigationContainer>
        <RootStackNavigator />
      </NavigationContainer>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <WebView source={{ uri: 'https://www.wikipedia.org/' }} />
    </View>
  );
}

export default App;
