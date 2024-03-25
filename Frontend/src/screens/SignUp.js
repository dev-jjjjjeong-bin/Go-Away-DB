import React, {useState} from 'react';
import type {Node} from 'react';
import {
  StyleSheet,
  Text, TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const SignUp: () => Node = () => {
  const [state, setState] = useState(0); //0: 성별, 1: 나이, 2: 체격, 3: 완료
  const [gender, setGender] = useState('');
  const [textAge, setTextAge] = useState(0);
  const [textHeight, setTextHeight] = useState(0);
  const [textWeight, setTextWeight] = useState(0);

  const handleStateButtonPress = () => {
    // if (state != 3) {
    //   setState(state+1);
    // }

    setState((state+1)%4);
    console.log(state);
  }
  const handleGenderButtonPress = (selectedGender) => {
    setGender(selectedGender);
  }
  const handleTextAgeChange = (inputText) => {
    setTextAge(inputText);
  };
  const handleTextHeightChange = (inputText) => {
    setTextHeight(inputText);
  };
  const handleTextWeightChange = (inputText) => {
    setTextWeight(inputText);
  };


  return (
      <View style={{backgroundColor:"white"}}>
        <View id="title">
          <Text style={styles.title}>Sign up</Text>
          <View style={styles.titleBar} />
        </View>
        {(state == 3 ?
            <View style={{marginTop:139, marginLeft:43, height: 370}}>
              <Text style={styles.completeText}>회원가입이 {'\n'}완료되었습니다.</Text>
            </View> :
            <View id="signUpQuestion" style={styles.mainContainer}>
              {(state == 0 ?
                  <View id="genderSection" style={{alignItems: "center"}}>
                    <Text style={styles.questionText}>귀하의 성별을 입력해주세요</Text>
                    <View style={styles.genderButtonsContainer}>
                      <TouchableOpacity
                          style={[styles.genderButton, gender === 'male' && styles.selectedGenderButton]}
                          onPress={() => handleGenderButtonPress('male')}>
                        <Text style={(gender == 'male' ? {color:"white"} : {color:"black"})}>남</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                          style={[styles.genderButton, gender === 'female' && styles.selectedGenderButton]}
                          onPress={() => handleGenderButtonPress('female')}>
                        <Text style={(gender == 'female' ? {color:"white"} : {color:"black"})}>여</Text>
                      </TouchableOpacity>
                    </View>
                  </View> :
              state == 1 ?
                  <View id="ageSection">
                    <Text style={styles.questionText}>귀하의 연령을 입력하여 주세요</Text>
                    <View style={[styles.genderButtonsContainer, {alignItems:"center", justifyContent: "center"}]}>
                      <Text style={[styles.ageText, {marginRight: 13}]}>만</Text>
                      <TextInput onChangeText={handleTextAgeChange} value={(textAge=='') ? " ": textAge.toString()}
                                 style={styles.ageButton} keyboardType="numeric" textAlign="right"/>
                      <Text style={[styles.ageText, {marginLeft: 13}]}>세</Text>
                    </View>
                  </View>
                  :
                  <View id="bodySection">
                    <Text style={styles.questionText}>귀하의 신장과 몸무게를 입력하여 주세요</Text>
                    <View style={[styles.genderButtonsContainer, {alignItems:"center", justifyContent: "center"}]}>
                      <Text style={[styles.ageText, {marginRight: 13}]}>신장</Text>
                      <TextInput onChangeText={handleTextHeightChange} value={(textHeight=='') ? " ": textHeight.toString()}
                                 style={styles.ageButton} keyboardType="numeric" textAlign="right"/>
                      <Text style={[styles.ageText, {marginLeft: 13}]}>cm</Text>
                    </View>
                    <View style={[{justifyContent: "center", flexDirection: 'row', alignItems:"center", marginTop:40, paddingRight:13}]}>
                      <Text style={[styles.ageText, {marginRight: 13}]}>몸무게</Text>
                      <TextInput onChangeText={handleTextWeightChange} value={(textWeight=='') ? " ": textWeight.toString()}
                                 style={styles.ageButton} keyboardType="numeric" textAlign="right"/>
                      <Text style={[styles.ageText, {marginLeft: 13}]}>kg</Text>
                    </View>
                  </View>
              )}
            </View>
        )}
        <View id="nextButton" style={{alignItems:'center'}}>
          <TouchableOpacity style={styles.buttonContainer} onPress={handleStateButtonPress}>
            <Text style={styles.button}>{(state == 3 ? "로그인" : "다음")}</Text>
          </TouchableOpacity>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: 95,
    marginLeft: 34,
    fontFamily: 'Inter-SemiBold',
    fontSize: 45,
    color: "#1047AD",
  },
  titleBar: {
    marginTop: 20,
    marginLeft: 40,
    borderTopWidth:3,
    borderTopColor: "#8E8E8E",
    width: 49,
  },
  mainContainer: {
    alignItems: "center",
    marginTop: 139,
    height: 370
  },
  questionText: {
    fontSize: 15,
    fontFamily: 'Inter-SemiBold',
    color: "black",
  },
  completeText: {
    fontSize: 30,
    fontFamily: 'Inter-SemiBold',
    color: "#1047AD"
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1047AD",
    width: 291,
    height: 50,
    borderRadius: 10
  },
  button: {
    color: "white",
    fontSize: 20,
    fontFamily: 'Inter-Bold'
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
  ageText: {
    textAlign: "right",
    fontFamily: 'Inter-SemiBold',
    fontSize: 15,
    color: "black"
  },
  ageButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 5,
    width: 100,
    height: 50,
    fontSize: 15
  }
});

export default SignUp;

