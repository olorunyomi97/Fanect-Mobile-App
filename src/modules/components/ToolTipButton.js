import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { wp } from '../../helpers/scaler';
import colors from '../../helpers/colors';

export const ToolTipButton = ({ icon, label, danger, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View
        style={{
          width: 30,
          alignItems: 'center',
          marginRight: 5,
        }}
      >
        {icon}
      </View>
      <Text style={[styles.label, { color: danger ? colors.red : 'white' }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  label: {
    fontSize: wp(14),
    fontWeight: 'bold',
  },
});
