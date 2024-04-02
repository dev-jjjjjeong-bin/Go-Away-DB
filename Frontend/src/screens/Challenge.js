/* eslint-disable */

import React from 'react';
import { SafeAreaView, ScrollView, Image, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import BottomBar from '../components/BottomBar.js';
import LogoLocation from '../components/LogoLocation.js';
import ChallengeSuccessIcon from '../components/ChallengeSuccessIcon';

const levelDescriptions = {
  '초급1': '이번달 오늘의 계획을 \n5일 이상 세워보세요',
  '초급2': '이번달 오늘의 계획 성공을 \n3번 이상 달성해보세요',
  '중급1': '이번달 오늘의 계획을 \n10일 이상 세워보세요',
  '중급2': '이번달 오늘의 계획 성공을 \n7번 이상 달성해보세요',
  '고급': '이번달 오늘의 계획을 20일 이상 세우고, \n15번 이상 달성해보세요'
};

const Challenge = ({ navigation }) => {

  return (
    <SafeAreaView style={styles.fullContainer}>
      <LogoLocation />
      <View style={styles.header}>
        <Text style={styles.challengeText}>챌린지</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {Object.keys(levelDescriptions).map((level, index) => (
          <TouchableOpacity key={level} style={styles.box}>

            {/* 캘린더에서 조건 채우면 생성되는 성공 아이콘 */}
            {/* <ChallengeSuccessIcon /> */}

            <View style={styles.textBox}>
              <Text style={styles.boxText}>{level}</Text>
              <Text style={styles.descriptionText}>{levelDescriptions[level]}</Text>
            </View>
          </TouchableOpacity>
        ))}
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
  header: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  challengeText: {
    fontFamily: 'SCDream7',
    fontSize: 36,
    color: 'black',
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
