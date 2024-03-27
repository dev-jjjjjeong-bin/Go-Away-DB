/* eslint-disable */

import React from 'react';
import { SafeAreaView, ScrollView, Image, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import BottomBar from '../components/BottomBar';

const Challenge = ({ navigation }) => {
  // 각 박스 및 하단바의 아이콘을 눌렀을 때의 동작 추가

  return (
    <SafeAreaView style={styles.fullContainer}>
      <View style={styles.headerContainer}>
        <Image source={require('../assets/images/GymiusLogoBlue.png')} style={styles.logo} />
        <Text style={styles.challengeText}>챌린지</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <TouchableOpacity style={styles.box}>
          <View style={styles.textBox}>
            <Text style={styles.boxText}>초급1</Text>
            <Text style={styles.descriptionText}>이번달 오늘의 계획을 5일 이상 세워보세요</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box}>
          <View style={styles.textBox}>
            <Text style={styles.boxText}>초급2</Text>
            <Text style={styles.descriptionText}>이번달 오늘의 계획 성공을 3번 이상 {'\n'}달성해보세요</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box}>
          <View style={styles.textBox}>
            <Text style={styles.boxText}>중급1</Text>
            <Text style={styles.descriptionText}>이번달 오늘의 계획을 10일 이상 {'\n'}세워보세요</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box}>
          <View style={styles.textBox}>
            <Text style={styles.boxText}>중급2</Text>
            <Text style={styles.descriptionText}>이번달 오늘의 계획 성공을 7번 이상 {'\n'}달성해보세요</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box}>
          <View style={styles.textBox}>
            <Text style={styles.boxText}>고급</Text>
            <Text style={styles.descriptionText}>이번달 오늘의 계획을 20일 이상 세우고, {'\n'}15번 이상 달성해보세요</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
      <BottomBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    alignItems: 'center'
  },
  logo: {
    width: 120,
    height: 70,
    marginLeft: -250,
    resizeMode: 'contain',   // 이미지 비율 유지
  },
  challengeText: {
    fontFamily: 'SCDream7',
    fontSize: 36, 
    color: 'black',
    marginBottom: 10,
  },
  scrollViewContent: {
    alignItems: 'center',
    paddingVertical: 10,
    paddingBottom: 80,   // 하단바 높이만큼 패딩을 추가하여 모든 콘텐츠가 보이도록 함
  },
  box: {
    backgroundColor: '#E7F4FF',
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
  boxText: {   // 초급1, 초급2, 중급1, 중급2, 고급
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

export default Challenge;