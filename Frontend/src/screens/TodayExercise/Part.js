/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const Part = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [level, setLevel] = useState('');

  useEffect(() => {
    if (route.params?.level) {
      setLevel(route.params.level);
      setSelectedOptions([]);
    }
  }, [route.params]);

  const parts = [
    { id: 'option1', name: '어깨' },
    { id: 'option2', name: '등' },
    { id: 'option3', name: '가슴' },
    { id: 'option4', name: '복부' },
    { id: 'option5', name: '하체' },
  ];

  const handleSelection = (id) => {
    let maxSelectable = level === 'beginner' ? 1 : (level === 'intermediate' ? 2 : 3);
    if (selectedOptions.includes(id)) {
      setSelectedOptions(selectedOptions.filter(option => option !== id));
    } else {
      if (selectedOptions.length < maxSelectable) {
        setSelectedOptions([...selectedOptions, id]);
      } else {
        alert(`최대 ${maxSelectable}개의 부위만 선택할 수 있습니다.`);
      }
    }
  };

  const goToNextScreen = () => {
    if (level === 'beginner') {
      const selection = selectedOptions[0];
      switch (selection) {
        case 'option1': navigation.navigate('ShoulderBeginner'); break;
        case 'option2': navigation.navigate('BackBeginner'); break;
        case 'option3': navigation.navigate('ChestBeginner'); break;
        case 'option4': navigation.navigate('AbsBeginner'); break;
        case 'option5': navigation.navigate('LegBeginner'); break;
        default:
      }
    }
    else if (level === 'intermediate' && selectedOptions.length === 2) {
      const priorityOrder = ['option1', 'option2', 'option3', 'option4', 'option5'];
      const sortedOptions = selectedOptions.sort((a, b) => priorityOrder.indexOf(a) - priorityOrder.indexOf(b));
      const nextPage = sortedOptions[0];
      switch (nextPage) {
        case 'option1': navigation.navigate('ShoulderIntermediate', { selectedOptions: sortedOptions }); break;
        case 'option2': navigation.navigate('BackIntermediate', { selectedOptions: sortedOptions }); break;
        case 'option3': navigation.navigate('ChestIntermediate', { selectedOptions: sortedOptions }); break;
        case 'option4': navigation.navigate('AbsIntermediate', { selectedOptions: sortedOptions }); break;
        case 'option5': navigation.navigate('LegIntermediate', { selectedOptions: sortedOptions }); break;
        default:
      }
    }
    else if (level === 'advanced' && selectedOptions.length === 3) {
      const priorityOrder = ['option1', 'option2', 'option3', 'option4', 'option5'];
      const sortedOptions = selectedOptions.sort((a, b) => priorityOrder.indexOf(a) - priorityOrder.indexOf(b));
      const nextPage = sortedOptions[0];
      switch (nextPage) {
        case 'option1': navigation.navigate('ShoulderAdvanced'); break;
        case 'option2': navigation.navigate('BackAdvanced'); break;
        case 'option3': navigation.navigate('ChestAdvanced'); break;
        case 'option4': navigation.navigate('AbsAdvanced'); break;
        case 'option5': navigation.navigate('LegAdvanced'); break;
        default:
      }
    }
  };

  return (
    <View style={styles.container}>
      <View id="title">
        <Text style={styles.title}>오늘의 운동</Text>
        <View style={styles.titleBar} />
      </View>
      <View id="options" style={styles.optionContainer}>
        <Text style={styles.questionText}>운동할 부위를 선택해주세요</Text>
        {parts.map((part) => (
          <TouchableOpacity
            key={part.id}
            style={[styles.optionButton, selectedOptions.includes(part.id) ? styles.selectedOptionButton : {}]}
            onPress={() => handleSelection(part.id)}>
            <Text style={[styles.optionText, selectedOptions.includes(part.id) ? styles.selectedOptionText : {}]}>
              {part.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.nextButton} onPress={goToNextScreen}>
        <Text style={styles.nextButtonText}>다음</Text>
      </TouchableOpacity>
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
  questionText: {
    fontFamily: 'SCDream5',
    fontSize: 15,
    color: 'black',
    marginBottom: 50,
  },
  optionContainer: {
    alignItems: 'center',
  },
  optionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 291,
    height: 50,
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    marginBottom: 16,
  },
  selectedOptionButton: {
    backgroundColor: '#1047AD',
  },
  selectedOptionText: {
    color: 'white',
    fontFamily: 'SCDream5',
    fontSize: 15,
  },
  optionText: {
    color: 'black',
    fontFamily: 'SCDream5',
    fontSize: 15,
  },
  nextButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1047AD',
    width: 291,
    height: 50,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 100,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'SCDream6',
  },
});

export default Part;