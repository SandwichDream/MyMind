import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, Image } from 'react-native';
import { RootStackParamList } from '../navigation/types';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../styles';
import Logo from '../../assets/svgs/MyMindLogo.svg';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

function MainScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <>
      <Image source={require('../../assets/images/BG(0).png')} style={styles.imageBG} />
      <LinearGradient start={{x: 1, y: 0}} end={{x: 0, y: 1}} colors={['#43BCF0', '#541896', '#711280']} style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
          <Logo width={250} height={250} />
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.buttonText}>START</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </LinearGradient>
    </>
  );
}

export default MainScreen;