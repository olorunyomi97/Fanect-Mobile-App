import React, { useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { connect, useDispatch } from 'react-redux';

import { hp } from '../../helpers/scaler';
import { getStories } from '../../store/stories/actions';
import { AddStreamButton } from './AddStreamButton';
import { Stream } from './Stream';
import colors from '../../helpers/colors';

const strm1 = require('../../assets/mock-data/strm1.png');
const strm2 = require('../../assets/mock-data/strm2.png');

const streams = [
  {
    id: '1',
    image: strm1,
    isVideo: true,
  },
  {
    id: '1',
    image: strm2,
    isVideo: false,
  },
  {
    id: '2',
    image: strm1,
    isVideo: true,
  },
  {
    id: '1',
    image: strm1,
    isVideo: true,
  },
  {
    id: '1',
    image: strm2,
    isVideo: false,
  },
  {
    id: '2',
    image: strm1,
    isVideo: true,
  },
  {
    id: '1',
    image: strm1,
    isVideo: true,
  },
  {
    id: '1',
    image: strm2,
    isVideo: false,
  },
  {
    id: '2',
    image: strm1,
    isVideo: true,
  },
];

const Streams = ({ stories, loading }) => {
  const dispatch = useDispatch();

  console.log('stories', stories);
  console.log('loading stories', loading);

  useEffect(() => {
    dispatch(getStories());
  }, []);

  const renderItem = ({ item }) => <Stream stream={item} />;

  return (
    <>
      {loading && !stories.length ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color={colors.green} />
        </View>
      ) : (
        <ScrollView style={styles.container} horizontal>
          <AddStreamButton />
          <FlatList
            horizontal
            data={streams}
            keyExtractor={item => item.id}
            renderItem={renderItem}
          />
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    flexDirection: 'row',
  },
  loadingContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: hp(119),
  },
});

const mapStateToProps = state => {
  const { loading, stories } = state.Stories;
  return { loading, stories };
};

export default connect(mapStateToProps)(Streams);
