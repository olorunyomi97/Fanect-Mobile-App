import React, { useRef, useEffect, useState } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { Pressable } from 'native-base';
import { CommonActions } from '@react-navigation/native';
import Modal from 'react-native-modal';
import { Button } from 'react-native-elements';
import AIcon from 'react-native-vector-icons/AntDesign';
import { wp } from '../../../helpers/scaler';
//styles
import styles from '../../../assets/styles/styles';
import colors from '../../../helpers/colors';
//redux
import { connect, useDispatch } from 'react-redux';
//partials
import Header from '../../partials/header/index';
import { readData } from '../../../helpers/async_storage_helper.js';
import PageLoading from '../../partials/loading/pageLoading';
import { useSelector } from 'react-redux';
// import DecisionModal from '../../components/decisionModal';
import { deactivateProfile } from '../../../store/settings/deactivateProfile/action';
const Settings = props => {
  // const { settings, deactivateProfile } = props;
  const [loading, toggle_loading] = useState(false);
  const [show_decision_modal, toggle_show_decision_modal] = useState(false);
  const [ShowDeactivateModal, setShowDeactivateModal] = useState(false);
  // const [curr_user, set_curr_user] = useState(null);


  // const deactivateUserProfile = (props) => {
  //   props.deactivateProfile(curr_user);
  // }

  const DeactivateModal = ({ onDeactivate, onCancel }) => {
    // const { DeactivateModal } = props;
    // console.log('settings', DeactivateModal);
    return (
      <View
        style={{
          backgroundColor: '#313131',
          borderRadius: 30,
          padding: 15,
          alignItems: 'center',
        }}
      >
        <AIcon name="warning" color="red" size={wp(100)} />
        <Text style={{ marginVertical: 10, color: 'white', textAlign: 'center', marginTop: 20, marginBottom: 5 }}>
          Are you sure you want to deactivate this Profile ?
        </Text>
  
        <View
          style={{
              display: 'flex',
              flexDirection: 'row',
              width: '85%',
              justifyContent: 'space-around',
              alignItems: 'stretch',
              alignContent: 'stretch',
              marginBottom: 20,
          }}
        >
          <Button
              block
              title="Cancel"
              buttonStyle={[
                styles.btn_grey,
                { marginTop: 30, marginBottom: 0, width: 120 },
              ]}
              titleStyle={styles.btn_text}
              onPress={onCancel}
              disabledStyle={[styles.btn_grey, { marginTop: 30, opacity: 1 }]}
            />
          <Button
              block
              title="Deactivate"
              buttonStyle={[
                styles.btn_danger,
                {
                  marginTop: 30,
                  marginBottom: 0,
                  width: 120,
                },
              ]}
              titleStyle={styles.btn_text}
              onPress={onDeactivate}
              disabledStyle={[
                styles.btn_danger,
                { marginTop: 30, opacity: 0.8 },
              ]}
            />
        </View>
      </View>
    );
  };

  const dispatch = useDispatch();

  const ProfileDeactivation = () => {
    dispatch(deactivateProfile());
  };



  const { user_data } = useSelector(state => state.Login);
  const user = user_data?.user;
  // const user = props.route.params.user;
  // const [curr_user, set_curr_user] = useState(user);
  // const getData = async () => {
  //   try {
  //     const value = await readData('auth_user');
  //     set_curr_user(value.user);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // useEffect(() => {
  //   if (curr_user == null && !user) {
  //     getData();
  //   }
  // }, []);
  


  return (
    <>
    <View style={styles.body}>
      <Header title={'settings'} icon="cancel" navigation={props.navigation} />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View
          style={{
            paddingTop: 27,
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Pressable
            style={{ marginBottom: 17 }}
            onPress={() => {
              props.navigation.navigate('ChangeEmail');
            }}
          >
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: colors.border_black,
                paddingVertical: 16,
                paddingHorizontal: 11,
                borderRadius: 16,
              }}
            >
              <View
                style={{
                  backgroundColor: colors.green,
                  padding: 11,
                  borderRadius: 50,
                }}
              >
                <Image
                  source={require('../../../assets/icons/Email-White.png')}
                  style={{
                    width: 14,
                    height: 12,
                  }}
                />
              </View>
              <View style={{ marginLeft: 16 }}>
                <Text style={[styles.text_14, { color: colors.ash }]}>
                  Email:
                </Text>
                <Text style={styles.text_16}>{user?.email}</Text>
              </View>
              <View
                style={{
                  marginLeft: 'auto',
                  justifyContent: 'center',
                }}
              >
                <Image
                  source={require('../../../assets/icons/Chevron-Right.png')}
                  style={{
                    width: 8,
                    height: 12,
                  }}
                />
              </View>
            </View>
          </Pressable>
          <Pressable
            style={{ marginBottom: 17 }}
            onPress={() => {
              props.navigation.navigate('ChangePassword');
            }}
          >
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: colors.border_black,
                paddingVertical: 16,
                paddingHorizontal: 11,
                borderRadius: 16,
              }}
            >
              <View
                style={{
                  backgroundColor: colors.green,
                  paddingVertical: 11,
                  paddingHorizontal: 12,
                  borderRadius: 50,
                }}
              >
                <Image
                  source={require('../../../assets/icons/Lock-White.png')}
                  style={{
                    width: 14,
                    height: 17,
                  }}
                />
              </View>
              <View style={{ marginLeft: 16 }}>
                <Text style={[styles.text_14, { color: colors.ash }]}>
                  Password:
                </Text>
                <Text style={styles.text_16}>
                  **********
                  {/* <Image
                    source={require('../../../assets/icons/Eyes-White.png')}
                    style={{
                      width: 16,
                      height: 12,
                    }}
                  /> */}
                </Text>
              </View>
              <View
                style={{
                  marginLeft: 'auto',
                  justifyContent: 'center',
                }}
              >
                <Image
                  source={require('../../../assets/icons/Chevron-Right.png')}
                  style={{
                    width: 8,
                    height: 12,
                  }}
                />
              </View>
            </View>
          </Pressable>
          <Pressable
            style={{ marginBottom: 17 }}
            onPress={() => {
              props.navigation.navigate('NotificationSettings');
            }}
          >
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: colors.border_black,
                paddingVertical: 16,
                paddingHorizontal: 11,
                borderRadius: 16,
              }}
            >
              <View
                style={{
                  backgroundColor: colors.green,
                  paddingVertical: 11,
                  paddingHorizontal: 12,
                  borderRadius: 50,
                }}
              >
                <Image
                  source={require('../../../assets/icons/Notifications-White.png')}
                  style={{
                    width: 14,
                    height: 17,
                  }}
                />
              </View>
              <View
                style={{
                  marginLeft: 16,
                  justifyContent: 'center',
                }}
              >
                <Text style={styles.text_16}>Notification Settings</Text>
              </View>
              <View
                style={{
                  marginLeft: 'auto',
                  justifyContent: 'center',
                }}
              >
                <Image
                  source={require('../../../assets/icons/Chevron-Right.png')}
                  style={{
                    width: 8,
                    height: 12,
                  }}
                />
              </View>
            </View>
          </Pressable>
          {/* <Pressable
            style={{ marginBottom: 17 }}
            onPress={() => {
              props.navigation.navigate('PaymentMethod');
            }}
          >
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: colors.border_black,
                paddingVertical: 16,
                paddingHorizontal: 11,
                borderRadius: 16,
              }}
            >
              <View
                style={{
                  backgroundColor: colors.green,
                  paddingHorizontal: 10,
                  paddingVertical: 12,
                  borderRadius: 50,
                }}
              >
                <Image
                  source={require('../../../assets/icons/Wallet.png')}
                  style={{
                    width: 19,
                    height: 16,
                  }}
                />
              </View>
              <View
                style={{
                  marginLeft: 16,
                  justifyContent: 'center',
                }}
              >
                <Text style={styles.text_16}>Payment Methods</Text>
              </View>
              <View
                style={{
                  marginLeft: 'auto',
                  justifyContent: 'center',
                }}
              >
                <Image
                  source={require('../../../assets/icons/Chevron-Right.png')}
                  style={{
                    width: 8,
                    height: 12,
                  }}
                />
              </View>
            </View>
          </Pressable> */}
          <Pressable
            style={{ marginBottom: 17 }}
            onPress={() => {
              props.navigation.navigate('PaymentHistory');
            }}
          >
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: colors.border_black,
                paddingVertical: 16,
                paddingHorizontal: 11,
                borderRadius: 16,
              }}
            >
              <View
                style={{
                  backgroundColor: colors.green,
                  paddingHorizontal: 12,
                  paddingVertical: 15,
                  borderRadius: 50,
                }}
              >
                <Image
                  source={require('../../../assets/icons/Card.png')}
                  style={{
                    width: 17,
                    height: 12,
                  }}
                />
              </View>
              <View
                style={{
                  marginLeft: 16,
                  justifyContent: 'center',
                }}
              >
                <Text style={styles.text_16}>Payment history</Text>
              </View>
              <View
                style={{
                  marginLeft: 'auto',
                  justifyContent: 'center',
                }}
              >
                <Image
                  source={require('../../../assets/icons/Chevron-Right.png')}
                  style={{
                    width: 8,
                    height: 12,
                  }}
                />
              </View>
            </View>
          </Pressable>
          <Pressable
            style={{ marginBottom: 17 }}
            onPress={() => {
              props.navigation.navigate('Support');
            }}
          >
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: colors.border_black,
                paddingVertical: 16,
                paddingHorizontal: 11,
                borderRadius: 16,
              }}
            >
              <View
                style={{
                  backgroundColor: colors.green,
                  padding: 11,
                  borderRadius: 50,
                }}
              >
                <Image
                  source={require('../../../assets/icons/Support.png')}
                  style={{
                    width: 20,
                    height: 20,
                  }}
                />
              </View>
              <View
                style={{
                  marginLeft: 16,
                  justifyContent: 'center',
                }}
              >
                <Text style={styles.text_16}>Support</Text>
              </View>
              <View
                style={{
                  marginLeft: 'auto',
                  justifyContent: 'center',
                }}
              >
                <Image
                  source={require('../../../assets/icons/Chevron-Right.png')}
                  style={{
                    width: 8,
                    height: 12,
                  }}
                />
              </View>
            </View>
          </Pressable>

          <View
            style={{
              marginTop: 60,
            }}
          >
            <Pressable style={{ marginBottom: 17 }}
              // onPress={() => {
              //   toggle_show_decision_modal(true);
              // }}
              onPress={() => {
                setShowDeactivateModal(true);
              }}
            >  
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  backgroundColor: colors.border_black,
                  paddingVertical: 16,
                  paddingHorizontal: 11,
                  borderRadius: 16,
                }}
              >
                <View
                  style={{
                    backgroundColor: colors.red,
                    padding: 11,
                    borderRadius: 50,
                  }}
                >
                  <Image
                    source={require('../../../assets/icons/Delete.png')}
                    style={{
                      width: 20,
                      height: 20,
                    }}
                  />
                </View>
                <View
                  style={{
                    marginLeft: 16,
                    justifyContent: 'center',
                  }}
                >
                  <Text style={styles.text_16}>Deactivate my account</Text>
                </View>
              </View>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
    {/* <DecisionModal
        loading={loading}
        toggle_loading={toggle_loading}
        show_modal={show_decision_modal}
        toggle_show_modal={toggle_show_decision_modal}
        // deactivateProfile={deactivateUserProfile}
        action={deactivateUserProfile}
        message={'Are you sure you want to deactivate your account?'}
      /> */}

      {/* Deactivation Modal */}
      <Modal isVisible={ShowDeactivateModal}>
        <DeactivateModal
          onCancel={() => setShowDeactivateModal(false)}
          onDeactivate={() => {
            setShowDeactivateModal(false);
            ProfileDeactivation();
          }}
        />
      </Modal>

    </> 
  );
};

export default Settings;
