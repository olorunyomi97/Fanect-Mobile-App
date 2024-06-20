import React, { useState, useEffect } from 'react';
import Input from '../../components/input';
import { Button } from 'react-native-elements';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';

//styles
import styles from '../../../assets/styles/styles';
import colors from '../../../helpers/colors';

//partials
import Header from '../../partials/header/index';
import { connect } from 'react-redux';
import { show_toast_notifications } from '../../../helpers/notifications';

//redux
import { useSelector, useDispatch } from 'react-redux';
import {
  applyGiftCode,
  getDetailsOfSubscriptionCode,
} from '../../../store/subscriptions/actions';

const DisplayRedeemScreen = ({
  subscription_code,
  subscription_code_details,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    console.log(data);
    dispatch(getDetailsOfSubscriptionCode(data.subscription_code));
  };

  console.log(subscription_code);

  const redeemSubscription = () => {
    const data = {
      celeb_id: subscription_code_details.celebrity_details[0]._id,
      gift_code: subscription_code,
    };
    dispatch(applyGiftCode(data));
  };

  if (subscription_code_details.length == 0) {
    show_toast_notifications(
      'Invalid link clicked or subscription expired',
      'error',
    );
  }

  return (
    <>
      {subscription_code == undefined ? (
        <>
          <View>
            <Text style={[styles.text_16, { fontWeight: '600' }]}>
              Subscription code
            </Text>
            <View style={{ marginBottom: 20 }}>
              <Input
                name="gift_code"
                placeholder="Enter gift code"
                error_name="Gift code"
                control={control}
                errors={errors}
                required={true}
              />
            </View>
            <Button
              block
              title="Redeem"
              buttonStyle={[
                styles.btn_success,
                {
                  marginTop: 20,
                },
              ]}
              // loading={loading}
              titleStyle={styles.btn_text}
              onPress={handleSubmit(onSubmit)}
            />
          </View>
        </>
      ) : (
        <>
          <Text
            style={[styles.text_16, { fontWeight: '600', marginBottom: 15 }]}
          >
            Subscription for
          </Text>
          <View
            style={{
              paddingVertical: 15,
              paddingHorizontal: 15,
              borderWidth: 1,
              borderStyle: 'dashed',
              borderColor: colors.green,
              marginBottom: 10,
              borderRadius: 16,
            }}
          >
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginBottom: 10,
                alignItems: 'center',
              }}
            >
              <Image
                source={{
                  uri: `${subscription_code_details.celebrity_details[0].avatar}`,
                }}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                }}
              />
              <View
                style={{
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={[
                    styles.text_16,
                    {
                      fontWeight: '600',
                      marginBottom: 8,
                      paddingHorizontal: 8,
                    },
                  ]}
                >
                  {`${subscription_code_details.celebrity_details[0].username}`}
                </Text>
                <Text
                  style={[
                    styles.text_14,
                    { color: colors.green, paddingHorizontal: 8 },
                  ]}
                >
                  {`${subscription_code_details.duration}`} month subscription
                </Text>
              </View>
              <View style={{ marginLeft: 'auto' }}>
                <Text
                  style={[
                    styles.text_16,
                    {
                      fontWeight: '600',
                      color: colors.green,
                    },
                  ]}
                >
                  Free
                </Text>
              </View>
            </View>
          </View>

          <Text
            style={[styles.text_16, { fontWeight: '600', marginVertical: 15 }]}
          >
            Gifted By
          </Text>

          <View
            style={{
              marginBottom: 10,
              borderRadius: 16,
            }}
          >
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginBottom: 10,
                alignItems: 'center',
              }}
            >
              <Image
                source={{
                  uri: `${subscription_code_details.buyer_details[0].avatar}`,
                }}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                }}
              />
              <View
                style={{
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={[
                    styles.text_16,
                    {
                      fontWeight: '600',
                      marginBottom: 8,
                      paddingHorizontal: 8,
                    },
                  ]}
                >
                  {`${subscription_code_details.buyer_details[0].username}`}
                </Text>
                <Text
                  style={[
                    styles.text_14,
                    { color: colors.ash, opacity: 0.4, paddingHorizontal: 8 },
                  ]}
                >
                  {`${subscription_code_details.buyer_details[0].fullname}`}
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 0 }}
          >
            <Button
              block
              title="Redeem Now"
              buttonStyle={[
                styles.btn_success,
                {
                  marginTop: 20,
                },
              ]}
              titleStyle={styles.btn_text}
              onPress={() => redeemSubscription()}
            />
          </View>
        </>
      )}
    </>
  );
};

const RedeemSubscription = props => {
  const dispatch = useDispatch();
  const { error, loading, subscription_code_details } = props;
  const subscription_code = props.route.params?.id;

  const [is_loading, set_is_loading] = useState(loading);

  useEffect(() => {
    if (subscription_code) {
      getSubscriptionDetails(subscription_code);
    } else {
      set_is_loading(false);
    }

    if (is_loading == false && subscription_code_details == {}) {
      show_toast_notifications(
        error,
        'Invalid link clicked or subscription expired',
      );
    }
  }, []);

  console.log(loading);

  const getSubscriptionDetails = subscription_code => {
    dispatch(getDetailsOfSubscriptionCode(subscription_code));
  };

  return (
    <>
      <View style={styles.body}>
        <View style={[styles.container, { marginTop: 27, flex: 1 }]}>
          {is_loading ? (
            <></>
          ) : (
            <DisplayRedeemScreen
              subscription_code={subscription_code}
              subscription_code_details={subscription_code_details}
            />
          )}
        </View>
      </View>
    </>
  );
};

const mapStateToProps = state => {
  const { error, loading, subscription_code_details } = state.Subscriptions;
  return { error, loading, subscription_code_details };
};

export default connect(mapStateToProps, {})(RedeemSubscription);
