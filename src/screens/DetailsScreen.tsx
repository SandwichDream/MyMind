import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import styles from '../styles';
import LinearGradient from 'react-native-linear-gradient';

function DetailsScreen() {
  return (
    <LinearGradient start={{x: 1, y: 0}} end={{x: 0, y: 1}} colors={['#401896', '#43BCF0']} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, alignItems: 'center', paddingHorizontal: 20 }}>
        <Text style={styles.titleText}>RULES</Text>
        <Text style={styles.text}>Lorem ipsum dolor sit amet consectetur. A ut sit pellentesque vel. Sit tincidunt praesent adipiscing in magna erat enim nec urna. Aliquet volutpat id arcu fames varius mus ultricies mollis. Adipiscing blandit cursus faucibus vel ullamcorper dignissim at...</Text>
      </SafeAreaView>
    </LinearGradient>
  );
}

export default DetailsScreen;