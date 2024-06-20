import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import formatNaira from 'format-to-naira';

import colors from '../../helpers/colors';
import { wp } from '../../helpers/scaler';

export const PaymentHistorySingle = ({ paymentHistory }) => {
   console.log(paymentHistory)
  const { amount, createdAt, currency, payment_reference } = paymentHistory;

  const date = new Date(createdAt);

  const dateLiteral = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const hour = date.getHours();
  const minute = date.getMinutes();

  const fullDate = `${dateLiteral}.${month}.${year}`;

  const fullTime = `${hour}:${minute}`;

  return (
    <View style={styles.container}>
      <View style={styles.dataContainer}>
        <Text style={styles.paymentId}>{payment_reference}</Text>
        <Text style={styles.amount}>{formatNaira(amount)}</Text>
      </View>

      <View style={styles.seperator} />

      <View style={styles.dataContainer}>
        <Text></Text>
        <Text style={styles.date}>{`${fullDate} ${fullTime}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.border_black,
    padding: 15,
    borderRadius: 16,
  },
  dataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  seperator: {
    borderTopWidth: 1,
    borderColor: 'white',
    marginVertical: 10,
  },
  paymentId: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: wp(16),
  },
  amount: {
    color: colors.green,
    fontWeight: 'bold',
    fontSize: wp(18),
  },
  date: {
    color: colors.purple,
    fontSize: wp(12),
  },
});
