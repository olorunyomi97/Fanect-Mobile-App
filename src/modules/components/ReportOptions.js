import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { wp } from '../../helpers/scaler';
import colors from '../../helpers/colors';

const ReportOption = ({ option, onSelectOption }) => {
  const { option: optionText } = option;

  return (
    <TouchableOpacity onPress={() => onSelectOption(optionText)}>
      <Text style={styles.reportText}>{optionText}</Text>
    </TouchableOpacity>
  );
};

const Seperator = () => <View style={styles.seperator} />;

export const ReportOptions = ({ reportOptions, onSelectOption }) => {
  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <Text style={styles.titleText}>Choose the reason for report:</Text>
        }
        data={reportOptions}
        renderItem={({ item }) => (
          <ReportOption option={item} onSelectOption={onSelectOption} />
        )}
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
  titleText: {
    fontSize: wp(18),
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  reportText: {
    fontSize: wp(16),
    color: colors.text_white,
  },
  seperator: {
    marginVertical: 10,
    borderWidth: 0.5,
    borderColor: 'white',
    opacity: 0.12,
  },
});
