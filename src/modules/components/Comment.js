import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import EIcon from 'react-native-vector-icons/Entypo';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { wp } from '../../helpers/scaler';
import colors from '../../helpers/colors';

dayjs.extend(relativeTime);

export const Comment = ({ comment }) => {
  const { comment: commentText, createdAt, users } = comment;

  return (
    <View>
      <View style={styles.profileContainer}>
        <View style={styles.authorDateContainer}>
          <Text style={styles.authorText}>{users[0]?.username}</Text>
          <EIcon name="dot-single" color={colors.purple} />
          <Text style={styles.dateText}>{dayjs(createdAt).fromNow()}</Text>
        </View>

        {/* <Image source={profilePic} style={styles.avatar} /> */}
      </View>

      <Text style={styles.comment}>{commentText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  authorDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorText: {
    fontSize: wp(14),
    color: 'white',
  },
  dateText: {
    fontSize: wp(10),
    color: 'white',
    opacity: 0.5,
  },
  avatar: {
    width: 18,
    height: 18,
    borderRadius: 9,
  },
  comment: {
    fontSize: wp(12),
    color: colors.text_grey2,
    marginTop: 5,
  },
});
