import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

import colors from '../../helpers/colors';

export const IconContainer = ({ children, onPress, style, disabled }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, style]}
      disabled={disabled}
    >
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bg_grey_opacity,
    borderRadius: 12,
  },
});
