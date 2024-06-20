import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Header as Head } from 'react-native-elements';
import { Pressable } from 'native-base';
//style
import styles from '../../../assets/styles/styles';
import colors from '../../../helpers/colors';

import { wp, hp } from '../../../helpers/scaler';

const PrimaryHeader = ({ onPress }) => {
  return (
    <View style={{ borderBottomColor: colors.bg_black }}>
      <SafeAreaView
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
          marginTop: 0,
        }}
      >
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
            backgroundColor: colors.bg_black,
            paddingHorizontal: 15,
            height: 75,
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 20,
            marginTop: -25,
          }}
          placement="left"
          leftComponent={
            <TouchableOpacity>
              <Image
                style={{
                  height: hp(32),
                  marginTop: 0,
                  resizeMode: 'contain',
                  width: wp(19),
                }}
                source={require('../../../assets/icons/fanect-f-logo.png')}
              />
            </TouchableOpacity>
          }
          centerComponent={
            <>
              <Image
                style={{
                  height: hp(22),
                  width: wp(74),
                  alignSelf: 'center',
                  resizeMode: 'contain',
                  marginTop: 10,
                  //   marginLeft: -35,
                }}
                source={require('../../../assets/icons/fanect-full-logo.png')}
              />
            </>
          }
        />
      </SafeAreaView>
    </View>
  );
};

export default PrimaryHeader;
