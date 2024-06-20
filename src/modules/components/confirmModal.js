import React, { useState, useRef } from 'react';
import { View, Text, Image } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import Modal from 'react-native-modal';
import { Button } from 'react-native-elements';

//styles
import styles from '../../assets/styles/styles';

const ConfirmModal = props => {
  return (
    <View style={styles.modal}>
      <Modal
        isVisible={props.show_modal}
        animationIn={'slideInLeft'}
        animationOut={'slideOutLeft'}
      >
        <View style={[styles.modalContent]}>
          {/* <View style={styles.container}> */}
          <Image
            style={{
              marginLeft: 'auto',
              marginRight: 'auto',
              marginBottom: 30,

              width: 40,
              height: 40,
            }}
            source={require('../../assets/icons/Subscribe.png')}
            alt="Alternate Text"
            size={'sm'}
          />

          <Text style={[styles.text_16, { textAlign: 'center' }]}>
            {props.message}
          </Text>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-around',
              alignItems: 'stretch',
              alignContent: 'stretch',
            }}
          >
            <Button
              block
              title="Cancel"
              buttonStyle={[
                styles.btn_grey,
                { marginTop: 30, marginBottom: 0, width: 110 },
              ]}
              titleStyle={styles.btn_text}
              onPress={() => {
                props.toggle_show_modal(false);
              }}
              disabled={props.loading}
              disabledStyle={[styles.btn_grey, { marginTop: 30, opacity: 1 }]}
            />
            <Button
              block
              title="Confirm"
              buttonStyle={[
                styles.btn_success,
                {
                  marginTop: 30,
                  marginBottom: 0,
                  width: 110,
                },
              ]}
              titleStyle={styles.btn_text}
              onPress={() => {
                // props.toggle_show_modal(false);
                if (props.action) {
                  props.action();
                }

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
              loading={props.loading}
              disabled={props.loading}
              disabledStyle={[
                styles.btn_success_disabled,
                { marginTop: 30, opacity: 0.8 },
              ]}
            />
          </View>
          {/* </View> */}
        </View>
      </Modal>
    </View>
  );
};

export default ConfirmModal;
