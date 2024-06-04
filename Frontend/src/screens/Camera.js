/* eslint-disable */

import React from 'react';
import { Image, TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import BottomBar from '../components/BottomBar.js';
import LogoLocation from '../components/LogoLocation.js';
import { launchImageLibrary } from 'react-native-image-picker';

const Camera = ({ navigation }) => {
  const uploadImage = async () => {
    let image = null;

    await launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.errorCode) {
        console.log("ImagePicker ERROR :", response.errorCode);
      } else if (response.assets) {
        image = response.assets[0];
      }
    });

    if (!image) return;

    const formData = new FormData();
    formData.append('file', {
      uri: image.uri,
      type: image.type || 'image/jpeg',
      name: image.fileName || 'temp_image.jpg',
    });

    try {
      const response = await fetch('http://52.79.95.216:8080/search', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (!response.ok) throw new Error(`Server responded with status ${response.status}`);
      const result = await response.json();
      console.log("SUCCESS:", result);
      navigation.navigate('Result', { imageUri: image.uri, prediction: result.prediction });
    } catch (error) {
      console.error('ERROR:', error);
    }
  };

  const selectImageFromLibrary = async () => {
    let image = null;

    const result = await launchImageLibrary({ mediaType: 'photo' });
    if (result.didCancel) {
      console.log("User cancelled image picker");
      return;
    } else if (result.errorCode) {
      console.log("ImagePicker ERROR:", result.errorCode);
      return;
    } else if (result.assets) {
      image = result.assets[0];
    }

    if (!image) return;

    const formData = new FormData();
    formData.append('file', {
      uri: image.uri,
      type: image.type || 'image/jpeg',
      name: image.fileName || 'temp_image.jpg',
    });

    try {
      const response = await fetch('http://52.79.95.216:8080/search', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (!response.ok) throw new Error(`Server responded with status ${response.status}`);
      const result = await response.json();
      console.log("SUCCESS:", result);
      navigation.navigate('Result', { imageUri: image.uri, prediction: result.prediction });
    } catch (error) {
      console.error('ERROR:', error);
    }
  };

  return (
    <View style={styles.container}>
      <LogoLocation />
      <View style={styles.contentContainer}>
        <Text style={styles.text}>카메라 영역에 운동기구가 {'\n'}잘리지 않도록 촬영해주세요</Text>
        <TouchableOpacity style={styles.greyBox} onPress={uploadImage}>
          <Image source={require('../assets/images/CameraIcon.png')} style={styles.icon} />
          <Text style={styles.buttonText}>촬영하기</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={selectImageFromLibrary} style={styles.centeredTextContainer}>
          <Text style={[styles.optionText, {color:"#C2BFBF"}]}>가지고 있는 이미지를 사용하기 원하시나요?</Text>
          <Text style={[styles.optionText, {color: '#1047AD'}]}>앨범에서 이미지 가져오기</Text>
        </TouchableOpacity>
      </View>
      <BottomBar style={styles.bottomBar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 200,
  },
  text: {
    fontSize: 13,
    color: 'black',
    fontFamily: 'SCDream5',
    textAlign: 'center',
    marginBottom: 25,
  },
  greyBox: {
    width: 249,
    height: 305,
    borderRadius: 16,
    backgroundColor: '#EAEAEA',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  icon: {
    width: 80,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 20,
    color: 'black',
    fontFamily: 'SCDream5',
    marginTop: 20,
  },
  centeredTextContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  optionText: {
    fontSize: 16,
    fontFamily: 'SCDream6',
    textAlign: 'center',
  },
  albumText: {
    fontSize: 16,
    color: '#1047AD',
    fontFamily: 'SCDream6',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default Camera;