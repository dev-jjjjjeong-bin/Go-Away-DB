/* eslint-disable */

import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Level = ({ navigation }) => {
  const [selection, setSelection] = useState('');

  const handleSelection = (option) => {
    setSelection(option);
  };

  const gotoPartScreen = () => {
    console.log(selection);
    if (selection === '') {
      alert('운동의 난이도를 선택해주세요');
      return;
    }
    if (selection === 'option1') {
      navigation.navigate('Part', { level: 'beginner' });
    }
    else if (selection === 'option2') {
      navigation.navigate('Part', { level: 'intermediate' });
    }
    else if (selection === 'option3') {
      navigation.navigate('Part', { level: 'advanced' })
    }
    else {
      alert('운동의 난이도를 선택해주세요');
    }
  };

  return (
    <View style={styles.container}>
      <View id="title">
        <Text style={styles.title}>오늘의 운동</Text>
        <View style={styles.titleBar} />
      </View>
      <View id="options" style={styles.optionContainer}>
        <Text style={styles.questionText}>운동의 난이도를 선택해주세요</Text>
        <TouchableOpacity
          style={[styles.optionButton, selection === 'option1' && styles.selectedOptionButton]}
          onPress={() => handleSelection('option1')}>
          <Text style={[styles.optionText, selection === 'option1' && styles.selectedOptionText]}>초급(1부위, 2종목)</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.optionButton, selection === 'option2' && styles.selectedOptionButton]}
          onPress={() => handleSelection('option2')}>
          <Text style={[styles.optionText, selection === 'option2' && styles.selectedOptionText]}>중급(2부위, 2종목)</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.optionButton, selection === 'option3' && styles.selectedOptionButton]}
          onPress={() => handleSelection('option3')}>
          <Text style={[styles.optionText, selection === 'option3' && styles.selectedOptionText]}>고급(3부위, 3종목)</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.nextButton} onPress={gotoPartScreen}>
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

export default Level;