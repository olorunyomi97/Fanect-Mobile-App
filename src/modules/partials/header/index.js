import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Header as Head } from 'react-native-elements';
import { Pressable } from 'native-base';
import style from '../../../assets/styles/styles';
import colors from '../../../helpers/colors';
const Header = props => {
  return (
    <>
      {/* <SafeAreaView style={{ backgroundColor: colors.navy_blue }} />
        <StatusBar barStyle="light-content" /> */}
      <Head
        statusBarProps={{ barStyle: 'light-content' }}
        style={{
          elevation: 0, // remove shadow on Android
          shadowOpacity: 0, // remove shadow on iOS
          borderBottomWidth: 0,
        }}
        borderBottomColor={colors.bg_black}
        barStyle="light-content"
        containerStyle={{
          backgroundColor: 'rgba(31,23,23,0.8)',
          paddingVertical: 14,
          paddingHorizontal: 24,
        }}
        leftComponent={
          <>
            {props.icon == 'back' ? (
              <Pressable
                onPress={() => {
                  if (props.custom_route) {
                    props.custom_route;
                  } else {
                    props.navigation.goBack();
                  }
                }}
              >
                <View
                  style={{
                    backgroundColor: colors.bg_grey_opacity,
                    padding: 8,
                    borderRadius: 10,
                  }}
                >
                  <Image
                    source={require('../../../assets/icons/Back.png')}
                    style={{
                      width: 12,
                      height: 12,
                      marginTop: '4%',
                    }}
                  />
                </View>
              </Pressable>
            ) : props.icon == 'cancel' ? (
              <Pressable
                onPress={() => {
                  if (props.custom_route) {
                    props.custom_route;
                  } else {
                    props.navigation.goBack();
                  }
                }}
              >
                <View
                  style={{
                    backgroundColor: colors.bg_grey_opacity,
                    padding: 8,
                    borderRadius: 10,
                  }}
                >
                  <Image
                    source={require('../../../assets/icons/Cancel.png')}
                    style={{ width: 12, height: 12 }}
                  />
                </View>
              </Pressable>
            ) : (
              <></>
            )}
          </>
        }
        centerComponent={
          <>
            <Text
              style={[
                style.text_16,
                {
                  marginTop: 5,
                  color: colors.white,
                  fontWeight: 'bold',
                },
              ]}
            >
              {props.title}
            </Text>
          </>
        }
        // rightComponent = {

        // }
      />
    </>
  );
};

export default Header;
