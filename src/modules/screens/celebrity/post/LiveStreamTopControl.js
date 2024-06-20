import React, { useRef, useState } from 'react';
import {
  AppRegistry,
  StyleSheet,
  StatusBar,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import { RNCamera } from 'react-native-camera';
import { style } from 'styled-system';
import ButtonToggleGroup from 'react-native-button-toggle-group';

export const LiveStreamTopControl = ({
  onClick,
  cameraView,
  setCameraView,
  cameraViewFlashlight,
  navigation,
  setCameraViewFlashlight,
}) => {
  return (
    <View style={styles.topControl}>
      <View style={styles.topcontrolLeft}>
        <TouchableOpacity
          style={styles.bglightCancelOpacity}
          onPress={() => {
            navigation.navigate('Home');
            navigation.navigate('General', {
              screen: 'Home',
            });
          }}
        >
          <Image
            source={require('../../../../assets/images/cancel-icon.png')}
            style={styles.cancelbtn}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.topcontrolRight}>
        <TouchableOpacity
          style={styles.bglightOpacity}
          onPress={() => {
            if (cameraViewFlashlight == RNCamera.Constants.FlashMode.on) {
              setCameraViewFlashlight(RNCamera.Constants.FlashMode.off);
            } else {
              setCameraViewFlashlight(RNCamera.Constants.FlashMode.on);
            }
          }}
        >
          {cameraViewFlashlight == RNCamera.Constants.FlashMode.on ? (
            <Image
              source={require('../../../../assets/images/icon-flash-on-yellow.png')}
              style={styles.flashlightbtn}
            />
          ) : (
            <Image
              source={require('../../../../assets/images/flashlight-toggle-camera.png')}
              style={styles.flashlightbtn}
            />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.topcontrolRight}>
        <TouchableOpacity
          style={styles.bglightOpacity}
          onPress={() => {
            if (cameraView == 'back') {
              setCameraView('front');
            } else {
              setCameraView('back');
            }
          }}
        >
          <Image
            source={require('../../../../assets/images/camera-flip-toggle.png')}
            style={styles.flashlightbtn}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
