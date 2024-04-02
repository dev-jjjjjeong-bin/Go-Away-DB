/* eslint-disable */

import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AutoOrDirect = ({ navigation }) => {
  const [selection, setSelection] = useState('');

  const handleSelection = (option) => {
    setSelection(option);
  };

  const gotoNextScreen = () => {
    if (selection === 'option1') {
      navigation.navigate('Level');
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
        <TouchableOpacity
          style={[styles.optionButton, selection === 'option1' && styles.selectedOptionButton]}
          onPress={() => handleSelection('option1')}>
          <Text style={[styles.optionText1, selection === 'option1' && styles.selectedOptionText1]}>운동 계획 추천</Text>
          <Text style={[styles.optionText2, selection === 'option1' && styles.selectedOptionText2]}>Gymius가 오늘의 운동을 추천해요</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.optionButton, selection === 'option2' && styles.selectedOptionButton]}
          onPress={() => handleSelection('option2')}>
          <Text style={[styles.optionText1, selection === 'option2' && styles.selectedOptionText1]}>운동 직접 세우기</Text>
          <Text style={[styles.optionText2, selection === 'option2' && styles.selectedOptionText2]}>직접 무슨 운동을 할 지 계획해요</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.nextButton} onPress={gotoNextScreen}>
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
  optionContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  optionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 291,
    height: 150,
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    marginBottom: 16,
  },
  selectedOptionButton: {
    backgroundColor: '#1047AD',
  },
  selectedOptionText1: {
    fontFamily: 'SCDream5',
    fontSize: 20,
    color: 'white',
  },
  selectedOptionText2: {
    fontFamily: 'SCDream4',
    fontSize: 10,
    color: 'white',
  },
  optionText1: {
    fontFamily: 'SCDream5',
    fontSize: 20,
    color: 'black',
    marginBottom: 10,
  },
  optionText2: {
    fontFamily: 'SCDream4',
    fontSize: 10,
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

export default AutoOrDirect;