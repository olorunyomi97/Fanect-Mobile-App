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

const CelebrityPostStoryContent = () => {
  return (
    <View style={styles.body}>
      <StatusBar animated={true} backgroundColor="#000" />
    </View>
  );
};

export default CelebrityPostStoryContent;
