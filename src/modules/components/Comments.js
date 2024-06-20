import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

import { Comment } from './Comment';
import colors from '../../helpers/colors';

const Seperator = () => <View style={styles.seperator} />;

export const Comments = ({ comments, loading }) => {
  return (
    <View style={styles.container}>
      <FlatList
        refreshing={loading}
        data={comments}
        renderItem={({ item }) => <Comment comment={item} />}
        ItemSeparatorComponent={Seperator}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.grey,
    padding: 15,
  },
  seperator: {
    marginVertical: 10,
  },
});
