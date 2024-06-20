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
import { ColorPicker, toHsv, fromHsv } from 'react-native-color-picker';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Slider } from '@miblanchard/react-native-slider';

export const ColorFontsWidget = ({
  refRBSheet,
  setWidgetTextColor,
  refRBSheetFontSize,
  widgetTextSize,
  setWidgetTextSize,
}) => {
  return (
    <View>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
            borderRadius: 20,
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}
      >
        <ColorPicker
          onColorChange={color => {
            setWidgetTextColor(fromHsv({ h: color.h, s: color.s, v: color.v }));
          }}
          style={{ flex: 1 }}
        />
      </RBSheet>

      <RBSheet
        ref={refRBSheetFontSize}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
            borderRadius: 20,
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}
      >
        <View style={styles.paddingx}>
          <Text>Adjust Font Size</Text>
          <Slider
            maximumValue={70}
            minimumValue={5}
            step={5}
            value={widgetTextSize}
            onValueChange={value => {
              setWidgetTextSize(value);
            }}
          />
          <Text>{widgetTextSize}</Text>
        </View>
      </RBSheet>
    </View>
  );
};
