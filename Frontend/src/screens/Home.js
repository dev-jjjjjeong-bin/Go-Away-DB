/* eslint-disable */

import React from 'react';
import { Image, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import BottomBar from '../components/BottomBar';

const Home = ({ navigation }) => {
  const gotoChallengeScreen = () => {
    navigation.navigate('Challenge');
  };
  const gotoCameraScreen =() => {
    navigation.navigate('Camera');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.box} onPress={gotoChallengeScreen}>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>챌린지</Text>
          <Text style={styles.descriptionText}>다양한 챌린지에 참여하고{'\n'}도장을 모아보세요</Text>
        </View>
        <Image source={require('../assets/images/ArrowIcon.png')} style={styles.arrow} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.box} onPress={gotoCameraScreen}>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>운동기구 설명</Text>
          <Text style={styles.descriptionText}>운동기구를 촬영하면 해당 기구에 대한{'\n'}설명을 볼 수 있어요</Text>
        </View>
        <Image source={require('../assets/images/ArrowIcon.png')} style={styles.arrow} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.box} onPress={() => {navigation.navigate('Plan')}}>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>오늘의 운동</Text>
          <Text style={styles.descriptionText}>매일 운동 계획을 간편하게 자동으로{'\n'}세울 수 있어요</Text>
        </View>
        <Image source={require('../assets/images/ArrowIcon.png')} style={styles.arrow} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.box}>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>마이페이지</Text>
          <Text style={styles.descriptionText}>가입 시 입력했던 회원님의 정보를 {'\n'}수정할 수 있어요</Text>
        </View>
        <Image source={require('../assets/images/ArrowIcon.png')} style={styles.arrow} />
      </TouchableOpacity>
      <BottomBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7F4FF',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 30,
  },
  box: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    width: 312,
    height: 160,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 10,   // 하얀 박스 사이의 간격
  },
  textBox: {
    alignItems: 'flex-start',
    paddingLeft: 5,
  },
  arrow: {
    width: 25,
    height: 25,
    position: 'absolute',
    right: 20,
    top: 18,
  },
  boxText: {   // 챌린지, 운동기구 찾기, 오늘의 운동, 마이페이지
    fontSize: 20,
    fontFamily: 'SCDream6',
    color: "black",
    marginBottom: 4,
  },
  descriptionText: {
    fontSize: 14,
    fontFamily: 'SCDream4',
    color: "#707070",
  },
});

export default Home;
