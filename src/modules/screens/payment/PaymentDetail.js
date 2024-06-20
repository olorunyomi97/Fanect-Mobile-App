import React from 'react';
import { Header } from 'react-native-elements';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';

import colors from '../../../helpers/colors';
import { wp } from '../../../helpers/scaler';
import Icon from 'react-native-vector-icons/Feather';
import { IconContainer } from '../../components';
import { useNavigation } from '@react-navigation/core';


const PaymentDetailData = ({ route, label, value, odd }) => {
  const navigation = useNavigation();
  // console.log(route.params.paramKey)
  return (
    <>
      <TouchableOpacity
        style={[
          styles.paymentDetailData,
          { backgroundColor: odd ? colors.bg_black : colors.border_black },
        ]}
        onPress={() =>
          navigation.navigate('PaymentStack', { screen: 'PaymentDetail' })
        }
      >
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </TouchableOpacity>
    </>
  );
};

export const PaymentDetail = ({navigation, route}) => {
  console.log(route.params.paramKey)

  const { transaction_detail, subscriber_details, createdAt } = route.params.paramKey
  const date = new Date(createdAt);

  const dateLiteral = date.getDate();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const hour = (date.getHours()<10?'0':'') + date.getHours();
  const minute =( date.getMinutes()<10?'0':'') + date.getMinutes() ;

  const fullDate = `${dateLiteral}/${month}/${year}`;
  const fullTime = `${hour}:${minute}`;

  return (
    <>
    <Header
      style={{ borderColor: colors.border_black, borderWidth: 1 }}
      containerStyle={{
        backgroundColor: colors.border_black,
        alignItems: 'center',
      }}
      statusBarProps={{
        backgroundColor: colors.border_black,
        barStyle: 'light-content',
      }}
      leftComponent={
        <IconContainer onPress={() => navigation.goBack()}>
          <Icon name="x" size={24} color="white"/>
        </IconContainer>
      }
      centerComponent={{
        text: 'Details',
        style: {
          color: '#fff',
          textAlignVertical: 'bottom',
          fontWeight: 'bold',
          fontSize: wp(20),
        },
      }}
    />

    <ScrollView style={styles.container}>
      <PaymentDetailData label="Payment ID" value={transaction_detail[0].payment_reference} odd />
      <PaymentDetailData label="Purchaser" value={subscriber_details[0].fullname}/>
      <PaymentDetailData label="Location" value="Awaiting Data" odd />
      <PaymentDetailData label="Currency" value={transaction_detail[0].currency} />
      <PaymentDetailData label="Subscription Fee" value={transaction_detail[0].amount} odd />
      <PaymentDetailData label="Vat on Fee" value="Awaiting Data" />
      <PaymentDetailData label="Amount(including VAT)" value={transaction_detail[0].amount} odd />
      <PaymentDetailData label="Exchange Rate to NGN" value="Awaiting Data" />
      <PaymentDetailData label="Amount in NGN (including VAT)" value={transaction_detail[0].amount} odd />
      <PaymentDetailData label="Payment Processing Fees" value="Awaiting Data" />
      <PaymentDetailData label="FaNect Fee" value="Awaiting Data" odd />
      {/* <PaymentDetailData label="Celebrity Earnings" value="NGN" />
      <PaymentDetailData label="Withhold tax(WHT)" value="NGN" odd />
      <PaymentDetailData label="Celebrity earnings after WHT" value="NGN" />
      <PaymentDetailData label="Payout processing fees" value="NGN" odd />
      <PaymentDetailData label="Payout" value="NGN" /> */}
      <PaymentDetailData label="Payment Gateway" value={transaction_detail[0].gateway} odd />
      <PaymentDetailData label="Transaction Date" value={`${fullDate}`} />
    </ScrollView>
  </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bg_black,
    flex: 1,
  },
  paymentDetailData: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    color: colors.text_white,
    fontSize: wp(14),
  },
  value: {
    color: colors.text_white,
    fontSize: wp(14),
    fontWeight: 'bold',
  },
});
