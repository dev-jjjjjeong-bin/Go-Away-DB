/* eslint-disable */

import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import BottomBar from '../components/BottomBar.js';
import LogoLocation from '../components/LogoLocation.js';
import ChallengeSuccessIcon from '../components/ChallengeSuccessIcon';

const levelDescriptions = {
  '초급1': '이번달 오늘의 계획을 5일 이상 세워보세요',
  '초급2': '이번달 오늘의 계획 성공을 3번 이상\n달성해보세요',
  '중급1': '이번달 오늘의 계획을 10일 이상 세워보세요',
  '중급2': '이번달 오늘의 계획 성공을 7번 이상 \n달성해보세요',
  '고급': '이번달 오늘의 계획을 20일 이상 세우고, \n15번 이상 달성해보세요'
};

const Challenge = ({ navigation }) => {
  const [challenges, setChallenges] = useState([0, 0, 0, 0, 0]);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await fetch('http://52.79.95.216:8080/challenge', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setChallenges(data);
      } catch (error) {
        console.error('Error fetching challenges:', error);
      }
    };

    fetchChallenges();
  }, []);

  return (
    <SafeAreaView style={styles.fullContainer}>
      <LogoLocation />
      <View style={styles.header}>
        <Text style={styles.challengeText}>챌린지</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {Object.keys(levelDescriptions).map((level, index) => (
          <TouchableOpacity key={level} style={styles.box}>
            {challenges[index] === 1 && <Text style={styles.icon}>성공 🏃🏻‍♂️</Text>}
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
    fontFamily: 'SCDream6',
    fontSize: 36,
    color: 'black',
  },
  scrollViewContent: {
    alignItems: 'center',
    paddingVertical: 10,
    paddingBottom: 80,   // 하단바 높이만큼 패딩을 추가하여 모든 콘텐츠가 보이도록 함
  },
  icon: {
    position: 'absolute',
    fontSize: 25,
    color: '#1047AD',
    fontFamily: 'SCDream6',
    right: 16,
    top:'100%',
    marginTop: -15,
  },
  box: {
    backgroundColor: '#E7F4FF',
    borderRadius: 16,
    padding: 20,
    width: "85%",
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
    fontFamily: 'SCDream7',
    color: "black",
    marginBottom: 4,
  },
  descriptionText: {
    fontSize: 15,
    fontFamily: 'SCDream4',
    color: "#7F7C7C",
    marginTop: 5,
  },
});

export default Challenge;
