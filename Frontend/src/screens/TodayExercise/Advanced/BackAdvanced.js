/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const exercises = [
  '데드리프트 (5 set)',
  '덤벨 스내치(5 set)',
  '바벨 스내치(5 set)',
  '체인 풀업(5 set)',
  '머슬업(5 set)',
  '싱글 암 풀업(5 set)',
  '바벨 로우(오버핸드 그립)(5 set)',
  '웨이티드 인버티드 로우(5 set)',
  '헤비 T - 바 로우(5 set)',
  '원 암 레버 로우(5 set)',
  '클린(5 set)',
  '클린 앤 저크(5 set)',
  '스내치 그립 데드리프트(5 set)',
  '케이블 스태거드 로우(5 set)',
  '원 암 케이블 풀다운(5 set)',
];

const createTriplets = (exercises, existingTriplets) => {
  let tripleGroups = [];
  const stringifySet = set => [...set].sort().join(' \n ');

  while (tripleGroups.length < 3) {
    let selected = [];
    while (selected.length < 3) {
      const index = Math.floor(Math.random() * exercises.length);
      if (!selected.includes(exercises[index])) {
        selected.push(exercises[index]);
      }
    }

    // 새로운 운동 세트가 기존 세트와 중복되지 않는지 확인
    const newSetString = stringifySet(selected);
    if (!existingTriplets.includes(newSetString)) {
      tripleGroups.push(newSetString);   // 중복되지 않는 경우에만 추가
      existingTriplets.push(newSetString);
    }
  }
  return tripleGroups;
};

const BackAdvanced = () => {
  const [selected, setSelected] = useState(null);
  const [selectedTriplets, setSelectedTriplets] = useState([]);
  const [existingTriplets, setExistingTriplets] = useState([]);
  const [recommendationIndex, setRecommendationIndex] = useState(1);

  useEffect(() => {
    const initialTripleGroups = createTriplets(exercises, existingTriplets);
    setSelectedTriplets(initialTripleGroups);
    setExistingTriplets(existingTriplets.concat(initialTripleGroups));
  }, []);

  const handleSelection = (option) => {
    setSelected(option === selected ? null : option);
  };

  const handleRecommendation = () => {
    if (recommendationIndex < 3) {
      const newTripleGroups = createTriplets(exercises, existingTriplets);
      setSelectedTriplets(newTripleGroups);
      setExistingTriplets(existingTriplets.concat(newTripleGroups));
      setRecommendationIndex(recommendationIndex + 1);
    }
    else {
      alert('더 이상의 추천은 불가능합니다.');
    }
  };

  return (
    <View style={styles.container}>
      <View id="title">
        <Text style={styles.title}>오늘의 운동</Text>
        <View style={styles.titleBar} />
        <Text style={styles.subtitle}>등(고급)</Text>
      </View>
      <View id="options" style={styles.optionContainer}>
        <Text style={styles.questionText}>마음에 드는 운동 구성을 선택하세요</Text>
        {selectedTriplets.map((triplet, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.optionButton, selected === triplet && styles.selectedOptionButton]}
            onPress={() => handleSelection(triplet)}
          >
            <Text style={[styles.optionText, selected === triplet && styles.selectedOptionText]}>{triplet}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.completeButton}>
        <Text style={styles.completeButtonText}>완료</Text>
      </TouchableOpacity>
      <View id="recommend" style={styles.recommendContainer}>
        <Text style={styles.recommendText}>마음에 드는 운동 구성이 없나요?</Text>
        <TouchableOpacity style={styles.recommendButton} onPress={handleRecommendation}>
          <Text style={styles.recommendButtonText}>운동 재추천 하기 ({recommendationIndex}/3)</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  title: {
    marginTop: 50,
    marginLeft: 34,
    fontFamily: 'SCDream7',
    fontSize: 45,
    color: '#1047AD',
  },
  titleBar: {
    marginTop: 20,
    marginLeft: 40,
    borderTopWidth: 3,
    borderTopColor: '#8E8E8E',
    width: 49,
  },
  subtitle: {
    marginTop: 20,
    marginLeft: 40,
    fontFamily: 'SCDream7',
    fontSize: 24,
    color: 'black',
  },
  questionText: {
    fontFamily: 'SCDream5',
    fontSize: 15,
    color: 'black',
    marginTop: 30,
    marginBottom: 30,
  },
  optionContainer: {
    alignItems: 'center',
  },
  optionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 291,
    height: 100,
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    marginBottom: 16,
  },
  selectedOptionButton: {
    backgroundColor: '#1047AD',
  },
  selectedOptionText: {
    fontFamily: 'SCDream5',
    fontSize: 15,
    color: 'white',
  },
  optionText: {
    fontFamily: 'SCDream5',
    fontSize: 15,
    color: 'black',
    marginBottom: 10,
    textAlign: 'center',
  },
  completeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1047AD',
    width: 291,
    height: 50,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 30,
  },
  completeButtonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'SCDream6',
  },
  recommendContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
  recommendText: {
    color: '#C2BFBF',
    fontSize: 12,
    fontFamily: 'SCDream6',
    marginTop: -5,
  },
  recommendButtonText: {
    color: '#1047AD',
    fontSize: 12,
    fontFamily: 'SCDream6',
  },
});

export default BackAdvanced;