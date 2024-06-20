import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import colors from '../../helpers/colors';
import { wp, hp } from '../../helpers/scaler';

export const AddImageButton = ({ onAddImage }) => {
  return (
    <TouchableOpacity onPress={onAddImage} style={styles.container}>
      <Icon name="plus" color={colors.green} size={wp(30)} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp(171),
    height: hp(186),
    borderWidth: 1,
    borderColor: colors.green,
    backgroundColor: colors.green_opacity,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    marginRight: 10,
  },
});
