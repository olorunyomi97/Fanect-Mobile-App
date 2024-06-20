import React, { useState } from 'react';
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
import { useForm } from 'react-hook-form';
import { Button } from 'react-native-elements';

//styles
import styles from '../../../assets/styles/styles';
import Input from '../../components/input';
import colors from '../../../helpers/colors';

//redux
import { connect } from 'react-redux';
import { userForgetPassword } from '../../../store/auth/forgetpwd/actions';

const ForgotPassword = props => {
  const { loading, navigation } = props;
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    console.log(data);
    props.userForgetPassword(data, navigation);
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
            Enter your Email address to recieve the OTP code to reset your
            passsword
          </Text>
        </View>
        <Input
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
                style={[styles.logo, { marginLeft: 15 }]}
              />
            </>
          }
        />
        <Button
          block
          title="Continue"
          buttonStyle={[styles.btn_success]}
          titleStyle={styles.btn_text}
          onPress={handleSubmit(onSubmit)}
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
  const { error, loading } = state.ForgotPassword;
  return { error, loading };
};

export default connect(mapStateToProps, { userForgetPassword })(ForgotPassword);
