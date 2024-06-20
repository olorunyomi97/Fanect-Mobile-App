import React, { useRef, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
} from 'react-native';
import { Pressable } from 'native-base';
import { connect, useDispatch } from 'react-redux';
import { CommonActions } from '@react-navigation/native';
//styles
import styles from '../../../../assets/styles/styles';
import { getStories } from '../../../../store/stories/actions';

//partials
import Header from '../../../partials/header/index';
import { useSelector } from 'react-redux';

const StreamAnalytics = props => {
  const { user_data } = useSelector(state => state.Login);
  const user = user_data;
  const dispatch = useDispatch();

  const [data, setData] = useState([
    {
      id: 1,
      name: 'queenkylie7896',
      status: 'Kylie Mason',
      image: require('../../../../assets/images/stream-analytics-user1.png'),
    },
    {
      id: 2,
      name: 'carl26johnson',
      status: 'Carl Johnson',
      image: require('../../../../assets/images/stream-analytics-user2.png'),
    },
  ]);

  useEffect(() => {
    dispatch(getStories(true));
  }, []);

  // const user = props.route.params.user;
  // const [curr_user, set_curr_user] = useState(user);
  // const getData = async () => {
  //   try {
  //     const value = await readData('auth_user');
  //     set_curr_user(value.user);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // useEffect(() => {
  //   if (curr_user == null && !user) {
  //     getData();
  //   }
  // }, []);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity>
        <View style={styles.row}>
          <Image source={item.image} style={styles.pic} />
          <View>
            <View style={styles.nameContainer}>
              <Text
                style={styles.nameTxt}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.name}
              </Text>
            </View>
            <View style={styles.msgContainer}>
              <Text style={styles.msgTxt}>{item.status}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.body}>
      <Header title={'1 Viewer'} icon="cancel" navigation={props.navigation} />

      <ScrollView
        style={[styles.container, styles.streamAnalyticsContainer]}
        showsVerticalScrollIndicator={false}
      >
        <FlatList
          data={data}
          keyExtractor={item => {
            return item.id;
          }}
          renderItem={renderItem}
        />
      </ScrollView>
    </View>
  );
};

export default StreamAnalytics;
