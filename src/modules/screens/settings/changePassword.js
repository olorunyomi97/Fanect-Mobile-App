import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import Input from '../../components/input';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useForm } from 'react-hook-form';
import { Button } from 'react-native-elements';

//styles
import styles from '../../../assets/styles/styles';
import colors from '../../../helpers/colors';
//partials
import Header from '../../partials/header/index';
import { changePassword } from '../../../store/settings/changePassword/actions';
import { connect } from 'react-redux';


const ChangePassword = props => {
  const [hide_password, toggle_hide_password] = useState(true);
  const { changePassword, settings } = props;
  const { loading } = settings.ChangePassword;
  const { handleSubmit, control, formState: { errors },reset } = useForm();

  

  const onSubmit = data => {
    console.log(data);
    changePassword(data, reset);
  };

  return (
    <>
      <View style={styles.body}>
        <Header
          title={'Change Password'}
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
            name="old_password"
            placeholder="Enter Current Password"
            error_name="Current password"
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
            name="new_password"
            placeholder="Enter New Password"
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
            name="confirm_new_password"
            placeholder="Confirm New Password"
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
                ,
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

export default connect(mapStateToProps, { changePassword })(ChangePassword);
