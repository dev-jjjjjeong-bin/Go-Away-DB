import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';

const BottomBar = () => {
  return (
    <View style={styles.bottomBar}>
      <TouchableOpacity style={styles.iconButton}>
        <Image source={require('../assets/images/CalendarIcon.png')} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton}>
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
    borderColor: '#000',
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