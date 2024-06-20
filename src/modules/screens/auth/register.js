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
import { Button, CheckBox } from 'react-native-elements';
import { Grid, Row, Col } from 'react-native-easy-grid';
import { connect } from 'react-redux'; //Redux
import { WebView } from 'react-native-webview';

//styles
import styles from '../../../assets/styles/styles';
import Input from '../../components/input';
import Select from '../../components/select';
import colors from '../../../helpers/colors';

import { registerUser } from '../../../store/auth/register/actions';

const TermsView = props => {
  return <WebView source={{ uri: 'https://reactnative.dev/' }} />;
};

const Register = props => {
  const { navigation, loading } = props;
  const [hide_password, toggle_hide_password] = useState(true);
  const [icon_checked, toggle_icon_checked] = useState(false);
  const days = [];
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const years = [];

  for (let i = 1; i < 32; i++) {
    days.push(i);
  }

  for (let i = new Date().getFullYear(); i >= 1960; i--) {
    years.push(i);
  }

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    props.registerUser(data, navigation);
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
          <Text style={[styles.auth_header_text, { marginBottom: 15 }]}>
            Create your FaNect account
          </Text>
          {/* <Text style={styles.auth_header_p}>
					Please enter your account details
					</Text> */}
        </View>
        <Input
          name="fullname"
          placeholder="Fullname"
          error_name="Fullname"
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
          name="username"
          placeholder="Username"
          error_name="Username"
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
          name="email"
          placeholder="Email"
          error_name="Email"
          control={control}
          errors={errors}
          required={true}
          leftElement={
            <>
              <Image
                source={require('../../../assets/icons/Email.png')}
                style={[styles.logo, { marginLeft: 8 }]}
              />
            </>
          }
        />  
        <View>
          <Text
            style={[styles.text_16_grey, { marginTop: 17, marginBottom: -15 }]}
          >
            Date of Birth
          </Text>
          <Grid>
            <Col>
              <Select
                name="birthday"
                placeholder="Day"
                error_name="Day"
                control={control}
                errors={errors}
                required={true}
                options={days}
              />
            </Col>
            <Col>
              <Select
                name="birthmonth"
                placeholder="Month"
                error_name="Month"
                control={control}
                errors={errors}
                required={true}
                options={months}
              />
            </Col>
            <Col>
              <Select
                name="birthyear"
                placeholder="Year"
                error_name="Year"
                control={control}
                errors={errors}
                required={true}
                options={years}
              />
            </Col>
          </Grid>
        </View>
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

        {/* <Pressable
					style={{marginTop: 20}}
					onPress={() => props.navigation.navigate('ForgotPassword')}>
					<Text
					style={[
						styles.text_16_grey,
						{paddingVertical: 10, textAlign: 'right'},
					]}>
					Forgot password?
					</Text>
				</Pressable> */}
        <Grid style={{ marginVertical: 30 }}>
          <Row>
            <Col size={0.3}>
              <CheckBox
                checked={icon_checked}
                onPress={() => toggle_icon_checked(!icon_checked)}
                checkedColor={colors.green}
                titleProps={() => props.navigation.navigate('terms')}
                containerStyle={{
                  borderWidth: 0,
                  marginLeft: -5,
                  marginTop: -10,
                }}
              />
            </Col>
            <Col size={3}>
              <Text style={[styles.text_16, { fontWeight: 'bold' }]}>
                I agree to the{' '}
                <Text
                  style={[
                    styles.text_16,
                    {
                      color: colors.green,
                      textDecorationLine: 'underline',
                      fontWeight: 'bold',
                    },
                  ]}
                  onPress={() => props.navigation.navigate('Terms')}
                >
                  Terms and Conditions
                  {/* <Text
								style={{color: colors.green}}
								onPress={() => props.navigation.navigate('Login')}>
								Terms and Conditions
							</Text> */}
                </Text>{' '}
                and{' '}
                <Text
                  style={[
                    styles.text_16,
                    {
                      color: colors.green,
                      textDecorationLine: 'underline',
                      fontWeight: 'bold',
                    },
                  ]}
                  onPress={() => props.navigation.navigate('Policy')}
                >
                  Privacy Policy
                </Text>
              </Text>
            </Col>
          </Row>
        </Grid>

        <Button
          block
          title={!icon_checked ? 'Accept Terms and Conditions' : 'Register'}
          buttonStyle={[styles.btn_success, { marginTop: 20 }]}
          titleStyle={styles.btn_text}
          onPress={handleSubmit(onSubmit)}
          loading={loading}
          disabled={loading || !icon_checked}
          disabledStyle={[
            styles.btn_success_disabled,
            { marginTop: 20, opacity: 0.8 },
          ]}
        />
        <Text
          style={[
            styles.text_16_grey,
            { marginBottom: 42, marginTop: 20, textAlign: 'center' },
          ]}
        >
          Already have an account?{' '}
          <Text
            style={{ color: colors.green }}
            onPress={() => props.navigation.navigate('Login')}
          >
            Log In
          </Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  const { error, loading } = state.Register;
  return { error, loading };
};

export default connect(mapStateToProps, { registerUser })(Register);
