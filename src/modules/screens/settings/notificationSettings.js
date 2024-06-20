import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
} from 'react-native';
import { useToast, Pressable, Switch, Divider } from 'native-base';
import { Button } from 'react-native-elements';

//styles
import styles from '../../../assets/styles/styles';
import colors from '../../../helpers/colors';
import SuccessModal from '../../components/successModal';

//partials
import Header from '../../partials/header/index';

//redux
import { connect } from 'react-redux'; //Redux
import { toggleNotifications } from '../../../store/settings/notifications/actions';

const NotificationSettings = props => {
  const { user_data, toggleNotifications } = props;
  const [email_new_content, set_email_new_content] = useState(false);
  const [email_new_stream, set_email_new_stream] = useState(false);
  const [email_new_mention, set_email_new_mention] = useState(false);
  const [app_new_content, set_app_new_content] = useState(false);
  const [app_new_stream, set_app_new_stream] = useState(false);
  const [app_new_mention, set_app_new_mention] = useState(false);

  useEffect(() => {
    console.log(user_data, '===here34');
    // console.log(props?.user_data.user, '===here34');
    let notifications = user_data?.user.notifications;
    set_email_new_content(
      notifications['email_new_content']
        ? notifications['email_new_content']
        : false,
    );
    set_email_new_stream(
      notifications['email_new_stream']
        ? notifications['email_new_stream']
        : false,
    );
    set_email_new_mention(
      notifications['email_new_mention']
        ? notifications['email_new_mention']
        : false,
    );
    set_app_new_content(
      notifications['app_new_content']
        ? notifications['app_new_content']
        : false,
    );
    set_app_new_stream(
      notifications['app_new_stream'] ? notifications['app_new_stream'] : false,
    );
    set_app_new_mention(
      notifications['app_new_mention']
        ? notifications['app_new_mention']
        : false,
    );
  }, [props.user_data]);

  const onSubmit = () => {
    const data = {
      email_new_content,
      email_new_stream,
      email_new_mention,
      app_new_content,
      app_new_stream,
      app_new_mention,
    };

    toggleNotifications(data);
  };

  return (
    <View style={styles.body}>
      <Header
        title={'Notification Settings'}
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
        <View>
          <Text
            style={[styles.text_16, { marginBottom: 10, fontWeight: '700' }]}
          >
            Email Notifications
          </Text>
          <View
            style={{
              paddingVertical: 15,
              paddingHorizontal: 12,
              backgroundColor: colors.border_black,
              borderRadius: 16,
            }}
          >
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginBottom: 10,
              }}
            >
              <View style={{ justifyContent: 'center' }}>
                <Text style={[styles.text_16]}>New content notifications</Text>
              </View>

              <Switch
                style={{ marginLeft: 'auto' }}
                offTrackColor={colors.bg_grey}
                onTrackColor={colors.green}
                isChecked={email_new_content}
                onToggle={() => {
                  set_email_new_content(!email_new_content);
                }}
              />
            </View>
            <Divider bg={'rgba(255, 255, 255, 0.1)'} />
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginVertical: 10,
              }}
            >
              <View style={{ justifyContent: 'center' }}>
                <Text style={[styles.text_16]}>New stream notifications</Text>
              </View>

              <Switch
                style={{ marginLeft: 'auto' }}
                offTrackColor={colors.bg_grey}
                onTrackColor={colors.green}
                isChecked={email_new_stream}
                onToggle={() => set_email_new_stream(!email_new_stream)}
              />
            </View>
            {/* <Divider bg={'rgba(255, 255, 255, 0.1)'} />
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginTop: 10,
              }}
            >
              <View style={{ justifyContent: 'center' }}>
                <Text style={[styles.text_16]}>New mention notifications</Text>
              </View>

              <Switch
                style={{ marginLeft: 'auto' }}
                offTrackColor={colors.bg_grey}
                onTrackColor={colors.green}
              />
            </View> */}
          </View>
        </View>

        <View style={{ marginTop: 27 }}>
          <Text
            style={[styles.text_16, { marginBottom: 10, fontWeight: '700' }]}
          >
            App Notifications
          </Text>
          <View
            style={{
              paddingVertical: 15,
              paddingHorizontal: 12,
              backgroundColor: colors.border_black,
              borderRadius: 16,
            }}
          >
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginBottom: 10,
              }}
            >
              <View style={{ justifyContent: 'center' }}>
                <Text style={[styles.text_16]}>New content notifications</Text>
              </View>

              <Switch
                style={{ marginLeft: 'auto' }}
                offTrackColor={colors.bg_grey}
                onTrackColor={colors.green}
                isChecked={app_new_content}
                onToggle={() => set_app_new_content(!app_new_content)}
              />
            </View>
            <Divider bg={'rgba(255, 255, 255, 0.1)'} />
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginVertical: 10,
              }}
            >
              <View style={{ justifyContent: 'center' }}>
                <Text style={[styles.text_16]}>New stream notifications</Text>
              </View>

              <Switch
                style={{ marginLeft: 'auto' }}
                offTrackColor={colors.bg_grey}
                onTrackColor={colors.green}
                isChecked={app_new_stream}
                onToggle={() => set_app_new_stream(!app_new_stream)}
              />
            </View>
            {/* <Divider bg={'rgba(255, 255, 255, 0.1)'} />
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginTop: 10,
              }}
            >
              <View style={{ justifyContent: 'center' }}>
                <Text style={[styles.text_16]}>New mention notifications</Text>
              </View>

              <Switch
                style={{ marginLeft: 'auto' }}
                offTrackColor={colors.bg_grey}
                onTrackColor={colors.green}
              />
            </View> */}
          </View>
        </View>

        <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 0 }}>
          <Button
            block
            title="Save"
            buttonStyle={[
              styles.btn_success,
              {
                marginTop: 20,
              },
            ]}
            titleStyle={styles.btn_text}
            onPress={() => onSubmit()}
            loading={props.loading}
            disabled={props.loading}
            disabledStyle={[
              styles.btn_success_disabled,
              { marginTop: 20, opacity: 0.8 },
            ]}
          />
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = state => {
  const { user_data } = state.Login;

  const { loading } = state.ToggleNotifications;
  return { user_data, loading };
};

export default connect(mapStateToProps, { toggleNotifications })(
  NotificationSettings,
);
