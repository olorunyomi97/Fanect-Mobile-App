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
import { style } from 'styled-system';
import ButtonToggleGroup from 'react-native-button-toggle-group';
import { ImageBackground } from 'react-native';

export const AddTextControl = ({
  setHasTakenShot,
  setAddTextOption,
  setshowTextOption,
  type,
  selectColorPicker,
  widgetTextColor,
  refRBSheetFontSize,
  submitStory,
}) => {
  return (
    <View>
      {type == 'on' ? (
        <View style={styles.topControl}>
          <View style={styles.topcontrolLeft}>
            <TouchableOpacity
              style={styles.bglightCancelOpacity}
              onPress={() => {
                setHasTakenShot(false);
              }}
            >
              <Image
                source={require('../../../../assets/images/cancel-icon.png')}
                style={styles.cancelbtn}
              />
            </TouchableOpacity>
          </View>

          <View style={[styles.topcontrolRight, styles.flexdir]}>
            <TouchableOpacity
              style={styles.bglightOpacity}
              onPress={() => {
                setAddTextOption(true);
                setshowTextOption(true);
              }}
            >
              <Image
                source={require('../../../../assets/images/text-add-icon.png')}
                style={styles.flashlightbtn}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.bglightOpacity}
              onPress={submitStory}
            >
              <Image
                source={require('../../../../assets/images/save-icon.png')}
                style={styles.flashlightbtn}
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View>
          <View style={styles.topControl}>
            <View style={styles.topcontrolLeftAddText}>
              <TouchableOpacity
                style={styles.bglightCancelOpacity}
                onPress={() => {
                  setAddTextOption(false);
                }}
              >
                <Image
                  source={require('../../../../assets/images/cancel-icon.png')}
                  style={styles.cancelbtn}
                />
              </TouchableOpacity>
            </View>

            <View style={[styles.topcontrolCenter, styles.flexdir]}>
              <TouchableOpacity
                style={styles.bglightOpacity}
                onPress={() => {
                  refRBSheetFontSize.current.open();
                }}
              >
                <Image
                  source={require('../../../../assets/images/font-option.png')}
                  style={styles.flashlightbtn}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.bglightOpacity}
                onPress={selectColorPicker}
              >
                <ImageBackground
                  source={require('../../../../assets/images/coloroptionbg.png')}
                  style={styles.flashlightbtn}
                >
                  <View
                    style={{
                      backgroundColor: widgetTextColor,
                      height: 25,
                      width: '100%',
                      borderRadius: 150,
                    }}
                  ></View>
                </ImageBackground>
              </TouchableOpacity>
            </View>

            <View style={[styles.topcontrolRightAddText, styles.flexdir]}>
              <TouchableOpacity
                onPress={() => {
                  setAddTextOption(false);
                }}
              >
                <Text style={styles.greenie}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};
