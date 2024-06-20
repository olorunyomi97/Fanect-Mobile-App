import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { wp } from '../../helpers/scaler';

const Location = ({ location }) => {
  const { location: locationName } = location;

  return (
    <TouchableOpacity>
      <Text style={styles.locationText}>{locationName}</Text>
    </TouchableOpacity>
  );
};

const Seperator = () => (
  <View
    style={{
      borderWidth: 1,
      borderColor: 'white',
      opacity: 0.1,
      marginVertical: 10,
    }}
  />
);

export const Locations = ({ locations }) => {
  return (
    <View>
      <FlatList
        data={locations}
        renderItem={({ item }) => <Location location={item} />}
        ItemSeparatorComponent={Seperator}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  locationText: {
    fontSize: wp(16),
    color: '#9FA5C0',
  },
});
