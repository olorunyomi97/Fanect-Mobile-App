import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/core';

import colors from '../../helpers/colors';
import { wp, hp } from '../../helpers/scaler';

export const AddStreamButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('PostStory', { screen: 'PostStory' })}
    >
      <Icon name="plus" color={colors.green} size={wp(20)} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp(72),
    height: hp(119),
    borderRadius: 10,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.green,
    backgroundColor: colors.green_opacity,
  },
});
