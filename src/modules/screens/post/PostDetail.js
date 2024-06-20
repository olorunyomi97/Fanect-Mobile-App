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
import { useDispatch, useSelector, connect } from 'react-redux';
import { getPost } from '../../../store/post/actions';
import Post from '../../components/Post';
import Header from '../../partials/header';
import PageLoading from '../../partials/loading/pageLoading';

const PostDetail = props => {
  const post_id = props.route.params.post_id;

  useEffect(() => {
    getPost(post_id);
  });

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg_black }}>
      {props.loading ? (
        <PageLoading type={'9CubeGrid'} />
      ) : (
        <>
          <Header title={'Post'} icon="back" navigation={props.navigation} />
          <View
            style={{
              marginTop: 10,
              flex: 1,
            }}
          >
            <Post post={props.post} />
          </View>
        </>
      )}
    </View>
  );
};

const mapStateToProps = state => {
  const { error, loading, post } = state.Post;

  return { error, loading, post };
};

export default connect(mapStateToProps, { getPost })(PostDetail);
