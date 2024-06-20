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

import { connect } from 'react-redux';
import { show_toast_notifications } from '../../../helpers/notifications';
import { resendOtp, verifyOtp } from '../../../store/auth/verification/actions';

// import {resendOtp, verification} from '../../../redux/general/auth/authActions';
//import {resendOtp, verification} from '../../../redux/general/auth/authActions';

const Verification = props => {
  const response = props.route.params.response;
  const { loading, error, navigation } = props;
  // const [loading, toggle_loading] = useState(false);
  const [counter, set_counter] = useState(60);
  const [otp, set_otp] = useState('');

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => set_counter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  const onSubmit = () => {
    if (!otp || otp.length != 6) {
      show_toast_notifications('Enter OTP', 'error');
    } else {
      const otp_data = {
        verify_token: response.data.verify_token,
        type: response.type,
        email: response.data.email,
        otp_code: otp,
      };
      props.verifyOtp(otp_data, navigation);
    }
  };

  const handleResendOtp = () => {
    set_counter(59);
    props.resendOtp({ email: response.data.email });
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
            We’ve sent an email to {response.data.email.toLowerCase()} with a
            link and a 6 digit code to reset your password. Please, follow this
            link or enter the code here:
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
            <Text style={[{ textAlign: 'center', color: colors.green }]}>
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
        <Button
          block
          title="Login"
          buttonStyle={[styles.btn_success_outline, { marginTop: 0 }]}
          titleStyle={styles.btn_text}
          onPress={() => props.navigation.navigate('Login')}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  const { error, loading } = state.Verification;
  return { error, loading };
};

export default connect(mapStateToProps, { resendOtp, verifyOtp })(Verification);
