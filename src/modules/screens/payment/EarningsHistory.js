import React, { useState, useEffect } from 'react';
import { useDispatch, useReducer, useSelector } from 'react-redux';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import SIcon from 'react-native-vector-icons/SimpleLineIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getCelebEarningsHistory } from '../../../store/earningsHistory/actions';

import colors from '../../../helpers/colors';
import { wp } from '../../../helpers/scaler';
import { useNavigation } from '@react-navigation/core';
import formatNaira from 'format-to-naira';
import Moment from 'moment'

const currencies = [
  { label: 'Naira', value: 'naira' },
  { label: 'Dollar', value: 'dollar' },
];


const LabelValue = ({ label, value }) => {
  return (
    <View style={styles.labelValueContainer}>
      <Text style={styles.label}>{label}:</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};


const HeaderItem = ({ label }) => {
  return (
    <Text style={[styles.headerItem, { width: label === '    ' ? 5 : '25%' }]}>
      {label}
    </Text>
  );
};

const TableValue = ({ value }) => {
  return <Text style={styles.tableValue}>{value}</Text>;
};

let totalPaymentAmount = 0;

const TableData = ({ tableValues, odd, subscription_amount }) => {
  const { createdAt, transaction_detail } = tableValues;
  console.log(tableValues);
  const date = new Date(createdAt);

  const dateLiteral = date.getDate();
  // const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const hour = (date.getHours()<10?'0':'') + date.getHours();
  const minute =( date.getMinutes()<10?'0':'') + date.getMinutes() ;

  const fullDate = `${dateLiteral}/${month}`;
  const fullTime = `${hour}:${minute}`;
  totalPaymentAmount += Number(transaction_detail[0].amount);

  

  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={[
        styles.tableData,
        { backgroundColor: odd ? colors.bg_black : colors.border_black },
      ]}
      onPress={() =>
        navigation.navigate('PaymentDetail', {paramKey: tableValues})
      }
    >
      <TableValue value= {`${fullDate}   ${fullTime}`}/>
      <TableValue style={styles.amount} value={formatNaira(transaction_detail[0].amount)} />
      <TableValue value={formatNaira(transaction_detail[0].amount * 0.7)} />
      <SIcon name="arrow-right" color={colors.green} />
    </TouchableOpacity>
  );
};

const Header = () => {
  return (
    <View style={styles.header}>
      <HeaderItem label="Date & Time" />
      <HeaderItem label="Subscription Amount" />
      <HeaderItem label="Payout Amount" />
      <HeaderItem label="    " />
    </View>
  );
};

export const EarningsHistory = ({ labelvalues }) => {
  const dispatch = useDispatch();

  // const { transaction_detail } = labelvalues
  const [openCurrencyDD, setOpenCurrencyDD] = useState(false);
  const [currency, setCurrency] = useState({ label: 'Naira', value: 'naira' });
  const [showDate, setShowDate] = useState(false);
  const [date, setDate] = useState(new Date(1598051730000));
  const [payoutAmount, setPayoutAmount] = useState(totalPaymentAmount)
  const [subscriptionAmount, setSubscriptionAmount] = useState(totalPaymentAmount)

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDate(false);
    setDate(currentDate);
  };


  useEffect(() => {
    setPayoutAmount(formatNaira(totalPaymentAmount));
    setSubscriptionAmount(formatNaira(totalPaymentAmount * 0.7));
  }, totalPaymentAmount);
  
  useEffect( async () => {
    const _getEarningHistory  = await dispatch(getCelebEarningsHistory());
    console.log(_getEarningHistory)
  }, []);

  const { earningsHistory } = useSelector(state => state.EarningsHistory);
  console.log(earningsHistory)
  
  // const LabelData = ({ labelvalues }) => {
  //   const {transaction_detail } = labelvalues;
  
  //   return (
  //     <>
  //     <LabelValue label="Subscription Amount" value={formatNaira(transaction_detail[0].amount)} />
  //     <LabelValue label="Payout Amount" value="15,000" />
  //     </>
  //   )
  // }
  
    return (
      <View style={styles.container}>
        <View style={{ paddingHorizontal: 15 }}>
          <View style={styles.inputsContainer}>
            <TouchableOpacity
              style={styles.datePicker}
              onPress={() => setShowDate(true)}
            >
              <Icon name="md-calendar" color={colors.purple} />
              <Text style={styles.dateText}>Date Picker</Text>
              <SIcon name="arrow-down" color={colors.purple} />
              <>
                {showDate && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="date"
                    is24Hour={true}
                    display="compact"
                    onChange={onChange}
                  />
                )}
              </>
            </TouchableOpacity>

            <DropDownPicker
              open={openCurrencyDD}
              value={currency}
              items={currencies}
              setOpen={setOpenCurrencyDD}
              setValue={setCurrency}
              theme="DARK"
              style={{
                borderColor: 'white',
                borderWidth: 1,
                backgroundColor: colors.border_black,
                borderRadius: 15,
              }}
              containerStyle={{ width: '45%' }}
              placeholder="Select currency"
            />
          </View>
          <LabelValue label="Subscription Amount" value={payoutAmount} />
          <LabelValue label="Payout Amount" value={subscriptionAmount} />
          
        </View>
    

        <View style={styles.payoutHistoryContainer}>
          <View style={styles.headerContainer}></View>
          <Header />
          <FlatList
            data={earningsHistory}
            renderItem={({ item, index }) => (
              <>
              <TableData
                tableValues={item}
                odd={index % 2 === 0 ? false : true}
              />
              {/* <LabelData 
                labelvalues={item}
              /> */}
              </>
            )}
          />
        </View>
      </View>
    );

};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bg_black,
    flex: 1,
  },
  inputsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 100,
  },
  datePicker: {
    width: '45%',
    backgroundColor: colors.border_black,
    borderWidth: 1,
    borderColor: 'white',
    paddingVertical: 15,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  dateText: {
    color: colors.purple,
    paddingHorizontal: 5,
  },
  labelValueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  label: {
    fontSize: wp(15),
    fontWeight: 'bold',
    color: 'white',
  },
  value: {
    fontSize: wp(15),
    fontWeight: 'bold',
    color: colors.green,
  },
  payoutHistoryContainer: {
    marginTop: 10,
  },
  headerContainer: {
    borderTopWidth: 2,
    borderColor: 'white',
    opacity: 0.2,
    marginHorizontal: 15,
  },
  headerItem: {
    color: 'white',
    fontSize: wp(12),
    fontWeight: 'bold',
    // width: '20%',
    // backgroundColor: 'red',
    borderRightWidth: 1,
    borderColor: 'black',
    // textAlign: 'center',
  },
  header: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    justifyContent: 'space-between',
  },
  tableData: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 30
  },
  tableValue: {
    color: colors.text_white,
    // width: '25%',
    fontSize: wp(12),
  },
  amount: {
    color: colors.green,
    fontWeight: 'bold',
    fontSize: wp(50),
    paddingLeft: 5
  },
});