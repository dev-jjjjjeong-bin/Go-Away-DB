import React, {useState} from 'react';
import type {Node} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const SignUp: () => Node = () => {
  const [state, setState] = useState(0); //0: 성별, 1: 나이, 2: 체격, 3: 완료
  const [gender, setGender] = useState('');

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


  return (
      <View>
        <View id="title">
          <Text style={styles.title}>Sign up</Text>
          <View style={styles.titleBar} />
        </View>
        {(state == 3 ?
            <View style={{marginTop:139, marginLeft:43}}>
              <Text style={styles.completeText}>회원가입이 {'\n'}완료되었습니다.</Text>
            </View> :
            <View id="signUpQuestion" style={styles.mainContainer}>
              {(state == 0 ? // gender
                  <View>
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
              state == 1 ? // age
                  <Text style={styles.questionText}>귀하의 연령을 입력해주세요</Text> :
                  // height
                  <Text style={styles.questionText}>귀하의 신장과 몸무게를 입력하여 주세요</Text>
              )}

            </View>
        )}
        <View id="button" style={[styles.mainContainer, {flex:1, justifyCenter:"flex-end", marginBottom:100}]}>
          <TouchableOpacity style={styles.buttonContainer} onPress={handleStateButtonPress}>
            <Text style={styles.button}>{(state == 3 ? "Login" : "Next")}</Text>
          </TouchableOpacity>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: 95,
    marginLeft: 34,
    fontWeight: "600",
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
    height: 20
  },
  questionText: {
    fontSize: 15,
    fontWeight: "400",
    color: "black",
  },
  completeText: {
    fontSize: 30,
    fontWeight: "600",
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
    fontWeight: "600"
  },
  genderButtonsContainer: {
    flexDirection: 'row',
    marginTop: 10,
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
});

export default SignUp;

