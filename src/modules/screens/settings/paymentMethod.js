import React, { useState } from 'react';
import { View, Text, SafeAreaView, StatusBar, ScrollView, Image } from 'react-native';
import { useToast, Pressable, Switch, Divider } from 'native-base';
import { Button } from 'react-native-elements';

//styles
import styles from '../../../assets/styles/styles';
import colors from '../../../helpers/colors';
import SuccessModal from '../../components/successModal';

//partials
import Header from '../../partials/header/index';
import DecisionModal from '../../components/decisionModal';

const PaymentMethod = props => {
  const [loading, toggle_loading] = useState(false);
  const [show_decision_modal, toggle_show_decision_modal] = useState(false);

  const delete_card = () => {
    console.log('testing1');
  };

  return (
    <View style={styles.body}>
      <Header
        title={'Payment Methods'}
        icon="back"
        navigation={props.navigation}
      />
      <View
        style={[
          styles.container,
          {
            paddingTop: 27,
            flex: 1,
          },
        ]}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <View
              style={{
                paddingVertical: 15,
                paddingHorizontal: 12,
                backgroundColor: colors.border_black,
                borderRadius: 16,
              }}
            >
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                    }}
                  >
                    <View style={{ justifyContent: 'center' }}>
                      <Image
                        source={require('../../../assets/icons/MasterCard.png')}
                        style={[{ height: 13, width: 21 }]}
                      />
                    </View>
                    <View style={{ justifyContent: 'center' }}>
                      <Text style={[styles.text_18]}>****2364</Text>
                    </View>
                  </View>
                  <Text
                    style={[
                      styles.text_14,
                      { fontWeight: '600', marginVertical: 10 },
                    ]}
                  >
                    Kylie Mason
                  </Text>
                  <Text
                    style={[
                      styles.text_12,
                      { color: colors.text_grey, marginLeft: 'auto' },
                    ]}
                  >
                    Expires on: 02/2022
                  </Text>
                </View>

                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginLeft: 'auto',
                  }}
                >
                  <View style={{ justifyContent: 'center' }}>
                    {/* <Image
                      source={require('../../../assets/icons/writer.png')}
                      style={[{height: 26, width: 26}]}
                    /> */}
                  </View>
                  <View style={{ justifyContent: 'center', marginLeft: 12 }}>
                    <Pressable
                      onPress={() => {
                        toggle_show_decision_modal(true);
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: colors.red,
                          padding: 5,
                          borderRadius: 50,
                        }}
                      >
                        <Image
                          source={require('../../../assets/icons/Delete.png')}
                          style={{
                            width: 14,
                            height: 15.6,
                          }}
                        />
                      </View>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 0 }}>
          <Button
            block
            title="Add new Card"
            buttonStyle={[
              styles.btn_success,
              {
                marginTop: 20,
              },
            ]}
            titleStyle={styles.btn_text}
            onPress={() => props.navigation.navigate('AddCard')}
          />
        </View>
      </View>
      <DecisionModal
        loading={loading}
        toggle_loading={toggle_loading}
        show_modal={show_decision_modal}
        toggle_show_modal={toggle_show_decision_modal}
        action={delete_card}
        message={'Are you sure you want to delete this payment method?'}
      />
    </View>
  );
};

export default PaymentMethod;
