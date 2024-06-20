import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import { Avatar, Button } from 'react-native-elements';
import { Pressable, Popover, Divider } from 'native-base';

import styles from '../../../../assets/styles/styles';
import colors from '../../../../helpers/colors';
import Tooltip from '../../../components/tooltip';

import SubscribeToCeleb from './subscribeToCeleb';
import { readData } from '../../../../helpers/async_storage_helper.js';
import { getCelebrities } from '../../../../store/celebrities/actions';
import { useDispatch, useSelector, connect } from 'react-redux';
import { Portal } from 'react-native-portalize';
import { Modalize } from 'react-native-modalize';
import CalendarPicker from 'react-native-calendar-picker';
import Icon from 'react-native-vector-icons/Octicons';
import { wp } from '../../../../helpers/scaler';
import SIcon from 'react-native-vector-icons/SimpleLineIcons';
import { textStyle } from 'styled-system';
import {
  clearCelebContent,
  getCelebrityContent,
} from '../../../../store/getCelebrityContent/actions';
import CelebPost from '../../../components/Post';
import { useNavigation } from '@react-navigation/core';
import { checkValidSubscription } from '../../../../store/subscribe/subscribe/actions';
// import Tooltip from 'react-native-walkthrough-tooltip';

const Post = props => {
  const navigation = useNavigation();

  const { user_id, celebrity, fromFeed } = props;

  // const [is_loading, set_is_loading] = useState(true);
  // const [is_subscribed, set_curr_user_subscribed] = useState(
  //   validity?.is_subscribed,
  // );

  const [toolTipVisible, setToolTipVisible] = useState(false);

  const { celebrityContent, loading } = useSelector(
    state => state.CelebrityContent,
  );

  const { checkingValidity, validity } = useSelector(state => state.Subscribe);
  const { user } = useSelector(state => state.Login.user_data);

  const is_subscribed = props.is_subscribed || celebrity.user?._id == user?._id;

  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const startDate = selectedStartDate ? selectedStartDate.toString() : '';
  const endDate = selectedEndDate ? selectedEndDate.toString() : '';

  const modalRef = useRef(null);
  const tooltipRef = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    // check();
    // set_curr_user_subscribed(
    //   validity?.is_subscribed || celebrity.user?._id == user._id,
    // );
  }, []);

  const check = () => {
    dispatch(checkValidSubscription({ celeb_id: celebrity.user?._id }));
  };

  // const setIsSubscribed = () => {
  //   console.log('here called isSub');
  //   set_curr_user_subscribed(true);
  //   // dispatch(getCelebrities());
  // };

  const getCelebContent = () =>
    dispatch(getCelebrityContent(celebrity.user?._id));

  useEffect(() => {
    if (is_subscribed) {
      getCelebContent();
    }
  }, []);

  useEffect(() => {
    navigation.addListener('didFocus', () => console.log('x'));
    const clearClb = navigation.addListener('blur', () => {
      dispatch(clearCelebContent());
    });

    return clearClb;
  }, [navigation]);

  const onDateChange = (date, type) => {
    if (type === 'END_DATE') {
      setSelectedEndDate(date);
    } else {
      setSelectedStartDate(date);
      setSelectedEndDate(date);
    }
  };

  const onPressDateRange = () => {
    modalRef.current?.open();
    tooltipRef.current?.toggleTooltip();
  };

  if (is_subscribed) {
    return (
      <>
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
          <Divider
            style={{
              marginRight: 'auto',
              marginLeft: 'auto',
              borderWidth: 2,
              marginBottom: 10,
              borderColor: colors.white,
              borderRadius: 10,
              opacity: 0.1,
            }}
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10,
              justifyContent: 'space-between',
            }}
          >
            <Text style={[styles.text_16, { fontWeight: 'bold' }]}>
              Content
            </Text>
            <View
              style={{
                backgroundColor: colors.bg_grey_opacity,
                padding: 8,
                borderRadius: 12,
                // marginLeft: 'auto',
              }}
            >
              {/* <Tooltip
                isVisible={toolTipVisible}
                content={
                  <View
                    style={{
                      backgroundColor: colors.bg_grey_opacity,
                      padding: 8,
                      borderRadius: 12,
                      // marginLeft: 'auto',
                    }}
                  >
                    <Text style={{ color: 'white' }}>Check this out!</Text>
                  </View>
                }
                placement="left"
                onClose={() => setToolTipVisible(false)}
              >
                <TouchableOpacity onPress={() => setToolTipVisible(true)}>
                  <Image
                    source={require('../../../../assets/icons/Datepicker.png')}
                    style={{
                      width: 15,
                      height: 15,
                    }}
                  />
                </TouchableOpacity>
              </Tooltip> */}
              <Tooltip
                ref={tooltipRef}
                trigger={
                  <Image
                    source={require('../../../../assets/icons/Datepicker.png')}
                    style={{
                      width: 15,
                      height: 15,
                    }}
                  />
                }
                tooltip_elements={
                  <View>
                    <TouchableOpacity>
                      <Text style={customStyles.toolTipTextButton}>
                        Show All
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onPressDateRange}>
                      <Text style={customStyles.toolTipTextButton}>
                        Select Date Range
                      </Text>
                    </TouchableOpacity>
                  </View>
                }
              />
            </View>
          </View>

          <View style={{ flex: 1 }}>
            <FlatList
              style={{ flex: 1 }}
              data={celebrityContent}
              refreshing={loading}
              onRefresh={getCelebContent}
              ItemSeparatorComponent={() => (
                <View style={{ marginVertical: 10 }} />
              )}
              renderItem={({ item }) => <CelebPost post={item} />}
            />
          </View>
        </View>

        <Portal>
          <Modalize
            ref={modalRef}
            adjustToContentHeight
            // childrenStyle={{ backgroundColor: colors.grey, padding: 10 }}
          >
            <View style={{ backgroundColor: colors.grey }}>
              <Text style={customStyles.modalHeaderText}>
                Select date range
              </Text>

              {/* <View> */}
              <CalendarPicker
                style={customStyles.calenderRange}
                textStyle={{ color: colors.white }}
                monthTitleStyle={{ color: colors.green }}
                yearTitleStyle={{ color: colors.green }}
                startFromMonday={true}
                allowRangeSelection={true}
                onDateChange={onDateChange}
                nextComponent={
                  <SIcon name="arrow-right" color={colors.white} size={17} />
                }
                previousComponent={
                  <SIcon name="arrow-left" color={colors.white} size={17} />
                }
                customDatesStyles={() => {
                  return {
                    textStyle: {
                      color: '#888787',
                    },
                  };
                }}
                selectedRangeStartStyle={{
                  backgroundColor: colors.green,
                }}
                selectedRangeEndStyle={{ backgroundColor: colors.green }}
                selectedRangeStyle={{
                  backgroundColor: colors.green_opacity,
                }}
                selectedRangeStartTextStyle={{ color: colors.white }}
                selectedRangeEndTextStyle={{ color: colors.white }}
                selectedDayTextColor={{ color: colors.white }}
              />
              <Button
                title="Done"
                buttonStyle={{
                  backgroundColor: colors.green,
                  borderRadius: 15,
                  width: '90%',
                  alignSelf: 'center',
                  marginVertical: 10,
                }}
                onPress={() => modalRef.current?.close()}
              />
              {/* </View> */}
            </View>
          </Modalize>
        </Portal>
      </>
    );
  } else {
    return (
      <SubscribeToCeleb
        celebrity={celebrity.user}
        sent_error={false}
        // set_curr_user_subscribed={set_curr_user_subscribed}
        // isSubscribedCallback={setIsSubscribed}
      />
    );
  }
};

const CelebrityPosts = props => {
  const { is_subscribed, celebrity } = props;

  return (
    <View style={{ marginTop: 11 }}>
      <Post is_subscribed={is_subscribed} celebrity={celebrity} />
    </View>
  );
};

const customStyles = StyleSheet.create({
  toolTipTextButton: {
    color: 'white',
    fontSize: wp(14),
    marginVertical: 5,
  },
  modalHeaderText: {
    fontSize: wp(18),
    color: 'white',
    padding: 15,
  },
  calenderRange: {
    backgroundColor: colors.grey,
  },
});

export default CelebrityPosts;
