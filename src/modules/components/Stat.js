import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '../../helpers/colors';
import { wp } from '../../helpers/scaler';

export const Stat = ({ icon, label, value }) => {
  return (
    <View style={styles.mainStatContainer}>
      <MIcon name={icon} color={colors.green} size={15} />
      <Text style={styles.statLabel}>{`${value} ${label}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainStatContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '40%',
    justifyContent: 'center',
  },
  statLabel: {
    color: colors.ash,
    fontSize: wp(14),
    marginLeft: 10,
  },
});
