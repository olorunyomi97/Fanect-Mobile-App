/* eslint-disable react-native/no-inline-styles */
import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, RefreshControl, Image } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';

import styles from '../../../assets/styles/styles';
import colors from '../../../helpers/colors';

const Subscribers = props => {
  const { subscriptions } = props;
  return (
    <React.Fragment>
      {subscriptions.map((value, key) => (
        <View
          key={key}
          style={{
            display: 'flex',
            flexDirection: 'row',
            paddingHorizontal: 10,
            paddingVertical: 20,
            backgroundColor: colors.border_black,
            borderRadius: 15,
            marginBottom: 25,
          }}
        >
          <Image
            source={{
              uri: `${value.subscriptions[0].avatar}`,
            }}
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
            }}
          />
          <View
            style={{
              justifyContent: 'center',
              marginLeft: 16,
            }}
          >
            <Text
              style={[
                styles.text_16,
                {
                  fontWeight: '600',
                  marginBottom: 8,
                },
              ]}
            >
              {value.subscriptions[0].username}
            </Text>
            <Text
              style={[
                styles.text_14,
                {
                  color: colors.ash,
                  opacity: 0.4,
                },
              ]}
            >
              {value.subscriptions[0].fullname}
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              marginLeft: 'auto',
            }}
          >
            <Text
              style={[
                styles.text_14,
                {
                  color: colors.green,
                  fontWeight: 'bold',
                },
              ]}
            >
              Subscribed
            </Text>
          </View>
        </View>
      ))}
    </React.Fragment>
  );
};

export default Subscribers;
