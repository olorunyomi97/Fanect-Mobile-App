import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Header } from 'react-native-elements';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useDispatch, useSelector } from 'react-redux';

import { wp } from '../../../helpers/scaler';
import colors from '../../../helpers/colors';
import FIcon from 'react-native-vector-icons/Feather';
import { Locations } from '../../components';
import { addLocation } from '../../../store/content/celebrity/actions';

const IconContainer = ({ children, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.iconContainer}>
    {children}
  </TouchableOpacity>
);

const locations = [
  {
    location: '3347 Hill Street, WALTON, IN',
  },
  {
    location: '3347 Hill Street, WALTON, IN',
  },
  {
    location: '3347 Hill Street, WALTON, IN',
  },
  {
    location: '3347 Hill Street, WALTON, IN',
  },
  {
    location: '3347 Hill Street, WALTON, IN',
  },
  {
    location: '3347 Hill Street, WALTON, IN',
  },
  {
    location: '3347 Hill Street, WALTON, IN',
  },
  {
    location: '3347 Hill Street, WALTON, IN',
  },
  {
    location: '3347 Hill Street, WALTON, IN',
  },
];

export const AddLocation = ({ navigation }) => {
  const [location, setLocation] = useState('');

  const dispatch = useDispatch();

  const _addLocation = location => {
    dispatch(addLocation(location));
    navigation.goBack();
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.bg_black,
      }}
    >
      <Header
        containerStyle={{
          backgroundColor: colors.fanectBg,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
          borderWidth: 0,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        centerComponent={{
          text: 'Add Location',
          style: { color: 'white', fontSize: wp(20), fontWeight: 'bold' },
        }}
        leftComponent={
          <IconContainer onPress={() => navigation.goBack()}>
            <FIcon name="x" color="white" size={wp(20)} />
          </IconContainer>
        }
      />
      <View style={styles.container}>
        <GooglePlacesAutocomplete
          placeholder="Search"
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log('data', data, details);
            _addLocation(data);
          }}
          styles={{
            container: styles.container,
            textInputContainer: {
              flexDirection: 'row',
            },
            textInput: styles.input,
            seperator: {
              borderWidth: 1,
              borderColor: 'white',
              opacity: 0.1,
              marginVertical: 10,
            },
            listView: { backgroundColor: colors.bg_black },
            row: {
              backgroundColor: colors.bg_black,
            },
            description: {
              color: colors.purple,
              fontSize: wp(16),
            },
            seperator: {
              opacity: 0.1,
              borderColor: 'white',
            },
            poweredContainer: {
              backgroundColor: colors.bg_black,
            },
          }}
          query={{
            key: 'AIzaSyCFvuMN_Adkeqr_U4PPeGbNFDnagyHxiGc',
            language: 'en',
          }}
          placeholderTextColor="white"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: colors.bg_black,
  },
  input: {
    backgroundColor: colors.border_black,
    width: '100%',
    borderWidth: 1,
    borderColor: colors.bg_grey,
    marginVertical: 10,
    borderRadius: 15,
    paddingLeft: 10,
    fontSize: wp(16),
    color: 'white',
  },
  iconContainer: {
    borderRadius: 12,
    padding: 5,
    backgroundColor: colors.bg_grey_opacity,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
