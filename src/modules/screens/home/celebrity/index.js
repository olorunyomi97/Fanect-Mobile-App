import React, { useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  FlatList,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector, connect } from 'react-redux';
import colors from '../../../../helpers/colors';
import { useForm } from 'react-hook-form';
import PrimaryHeader from '../../../partials/header/primaryHeader';
import { mockFeedData } from '../../../../helpers/constants';
import { Post } from '../../../components/Post';
import { Streams } from '../../../components/Streams';
import styles from '../../../../assets/styles/styles';
import { getFeed } from '../../../../store/feed/actions';
//plug this part to react native live on firebase

const Seperator = () => <View style={{ marginVertical: 10 }} />;

const CelebrityHome = ({ feeds, loading }) => {
  const dispatch = useDispatch();

  const state = useSelector(state => state?.Feed);

  useEffect(() => {
    dispatch(getFeed());
  });

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg_black }}>
      <PrimaryHeader />
      <ScrollView
        style={[
          styles.body,
          {
            backgroundColor: colors.bg_black,
            // borderRadius: 20,
            // paddingBottom: 16,
          },
        ]}
      >
        <View
          style={{ backgroundColor: '#000000', flex: 1, paddingHorizontal: 10 }}
        >
          <View style={{ flexGrow: 0 }}>
            <Streams />
          </View>
          <View
            style={{
              marginTop: 10,
              flex: 1,
            }}
          >
            <FlatList
              style={{ flex: 1 }}
              data={data.data}
              keyExtractor={item => item.id}
              renderItem={({ item }) => <Post post={item} />}
              ItemSeparatorComponent={Seperator}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = state => {
  const { loading, stories } = state.Feed;
  console.log(state, '<<---->>>> home state <<<----- >>>');
  return { loading, stories };
};

export default connect(mapStateToProps)(CelebrityHome);
