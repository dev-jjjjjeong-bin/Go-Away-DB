/* eslint-disable */

import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity, Image } from 'react-native';
import BottomBar from '../components/BottomBar.js';
import LogoLocation from '../components/LogoLocation.js';

const CameraResult = ({ route, navigation }) => {
  const { imageUri, prediction } = route.params;

  if (!prediction || prediction.length === 0) {
    return (
      <View style={styles.container}>
        <LogoLocation />
        <View style={styles.contentContainer}>
          <Text style={styles.errorText}>Prediction data is missing or empty.</Text>
        </View>
        <BottomBar />
      </View>
    );
  }

  const [label, confidence, description, videoUrl] = prediction[0];

  const openVideo = () => {
    Linking.openURL(videoUrl).catch(err => console.error("Couldn't load page", err));
  };

  if (confidence < 85) {
    return (
      <View style={styles.container}>
        <LogoLocation />
        <View style={styles.popupContainer}>
          <Image source={{ uri: imageUri }} style={styles.image} />
          <Text style={styles.machineText}>운동기구를 식별할 수 없습니다.</Text>
          <Text style={styles.machineText}>운동기구를 다시 촬영해 주세요.</Text>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.retryButton}>
            <Text style={styles.retryButtonText}>운동기구 다시 촬영하러 가기</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Camera')} style={styles.albumLinkContainer}>
            <Text style={styles.albumLink}>가지고 있는 이미지를 사용하기 원하시나요? 앨범에서 이미지 가져오기</Text>
          </TouchableOpacity>
        </View>
        <BottomBar />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LogoLocation />
      <View style={styles.contentContainer}>
        <View style={styles.imageBox}>
          <Image source={{ uri: imageUri }} style={styles.image} />
        </View>
        <Text style={styles.machineText}>{label}</Text>
        <Text style={styles.titleText}>운동 개요</Text>
        <Text style={styles.resultText}>{description}</Text>
        <Text style={styles.titleText}>운동 방법</Text>
        <TouchableOpacity
          style={{ alignSelf: 'flex-start', marginLeft: 35 }}
          onPress={openVideo}>
          <Text style={styles.linkText}>운동방법 영상 보러가기</Text>
        </TouchableOpacity>
      </View>
      <BottomBar style={styles.bottomBar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },
  imageBox: {
    width: 290,
    height: 305,
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  machineText: {
    fontSize: 20,
    color: 'black',
    width: '100%',
    paddingLeft: 35,
    paddingRight: 35,
    fontFamily: 'SCDream6',
    textAlign: 'center',
    marginTop: 15,
  },
  titleText: {
    fontSize: 15,
    color: 'black',
    fontFamily: 'SCDream6',
    marginTop: 20,
    marginLeft: 35,
    alignSelf: 'flex-start',
  },
  resultText: {
    fontSize: 12,
    color: 'black',
    fontFamily: 'SCDream4',
    width: '100%',
    marginTop: 10,
    paddingLeft: 35,
    paddingRight: 35,
    textAlign: 'justify',
  },
  linkText: {
    fontSize: 12,
    color: 'black',
    fontFamily: 'SCDream4',
    width: '100%',
    marginTop: 10,
    textAlign: 'justify',
    textDecorationLine: 'underline',
  },
  popupContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    justifyContent: 'center',
    marginBottom: 80,
  },
  errorMessage: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  errorDescription: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    borderRadius: 5,
    padding: 10,
    backgroundColor: 'white',
    marginBottom: 20,
  },
  retryButtonText: {
    fontSize: 18,
    color: 'black',
  },
  albumLinkContainer: {
    marginTop: 20,
  },
  albumLink: {
    fontSize: 16,
    color: '#1047AD',
    textDecorationLine: 'underline',
  },
  bottomBar: {
    marginBottom: 0,
  },
});

export default CameraResult;