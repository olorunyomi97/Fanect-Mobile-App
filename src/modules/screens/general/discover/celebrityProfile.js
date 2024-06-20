import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  SafeAreaView,
  RefreshControl,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { Avatar, Button } from 'react-native-elements';
import { Pressable, Popover, Divider } from 'native-base';
import Modal from 'react-native-modal';
import Tooltip from 'react-native-walkthrough-tooltip';
import { ToolTipButton, ToolTipContentContainer } from '../../../components';
import AIcon from 'react-native-vector-icons/AntDesign';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import { ReportOptions } from '../../../components/ReportOptions';
import { ReportCommentInput } from '../../../components/ReportCommentInput';

//styles
import styles from '../../../../assets/styles/styles';
import colors from '../../../../helpers/colors';
// import Tooltip from '../../../components/tooltip';
import CelebrityPosts from './celebrityPosts';
import { unsubscribeFromCelebrity } from '../../../../store/subscriptions/actions';
import { connect, useSelector, useDispatch } from 'react-redux';
import { show_toast_notifications } from '../../../../helpers/notifications';
import Icon from 'react-native-vector-icons/AntDesign';
import { getUser } from '../../../../store/getUser/actions';
import { createReport } from '../../../../store/report/actions';
import FastImage from 'react-native-fast-image';

import { Stat } from '../../../components';
import { wp } from '../../../../helpers/scaler';
import {
  unSubscribeFromCeleb,
  checkValidSubscription,
} from '../../../../store/subscribe/subscribe/actions';
import { reportOptions } from '../../../../helpers/constants';
import PageLoading from '../../../partials/loading/pageLoading';
// import { SafeAreaView } from 'react-native-safe-area-context';

const Seperator = () => <View style={customStyles.statSeperator} />;

