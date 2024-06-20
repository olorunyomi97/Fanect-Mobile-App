import React from 'react';
import { View, Text } from 'react-native';

export const PaymentResult = ({ route }) => {
  const { msg } = route.params;

  console.log(msg);

  return (
    <View>
      <Text>{'helo'}</Text>
    </View>
  );
};
