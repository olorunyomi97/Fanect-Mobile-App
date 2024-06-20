import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import { connect } from 'react-redux';
import colors from '../../../../helpers/colors';
import CelebrityPostsLocked from './celebrityPostsLocked';
import SuccessModal from '../../../components/successModal';
import ConfirmModal from '../../../components/confirmModal';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Feather';
import uuid from 'react-native-uuid';
import { PayWithFlutterwave } from 'flutterwave-react-native';
import { CheckBox } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import formatNaira from 'format-to-naira';
import FastImage from 'react-native-fast-image';

import { subscribeToCelebrity } from '../../../../store/subscriptions/actions';
import styles from '../../../../assets/styles/styles';
import { Button, Divider } from 'react-native-elements';
import { show_toast_notifications } from '../../../../helpers/notifications';
import { IconContainer } from '../../../components';
import { wp } from '../../../../helpers/scaler';
import {
  initiateTransaction,
  resetTransaction,
} from '../../../../store/transactions/initiateTransaction/actions';
import { completeTransaction } from '../../../../store/transactions/completeTransaction/actions';
import { subscribeToCeleb } from '../../../../store/subscribe/subscribe/actions';
import { buySubscription } from '../../../../store/subscribe/buySubscriptions/actions';
import { getFeed } from '../../../../store/feed/actions';
import constants from '../../../../helpers/constants';

const plans = basePrice => {
  return [
    {
      id: '1',
      duration: 1,
      price: basePrice,
    },
    {
      id: '2',
      duration: 3,
      price: basePrice * 3,
    },
    {
      id: '3',
      duration: 6,
      price: basePrice * 6,
    },
  ];
};

const PriceLabel = ({ label, price }) => {
  return (
    <View style={customStyles.priceLabelContainer}>
      <Text style={customStyles.label}>{label}</Text>
      <Text style={customStyles.price}>{price}</Text>
    </View>
  );
};

const CheckBoxInput = ({ onPress, plan, checked }) => {
  const { duration, price } = plan;

  return (
    <View style={customStyles.checkboxInputContainer}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <CheckBox
          style={{ margin: 0, padding: 0 }}
          checkedColor={colors.green}
          containerStyle={[
            customStyles.checkboxContainer,
            {
              alignSelf: 'flex-start',
              alignSelf: 'flex-start',
              margin: 0,
              padding: 0,
              alignItems: 'baseline',
            },
          ]}
          onPress={() => onPress(plan)}
          checked={checked}
        />
        <Text
          style={customStyles.checkboxInputTitle}
        >{`${duration} month subscription`}</Text>
      </View>

      <Text style={customStyles.checkboxInputPrice}>{formatNaira(price)}</Text>
    </View>
  );
};

