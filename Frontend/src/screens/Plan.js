/* eslint-disable */

import React, { useState } from 'react';
import { Image, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars'
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
  const [selectedDay, setSelectedDay] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.calendarContainer}>
        <Calendar
          style={styles.calendar}
          monthFormat={'yyyy.MM'}
          hideExtraDays={false}
          onDayPress={day => {
            setSelectedDay(day.dateString);
          }}
          markedDates={{
            [selectedDay]: { selected: true, disableTouchEvent: true, selectedDotColor: '#1047AD' },
          }}
          theme={{
            dayTextColor: '#8E8E8E',
            backgroundColor: '#FFFFFF',
            selectedDayBackgroundColor: '#1047AD',
            selectedDayTextColor: '#FFFFFF',
            textDayFontSize: 16,
            textDayFontWeight: 'bold',
            textMonthFontSize: 20,
            textMonthFontWeight: 'bold',
          }}
          // 달이 바뀔 때 바뀐 달 출력
          onMonthChange={(month) => { console.log(month) }}
          // 달 이동 화살표 구현 왼쪽이면 왼쪽 화살표 이미지, 아니면 오른쪽 화살표 이미지
          renderArrow={(direction) => direction === "left" ?
            <Image name="left"
              source={require('../assets/images/CalendarLeft.png')}
              style={{ height: 14, width: 14 }}
            /> :
            <Image name="right"
              source={require('../assets/images/CalendarRight.png')}
              style={{ height: 14, width: 14 }}
            />}
        />
      </View>
      <View style={styles.plannerContainer}>
        <Text style={styles.todayText}>5월 29일</Text>
        <TouchableOpacity style={styles.plannerBtn}>
          <Text style={styles.plannerTxt}>오늘의 운동 계획하기</Text>
        </TouchableOpacity>
      </View>
      <BottomBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  calendarContainer: {
    flex: 1,
    marginTop: 30,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  calendar: {
    paddingRight: 40,
    paddingLeft: 40,
  },
  plannerContainer: {
    flex: 1,
    backgroundColor: '#EAEAEA',
    height: 320,
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 20,
  },
  todayText: {
    fontFamily: 'SCDream7',
    fontSize: 15,
    color: 'black'
  },
  plannerBtn: {
    marginTop: 22,
    backgroundColor: '#1047AD',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  plannerTxt: {
    fontFamily: 'SCDream4',
    fontSize: 16,
    color: 'white',
  }
});

export default Plan;
