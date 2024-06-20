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

export const CaptureButtonControl = ({
  selection,
  recordVideo,
  takePicture,
  setSelection,
  pickImageOrVideo,
  startRecord,
  stopRecord,
  setRecordVideo,
  isOnLiveStream,
  isRecordingVideo,
  setIsRecordingVideo,
}) => {
  return (
    <View style={styles.capturebuttonContainer}>
      {selection == 2 ? (
        <View style={styles.flexDirex}>
          <TouchableOpacity
            onPress={pickImageOrVideo}
            style={styles.flexDirexRx}
          >
            <Image
              source={require('../../../../assets/images/gallery_option.png')}
              style={styles.selectFromGallery}
            />
          </TouchableOpacity>

          {isRecordingVideo ? (
            <TouchableOpacity
              onPress={stopRecord}
              style={[styles.capturex, styles.flexDirexRx]}
            >
              <Image
                source={require('../../../../assets/images/stoprecording.png')}
                style={styles.captureButton}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={recordVideo ? startRecord : takePicture}
              style={[styles.capturex, styles.flexDirexRx]}
            >
              <Image
                source={
                  recordVideo
                    ? require('../../../../assets/images/icons8-video-record-50.png')
                    : require('../../../../assets/images/snap-btn.png')
                }
                style={styles.captureButton}
              />
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={() => {
              if (recordVideo) {
                setRecordVideo(false);
              } else {
                setRecordVideo(true);
              }
            }}
            style={[styles.capturex, styles.flexDirexRx]}
          >
            <Image
              source={
                recordVideo
                  ? require('../../../../assets/images/switch-to-camera-icon.png')
                  : require('../../../../assets/images/video-icon-no-bg.png')
              }
              style={styles.switchToVideoButton}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <></>
      )}

      {!isOnLiveStream ? (
        <View style={styles.btnGroup}>
          <TouchableOpacity
            style={[
              styles.btn,
              selection === 1 ? { backgroundColor: '#1FCC79' } : null,
            ]}
            onPress={() => setSelection(1)}
          >
            <Text
              style={[
                styles.btnText,
                selection === 1 ? { color: 'white' } : null,
              ]}
            >
              Content
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.btn,
              selection === 2 ? { backgroundColor: '#1FCC79' } : null,
            ]}
            onPress={() => setSelection(2)}
          >
            <Text
              style={[
                styles.btnText,
                selection === 2 ? { color: 'white' } : null,
              ]}
            >
              Story
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.btn,
              selection === 3 ? { backgroundColor: '#1FCC79' } : null,
            ]}
            onPress={() => setSelection(3)}
          >
            <Text
              style={[
                styles.btnText,
                selection === 3 ? { color: 'white' } : null,
              ]}
            >
              Go Live
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};
