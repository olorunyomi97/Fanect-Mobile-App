import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Header } from 'react-native-elements';
import { useDispatch, useReducer, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import colors from '../../../helpers/colors';

import { getPaymentHistory } from '../../../store/paymentHistory/actions';
import { IconContainer, PaymentHistorySingle } from '../../components';
import { wp } from '../../../helpers/scaler';

export const PaymentHistory = ({ navigation }) => {
  const dispatch = useDispatch();

  
  const { loading, paymentHistory } = useSelector(
    state => state.PaymentHistory,
   
  );

  const _getPaymentHistory = () => dispatch(getPaymentHistory());

  useEffect(() => {
    _getPaymentHistory();
    console.log(_getPaymentHistory)
  }, []);

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
          text: 'Payment History',
          style: {
            color: '#fff',
            textAlignVertical: 'bottom',
            fontWeight: 'bold',
            fontSize: wp(20),
          },
        }}
      />
      <View style={styles.container}>
        <FlatList
          style={{ flex: 1 }}
          onRefresh={_getPaymentHistory}
          refreshing={loading}
          data={paymentHistory}
          renderItem={({ item }) => (
            <PaymentHistorySingle paymentHistory={item} />
          )}
          ItemSeparatorComponent={() => <View style={{ marginVertical: 10 }} />}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg_black,
    padding: 10,
  },
});
