/* eslint-disable */

import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const InputInfo = () => {
  const [state, setState] = useState(0);   // 0: 성별, 1: 나이, 2: 체격, 3: 완료
  const [gender, setGender] = useState('');
  const [textAge, setTextAge] = useState('');
  const [textHeight, setTextHeight] = useState('');
  const [textWeight, setTextWeight] = useState('');

  const navigation = useNavigation();

  const handlePreviousButtonPress = () => {
    setState((current) => (current - 1 + 4) % 4);
  };

  const handleStateButtonPress =  async () => {
    if (state === 0 && gender === '') {
      alert('성별을 선택해주세요.');
      return;
    }
    if (state === 1 && textAge === '') {
      alert('나이를 입력해주세요.');
      return;
    }
    if (state === 2 && (textHeight === '' || textWeight === '')) {
      alert('신장과 몸무게를 모두 입력해주세요.');
      return;
    }
    if (state === 3) {
      try {
        await AsyncStorage.setItem('userInfo', JSON.stringify({
          'age': textAge,
          'gender': gender,
          'height': textHeight,
          'weight': textWeight
        }));

        // 로컬 저장소에 저장된 데이터 확인
        await AsyncStorage.getItem('userInfo', (err,result) => {
          const UserInfo = JSON.parse(result);
          console.log(UserInfo);
        })

        navigation.navigate('Home');
      } catch (error) {
        console.log("Error saving data: ", error);
      }
    }
    else {
      setState((current) => (current + 1) % 4);
    }
  };

  const handleGenderButtonPress = (selectedGender) => {
    setGender(selectedGender);
  };
  const handleTextAgeChange = (inputText) => {
    setTextAge(inputText.replace(/[^0-9]/g, ''));
  };
  const handleTextHeightChange = (inputText) => {
    setTextHeight(inputText.replace(/[^0-9]/g, ''));
  };
  const handleTextWeightChange = (inputText) => {
    setTextWeight(inputText.replace(/[^0-9]/g, ''));
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white", justifyContent: "space-between" }}>
      {state !== 3 && (
        <View id="title">
          <Text style={styles.title}>회원정보 입력</Text>
          <View style={styles.titleBar} />
        </View>
      )}
      {(state == 3 ?
        <View style={{ marginTop: 316, marginLeft: 43, height: 370 }}>
          <Text style={styles.completeText}>회원정보 입력이 {'\n'}완료되었습니다.</Text>
        </View>
        :
        <View id="inputInfoQuestion" style={styles.mainContainer}>
          {(state == 0 ?
            <View id="genderSection" style={{ alignItems: "center" }}>
              <Text style={styles.questionText}>귀하의 성별을 입력해주세요</Text>
              <View style={styles.genderButtonsContainer}>
                <TouchableOpacity
                  style={[styles.genderButton, gender === 'male' && styles.selectedGenderButton]}
                  onPress={() => handleGenderButtonPress('male')}>
                  <Text style={[styles.genderText, (gender == 'male' ? { color: "white" } : { color: "black" })]}>남</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.genderButton, gender === 'female' && styles.selectedGenderButton]}
                  onPress={() => handleGenderButtonPress('female')}>
                  <Text style={[styles.genderText, (gender == 'female' ? { color: "white" } : { color: "black" })]}>여</Text>
                </TouchableOpacity>
              </View>
            </View>
            :
            state == 1 ?
              <View id="ageSection">
                <Text style={styles.questionText}>귀하의 연령을 입력하여 주세요</Text>
                <View style={[styles.genderButtonsContainer, { alignItems: "center", justifyContent: "center" }]}>
                  <Text style={[styles.ageText, { marginRight: 13 }]}>만</Text>
                  <TextInput onChangeText={handleTextAgeChange} value={(textAge == '') ? " " : textAge.toString()}
                    style={styles.ageButton} keyboardType="numeric" textAlign="right" />
                  <Text style={[styles.ageText, { marginLeft: 13 }]}>세</Text>
                </View>
              </View>
              :
              <View id="bodySection">
                <Text style={styles.questionText}>귀하의 신장과 몸무게를 입력하여 주세요</Text>
                <View style={[styles.genderButtonsContainer, { alignItems: "center", justifyContent: "center" }]}>
                  <Text style={[styles.ageText, { marginRight: 13 }]}>신장</Text>
                  <TextInput onChangeText={handleTextHeightChange} value={(textHeight == '') ? " " : textHeight.toString()}
                    style={styles.ageButton} keyboardType="numeric" textAlign="right" />
                  <Text style={[styles.ageText, { marginLeft: 13 }]}>cm</Text>
                </View>
                <View style={[{ justifyContent: "center", flexDirection: 'row', alignItems: "center", marginTop: 40, paddingRight: 13 }]}>
                  <Text style={[styles.ageText, { marginRight: 13 }]}>몸무게</Text>
                  <TextInput onChangeText={handleTextWeightChange} value={(textWeight == '') ? " " : textWeight.toString()}
                    style={styles.ageButton} keyboardType="numeric" textAlign="right" />
                  <Text style={[styles.ageText, { marginLeft: 13 }]}>kg</Text>
                </View>
              </View>
          )}
        </View>
      )}
      <View id="navigationButtons" style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 30 }}>
        <TouchableOpacity style={[styles.buttonContainer, { width: 140 }]} onPress={handlePreviousButtonPress}>
          <Text style={styles.button}>이전</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonContainer, { width: 140 }]} onPress={handleStateButtonPress}>
          <Text style={styles.button}>{state === 3 ? "완료" : "다음"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: 95,
    marginLeft: 34,
    fontFamily: 'SCDream7',
    fontSize: 45,
    color: "#1047AD",
  },
  titleBar: {
    marginTop: 20,
    marginLeft: 40,
    borderTopWidth: 3,
    borderTopColor: "#8E8E8E",
    width: 49,
  },
  mainContainer: {
    alignItems: "center",
    marginTop: 139,
    height: 370
  },
  questionText: {
    fontSize: 20,
    fontFamily: 'SCDream6',
    color: "black",
  },
  completeText: {
    fontSize: 30,
    fontFamily: 'SCDream6',
    color: "#1047AD"
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1047AD",
    width: 291,
    height: 50,
    borderRadius: 10,
    marginBottom: 30,
  },
  button: {   // '다음', '이전', '완료' 버튼
    color: "white",
    fontSize: 20,
    fontFamily: 'SCDream6'
  },
  genderButtonsContainer: {
    justifyContent: "center",
    flexDirection: 'row',
    marginTop: 85,
  },
  genderButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 141,
    height: 50,
    backgroundColor: '#F2F2F2',
    borderRadius: 5,
    marginRight: 10,
  },
  selectedGenderButton: {
    backgroundColor: '#1047AD',
    color: 'white',
  },
  genderText: {   // '남', '여' 글씨
    fontFamily: 'SCDream5',
    fontSize: 20,
  },
  ageText: {   // 만 blank 세, 신장 blank cm, 몸무게 blank kg
    textAlign: "right",
    fontFamily: 'SCDream6',
    fontSize: 18,
    color: "black"
  },
  ageButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 5,
    width: 100,
    height: 50,
    fontSize: 15,
    color: 'black'
  }
});

export default InputInfo;