const SubscribeToCeleb = props => {
  const {
    globals,
    user,
    celebrity,
    error,
    sent_error,
    is_subscribed,
    // set_curr_user_subscribed,
    is_celeb_subscribed,
    initiatingTransaction,
    transactionDetail,
    initiateTransaction,
    completeTransaction,
    completingTransaction,
    resetTransaction,
    subscribeToCeleb,
    buySubscription,
    // isSubscribedCallback,
  } = props;

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const [show_confirm_modal, set_show_confirm_modal] = useState(false);
  const [loading, set_show_loading] = useState(false);
  const [new_error, set_new_error] = useState(error ? error : sent_error);
  const [show_subscribed_modal, set_show_subscribed_modal] = useState(false);

  const [showSubscribeModal, setShowSubscribeModal] = useState(false);

  const [subscriptionOption, setSubScriptionOption] = useState(null);

  const [subscriptions, setSubscriptions] = useState(1);
  const [months, setMonths] = useState(1);

  const [acceptConsent, setAcceptConsent] = useState(false);

  const [prices, setPrices] = useState({
    subscriptionFee: 0,
    tax: 0,
    total: 0,
  });

  const [showGiftSubscriptionModal, setShowGiftSubscriptionModal] =
    useState(false);

  // const subscribeToCeleb = () => {
  //   props.subscribeToCelebrity({ celeb_id: celebrity._id });
  // }

  useEffect(() => {
    if (new_error) {
      set_show_confirm_modal(false);
      show_toast_notifications(error, 'error');
      set_new_error(false);
    }

    if (is_celeb_subscribed == celebrity._id) {
      set_show_confirm_modal(false);
      set_show_subscribed_modal(true);
    }
  });

  const pay = () => {
    setShowGiftSubscriptionModal(false);
    navigation.navigate('PaymentStack');
  };

  const { avatar, username, base_price } = props.celebrity;

  const initiateGiftSubscriptionTransaction = (duration = 1, cb) => {
    initiateTransaction(
      {
        celebrity_id: celebrity._id,
        duration: duration,
        gateway: 'flutterwave',
        description: 'here is the description',
        count: subscriptions,
        currency: 'NGN',
      },
      cb,
    );
  };

  const _completeTransaction = async (transactionDetail, cb) => {
    setShowGiftSubscriptionModal(false);
    setShowSubscribeModal(false);
    // resetTransaction();

    // if (cb) {
    //   await cb();
    // }
    console.log(transactionDetail);
    if (transactionDetail.status == 'successful') {
      completeTransaction(
        {
          payment_ref: transactionDetail?.tx_ref,
          payment_details: transactionDetail,
        },
        cb,
      );
    }
  };

  const [giftSubscriptionPrice, setGiftSubScriptionPrice] = useState({
    subscriptionFee: fixedPrice,
    tax: 100,
    total: fixedPrice + 100,
  });

  const fixedPrice = base_price || globals?.minimum_subscription;

  useEffect(() => {
    const price = fixedPrice * months * subscriptions;
    const newTax = 100 * months * subscriptions;
    const newTotal = price + newTax;

    setGiftSubScriptionPrice({
      ...giftSubscriptionPrice,
      subscriptionFee: price,
      tax: newTax,
      total: newTotal,
    });
  }, [months, subscriptions]);

  const subToCelebCB = () => {
    console.log('testing testing...');
    // isSubscribedCallback();
    resetTransaction();
    dispatch(getFeed(true));
  };

  const subToCeleb = async () => {
    await subscribeToCeleb(
      {
        celeb_id: celebrity?._id,
        payment_ref: transactionDetail?.payment_reference,
      },
      subToCelebCB,
    );
  };

  const _buySubscription = () => {
    buySubscription({
      celeb_id: celebrity._id,
      subscription_count: subscriptions,
      duration: months,
      payment_ref: transactionDetail?.payment_reference,
    });
  };

  return (
    <>
      <Spinner visible={completingTransaction} textContent={'Loading'} />
      <View>
        {/* <Text
          style={[
            styles.text_16,
            {
              color: colors.text_grey,
              textAlign: 'center',
              marginVertical: 18,
            },
          ]}
        >
          {celebrity.bio ? celebrity.bio : 'Dummy bio'}
        </Text> */}
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginBottom: 20,
            marginTop: 10,
          }}
        >
          <View style={{ flex: 1, paddingRight: 5 }}>
            <Button
              buttonStyle={{
                borderRadius: 10,
                backgroundColor: colors.green,
                borderColor: colors.green,
                borderWidth: 1,
              }}
              size={14}
              onPress={() => setShowSubscribeModal(true)}
              // onPress={() => {
              //   navigation.navigate('DiscoverStack', {
              //     screen: 'PromptSubscription',
              //   });
              // }}
              title="Subscribe"
            />
          </View>
          <View style={{ flex: 1, paddingLeft: 5 }}>
            <Button
              onPress={() => setShowGiftSubscriptionModal(true)}
              buttonStyle={{
                borderRadius: 10,
                backgroundColor: colors.bg_black,
                borderColor: colors.green,
                borderWidth: 1,
              }}
              size={14}
              title="Gift Subscriptions"
            />
          </View>
        </View>
        <Divider
          style={{
            marginRight: 'auto',
            marginLeft: 'auto',
            borderWidth: 2,
            borderColor: colors.white,
            borderRadius: 10,
            opacity: 0.1,
          }}
        />
        <CelebrityPostsLocked username={celebrity.username} />
        <SuccessModal
          toggle_show_modal={() => {
            set_show_subscribed_modal(false);
            // set_curr_user_subscribed(true);
          }}
          show_modal={show_subscribed_modal}
          navigation={props.navigation}
          message={`You have successfully subscribed to ${celebrity.username}`}
          btn_text="Thanks"
        />
        <ConfirmModal
          loading={loading}
          toggle_loading={set_show_loading}
          show_modal={show_confirm_modal}
          toggle_show_modal={set_show_confirm_modal}
          action={subscribeToCeleb}
          message={`Confirm you want to subscribe to ${celebrity.username}`}
        />
      </View>

      <Modal isVisible={showGiftSubscriptionModal}>
        <View style={customStyles.modalContainer}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Text style={customStyles.modalTitle}>Gift Subscription</Text>
            <IconContainer
              onPress={() => setShowGiftSubscriptionModal(false)}
              disabled={initiatingTransaction}
            >
              <Icon name="x" color="white" size={wp(20)} />
            </IconContainer>
          </View>

          <TextInput
            placeholder="No of Subscriptions"
            placeholderTextColor={colors.purple}
            style={customStyles.modalInput}
            keyboardType="number-pad"
            defaultValue={''}
            onChangeText={text => setSubscriptions(Number(text))}
          />

          <TextInput
            placeholder="No of months"
            placeholderTextColor={colors.purple}
            style={customStyles.modalInput}
            keyboardType="number-pad"
            defaultValue={''}
            onChangeText={text => setMonths(Number(text))}
          />

          <View style={{ width: '100%', marginVertical: 10 }}>
            <PriceLabel
              label="Subscription Fee"
              price={formatNaira(giftSubscriptionPrice.subscriptionFee)}
            />
            <PriceLabel
              label="VAT/Sales Tax"
              price={formatNaira(giftSubscriptionPrice.tax)}
            />
            <PriceLabel
              label="Total"
              x
              price={formatNaira(giftSubscriptionPrice.total)}
            />
          </View>

          <PayWithFlutterwave
            onRedirect={resp => _completeTransaction(resp, _buySubscription)}
            options={{
              tx_ref: transactionDetail?.payment_reference,
              authorization: constants.FLUTTERWAVE_PK,
              customer: {
                email: user.email,
              },
              // amount: parseFloat(transactionDetail?.amount),
              amount: parseFloat(giftSubscriptionPrice.total),
              // amount: 20000,
              currency: 'NGN',
              payment_options: 'card',
            }}
            customButton={props => (
              <Button
                buttonStyle={{
                  width: '100%',
                  backgroundColor: props.disabled
                    ? colors.green_disabled
                    : colors.green,
                  alignItems: 'center',
                  borderRadius: 15,
                }}
                disabledStyle={{ backgroundColor: colors.green_disabled }}
                titleStyle={{ textAlign: 'center' }}
                title="OK"
                loading={
                  initiatingTransaction ||
                  props.isInitializing ||
                  props.disabled
                }
                disabled={
                  !giftSubscriptionPrice.total ||
                  // !transactionDetail.amount ||
                  initiatingTransaction ||
                  props.isInitializing ||
                  props.disabled
                }
                onPress={() =>
                  initiateGiftSubscriptionTransaction(months, props.onPress)
                }
              />
            )}
          />
        </View>
      </Modal>

      <Modal isVisible={showSubscribeModal}>
        <View style={customStyles.subscribeModalContainer}>
          <View
            style={{ width: wp(30), alignSelf: 'flex-end', marginBottom: 10 }}
          >
            <IconContainer onPress={() => setShowSubscribeModal(false)}>
              <Icon name="x" size={wp(20)} color="white" />
            </IconContainer>
          </View>
          <View style={customStyles.subscriptionOptionsContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FastImage
                source={{ uri: avatar }}
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 19,
                  marginRight: 10,
                }}
              />

              <Text
                style={{ fontSize: wp(16), fontWeight: 'bold', color: 'white' }}
              >
                {username}
              </Text>
            </View>

            <View
              style={{
                borderBottomWidth: 1,
                borderColor: 'white',
                opacity: 0.1,
                marginVertical: 10,
              }}
            />

            <View>
              {plans(fixedPrice).map(plan => (
                <CheckBoxInput
                  onPress={plan => setSubScriptionOption(plan)}
                  plan={plan}
                  checked={plan.id === subscriptionOption?.id}
                />
              ))}
            </View>
          </View>

          <View>
            {/* <CheckBox
              onPress={() => setAcceptConsent(!acceptConsent)}
              checked={acceptConsent}
              containerStyle={customStyles.checkboxContainer}
              textStyle={{ color: colors.text_white }}
              title="By subscribing to this celebrity, I consent to automatically be charged a subscription fee when my subscription expires until I unsubscribe"
            /> */}
            <Text
              style={{
                color: colors.text_white,
                marginVertical: 10,
                textAlign: 'center',
              }}
            >
              By subscribing to this celebrity, I consent to automatically be
              charged a subscription fee when my subscription expires until I
              unsubscribe
            </Text>
          </View>

          <PayWithFlutterwave
            onRedirect={resp => _completeTransaction(resp, subToCeleb)}
            options={{
              tx_ref: transactionDetail?.payment_reference,
              authorization: constants.FLUTTERWAVE_PK,
              customer: {
                email: user.email,
              },
              amount: parseFloat(subscriptionOption?.price),
              currency: 'NGN',
              payment_options: 'card',
            }}
            customButton={props => (
              <Button
                title="Continue"
                buttonStyle={{
                  backgroundColor: colors.green,
                  borderRadius: 15,
                  marginVertical: 10,
                  paddingVertical: 10,
                }}
                disabledStyle={{ backgroundColor: colors.green_disabled }}
                disabled={
                  !subscriptionOption ||
                  initiatingTransaction ||
                  props.isInitializing ||
                  props.disabled
                }
                loading={
                  initiatingTransaction ||
                  props.isInitializing ||
                  props.disabled
                }
                onPress={() =>
                  initiateGiftSubscriptionTransaction(
                    subscriptionOption?.duration,
                    props.onPress,
                  )
                }
              />
            )}
          />
        </View>
      </Modal>
    </>
  );
};

