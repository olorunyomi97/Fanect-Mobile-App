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
import { RNCamera } from 'react-native-camera';
import { style } from 'styled-system';
import ButtonToggleGroup from 'react-native-button-toggle-group';
import chatBoxStyle from './chatBoxStyle.js';

export const ChatBox = ({ onClick, avatar, message }) => {
  return (
    <View style={chatBoxStyle.chatBoxContainer}>
      <View style={chatBoxStyle.userImageContainer}>
        <Image source={avatar} style={chatBoxStyle.userimage} />
      </View>

      <View style={chatBoxStyle.chatCommentContainer}>
        <View style={chatBoxStyle.chatCommentWidth}>
          <Text style={chatBoxStyle.chatcomment}>{message} </Text>
        </View>
      </View>
    </View>
  );
};
