import React from 'react';
import { ScrollView } from 'native-base';
import { Avatar, ListItem, Card, Button, Icon } from 'react-native-elements';
import { View, Text, SafeAreaView, Image } from 'react-native';
import colors from '../../../../helpers/colors';
import styles from '../../../../assets/styles/styles';

const LikesAndComments = () => {
  return (
    <View style={{ display: 'flex', flexDirection: 'row', marginTop: 0 }}>
      <View style={{ flex: 1 }}>
        <ListItem
          containerStyle={{
            backgroundColor: colors.border_black,
            borderRadius: 20,
            paddingVertical: 0,
            marginTop: 0,
            color: colors.text_white,
          }}
        >
          <Avatar source={require('../../../../assets/images/Wizkid.png')} />
          <ListItem.Content style={{ paddingVertical: 5 }}>
            <ListItem.Title style={[styles.text_14, { marginBottom: 0 }]}>
              124
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </View>
      <View style={{ flex: 2 }}>
        <ListItem
          containerStyle={{
            backgroundColor: colors.border_black,
            borderRadius: 20,
            paddingVertical: 0,
            marginTop: 0,
            color: colors.text_white,
          }}
        >
          <Avatar source={require('../../../../assets/images/Wizkid.png')} />
          <ListItem.Content style={{ paddingVertical: 5 }}>
            <ListItem.Title style={[styles.text_14, { marginBottom: 0 }]}>
              9
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </View>
    </View>
  );
};

export default LikesAndComments;
