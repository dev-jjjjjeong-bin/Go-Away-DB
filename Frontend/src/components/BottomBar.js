/* eslint-disable */

import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BottomBar = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.bottomBar}>
      <TouchableOpacity style={styles.iconButton}>
        <Image source={require('../assets/images/CalendarIcon.png')} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Image source={require('../assets/images/HomeIcon.png')} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton}>
        <Image source={require('../assets/images/CameraIcon.png')} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    height: 60,
    position: 'absolute',
    bottom: 0,
    borderTopWidth: 3,
    borderColor: 'black',
  },
  iconButton: {
    padding: 10,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  }
});

export default BottomBar;