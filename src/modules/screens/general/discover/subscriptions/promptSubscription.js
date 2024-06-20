import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import Input from '../../../../components/input';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useForm } from 'react-hook-form';
import { Button, ListItem, Avatar, CheckBox } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

//styles
import styles from '../../../../../assets/styles/styles';
import colors from '../../../../../helpers/colors';

//partials
import Header from '../../../../partials/header/index';
import { color } from 'react-native-reanimated';

const PromptSubscription = props => {
  const [loading, toggle_loading] = useState(false);
  const navigation = useNavigation();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {};

  return (
    <>
      <View style={styles.body}>
        <Header title={'Subscription'} icon="back" navigation={navigation} />
        <View
          style={[
            styles.container,
            {
              paddingTop: 27,
              flex: 1,
            },
          ]}
        >
          <ListItem
            containerStyle={{
              borderRadius: 5,
              backgroundColor: colors.transparent_grey,
              color: colors.text_white,
            }}
          >
            <Avatar
              title={' Debit Card / Credit'}
              source={require('../../../../../assets/icons/Card.png')}
              containerStyle={{
                backgroundColor: colors.green,
                padding: 9,
                borderRadius: 10,
              }}
              size="small"
            />
            <ListItem.Content>
              <ListItem.Title
                style={{ color: colors.text_white }}
              >{`Debit Card / Credit`}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
          <View>
            <Input
              name="cardholder_name"
              placeholder="Cardholder Name"
              error_name="Cardholder Name"
              control={control}
              errors={errors}
              required={true}
            />
            <Input
              name="card_number"
              placeholder="Card Number"
              error_name="Card Number"
              control={control}
              errors={errors}
              type={'text'}
              required={true}
            />
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginBottom: 10,
              }}
            >
              <View style={{ flex: 1, marginRight: 5 }}>
                <Input
                  name="expiry_date"
                  placeholder="Expiry Date"
                  error_name="Expiry Date"
                  control={control}
                  errors={errors}
                  type={'text'}
                  required={true}
                />
              </View>
              <View style={{ flex: 1, marginLeft: 5 }}>
                <Input
                  name="cvv"
                  placeholder="CVV"
                  error_name="CVV"
                  control={control}
                  errors={errors}
                  type={'text'}
                  required={true}
                />
              </View>
            </View>
          </View>
          <CheckBox
            containerStyle={{
              display: 'flex',
              paddingHorizontal: -30,
              border: 1,
              borderWidth: 0,
              backgroundColor: 'transparent',
              color: colors.text_white,
            }}
            checkedColor={colors.green}
            title="I consent to automatically be charged a subscription fee when my subscription expires until I unsubscribe"
            checked={true}
            textStyle={{ color: colors.white, opacity: 0.6 }}
          />

          <View
            style={{
              borderWidth: 1,
              borderColor: colors.green,
              borderStyle: 'dashed',
              padding: 10,
              borderRadius: 8,
            }}
          >
            <ListItem
              containerStyle={{
                borderRadius: 5,
                paddingBottom: 1,
                paddingLeft: 5,
                backgroundColor: 'transparent',
                color: colors.text_white,
              }}
            >
              <Avatar
                title={' Debit Card / Credit'}
                source={require('../../../../../assets/icons/Card.png')}
                rounded
                size={30}
              />
              <ListItem.Content>
                <ListItem.Title
                  style={{ color: colors.text_white }}
                >{`Burna Boy`}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                paddingBottom: 1,
                marginBottom: -15,
              }}
            >
              <CheckBox
                containerStyle={{
                  flex: 0.8,
                  paddingLeft: -30,
                  border: 1,
                  borderWidth: 0,
                  backgroundColor: 'transparent',
                  color: colors.text_white,
                }}
                checkedColor={colors.green}
                title="1 month subscription"
                checked={false}
                textStyle={{ color: colors.white, opacity: 0.6 }}
              />
              <View style={{ flex: 0.2, justifyContent: 'center' }}>
                <Text style={{ textAlign: 'right', color: colors.green }}>
                  {' '}
                  N900
                </Text>
              </View>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginBottom: -15,
              }}
            >
              <CheckBox
                containerStyle={{
                  flex: 0.8,
                  paddingLeft: -30,
                  border: 1,
                  borderWidth: 0,
                  backgroundColor: 'transparent',
                  color: colors.text_white,
                }}
                checkedColor={colors.green}
                title="3 months subscription"
                checked={false}
                textStyle={{ color: colors.white, opacity: 0.6 }}
              />
              <View style={{ flex: 0.2, justifyContent: 'center' }}>
                <Text style={{ textAlign: 'right', color: colors.green }}>
                  {' '}
                  N2500
                </Text>
              </View>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <CheckBox
                containerStyle={{
                  flex: 0.8,
                  paddingLeft: -30,
                  border: 1,
                  borderWidth: 0,
                  backgroundColor: 'transparent',
                  color: colors.text_white,
                }}
                checkedColor={colors.green}
                title="6 months subscription"
                checked={false}
                textStyle={{ color: colors.white, opacity: 0.6 }}
              />
              <View style={{ flex: 0.2, justifyContent: 'center' }}>
                <Text style={{ textAlign: 'right', color: colors.green }}>
                  {' '}
                  N4800
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 0 }}
          >
            <Button
              block
              title="Pay"
              buttonStyle={[
                styles.btn_success,
                {
                  marginTop: 20,
                },
              ]}
              titleStyle={styles.btn_text}
              onPress={handleSubmit(onSubmit)}
              loading={loading}
              disabled={loading}
              disabledStyle={[
                styles.btn_success_disabled,

                { marginTop: 20, opacity: 0.8 },
              ]}
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default PromptSubscription;
