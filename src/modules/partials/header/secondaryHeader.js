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

const SecondaryHeader = props => {
  return (
    <View>
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
          paddingHorizontal: 10,
        }}
        placement="left"
        centerComponent={
          <>
            <Text
              style={[
                styles.text_18,
                {
                  marginTop: 5,
                  color: colors.white,
                  fontWeight: 'bold',
                },
              ]}
            >
              {props.title}
            </Text>

            {props.component}
          </>
        }
        // rightComponent = {

        // }
      />
    </View>
  );
};

export default SecondaryHeader;
