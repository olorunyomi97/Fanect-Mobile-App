import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import colors from '../../helpers/colors';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { wp } from '../../helpers/scaler';

const Stat = ({ icon, label, value }) => {
  return (
    <View style={styles.mainStatContainer}>
      <MIcon name={icon} color={colors.green} size={15} />
      <Text style={styles.statLabel}>{`${value} ${label}`}</Text>
    </View>
  );
};

const Seperator = () => <View style={styles.statSeperator} />;

export const ProfileStatContainer = ({ val1 = 0, val2 = 0, user }) => {
  return (
    <View style={styles.statContainer}>
      <Stat icon="newspaper-variant" value={val1} label="Contents" />
      <Seperator />
      <Stat icon="youtube-subscription" value={val2} label={user ? 'Subscribers' : 'Posts'}/>
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
  statContainer: {
    width: '100%',
    backgroundColor: colors.border_black,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  statSeperator: {
    borderLeftWidth: 1,
    borderColor: colors.ash,
    height: '100%',
    alignSelf: 'center',
  },
});
