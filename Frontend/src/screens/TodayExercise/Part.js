/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const Part = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [selection, setSelection] = useState('');
  const [level, setLevel] = useState('');

  useEffect(() => {
    if (route.params?.level) {
      setLevel(route.params.level);
    }
  }, [route.params]);

  const handleSelection = (option) => {
    setSelection(option);
  };

  const goToNextScreen = () => {
    if (level === 'beginner' && selection === 'option1') { 
      navigation.navigate('ShoulderBeginner');
    }
    else {
      
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
        <TouchableOpacity
          style={[styles.optionButton, selection === 'option1' && styles.selectedOptionButton]}
          onPress={() => handleSelection('option1')}>
          <Text style={[styles.optionText, selection === 'option1' && styles.selectedOptionText]}>어깨</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.optionButton, selection === 'option2' && styles.selectedOptionButton]}
          onPress={() => handleSelection('option2')}>
          <Text style={[styles.optionText, selection === 'option2' && styles.selectedOptionText]}>등</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.optionButton, selection === 'option3' && styles.selectedOptionButton]}
          onPress={() => handleSelection('option3')}>
          <Text style={[styles.optionText, selection === 'option3' && styles.selectedOptionText]}>가슴</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.optionButton, selection === 'option4' && styles.selectedOptionButton]}
          onPress={() => handleSelection('option4')}>
          <Text style={[styles.optionText, selection === 'option4' && styles.selectedOptionText]}>복부</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.optionButton, selection === 'option5' && styles.selectedOptionButton]}
          onPress={() => handleSelection('option5')}>
          <Text style={[styles.optionText, selection === 'option5' && styles.selectedOptionText]}>하체</Text>
        </TouchableOpacity>
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
    fontFamily: 'SCDream5',
    fontSize: 15,
    color: 'white',
  },
  optionText: {
    fontFamily: 'SCDream5',
    fontSize: 15,
    color: 'black',
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