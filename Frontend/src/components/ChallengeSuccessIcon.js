/* eslint-disable */

import React from 'react';
import { Image, StyleSheet } from 'react-native';

const ChallengeSuccessIcon = () => {
  return <Image source={require('../assets/images/ChallengeSuccessIcon.png')} style={styles.icon} />;
};

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    width: 85,
    height: 30,
    right: 16,
    top: '100%',
    marginTop: -15,
  },
});

export default ChallengeSuccessIcon;