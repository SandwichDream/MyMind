import React from 'react';
import { StyleSheet, TouchableOpacity, SafeAreaView, Image, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Logo from '../../assets/svgs/MyMindLogoMini.svg';
import InfoIcon from '../../assets/svgs/info.svg';
import BackIcon from '../../assets/svgs/back.svg';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

function CustomHeader() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList>>();

  if (route.name === 'Details') {
    return (
      <LinearGradient
        colors={['#43BCF0', '#571280']}
        start={{ x: 1, y: -0.5 }}
        end={{ x: 1, y: 1 }}
        style={{ height: 80, paddingTop: 20 }}
      >
        <SafeAreaView style={styles.header}>
          <TouchableOpacity style={{ position: 'absolute', left: 20, top: 15 }}>
            <BackIcon width={30} height={30} onPress={() => navigation.goBack()} />
          </TouchableOpacity>
          <Logo width={124} height={40}/>
        </SafeAreaView>
      </LinearGradient>
    );
  }
  return (
    <LinearGradient
      colors={['#43BCF0', '#571280']}
      start={{ x: 1, y: -0.5 }}
      end={{ x: 1, y: 1 }}
      style={{ height: 80, paddingTop: 20 }}
    >
      <SafeAreaView style={styles.header}>
        <Logo width={124} height={40}/>
        <TouchableOpacity style={{ position: 'absolute', right: 20, top: 15 }}>
          <InfoIcon width={30} height={30} onPress={() => navigation.navigate('Details')} />
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default CustomHeader;
