/* eslint-disable */

import React, {useEffect} from 'react';
import { Image, StyleSheet, View } from 'react-native';

const LoadingScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('InputInfo');   // 3초 후에 InputInfo 화면으로 네비게이션
    }, 3000);
    return () => clearTimeout(timer);   // 컴포넌트 언마운트 시 타이머 제거
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/GymiusLogoWhite.png')} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1047AD',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 70,
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
});

export default LoadingScreen;