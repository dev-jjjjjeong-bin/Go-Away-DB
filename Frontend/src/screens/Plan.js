/* eslint-disable */

import React, {useEffect, useState} from 'react';
import {Image, View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, TextInput} from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import BottomBar from "../components/BottomBar";

LocaleConfig.locales.fr = {
  monthNames: ['01월', '02월', '03월', '04월', '05월', '06월', '07월', '08월', '09월', '10월', '11월', '12월'],
  monthNamesShort: ['01월', '02월', '03월', '04월', '05월', '06월', '07월', '08월', '09월', '10월', '11월', '12월'],
  dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: "Aujourd'hui",
};
LocaleConfig.defaultLocale = 'fr';

const Plan = ({ navigation }) => {
  const [bodyTexts, setBodyTexts] = useState({
    어깨: [],
    등: [],
    가슴: [],
    복부: [],
    하체: []
  });

  const [plannedDates, setPlannedDates] = useState({});
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedDayText, setSelectedDayText] = useState('');
  const [showTextInput, setShowTextInput] = useState({
    어깨: false,
    등: false,
    가슴: false,
    복부: false,
    하체: false
  });
  const [textInput, setTextInput] = useState({
    어깨: '',
    등: '',
    가슴: '',
    복부: '',
    하체: ''
  });
  const [shouldFetchCalendar, setShouldFetchCalendar] = useState(false);

  const monthPlanDay = async (month) => {
    try {
      const response = await fetch(`http://52.79.95.216:8080/calender?month=${month}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setPlannedDates(Object.keys(data).reduce((acc, current) => {
        const monthString = String(month).padStart(2,'0');
        const dayString = String(current).padStart(2, '0');
        const dateString = `2024-${monthString}-${dayString}`;

        acc[dateString] = {
          selected: true,
          selectedColor: data[current] ? '#99CCFF' : '#DFDDDD',
          selectedTextColor: '#5B5B5B'
        };
        return acc;
      }, {}));
    } catch (error) {
      console.error('ERROR: ', error);
    }
  };

  const handleMonthChange = (month) => {
    const newMonth = month.month;
    monthPlanDay(newMonth);
  };

  const handleDayPress = async (day) => {
    setSelectedDay(day.dateString);
    setSelectedDayText(`${day.year}년 ${day.month}월 ${day.day}일`);
    try {
      const response = await fetch(`http://52.79.95.216:8080/todo?date=${day.dateString}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (result.isSuccess) {
        const exercises = result.data;
        const newBodyTexts = {
          어깨: [],
          등: [],
          가슴: [],
          복부: [],
          하체: []
        };

        exercises.forEach(exercise => {
          newBodyTexts[exercise.part].push({
            exercise: exercise.exercise,
            is_completed: exercise.is_completed
          });
        });

        setBodyTexts(newBodyTexts);
      } else {
        setBodyTexts({
          어깨: [],
          등: [],
          가슴: [],
          복부: [],
          하체: []
        });
      }
    } catch (error) {
      console.error('ERROR: ', error);
      setBodyTexts({
        어깨: [],
        등: [],
        가슴: [],
        복부: [],
        하체: []
      });
    }
  };

  useEffect(() => {
    const currentMonth = new Date().getMonth() + 1;
    monthPlanDay(currentMonth);
  }, []);

  useEffect(() => {
    if (shouldFetchCalendar) {
      const currentMonth = new Date().getMonth() + 1;
      monthPlanDay(currentMonth);
      setShouldFetchCalendar(false);
    }
  }, [shouldFetchCalendar]);

  useEffect(() => {
    if (selectedDay) {
      handleDayPress({ dateString: selectedDay, year: parseInt(selectedDay.split('-')[0]), month: parseInt(selectedDay.split('-')[1]), day: parseInt(selectedDay.split('-')[2]) });
    }
  }, [selectedDay]);

  const handleInputBtn = async (part) => {
    const inputText = textInput[part];
    if (inputText.trim()) {
      try {
        const response = await fetch('http://52.79.95.216:8080/todo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            date: selectedDay,
            part: part,
            exercise: inputText,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        if (result.isSuccess) {
          setBodyTexts(prevState => ({
            ...prevState,
            [part]: [...prevState[part], {exercise: inputText, is_completed: 0}]
          }));
          setTextInput(prevState => ({
            ...prevState,
            [part]: ''
          }));
          setShowTextInput(prevState => ({
            ...prevState,
            [part]: false
          }));
          setShouldFetchCalendar(true);
        }
      } catch (error) {
        console.error('ERROR: ', error);
      }
    }
  };

  const handleInputTxt = (part, inputText) => {
    setTextInput(prevState => ({
      ...prevState,
      [part]: inputText
    }));
  };

  const handleCheckPress = async (part, exercise, isCompleted) => {
    const newStatus = isCompleted === 0 ? 1 : 0;
    try {
      const response = await fetch('http://52.79.95.216:8080/todo/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: selectedDay,
          part: part,
          exercise: exercise,
          is_completed: newStatus
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (result.message === "Status updated successfully") {
        setBodyTexts(prevState => ({
          ...prevState,
          [part]: prevState[part].map(item =>
            item.exercise === exercise ? {...item, is_completed: newStatus} : item
          )
        }));
        setShouldFetchCalendar(true);
      }
    } catch (error) {
      console.error('ERROR: ', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View id="calendar" style={styles.calendarContainer}>
        <Calendar
          style={styles.calendar}
          monthFormat={'yyyy.MM'}
          hideExtraDays={true}
          onDayPress={handleDayPress}
          markedDates={{
            ...plannedDates,
            [selectedDay]: {selected: true, disableTouchEvent: true, selectedColor: '#1047AD', textColor: 'white'}
          }}
          theme={{
            dayTextColor: '#5B5B5B',
            selectedDayBackgroundColor: '#1047AD',
            textDayFontSize: 16,
            textDayFontWeight: 'bold',
            textMonthFontSize: 20,
            textMonthFontWeight: 'bold',
          }}
          onMonthChange={handleMonthChange}
          renderArrow={(direction) => direction === "left" ?
            <Image
              name="left"
              source={require('../assets/images/CalendarLeft.png')}
              style={{height:14, width:14}}
            /> :
            <Image
              name="right"
              source={require('../assets/images/CalendarRight.png')}
              style={{height:14, width:14}}
            />}
        />
      </View>

      <ScrollView style={styles.plannerContainer}>
        <Text style={styles.todayText}>{selectedDayText || '날짜를 선택하세요'}</Text>
        <View id="dayList" style={{paddingBottom:80}}>
          {Object.keys(bodyTexts).map(part => (
            <View key={part}>
              <TouchableOpacity
                id="partListAddBtn"
                onPress={() => setShowTextInput(prevState => ({
                  ...prevState,
                  [part]: !prevState[part]
                }))}
                style={{marginBottom: 15}}
              >
                <View style={{flexDirection:"row", alignItems: 'center'}}>
                  <View id="partName" style={styles.partContainer}>
                    <Text style={styles.partText}>{part}</Text>
                  </View>
                  <Text style={{fontFamily: 'SCDream6', fontSize: 15, color:'#5B5B5B'}}>추가하기 +</Text>
                </View>
              </TouchableOpacity>
              {bodyTexts[part].map((item, index) => (
                <TouchableOpacity
                  key={item.exercise}
                  style={styles.listContainer}
                  onPress={() => handleCheckPress(part, item.exercise, item.is_completed)}
                >
                  <View id="checkBox" style={[styles.checkBox, {backgroundColor: item.is_completed ? '#1047AD' : 'white'}]}>
                    {item.is_completed ? (
                      <Image
                        name="checkBox"
                        source={require('../assets/images/Check.png')}
                        style={{height:14, width:16}}
                      />
                    ) : null}
                  </View>
                  <Text id="listText" style={{fontFamily:"SCDream4", fontSize: 17, color: 'black'}}>{item.exercise}</Text>
                </TouchableOpacity>
              ))}
              {showTextInput[part] && (
                <View id="list Input" style={{flexDirection: "row", justifyContent: 'space-between'}}>
                  <TextInput
                    onChangeText={(text) => handleInputTxt(part, text)}
                    value={textInput[part]}
                    style={styles.textInput}
                  />
                  <TouchableOpacity onPress={() => handleInputBtn(part)} style={styles.arrowContainer}>
                    <Image
                      name="enterArrow"
                      source={require('../assets/images/AddArrow.png')}
                      style={{height:30, width:20}}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
      <BottomBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#FFFFFF',
  },
  calendarContainer: {
    flex:1,
    marginTop: 30,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  calendar: {
    paddingRight: 40,
    paddingLeft: 40,
  },
  plannerContainer: {
    flex:1,
    backgroundColor: '#EAEAEA',
    paddingHorizontal: 25,
    paddingTop: 20,
  },
  todayText: {
    fontFamily: 'SCDream7',
    fontSize: 15,
    color: 'black',
    marginBottom: 10
  },
  partContainer: {
    borderRadius: 10,
    height: 28,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#99CCFF',
    marginRight: 10
  },
  partText: {
    fontFamily: 'SCDream5',
    fontSize: 15,
    color: 'white'
  },
  listContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginBottom: 15,
    height: 43,
    borderRadius: 10,
    alignItems: 'center',
  },
  checkBox: {
    height:20,
    width: 20,
    borderWidth: 2,
    borderColor: '#1047AD',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 24,
    marginRight: 10,
  },
  textInput: {
    height: 46,
    backgroundColor: 'white',
    width: '85%',
    borderRadius: 10,
    marginBottom: 15,
    fontFamily: "SCDream4",
    paddingLeft: 15,
    fontSize: 16,
    color: 'black'
  },
  arrowContainer: {
    height: 46,
    width: 46,
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10
  }
});

export default Plan;
