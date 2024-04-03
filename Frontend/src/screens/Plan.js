/* eslint-disable */

import React, {useEffect, useState} from 'react';
import {Image, View, Text, TouchableOpacity, StyleSheet, TextInput, SafeAreaView, ScrollView} from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars'
import BottomBar from "../components/BottomBar";


LocaleConfig.locales.fr = {
    monthNames: [
        '01월',
        '02월',
        '03월',
        '04월',
        '05월',
        '06월',
        '07월',
        '08월',
        '09월',
        '10월',
        '11월',
        '12월',
    ],
    monthNamesShort: [
        '01월',
        '02월',
        '03월',
        '04월',
        '05월',
        '06월',
        '07월',
        '08월',
        '09월',
        '10월',
        '11월',
        '12월',
    ],
    dayNames: [
        '일요일',
        '월요일',
        '화요일',
        '수요일',
        '목요일',
        '금요일',
        '토요일',
    ],
    dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
    today: "Aujourd'hui",
};
LocaleConfig.defaultLocale = 'fr';

const Plan = ({ navigation }) => {
    // 차후 백데이터로부터 연결
    const [list, setList] = useState(["2024-04-04", "2024-04-25", "2024-04-16", "2024-05-01"]); // 예시
    const [bodyTexts, setBodyTexts] = useState({
        어깨: ["어깨1","어깨2"],
        등: [],
        가슴: ["가슴1"],
        복부: [],
        하체: ["하체1"]
    });
    const [markedDates, setMarkedDates] = useState({});

    // 백데이터 연결할 필요 x, 프론트에서만 처리
    const [selectedDay, setSelectedDay] = useState('');
    const BodyParts = ['어깨', '등', '가슴', '복부', '하체'];
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

    const handleInputBtn = (part) => {
        setShowTextInput(prevState => ({
            ...prevState,
            [part]: !prevState[part]
        }));
    };
    const handleInputTxt = (part, inputText) => {
        setTextInput(prevState => ({
            ...prevState,
            [part]: inputText
        }))
    }

    useEffect(() => {
        setMarkedDates(list.reduce((acc, current) => {
            acc[current] = {selected: true, selectedColor: '#99CCFF', selectedTextColor:'#5B5B5B' };
            return acc;
        }, {}));
    }, [list]);


    return (
        <SafeAreaView style={styles.container}>
            <View id="calendar" style={styles.calendarContainer}>
                <Calendar
                    style={styles.calendar}
                    monthFormat = {'yyyy.MM'}
                    hideExtraDays={true}
                    onDayPress={day => {
                        setSelectedDay(day.dateString);
                    }}
                    markedDates={{
                        ...markedDates,
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
                    // 달이 바뀔 때 바뀐 달 출력
                    onMonthChange={(month) => {console.log(month)}}
                    // 달 이동 화살표 구현 왼쪽이면 왼쪽 화살표 이미지, 아니면 오른쪽 화살표 이미지
                    renderArrow={(direction) => direction === "left" ?
                        <Image name="left"
                               source={require('../assets/images/CalendarLeft.png')}
                               style={{height:14, width:14}}
                        /> :
                        <Image name="right"
                               source={require('../assets/images/CalendarRight.png')}
                               style={{height:14, width:14}}
                        />}
                />
            </View>
            <ScrollView style={styles.plannerContainer}>
                <Text style={styles.todayText}>5월 29일</Text>
                <View id="dayList" style={{paddingBottom:80}}>
                    {BodyParts.map(part => (
                        <View key={part}>
                            <TouchableOpacity id="partListAddBtn" onPress={() => console.log(`${part} 추가하기 눌림`)} style={{marginBottom: 15}}>
                                <View style={{flexDirection:"row", alignItems: 'center'}}>
                                    <View id="partName" style={styles.partContainer}>
                                        <Text style={styles.partText}>{part}</Text>
                                    </View>
                                    <Text style={{fontFamily: 'SCDream6', fontSize: 15}}>추가하기 +</Text>
                                </View>
                            </TouchableOpacity>
                            {bodyTexts[part].map((list, index) => (
                                <TouchableOpacity
                                    key={list}
                                    style={styles.listContainer}
                                    //onPress={() => handleBoxPress(part, index)}
                                >
                                    <View id="checkBox" style={[styles.checkBox,{backgroundColor: list ? 'white': '#1047AD'}]}>
                                        <Image
                                            name="checkBox"
                                            source={require('../assets/images/Check.png')}
                                            style={{height:14, width:16}}
                                        />
                                    </View>
                                    <Text id="listText" style={{fontFamily:"SCDream4", fontSize: 18, color: 'black'}}>{list}</Text>
                                </TouchableOpacity>
                            ))}
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
        fontSize: 16,
        color: 'white'
    },
    listContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        marginBottom: 15,
        height: 46,
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

    }
});

export default Plan;
