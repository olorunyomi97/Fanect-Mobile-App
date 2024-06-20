import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import Spinner from 'react-native-spinkit';
import { saveData } from '../../../helpers/async_storage_helper';
import SplashScreen from 'react-native-splash-screen';
import colors from '../../../helpers/colors';
import { authUser } from '../../../helpers/jwt-token-access/accessToken';
import { useDispatch } from 'react-redux';
import { updateUserData } from '../../../store/actions';

const PageLoading = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    //check if the user is authenticated
    authUser().then(async value => {
      const objectToken = JSON.parse(value);
      if (objectToken?.jwt_token != undefined) {
        dispatch(updateUserData(objectToken));
        // props.navigation.navigate('PaymentStack', {
        //   screen: 'RedeemSubscription',
        //   params: { id: 'DebIJkUdF1GIMOS' },
        // });
        props.navigation.navigate('General');
      } else {
        props.navigation.navigate('Auth');
      }
      SplashScreen.hide();
    });
  }, []);

  return (
    <View
      style={{
        // display: "flex",
        backgroundColor: colors.bg_black,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View>
        <Spinner
          isVisible={true}
          size={60}
          type={props.type ? props.type : 'ThreeBounce'}
          color={props.color ? props.color : colors.green}
        />
      </View>
    </View>
  );
};

export default PageLoading;
