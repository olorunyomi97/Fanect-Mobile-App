import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Rave from 'react-native-rave-webview';
import { PayWithFlutterwave } from 'flutterwave-react-native';

export const PaymentScreen = ({ navigation }) => {
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  console.log('error msg', errorMsg);
  console.log('success msg', successMsg);

  return (
    <View style={{ flex: 1 }}>
      <PayWithFlutterwave
        onRedirect={resp => console.log('resp', resp)}
        options={{
          tx_ref: '1234ytytvyt',
          authorization: 'FLWPUBK_TEST-4a7209de443580aedf35a53d77f1d8cc-X',
          customer: {
            email: 'customer-email@example.com',
          },
          amount: 2000,
          currency: 'NGN',
          payment_options: 'card',
        }}
      />

      {/* <Rave
        buttonText="Pay Now"
        raveKey="FLWPUBK_TEST-4a7209de443580aedf35a53d77f1d8cc-X"
        amount={20000}
        billingEmail="ayoshokz@gmail.com"
        billingMobile="08101274387"
        billingName="Oluwatobi Shokunbi"
        ActivityIndicatorColor="green"
        onCancel={() => {
          this.onCancel();
          console.log('transac cancelled');
        }}
        onSuccess={transactionRef => {
          setErrorMsg(transactionRef);
          navigation.navigate('Payment', {
            screen: 'PaymentResult',
            params: transactionRef,
          });
        }}
        btnStyles={{
          backgroundColor: 'green',
          width: 100,
          alignContent: 'center',
        }}
        textStyles={{ color: 'white', alignSelf: 'center' }}
        onError={error => {
          setErrorMsg(error);
        }}
        txref="1234"
      /> */}
    </View>
  );
};
