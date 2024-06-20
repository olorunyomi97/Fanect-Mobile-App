import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';

import { hp, wp } from '../../helpers/scaler';
import colors from '../../helpers/colors';

const VideoIcon = () => {
  return (
    <View style={styles.videoIconContainer}>
      <Icon name="videocam" color="white" />
    </View>
  );
};

export const Stream = ({ stream }) => {
  const { image, isVideo } = stream;
  // console.log('strm', stream);
  // if (!stream) {
  //   return null;
  // }
  // console.log('fm', stream?.stories[0]?.url[0]);

  // const { image, isVideo } = stream;

  // const { profile, stories, title, username } = stream;

  // if (stream?.stories?.length < 1) {
  //   return null;
  // }

  // if (type !== 'image') {
  //   return null;
  // }

  // console.log('fm', stream?.stories[0]?.url[0]);

  return (
    <TouchableOpacity style={styles.container}>
      {isVideo ? (
        <View style={styles.videoContainer}>
          <VideoIcon />
        </View>
      ) : null}
      <FastImage source={image} style={styles.image} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp(72),
    height: hp(119),
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    zIndex: 0,
  },
  videoContainer: {
    width: '100%',
    height: '100%',
    zIndex: 1,
    position: 'absolute',
  },
  videoIconContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.green,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: 5,
    top: 5,
    zIndex: 0,
  },
});
