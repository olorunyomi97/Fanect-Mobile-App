import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  FlatList,
  StyleSheet,
} from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { readData, saveData } from '../../../helpers/async_storage_helper';

import colors from '../../../helpers/colors';
import PrimaryHeader from '../../partials/header/primaryHeader';
import { mockFeedData } from '../../../helpers/constants';
import Post from '../../components/Post';
//import Streams from '../../components/Streams';
import Streams from './shared/streams';

import styles from '../../../assets/styles/styles';
import { getFeed } from '../../../store/feed/actions';
import { getStories } from '../../../store/stories/actions';
import { AddStreamButton } from '../../components/AddStreamButton';
import { clearAllData } from '../../../store/content/celebrity/actions';
import { useFocusEffect } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';

//plug this part to react native live on firebase
import { updateToken } from '../../../store/updateFcmToken/actions';
import messaging from '@react-native-firebase/messaging';

const Seperator = () => <View style={{ marginVertical: 10 }} />;

const Home = ({
  navigation,
  feed,
  loading,
  stories,
  storiesLoading,
  addingComment,
  user_data,
}) => {
  const dispatch = useDispatch();

  // console.log(user_data?.user.is_fan, '<==== is fan details ==>');

  const [curr_user, set_current_user] = useState(user_data?.user?.is_fan);
  const [curr_user_fulldetails, set_current_user_fulldetails] = useState(
    user_data?.user,
  );

  const sortData = storiesarr => {
    let sortedArray = [];
    let onLiveStreamID = [];

    storiesarr.forEach(storiesarr =>
      storiesarr.is_live_stream
        ? onLiveStreamID.push(storiesarr.id)
        : console.log(
            'NOT STORIES' +
              storiesarr.stream_id +
              '  AND is_live_stream== ' +
              storiesarr.is_live_stream,
          ),
    );

    // If the item contains "first" property, it will be placed at the beginning of the sortedArray, else it will be at the end of it
    storiesarr.forEach(sarr =>
      onLiveStreamID.includes(sarr.id) && !sarr.is_live_stream
        ? ''
        : sortedArray.push(sarr),
    );

    return sortedArray;
  };

  const onRefresh = () => {
    dispatch(getFeed(true));
    dispatch(getStories(true));
  };

  ////// begin firebase

  const getFirebaseToken = async () => {
    try {
      await messaging().registerDeviceForRemoteMessages();

      const token = await messaging().getToken();

      dispatch(updateToken({ fcm_token: token }));
    } catch (error) {
      console.log(error);
    }
  };

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      // console.log('Authorization status:', authStatus);
    }
  };

  useEffect(() => {
    getFirebaseToken();
    requestUserPermission();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  ///////end firebase

  useEffect(() => {
    if (curr_user_fulldetails != undefined) {
      onRefresh();
    }
  }, []);

  const rf =
    feed !== undefined
      ? feed.filter(item => typeof item.url[0] !== 'object')
      : [];

  return (
    <>
      <Spinner visible={loading == true ? true : false} />
      <View style={{ flex: 1, backgroundColor: colors.bg_black }}>
        <PrimaryHeader />
        <View style={{ flex: 1 }}>
          <View
            style={{
              backgroundColor: '#000000',
              flex: 1,
              paddingHorizontal: 10,
            }}
          >
            <FlatList
              onRefresh={onRefresh}
              refreshing={loading && storiesLoading}
              ListHeaderComponent={
                <ScrollView
                  style={{
                    paddingVertical: 10,
                    marginTop: '5%',
                    marginLeft: '2%',
                    flexDirection: 'row',
                  }}
                  horizontal
                >
                  {curr_user ? <></> : <AddStreamButton />}

                  <Streams
                    storiesDataValue={sortData(stories)}
                    userDatas={curr_user_fulldetails}
                  />
                </ScrollView>
              }
              style={{ flex: 1 }}
              data={rf}
              keyExtractor={item => item.id}
              renderItem={({ item }) => <Post post={item} />}
              ItemSeparatorComponent={Seperator}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </View>
    </>
  );
};

const mapStateToProps = state => {
  const { feed, loading } = state.Feed;
  const { stories, loading: storiesLoading } = state.Stories;
  const { loading: addingComment } = state.Comment;
  const { user_data } = state.Login;

  return { feed, loading, stories, storiesLoading, addingComment, user_data };
};

export default connect(mapStateToProps)(Home);