const customStyles = StyleSheet.create({
  modalContainer: {
    backgroundColor: colors.grey,
    width: '90%',
    borderRadius: 30,
    padding: 15,
    alignSelf: 'center',
    // alignItems: 'center',
  },
  modalTitle: {
    fontSize: wp(18),
    color: colors.text_white,
    fontWeight: 'bold',
  },
  modalInput: {
    borderColor: colors.bg_grey,
    borderWidth: 1,
    borderRadius: 15,
    paddingLeft: 10,
    color: colors.text_white,
    marginVertical: 10,
    paddingVertical: 10,
  },
  priceLabelContainer: {
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: wp(16),
    color: colors.purple,
  },
  price: {
    fontSize: wp(18),
    fontWeight: 'bold',
    color: 'white',
  },
  checkboxInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
    width: '100%',
  },
  checkboxInputTitle: {
    color: colors.text_white,
    fontSize: wp(12),
  },
  checkboxInputPrice: {
    color: colors.green,
    fontSize: wp(14),
    fontWeight: 'bold',
  },
  subscribeModalContainer: {
    backgroundColor: colors.bg_black,
    width: '90%',
    borderRadius: 30,
    padding: 15,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: colors.bg_grey,
  },
  subscriptionOptionsContainer: {
    padding: 15,
    borderStyle: 'dashed',
    borderRadius: 16,
    borderColor: colors.green,
    borderWidth: 1,
  },
  checkboxContainer: {
    backgroundColor: colors.bg_black,
    borderWidth: 0,
  },
});

const mapStateToProps = state => {
  const { error, loading, is_subscribed, is_celeb_subscribed } =
    state.Subscriptions;

  const { loading: initiatingTransaction, transactionDetail } =
    state.InitiateTransaction;

  const { globals, user } = state.Login.user_data;

  const { loading: completingTransaction } = state.CompleteTransaction;

  return {
    globals,
    user,
    error,
    loading,
    is_subscribed,
    is_celeb_subscribed,
    initiatingTransaction,
    transactionDetail,
    completingTransaction,
  };
};

export default connect(mapStateToProps, {
  subscribeToCelebrity,
  initiateTransaction,
  completeTransaction,
  resetTransaction,
  subscribeToCeleb,
  buySubscription,
})(SubscribeToCeleb);
