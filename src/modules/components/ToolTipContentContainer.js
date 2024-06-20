import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import colors from '../../helpers/colors';

export const ToolTipContentContainer = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 7,
    backgroundColor: colors.bg_black,
  },
});
