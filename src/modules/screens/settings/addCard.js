import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import Input from '../../components/input';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useForm } from 'react-hook-form';
import { Button } from 'react-native-elements';
import { useToast } from 'native-base';

//styles
import styles from '../../../assets/styles/styles';
import colors from '../../../helpers/colors';

//partials
import Header from '../../partials/header/index';

//redux
import { connect, useDispatch } from 'react-redux';

import { addNewCard } from '../../../store/settings/addCard/actions';

const AddCard = props => {
  const { settings, addNewCard } = props;
  // const [loading, toggle_loading] = useState(false);

  console.log('stg-card', settings);
  const { loading } = settings.AddNewCard;

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    addNewCard(data);
  };

  return (
    <>
      <View style={styles.body}>
        <Header
          title={'Add New Card'}
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
              width: '35%',
            }}
          >
            <View style={{ marginRight: 5 }}>
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
            <View style={{ marginLeft: 5 }}>
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

          <View
            style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 0 }}
          >
            <Button
              block
              title="Add Payment Method"
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

// export default AddCard;

const mapStateToProps = state => {
  const settings = state.Settings;
  return { settings };
};

export default connect(mapStateToProps, { addNewCard })(AddCard);
