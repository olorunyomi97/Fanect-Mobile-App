import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import TextArea from '../../components/textArea';
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

// import {support} from '../../../redux/general/settings/settingsActions';

import SuccessModal from '../../components/successModal';

import { writeToSupport } from '../../../store/settings/writeToSupport/actions';

const Support = props => {
  const { settings, writeToSupport } = props;
  const [show_modal, toggle_show_modal] = useState(false);

  const { loading } = settings.WriteToSupport;

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = data => {
    console.log(data, 'gfhjkky=====>');
    writeToSupport(data);
    reset({ support_detail: null });
  };

  return (
    <>
      <View style={styles.body}>
        <Header title={'Support'} icon="back" navigation={props.navigation} />
        <View
          style={[
            styles.container,
            {
              paddingTop: 15,
              flex: 1,
            },
          ]}
        >
          <TextArea
            name="support_detail"
            placeholder="Write your message to support"
            error_name="Message"
            control={control}
            errors={errors}
            required={true}
          />
          {/* <TextArea
            name="bio"
            placeholder="Write your message to support"
            error_name="Bio"
            control={control}
            errors={errors}
            numberOfLines={8}
          /> */}

          {/* <TextInput
            multiline
            placeholder="Write your message to support"
            placeholderTextColor={colors.purple}
            style={{
              backgroundColor: colors.border_black,
              borderRadius: 15,
              height: 144,
              textAlignVertical: 'top',
              padding: 10,
              color: colors.purple,
            }}
          /> */}

          {/* <View
            style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 0 }}
          > */}
          <Button
            block
            title="Send"
            buttonStyle={[
              styles.btn_success,
              {
                marginTop: 30,
              },
            ]}
            titleStyle={styles.btn_text}
            onPress={handleSubmit(onSubmit)}
            loading={loading}
            disabled={loading}
            disabledStyle={[styles.btn_success_disabled, { opacity: 0.8 }]}
          />
          {/* </View> */}
        </View>
        <SuccessModal
          toggle_show_modal={toggle_show_modal}
          show_modal={show_modal}
          navigation={props.navigation}
          message={'Thank you for your message! We will contact you soon'}
          btn_text="Send Another Message"
        />
      </View>
    </>
  );
};

const mapStateToProps = state => {
  const settings = state.Settings;
  return { settings };
};

export default connect(mapStateToProps, { writeToSupport })(Support);
