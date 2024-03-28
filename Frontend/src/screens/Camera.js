/* eslint-disable */

import React, { useEffect } from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';
import BottomBar from '../components/BottomBar';
import LogoLocation from '../components/LogoLocation';

const Camera = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <LogoLocation />
      <View style={styles.contentContainer}>
        <Text style={styles.text}>카메라 영역에 운동기구가 {'\n'}잘리지 않도록 촬영해주세요</Text>
        <View style={styles.greyBox}>
          <Image source={require('../assets/images/CameraIcon.png')} style={styles.icon} />
          <Text style={styles.buttonText}>촬영하기</Text>
        </View>
      </View>
      <BottomBar style={styles.bottomBar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 200,
  },
  text: {
    fontSize: 13,
    color: 'black',
    fontFamily: 'SCDream5',
    textAlign: 'center',
    marginBottom: 25,
  },
  greyBox: {
    width: 249,
    height: 305,
    borderRadius: 16,
    backgroundColor: '#EAEAEA',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  icon: {
    width: 80,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 20,
    color: 'black',
    fontFamily: 'SCDream5',
    marginTop: 20,
  },
});

export default Camera;