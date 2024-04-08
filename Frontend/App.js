/* eslint-disable */

import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoadingScreen from './src/screens/LoadingScreen';
import InputInfo from './src/screens/InputInfo';
import Home from './src/screens/Home';
import Challenge from './src/screens/Challenge';
import Camera from './src/screens/Camera';
import Plan from './src/screens/Plan';
import AutoOrDirect from './src/screens/TodayExercise/AutoOrDirect';
import Level from './src/screens/TodayExercise/Level';
import Part from './src/screens/TodayExercise/Part';
import ShoulderBeginner from './src/screens/TodayExercise/Beginner/ShoulderBeginner';
import BackBeginner from './src/screens/TodayExercise/Beginner/BackBeginner';
import ChestBeginner from './src/screens/TodayExercise/Beginner/ChestBeginner';
import AbsBeginner from './src/screens/TodayExercise/Beginner/AbsBeginner';
import LegBeginner from './src/screens/TodayExercise/Beginner/LegBeginner';
import ShoulderIntermediate from './src/screens/TodayExercise/Intermediate/ShoulderIntermediate';
import BackIntermediate from './src/screens/TodayExercise/Intermediate/BackIntermediate';
import ChestIntermediate from './src/screens/TodayExercise/Intermediate/ChestIntermediate';
import AbsIntermediate from './src/screens/TodayExercise/Intermediate/AbsIntermediate';
import LegIntermediate from './src/screens/TodayExercise/Intermediate/LegIntermediate';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false, // 모든 스크린에 대해 헤더를 숨김
        }}
      >
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen
          name="InputInfo"
          component={InputInfo}
          options={{
            tabBarStyle: { display: 'none' },
          }}
        />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Challenge" component={Challenge} />
        <Stack.Screen name="Camera" component={Camera} />
        <Stack.Screen name="Plan" component={Plan} />
        <Stack.Screen name="AutoOrDirect" component={AutoOrDirect} />
        <Stack.Screen name="Level" component={Level} />
        <Stack.Screen name="Part" component={Part} />
        <Stack.Screen name="ShoulderBeginner" component={ShoulderBeginner} />
        <Stack.Screen name="BackBeginner" component={BackBeginner} />
        <Stack.Screen name="ChestBeginner" component={ChestBeginner} />
        <Stack.Screen name="AbsBeginner" component={AbsBeginner} />
        <Stack.Screen name="LegBeginner" component={LegBeginner} />
        <Stack.Screen name="ShoulderIntermediate" component={ShoulderIntermediate} />
        <Stack.Screen name="BackIntermediate" component={BackIntermediate} />
        <Stack.Screen name="ChestIntermediate" component={ChestIntermediate} />
        <Stack.Screen name="AbsIntermediate" component={AbsIntermediate} />
        <Stack.Screen name="LegIntermediate" component={LegIntermediate} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
