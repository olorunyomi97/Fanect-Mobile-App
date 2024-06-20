import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

import colors from '../../helpers/colors';
import { hp, wp } from '../../helpers/scaler';

export const ReportCommentInput = ({ user, reason, setReason, loading, onSubmitReport }) => {
  return (
    <View style={styles.container}>
      {reason === 'Other' ? (
        <Text style={styles.title}>{`Reporting this user`}</Text>
        // <Text style={styles.title}>{`Reporting "${user}"`}</Text>
        
      ) : (
        <Text
          style={styles.title}
        >
          {/* {`Reporting "${user}" for "${reason}"`} */}
          {`Reporting this user for "${reason}"`}
        </Text>
      )}

      <TextInput
        style={styles.input}
        multiline
        placeholder="You can enter your comment to help us understand the problem better"
        placeholderTextColor={colors.purple}
        onChangeText={text => setReason(text)}
      />

      <Button
        title="Report"
        containerStyle={styles.button}
        buttonStyle={{ backgroundColor: colors.green }}
        loading={loading}
        onPress={onSubmitReport}
        disabled={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: colors.grey,
  },
  title: {
    fontSize: wp(18),
    color: 'white',
  },
  input: {
    height: hp(144),
    backgroundColor: colors.border_black,
    color: colors.purple,
    borderRadius: 25,
    marginVertical: 10,
    textAlignVertical: 'top',
    padding: 15,
  },
  button: {
    backgroundColor: colors.green,
    borderRadius: 15,
    width: wp(221),
    alignSelf: 'center',
  },
});
