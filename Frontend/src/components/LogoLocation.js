/* eslint-disable */

import React from 'react';
import { Image, View, StyleSheet } from 'react-native';

const LogoLocation = () => (
  <View style={styles.logoContainer}>
    <Image source={require('../assets/images/GymiusLogoBlue.png')} style={styles.logo} />
  </View>
);

const styles = StyleSheet.create({
  logoContainer: {
    alignSelf: 'flex-start',
    padding: 20,
  },
  logo: {
    width: 120,
    height: 70,
    resizeMode: 'contain',
  },
});

export default LogoLocation;