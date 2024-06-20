import React, { useState, useRef } from 'react';
import { View, Text, Image } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import Modal from 'react-native-modal';
import { Button } from 'react-native-elements';

//styles
import styles from '../../assets/styles/styles';

const SuccessModal = props => {
  return (
    <View style={styles.modal}>
      <Modal
        isVisible={props.show_modal}
        animationIn={'slideInLeft'}
        animationOut={'slideOutLeft'}
        onBackdropPress={() => {
          props.toggle_show_modal;

          if (props.navigate_to) {
            props.navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [
                  {
                    name: props.navigate_to,
                  },
                ],
              }),
            );
          }
        }}
      >
        <View style={[styles.modalContent]}>
          <View style={styles.container}>
            <Image
              style={{
                marginLeft: 'auto',
                marginRight: 'auto',
                marginBottom: 7,
                borderRadius: 5,
                width: 58,
                height: 58,
              }}
              source={require('../../assets/icons/Success.png')}
              alt="Alternate Text"
              size={'sm'}
            />
            <Text
              style={[
                styles.text_18,
                { textAlign: 'center', marginBottom: 40, fontWeight: 'bold' },
              ]}
            >
              Success!
            </Text>
            <Text style={[styles.text_16, { textAlign: 'center' }]}>
              {props.message}
            </Text>

            <Button
              block
              title={props.btn_text ? props.btn_text : 'OK'}
              buttonStyle={[
                styles.btn_success,
                { marginTop: 30, marginBottom: 0 },
              ]}
              titleStyle={styles.btn_text}
              onPress={() => {
                props.toggle_show_modal;
                if (props.navigate_to) {
                  props.navigation.dispatch(
                    CommonActions.reset({
                      index: 1,
                      routes: [
                        {
                          name: props.navigate_to,
                        },
                      ],
                    }),
                  );
                }
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SuccessModal;
