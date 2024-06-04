import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity, Image } from 'react-native';
import BottomBar from '../components/BottomBar.js';
import LogoLocation from '../components/LogoLocation.js';

const CameraResult = ({route}) => {
  const { result, imageUri } = route.params;
  const { prediction } = result;
  const [machineName, confidence, machineDescription, videoUrl] = prediction[0];

  return (
    <View style={styles.container}>
      <LogoLocation />
      <View style={styles.contentContainer}>
        <View style={styles.imageBox}>
          <Image source={{ uri: imageUri }} style={styles.image} />
        </View>
        <Text style={styles.machineText}>{machineName}</Text>
        <Text style={styles.titleText}>운동 개요</Text>
        <Text style={styles.resultText}>{machineDescription}</Text>
        <Text style={styles.titleText}>운동 방법</Text>
        <TouchableOpacity
          style={{alignSelf: 'flex-start', marginLeft:35}}
          onPress={() => Linking.openURL(`${videoUrl}`)}>
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
    flex:1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },
  imageBox: {
    width:290,
    height:305,
    backgroundColor: 'white'
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
    marginTop: 15
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
    textAlign: 'justify'
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
});

export default CameraResult;