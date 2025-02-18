import { SafeAreaView, TouchableOpacity, Image, ScrollView, View } from 'react-native';
import { RootStackParamList } from '../navigation/types';
import styles from '../styles';
import LinearGradient from 'react-native-linear-gradient';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';

function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [completedLevels, setCompletedLevels] = useState(
      {
        level0: false,
        level1: false,
        level2: false,
        level3: false,
        level4: false,
        level5: false,
        level6: false,
        level7: false
      }
    );

  const loadData = async () => {
    try {
      const data = await AsyncStorage.getItem('completedLevelsData');
      if (data !== null) {
        setCompletedLevels(JSON.parse(data));
      }
    } catch (error) {
      console.error('Помилка отримання:', error);
    }
  };

  useEffect(() => {
      loadData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  return (
    <LinearGradient start={{x: 1, y: 0}} end={{x: 0, y: 1}} colors={['#43BCF0', '#541896', '#711280']} style={{ flex: 1 }}>
      <Image source={require('../../assets/images/gradient.png')} style={styles.imageBG}/>
      <SafeAreaView>
        <ScrollView contentContainerStyle={styles.containerLevel}>
          <TouchableOpacity style={styles.containerLevelItem} onPress={() => navigation.navigate('Game', { choosedLevel: 0 })}>
            <Image style={styles.homeIcons} source={require('../../assets/images/olymp.png')}/>
            <View style={completedLevels.level0 ? styles.markComplete : styles.markUncomplete}></View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.containerLevelItem} onPress={() => navigation.navigate('Game', { choosedLevel: 1 })}>
            <Image style={styles.homeIcons} source={require('../../assets/images/dogs.png')}/>
            <View style={completedLevels.level1 ? styles.markComplete : styles.markUncomplete}></View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.containerLevelItem} onPress={() => navigation.navigate('Game', { choosedLevel: 2 })}>
            <Image style={styles.homeIcons} source={require('../../assets/images/japan.png')}/>
            <View style={completedLevels.level2 ? styles.markComplete : styles.markUncomplete}></View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.containerLevelItem} onPress={() => navigation.navigate('Game', { choosedLevel: 3 })}>
            <Image style={styles.homeIcons} source={require('../../assets/images/candyLand.png')}/>
            <View style={completedLevels.level3 ? styles.markComplete : styles.markUncomplete}></View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.containerLevelItem} onPress={() => navigation.navigate('Game', { choosedLevel: 4 })}>
            <Image style={styles.homeIcons} source={require('../../assets/images/space.png')}/>
            <View style={completedLevels.level4 ? styles.markComplete : styles.markUncomplete}></View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.containerLevelItem} onPress={() => navigation.navigate('Game', { choosedLevel: 5 })}>
            <Image style={styles.homeIcons} source={require('../../assets/images/slime.png')}/>
            <View style={completedLevels.level5 ? styles.markComplete : styles.markUncomplete}></View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.containerLevelItem} onPress={() => navigation.navigate('Game', { choosedLevel: 6 })}>
            <Image style={styles.homeIcons} source={require('../../assets/images/magic.png')}/>
            <View style={completedLevels.level6 ? styles.markComplete : styles.markUncomplete}></View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.containerLevelItem} onPress={() => navigation.navigate('Game', { choosedLevel: 7 })}>
            <Image style={styles.homeIcons} source={require('../../assets/images/robots.png')}/>
            <View style={completedLevels.level7 ? styles.markComplete : styles.markUncomplete}></View>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

export default HomeScreen;