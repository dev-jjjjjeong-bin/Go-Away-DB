/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const exercises = [
  '행잉 레그 레이즈(5 set)',
  '드래곤 플래그(5 set)',
  '토 투 바(5 set)',
  '에어 바이크(5 set)',
  '웨이티드 플랭크(5 set)',
  '웨이티드 V - 업(5 set)',
  '앱 롤아웃(스탠딩)(5 set)',
  '스위스 볼 파이크(5 set)',
  '스위스 볼 롤아웃(5 set)',
  '슬라이더 플랭크(5 set)',
  '케이블 우드촹크(5 set)',
  '가로바 리버스 크런치(5 set)',
  '웨이티드 사이드 밴드(5 set)',
  '바벨 트위스트(5 set)',
  '인버티드 행잉 크런치(5 set)',
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

const AbsAdvanced = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [selected, setSelected] = useState(null);
  const [selectedTriplets, setSelectedTriplets] = useState([]);
  const [existingTriplets, setExistingTriplets] = useState([]);
  const [recommendationIndex, setRecommendationIndex] = useState(1);
  const [isLastSelection, setIsLastSelection] = useState(false);

  useEffect(() => {
    const selectedOptions = route.params?.selectedOptions ?? [];
    setIsLastSelection(selectedOptions[selectedOptions.length - 1] === 'option4');
    const initialTriplets = createTriplets(exercises, []);
    setSelectedTriplets(initialTriplets);
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

  const handleComplete = () => {
    if (selected === null) {
      alert('운동 구성을 선택해주세요.');
      return;
    }
    navigation.navigate('Plan');
  };

  const handleNext = () => {
    if (selected === null) {
      alert('운동 구성을 선택해주세요.');
      return;
    }
    if (!isLastSelection) {
      const currentPageIndex = route.params.selectedOptions.indexOf('option4');
      const nextPageOption = route.params.selectedOptions[currentPageIndex + 1];
      let screenName = '';   // 실제 스크린 이름으로 변환 
      switch (nextPageOption) {
        case 'option1': screenName = 'ShoulderAdvanced'; break;
        case 'option2': screenName = 'BackAdvanced'; break;
        case 'option3': screenName = 'ChestAdvanced'; break;
        case 'option4': screenName = 'AbsAdvanced'; break;
        case 'option5': screenName = 'LegAdvanced'; break;
      }
      if (screenName) {
        navigation.navigate(screenName, { selectedOptions: route.params.selectedOptions });
      }
    }
  };

  return (
    <View style={styles.container}>
      <View id="title">
        <Text style={styles.title}>오늘의 운동</Text>
        <View style={styles.titleBar} />
        <Text style={styles.subtitle}>복부(고급)</Text>
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
      <TouchableOpacity style={styles.nextORcompleteButton} onPress={isLastSelection ? handleComplete : handleNext}>
        <Text style={styles.nextORcompleteButtonText}>{isLastSelection ? '완료' : '다음'}</Text>
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
  nextORcompleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1047AD',
    width: 291,
    height: 50,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 30,
  },
  nextORcompleteButtonText: {
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

export default AbsAdvanced;