import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import Input from '../../components/input';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useForm } from 'react-hook-form';
import { Button } from 'react-native-elements';
import { useToast } from 'native-base';
import { CommonActions } from '@react-navigation/native';

//styles
import styles from '../../../assets/styles/styles';
import colors from '../../../helpers/colors';

//partials
import Header from '../../partials/header/index';

//redux
import { connect, useDispatch } from 'react-redux';

// import {changeEmail} from '../../../redux/general/settings/settingsActions';

import SuccessModal from '../../components/successModal';
import { changeEmail } from '../../../store/settings/changeEmail/actions';

const ChangeEmail = props => {
  const { changeEmail, settings } = props;

  const [hide_password, toggle_hide_password] = useState(true);
  const { loading } = settings.ChangeEmail;

  console.log('cef', loading);

  console.log('settings', settings);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    changeEmail(data);
  };

  return (
    <>
      <View style={styles.body}>
        <Header
          title={'Change Email'}
          icon="back"
          navigation={props.navigation}
        />
        <View
          style={[
            styles.container,
            {
              paddingTop: 27,
              flex: 1,
            },
          ]}
        >
          <Input
            name="email"
            placeholder="New Email"
            error_name="Email"
            control={control}
            errors={errors}
            required={true}
            leftElement={
              <>
                <Image
                  source={require('../../../assets/icons/Email.png')}
                  style={[{ marginLeft: 15, height: 21, width: 23 }]}
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

          <View
            style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 0 }}
          >
            <Button
              block
              title="Next"
              buttonStyle={[
                styles.btn_success,
                {
                  marginTop: 20,
                },
              ]}
              titleStyle={styles.btn_text}
              onPress={handleSubmit(onSubmit)}
              loading={loading}
              disabled={loading}
              disabledStyle={[
                styles.btn_success_disabled,

                { marginTop: 20, opacity: 0.8 },
              ]}
            />
          </View>
        </View>
      </View>
    </>
  );
};

const mapStateToProps = state => {
  const settings = state.Settings;
  return { settings };
};

export default connect(mapStateToProps, { changeEmail })(ChangeEmail);
