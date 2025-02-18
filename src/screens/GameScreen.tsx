import React, { useState, useEffect } from 'react';
import { SafeAreaView, Image, View, TouchableOpacity, Dimensions, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../styles';
import { NavigationProps } from '../navigation/types';

import BackIcon from '../../assets/svgs/back.svg';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

function GameScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<NavigationProps<'Game'>['route']>();
  const { choosedLevel } = route.params ?? { choosedLevel: 0 };

  const background_images = [
    require('../../assets/images/BG(0).png'),
    require('../../assets/images/BG(1).png'),
    require('../../assets/images/BG(2).png'),
    require('../../assets/images/BG(3).png'),
    require('../../assets/images/BG(4).png'),
    require('../../assets/images/BG(5).png'),
    require('../../assets/images/BG(6).png'),
    require('../../assets/images/BG(7).png'),
  ];

  const cards_images = [
    [require('../../assets/images/cards/zeus.png'), require('../../assets/images/cards/parthenon.png')],
    [require('../../assets/images/cards/bone.png'), require('../../assets/images/cards/dog_dalmatian.png'), require('../../assets/images/cards/dog_pug.png'), require('../../assets/images/cards/doghouse.png')],
    [require('../../assets/images/cards/pagoda.png'), require('../../assets/images/cards/ramen.png'), require('../../assets/images/cards/tiger.png'), require('../../assets/images/cards/umbrella.png')],
    [require('../../assets/images/cards/cake.png'), require('../../assets/images/cards/candy_white_red.png'), require('../../assets/images/cards/candy_bomb.png'), require('../../assets/images/cards/candy_orange.png'), require('../../assets/images/cards/candy_purple.png'), require('../../assets/images/cards/candy_pink.png')],
    [require('../../assets/images/cards/alien.png'), require('../../assets/images/cards/ufo.png'), require('../../assets/images/cards/rocket.png')],
    [require('../../assets/images/cards/slime_blue.png'), require('../../assets/images/cards/slime_purple.png'), require('../../assets/images/cards/slime_yellow.png')],
    [require('../../assets/images/cards/potion_red.png'), require('../../assets/images/cards/potion_orange.png'), require('../../assets/images/cards/potion_green.png')],
    [require('../../assets/images/cards/robot_blue.png'), require('../../assets/images/cards/robot_green.png'), require('../../assets/images/cards/robot_orange.png'), require('../../assets/images/cards/robot_pink.png'), require('../../assets/images/cards/robot_purple.png'), require('../../assets/images/cards/robot_red.png')],
  ];

  const selectedCards = cards_images[choosedLevel];

  const [cards, setCards] = useState(
    [...selectedCards, ...selectedCards]
      .map((card) => ({ image: card, isFlipped: true, isMatched: false }))
      .sort(() => Math.random() - 0.5)
  );

  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [isMemoryPhase, setIsMemoryPhase] = useState(true);
  const [life, setLife] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [hasWon, setHasWon] = useState(false);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setCards((prev) => prev.map((card) => ({ ...card, isFlipped: false })));
      setIsMemoryPhase(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (cards.every((card) => card.isMatched)) {
      setCompletedLevels(prevState => ({
        ...prevState,
        [`level${choosedLevel}`]: true
      }));
      setHasWon(true);
      setGameOver(true);
    }
  }, [cards]);

  const handleCardPress = (index: number) => {
    if (isMemoryPhase || cards[index].isFlipped || cards[index].isMatched || flippedIndices.length >= 2 || gameOver) return;

    const newFlipped = [...flippedIndices, index];
    const newCards = [...cards];
    newCards[index].isFlipped = true;

    if (newFlipped.length === 2) {
      const [firstIdx, secondIdx] = newFlipped;
      if (newCards[firstIdx].image === newCards[secondIdx].image) {
        newCards[firstIdx].isMatched = true;
        newCards[secondIdx].isMatched = true;
      } else {
        setTimeout(() => {
          setLife((prev) => prev - 1);
          newCards[firstIdx].isFlipped = false;
          newCards[secondIdx].isFlipped = false;
          setCards([...newCards]);
        }, 1000);
      }
      setFlippedIndices([]);
    } else {
      setFlippedIndices(newFlipped);
    }

    setCards([...newCards]);
  };

  useEffect(() => {
    if (life === 0 && !hasWon) {
      setGameOver(true);
    }
  }, [life, hasWon]);

  const saveData = async () => {
    try {
      await AsyncStorage.setItem('completedLevelsData', JSON.stringify(completedLevels));
    } catch (error) {
      console.error('Помилка збереження:', error);
    }
  };

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

  const removeData = async () => {
    await AsyncStorage.removeItem('completedLevelsData');
  };

  useEffect(() => {
    loadData();
  }, []);

  const imgSize: number = Dimensions.get('window').width / (cards.length / (1 + cards.length / 5));

  return (
    <>
      <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }} colors={['#43BCF0', '#541896', '#711280']} style={{ flex: 1, marginTop: 80 }}>
        <Image source={background_images[choosedLevel]} style={styles.imageBG} />
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
            {cards.map((card, index) => (
              <TouchableOpacity key={index} onPress={() => handleCardPress(index)} disabled={card.isMatched || gameOver}>
                <Image source={card.isFlipped ? card.image : require('../../assets/images/cards/unknown.png')} style={{ width: imgSize, height: imgSize, margin: 5 }} />
              </TouchableOpacity>
            ))}
          </View>
          {gameOver && (
            <View style={{ backgroundColor: "#00000099", position: "absolute", width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>
              <LinearGradient start={{ x: 0.25, y: 0 }} end={{ x: 0, y: 1 }} colors={['#8864E8', '#2BD5E8']} style={{ width: "85%", height: 150, borderWidth: 2, borderColor: 'white', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                <LinearGradient start={{ x: 1.3, y: 0 }} end={{ x: 1, y: 1 }} colors={['#43BCF0', '#541896']} style={{ width: "50%", height: "50%", borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: "white", fontSize: 24 }}>{hasWon ? "You win!" : "You lose!"}</Text>
                </LinearGradient>
              </LinearGradient>
            </View>
          )}
        </SafeAreaView>
      </LinearGradient>
      <LinearGradient
        colors={['#43BCF0', '#571280']}
        start={{ x: 1, y: -0.5 }}
        end={{ x: 1, y: 1 }}
        style={{ position: "absolute", width: "100%", height: 80, paddingTop: 20 }}
      >
        <SafeAreaView style={styles.header}>
          <TouchableOpacity style={{ position: 'absolute', left: 20, top: 15 }}>
            <BackIcon width={30} height={30} onPress={() => {saveData(); navigation.goBack()}} />
          </TouchableOpacity>
          <View style={{ width: 30, height: 30 }}>
            <Image source={require('../../assets/images/heart.png')} style={{width: 30, height: 30, position: 'absolute', top: 15}}/>
            <Text style={{ color: "white", position: 'absolute', top: 17, left: 11.5}}>
              {life < 0 ? "0" : life}
            </Text>
          </View>
          <LinearGradient
            colors={['#00FFB2', '#24BFC9']}
            start={{ x: 1, y: -0.5 }}
            end={{ x: 1, y: 1 }}
            style={{ position: 'absolute', top: 15, right: 20, paddingVertical: 5, paddingHorizontal: 10, borderRadius: 50 }}
          >
            <Text>{cards.filter((card) => card.isMatched).length/2}/{selectedCards.length}</Text>
          </LinearGradient>
        </SafeAreaView>
      </LinearGradient>
    </>
    
  );
}

export default GameScreen;