const DiscoverCelebrityProfile = props => {
  const {
    error,
    loading,
    is_subscribed,
    is_unsubscribed,
    is_celeb_subscribed,
    getUser,
    checkValidSubscription,
    gettingCelebrity,
    celebrity,
    user_data,
    checkingValidity, //for subscriptions
    validity, //for subscriptions
  } = props;

  const dispatch = useDispatch();

  const { user, loading: userLoading } = useSelector(state => state.Login);

  const { celebrityContent } = useSelector(state => state.CelebrityContent);

  const { loading: unsubscribeLoading } = useSelector(state => state.Subscribe);

  // const { validity, checkingValidity } = useSelector(state => state.Subscribe);

  const params = props.route.params;

  // const [celebrity, setCelebrity] = useState(user ?? params.celebrity);

  // const celebrity = props.route.params.celebrity;

  // const celebrity?.subscriptions? = celebrity?.subscriptions;

  const [refreshing, set_refreshing] = useState(false);
  const [new_click, set_new_click] = useState(true);
  const [popover_open, set_popover_open] = useState(false);
  const isSubscribed = validity?.is_subscribed;
  const [pageLoading, setPageLoading] = useState(true);
  const [showTP, setShowTP] = useState(false);
  const [reason, setReason] = useState(null);
  const [reasonContent, setReasonContent] = useState('');
  const [reportLoading, setReportLoading] = useState(false);
  const onSelectOption = reason => {
    setReason(reason);
  };

  // const [showUnsubscribePrompt, setShowUnsubscribePrompt] = useState(false);
  const [ShowUnsubscribeModal, setShowUnsubscribeModal] = useState(false);
  const reportContentModalRef = useRef(null);

  const openReportModal = () => reportContentModalRef.current?.open();
  const closeReportModal = () => reportContentModalRef.current?.close();

  useEffect(async () => {
    await getUser(params.celebrity_id);
    set_new_click(props.route.params.new_click);
    await checkValidSubscription({ celeb_id: params.celebrity_id });
    if (!gettingCelebrity || !checkingValidity) {
      setPageLoading(false);
    }
  }, []);

  const submitReport = () => {
    setReportLoading(true);
    dispatch(
      createReport(
        {
          user_id: user_data?._id,
          report_reason: reason,
          report_content: reasonContent,
          is_content: false,
          is_user: true,
          reported_content_id: '',
          reported_user_id: celebrity._id,
        },
        closeReportModal,
      ),
    );
  };

  // const handleUnsubscribeFromCelebrity = () => {
  //   set_new_click(false);
  //   setShowUnsubscribePrompt(false);
  //   props.unsubscribeFromCelebrity({ celeb_id: celebrity._id });
  // };

  useEffect(() => {
    if (is_unsubscribed == celebrity._id && new_click == false) {
      show_toast_notifications(
        `Successfully unsubscribed from ${celebrity.username}`,
        'success',
      );
      props.navigation.navigate('Discover');
    }
  });

  const onRefresh = useCallback(async () => {
    // set_refreshing(true);
    // dispatch(getUserDetails('customer'))
    //   .then(data => {
    //     setUser(data);
    //     set_refreshing(false);
    //   })
    //   .catch(e => {
    //     alert(e);
    //   });
    await getUser(params.celebrity_id);
    await checkValidSubscription({ celeb_id: params.celebrity_id });
    if (!gettingCelebrity || !checkingValidity) {
      setPageLoading(false);
    }
  }, [celebrity]);

  const GeneralToolTipContent = () => {
    return (
      <>
        <ToolTipContentContainer>
          <ToolTipButton
            icon={
              <Image
                source={require('../.././../../assets/icons/Warning-Green.png')}
                style={{
                  width: 15,
                  height: 13,
                  marginRight: 7,
                  marginTop: 2,
                }}
              />
            }
            label="Report Celebrity"
            onPress={() => {
              setShowTP(false);
              openReportModal();
            }}
          />
          <ToolTipButton
            icon={
              <Image
                source={require('../../../../assets/icons/Unsubscribe.png')}
                style={{
                  width: 15,
                  height: 15,
                  marginRight: 7,
                  marginTop: 2,
                }}
              />
            }
            label="Unsubscribe"
            onPress={() => {
              setShowTP(false);
              setShowUnsubscribeModal(true);
            }}
          />
        </ToolTipContentContainer>
      </>
    );
  };

  // const _unsubscribe = () => {
  //   setShowUnsubscribePrompt(false);
  //   dispatch(
  //     unSubscribeFromCeleb(
  //       celebrity?._id,
  //       navigation.navigate('General', { screen: 'Home' }),
  //     ),
  //   );
  // };

  // useEffect(() => {
  //   if (params?.fromFeed) {
  //     dispatch(checkValidSubscription(params.celebrity_id));
  //   }
  // }, []);

  const UnsubscribeModal = ({ onUnsubscribe, onCancel }) => {
    return (
      <View
        style={{
          backgroundColor: '#313131',
          borderRadius: 30,
          padding: 15,
          alignItems: 'center',
        }}
      >
        <AIcon name="warning" color="red" size={wp(100)} />
        <Text
          style={{
            marginVertical: 10,
            color: 'white',
            textAlign: 'center',
            marginTop: 20,
            marginBottom: 5,
          }}
        >
          Are you sure you want to unsubscribe from this celebrity ?
        </Text>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '85%',
            justifyContent: 'space-around',
            alignItems: 'stretch',
            alignContent: 'stretch',
            marginBottom: 20,
          }}
        >
          <Button
            block
            title="Cancel"
            buttonStyle={[
              styles.btn_grey,
              { marginTop: 30, marginBottom: 0, width: 120 },
            ]}
            titleStyle={styles.btn_text}
            onPress={onCancel}
            disabledStyle={[styles.btn_grey, { marginTop: 30, opacity: 1 }]}
          />
          <Button
            block
            title="Unsubscribe"
            buttonStyle={[
              styles.btn_danger,
              {
                marginTop: 30,
                marginBottom: 0,
                width: 130,
              },
            ]}
            titleStyle={styles.btn_text}
            onPress={onUnsubscribe}
            disabledStyle={[styles.btn_danger, { marginTop: 30, opacity: 0.8 }]}
          />
        </View>
      </View>
    );
  };

  // const dispatch = useDispatch();

  const NewUnsubscribeFromCelebrity = () => {
    dispatch(
      unSubscribeFromCeleb(
        celebrity?.user._id,
        props.navigation.navigate('Discover'),
      ),
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg_black }}>
      <StatusBar barStyle="light-content" />
      <Spinner isVisible={unsubscribeLoading || checkingValidity} />
      <View style={styles.body}>
        {gettingCelebrity ||
        !Object.keys(celebrity).length ||
        checkingValidity ||
        unsubscribeLoading ||
        pageLoading ? (
          <PageLoading type={'9CubeGrid'} />
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={userLoading} onRefresh={onRefresh} />
            }
          >
            <View style={[styles.container, styles.safe_area_margin]}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  flex: 1,
                }}
              >
                <View>
                  <Pressable onPress={() => props.navigation.goBack()}>
                    <View
                      style={{
                        backgroundColor: colors.bg_grey_opacity,
                        paddingHorizontal: 15,
                        paddingVertical: 12,
                        borderRadius: 12,
                        //   flex: 1,
                      }}
                    >
                      <Image
                        source={require('../../../../assets/icons/Back.png')}
                        style={{
                          width: 15,
                          height: 20,
                        }}
                      />
                    </View>
                  </Pressable>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    alignContent: 'center',
                    marginRight: isSubscribed ? 0 : 40,
                    borderRadius: 50,
                    flex: 6,
                  }}
                >
                  {/* <Avatar
                    size={100}
                    rounded
                    source={{ uri: celebrity.avatar }}
                  /> */}
                  <FastImage
                    source={{ uri: celebrity.user.avatar }}
                    style={{
                      width: 120,
                      height: 120,
                      borderRadius: 74,
                    }}
                  />
                </View>
                <Pressable
                  style={{
                    marginLeft: 'auto',
                    // flex: 1,
                  }}
                >
                  {isSubscribed && (
                    <Tooltip
                      isVisible={showTP}
                      content={<GeneralToolTipContent />}
                      placement="bottom"
                      onClose={() => setShowTP(false)}
                      contentStyle={{
                        backgroundColor: colors.bg_black,
                        shadowColor: 'rgba(255, 255, 255, 0.17)',
                        shadowOffset: {
                          width: 0,
                          height: 4,
                        },
                        shadowOpacity: 0.3,
                        shadowRadius: 4.65,

                        elevation: 8,
                      }}
                    >
                      <TouchableOpacity onPress={() => setShowTP(true)}>
                        <View
                          style={{
                            backgroundColor: colors.bg_grey_opacity,
                            paddingHorizontal: 15,
                            paddingVertical: 8,
                            borderRadius: 12,
                          }}
                        >
                          <Image
                            source={require('../../../../assets/icons/Dots.png')}
                            style={{
                              width: 5.5,
                              height: 25,
                            }}
                          />
                        </View>
                      </TouchableOpacity>
                    </Tooltip>
                  )}
                </Pressable>
              </View>

              <View style={[]}>
                <Text
                  style={[
                    styles.text_22,
                    {
                      fontWeight: 'bold',
                      textAlign: 'center',
                      marginVertical: 13,
                    },
                  ]}
                >
                  {celebrity.user.username}
                </Text>
              </View>
            </View>

            <View style={customStyles.statContainer}>
              <Stat
                icon="newspaper-variant"
                value={celebrity.content?.length}
                label="Content(s)"
              />
              <Seperator />
              <Stat
                icon="youtube-subscription"
                value={
                  validity?.subscriptions?.length ||
                  celebrity?.subscriptions?.length
                }
                label="Subscriber(s)"
              />
            </View>

            <View style={styles.container}>
              <CelebrityPosts
                navigate={props.navigation}
                celebrity={{ ...celebrity, fromFeed: params?.fromFeed }}
                is_subscribed={isSubscribed}
              />
            </View>
          </ScrollView>
        )}
      </View>

      <Portal>
        <Modalize
          ref={reportContentModalRef}
          adjustToContentHeight
          onClose={() => setReason(null)}
        >
          <View>
            {reason ? (
              <ReportCommentInput
                user={user_data.username}
                reason={reason}
                setReason={setReasonContent}
                loading={reportLoading}
                onSubmitReport={submitReport}
              />
            ) : (
              <ReportOptions
                reportOptions={reportOptions}
                onSelectOption={onSelectOption}
              />
            )}
          </View>
        </Modalize>

        <Modal isVisible={ShowUnsubscribeModal}>
          <UnsubscribeModal
            onCancel={() => setShowUnsubscribeModal(false)}
            onUnsubscribe={() => {
              setShowUnsubscribeModal(false);
              NewUnsubscribeFromCelebrity();
            }}
          />
        </Modal>
      </Portal>
    </SafeAreaView>
  );
};

const customStyles = StyleSheet.create({
  statContainer: {
    width: '100%',
    backgroundColor: colors.border_black,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  statSeperator: {
    borderLeftWidth: 1,
    borderColor: colors.ash,
    height: '100%',
    alignSelf: 'center',
  },
});

const mapStateToProps = state => {
  const {
    error,
    loading,
    is_subscribed,
    is_unsubscribed,
    is_celeb_subscribed,
  } = state.Subscriptions;
  const { user_data } = state.Login;
  const gettingCelebrity = state.User.loading;
  const celebrity = state.User.user;

  const { checkingValidity, validity } = state.Subscribe;
  console.log('subscribed=>>', checkingValidity, validity);

  return {
    user_data,
    error,
    loading,
    is_subscribed,
    is_unsubscribed,
    is_celeb_subscribed,
    gettingCelebrity,
    celebrity,
    checkingValidity,
    validity,
  };
};

export default connect(mapStateToProps, {
  unsubscribeFromCelebrity,
  getUser,
  checkValidSubscription,
})(DiscoverCelebrityProfile);
