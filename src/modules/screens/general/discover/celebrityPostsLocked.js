import React, { useState, useEffect } from 'react';
import { Image, Text, View } from 'react-native';
import colors from '../../../../helpers/colors';

const CelebrityPostsLocked = props => {
  const { username } = props;
  return (
    <View
      style={{
        height: 350,
        alignItems: 'center',
        alignContent: 'center',
        marginHorizontal: 'auto',
        justifyContent: 'center',
      }}
    >
      <Image
        style={{ alignSelf: 'center', height: 150 }}
        source={require('../../../../assets/images/celebrity-locked.png')}
      />
      <Text style={{ color: colors.bg_grey, marginTop: 20 }}>
        Subscribe to {username} to see their content
      </Text>
    </View>
  );
};

export default CelebrityPostsLocked;
