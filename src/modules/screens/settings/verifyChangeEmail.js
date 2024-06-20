/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
} from 'react-native';
import { useToast, Pressable } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Button } from 'react-native-elements';
import OtpInputs from '@twotalltotems/react-native-otp-input';
import { CommonActions } from '@react-navigation/native';

//styles
import styles from '../../../assets/styles/styles';
import Input from '../../components/input';
import colors from '../../../helpers/colors';

//redux
import { connect, useDispatch } from 'react-redux';

import { verifyChangeEmail } from '../../../store/settings/verifyChangeEmail/actions';
import {
  changeEmail,
  changeEmailResendOtp,
  changeEmailFailure,
} from '../../../store/settings/changeEmail/actions';
import { resendOtp } from '../../../store/auth/verification/actions';

const VerifyChangeEmail = props => {
  const [counter, set_counter] = useState(180);
  const [otp, set_otp] = useState('');
  const [show_modal, toggle_show_modal] = useState(false);

  const { verifyChangeEmail, route, settings, changeEmail, payload } = props;

  const { email, password } = route.params;
  const user_verify_data = payload == undefined ? props.route.params : payload;

  const loading = props.loading;

  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => set_counter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  const onSubmit = () => {
    const otp_data = {
      verify_token: user_verify_data.verify_token,
      type: user_verify_data.type,
      email: user_verify_data.email,
      otp_code: otp,
    };
    verifyChangeEmail(otp_data, props.navigation);
  };

  const resendOTP = () => {
    set_counter(60);
    dispatch(changeEmailResendOtp(props.route.params));
    // changeEmail(email, password, true);
  };

  return (
    <SafeAreaView style={styles.body}>
      <StatusBar barStyle={'light-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        style={styles.container}
      >
        <View
          style={{
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View>
            <Image
              source={require('../../../assets/logos/logo-letter.png')}
              style={[styles.auth_header]}
              alt="fanect"
              size={'sm'}
            />
          </View>

          <Text style={styles.auth_header_p}>
            {`We’ve sent an email to ${email} with a link and a 6 digit code to reset your password. Please, follow this link or enter the code here:`}
          </Text>
        </View>
        {/* <Input
					name="email"
					placeholder="Email Address"
					error_name="Email address"
					control={control}
					errors={errors}
					required={true}
					leftElement={
						<>
							<Image
								source={require('../../../assets/icons/Email.png')}
								style={[styles.logo, {marginLeft: 15}]}
							/>
						</>
					}
				/> */}
        <OtpInputs
          handleChange={code => console.log(code)}
          style={{
            width: '100%',
            height: 100,
            marginLeft: 'auto',
            marginRight: 'auto',
            color: '#fff',
            fontSize: 23,
            fontWeight: '500',
          }}
          pinCount={6}
          autoFocusOnLoad
          codeInputFieldStyle={{
            borderColor: colors.bg_grey,
            backgroundColor: colors.border_black,
            width: 55,
            height: 55,
            borderRadius: 10,
            borderWidth: 2,
            fontSize: 23,
            fontWeight: '500',
          }}
          codeInputHighlightStyle={{
            borderColor: colors.green,
          }}
          onCodeFilled={code => {
            set_otp(code);
            //   console.log(`Code is ${code}, you are good to go!`);
          }}
        />
        <View
          style={{
            display: 'flex',
            marginTop: 27,
          }}
        >
          <Pressable
            onPress={() => {
              counter == 0 ? handleResendOtp() : ' ';
            }}
          >
            <Text style={[{ textAlign: 'center', color: colors.white }]}>
              Didn't get the code?
            </Text>
            <Text
              style={[{ textAlign: 'center', color: colors.green }]}
              onPress={resendOTP}
            >
              Resend code {counter == 0 ? ' ' : `in ${counter} seconds`}
            </Text>
          </Pressable>
        </View>
        <Button
          block
          title="Continue"
          buttonStyle={[styles.btn_success]}
          titleStyle={styles.btn_text}
          onPress={() => onSubmit()}
          loading={loading}
          disabled={loading}
          disabledStyle={[styles.btn_success_disabled, { opacity: 0.8 }]}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  const { loading } = state.Settings.VerifyChangeEmail;
  const { payload } = state.Settings.ChangeEmail;
  return { loading, payload };
};

export default connect(mapStateToProps, {
  verifyChangeEmail,
  changeEmail,
  resendOtp,
})(VerifyChangeEmail);
