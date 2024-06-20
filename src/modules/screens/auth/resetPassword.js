import React, { useEffect, useState } from 'react';
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
import { CommonActions } from '@react-navigation/native';

//styles
import styles from '../../../assets/styles/styles';
import Input from '../../components/input';
import colors from '../../../helpers/colors';
import SuccessModal from '../../components/successModal';

//redux
import { connect } from 'react-redux';
import { userResetPassword } from '../../../store/auth/resetpwd/actions';

const ResetPassword = props => {
  const { error, loading, success_modal, navigation } = props;
  const response = props.route.params.response;

  const [hide_password, toggle_hide_password] = useState(true);
  const [hide_confirm_password, toggle_hide_confirm_password] = useState(true);
  const [show_modal, toggle_show_modal] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    console.log(success_modal, 40);
    if (success_modal) {
      toggle_show_modal(true);
    }
  }, []);

  const onSubmit = data => {
    data.email = response.data.email;
    data.reset_token = response.data.password_reset_token;
    console.log(data);

    props.userResetPassword(data, navigation);
    // data.reset_token = props.route.params.reset_token;
    // data.email = props.route.params.email;
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
          <Text style={[styles.auth_header_text, { marginBottom: 50 }]}>
            Create New Password
          </Text>
        </View>

        <Input
          name="password"
          placeholder="Create New Password"
          error_name="Password"
          control={control}
          errors={errors}
          type={!hide_password ? 'text' : 'password'}
          required={true}
          leftElement={
            <>
              <Image
                source={require('../../../assets/icons/Lock.png')}
                style={[styles.logo, { marginLeft: 15 }]}
              />
            </>
          }
          rightElement={
            <Icon
              style={{
                marginHorizontal: 15,
                color: colors.text_grey,
                fontSize: 16,
              }}
              name={hide_password ? 'eye' : 'eye-slash'}
              onPress={() => {
                toggle_hide_password(!hide_password);
              }}
            />
          }
        />
        <Input
          name="confirm_password"
          placeholder="Confirm New Password"
          error_name="Password Confirmation"
          control={control}
          errors={errors}
          type={!hide_password ? 'text' : 'password'}
          required={true}
          leftElement={
            <>
              <Image
                source={require('../../../assets/icons/Lock.png')}
                style={[styles.logo, { marginLeft: 15 }]}
              />
            </>
          }
          rightElement={
            <Icon
              style={{
                marginHorizontal: 15,
                color: colors.text_grey,
                fontSize: 16,
              }}
              name={hide_confirm_password ? 'eye' : 'eye-slash'}
              onPress={() => {
                toggle_hide_confirm_password(!hide_password);
              }}
            />
          }
        />

        <Button
          block
          title="Reset Password"
          buttonStyle={[styles.btn_success, { marginTop: 25 }]}
          titleStyle={styles.btn_text}
          onPress={handleSubmit(onSubmit)}
          loading={loading}
          disabled={loading}
          disabledStyle={[
            styles.btn_success_disabled,
            ,
            { marginTop: 25, opacity: 0.8 },
          ]}
        />
        <Button
          block
          title="Login"
          buttonStyle={[styles.btn_success_outline, { marginTop: 0 }]}
          titleStyle={styles.btn_text}
          onPress={() => props.navigation.navigate('Login')}
        />

        <SuccessModal
          toggle_show_modal={show_modal}
          show_modal={success_modal}
          navigation={props.navigation}
          message={'You have successfully reset your password.'}
          navigate_to={'Login'}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  const { error, loading, success_modal } = state.ResetPassword;
  return { error, loading, success_modal };
};

export default connect(mapStateToProps, { userResetPassword })(ResetPassword);
