import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StatusBar, ScrollView,Image } from 'react-native';
import { Pressable } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useForm } from 'react-hook-form';
import { Button } from 'react-native-elements';
import Input from '../../components/input';
import { connect } from 'react-redux'; //Redux

//styles
import styles from '../../../assets/styles/styles';
import colors from '../../../helpers/colors';

//redux
import { loginUser } from '../../../store/actions';
import { show_toast_notifications } from '../../../helpers/notifications';

const Login = props => {
  const { error, loading, navigation } = props;
  const [hide_password, toggle_hide_password] = useState(true);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    // toggle_loading(true);
    props.loginUser(data, navigation);
  };

  useEffect(() => {
    if (error) {
      show_toast_notifications(error, 'error');
    }
  }, [error]);

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
          <Text style={styles.auth_header_text}>Welcome Back!</Text>
          <Text style={styles.auth_header_p}>
            Please enter your account details
          </Text>
        </View>
        <Input
          name="userdata"
          placeholder="Username or Email"
          error_name="Username or Email"
          control={control}
          errors={errors}
          required={true}
          leftElement={
            <>
              <Image
                source={require('../../../assets/icons/User.png')}
                style={[{ marginLeft: 15, height: 20, width: 16 }]}
              />
            </>
          }
        />
        <Input
          name="password"
          placeholder="Password"
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

        <Pressable
          style={{ marginTop: 20 }}
          onPress={() => props.navigation.navigate('ForgotPassword')}
        >
          <Text
            style={[
              styles.text_16_grey,
              { paddingVertical: 10, textAlign: 'right' },
            ]}
          >
            Forgot password?
          </Text>
        </Pressable>
        <Button
          block
          title="Login"
          buttonStyle={[styles.btn_success, { marginTop: 20 }]}
          titleStyle={styles.btn_text}
          onPress={handleSubmit(onSubmit)}
          loading={loading}
          disabled={loading}
          disabledStyle={[
            styles.btn_success_disabled,
            ,
            { marginTop: 20, opacity: 0.8 },
          ]}
        />
        <View>
          <Text
            style={[
              styles.text_16_grey,
              {
                marginTop: 90,
                textAlign: 'center',
              },
            ]}
          >
            Don’t have any account?{' '}
            <Text
              style={styles.text_green}
              onPress={() => props.navigation.navigate('Register')}
            >
              Sign Up
            </Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  const { error, loading } = state.Login;
  return { error, loading };
};

export default connect(mapStateToProps, { loginUser })(Login);
