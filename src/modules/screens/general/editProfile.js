import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useForm } from 'react-hook-form';
import { Button } from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import { stat } from 'react-native-fs';
import Input from '../../components/input';
import TextArea from '../../components/textArea';
import constants from '../../../helpers/constants';
import { accessToken } from '../../../helpers/jwt-token-access/accessToken';
import { post, del, get, put, getToken } from '../../../helpers/api_helper';
import * as url from '../../../helpers/url_helper';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import EIcon from 'react-native-vector-icons/Entypo';
import CelebrityProfile from '../../../modules/screens/celebrity/profile';

//profile/update_profile_picture

//styles
import styles from '../../../assets/styles/styles';
import colors from '../../../helpers/colors';

//partials
import Header from '../../partials/header/index';

import { connect } from 'react-redux';
import {
  deleteProfilePic,
  updateProfile,
  updateProfilePic,
  updateProfilePic2,
} from '../../../store/updateProfile/actions';

import { show_toast_notifications } from '../../../helpers/notifications';
import axios from 'axios';
import { updateUserData } from '../../../store/auth/login/actions';

const EditProfile = props => {
  const {
    user_data,
    updateProfile,
    updateProfilePic,
    updatingProfilePic,
    loading: updatingProfile,
    updateUserData,
    deletingProfilePic,
    deleteProfilePic,
  } = props;
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: user_data.user?.username,
      fullname: user_data.user?.fullname,
      bio: user_data.user?.bio,
    },
  });

  const onSubmit = data => {
    updateProfile(data);
  };

  const pick_images = async () => {
    const image = await ImagePicker.openPicker({
      cropping: true,
      cropperCircleOverlay: true,
    });

    const fileInfo = await stat(image.path);

    if (fileInfo.size / 1048576 > 15) {
      show_toast_notifications('Image size too large to upload', 'error');
      return;
    }

    setImage(image.path);
    setLoading(true);

    try {
      const body = new FormData();

      body.append('file', {
        name: 'pics.jpg',
        uri: image.path,
        type: image.mime,
      });

      const resp = await put(url.UPDATE_PROFILE_PIC, body, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      user_data.user = resp.data;
      updateUserData(user_data);
      setLoading(false);
      show_toast_notifications('Profile picture updated', 'success');
    } catch (error) {
      setLoading(false);
      show_toast_notifications('Unable to update profile pic', 'error');
    }
  };

  const _deleteProfilePic = user_data => {
    deleteProfilePic(user_data);
  };

  return (
    <View style={styles.body}>
      <Header
        title={'Edit Profile'}
        icon="back"
        navigation={props.navigation}
      />
      <ScrollView
        style={[
          styles.container,
          {
            paddingTop: 27,
            flex: 1,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            source={{ uri: image ? image : user_data.user?.avatar }}
            style={{
              width: 160,
              height: 160,
              borderRadius: 80,
              margin: 0,
              padding: 0,
            }}
          />
          <View
            style={{
              position: 'absolute',
              bottom: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: 130,
              borderRadius: 80,
            }}
          >
            <TouchableOpacity
              disabled={deletingProfilePic}
              onPress={_deleteProfilePic}
              style={{
                backgroundColor: colors.green,
                width: 34,
                height: 34,
                borderRadius: 17,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <MIcon name="delete" color="white" size={20} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: colors.green,
                width: 34,
                height: 34,
                borderRadius: 17,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                pick_images();
              }}
            >
              <EIcon name="camera" color="white" size={20} />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            width: '100%',
            // height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 10,
          }}
        >
          {loading || deletingProfilePic ? <ActivityIndicator /> : null}
        </View>
        <Input
          name="username"
          placeholder="Username"
          error_name="Username"
          control={control}
          errors={errors}
          required={true}
          leftElement={
            <>
              <Image
                source={require('../../../assets/icons/User.png')}
                style={[{ marginLeft: 15, height: 20, width: 16 }]}
              />
            </>
          }
        />
        <Input
          name="fullname"
          placeholder="Full Name"
          error_name="Full Name"
          control={control}
          errors={errors}
          required={true}
          // default_value={props.route.params.username}
          leftElement={
            <>
              <Image
                source={require('../../../assets/icons/User.png')}
                style={[{ marginLeft: 15, height: 20, width: 16 }]}
              />
            </>
          }
        />

        {!user_data.user?.is_fan == true ? (
          <TextArea
            name="bio"
            placeholder="Bio"
            error_name="Bio"
            control={control}
            errors={errors}
            // component={!user_data.user?.is_fan ? CelebrityProfiler : Profile}
            leftElement={
              <>
                <Image
                  source={require('../../../assets/icons/User.png')}
                  style={[{ marginLeft: 15, height: 20, width: 16 }]}
                />
              </>
            }
          />
        ) : (
          <Text></Text>
        )}

        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            marginBottom: 0,
          }}
        >
          <Button
            block
            title="Update"
            buttonStyle={[
              styles.btn_success,
              {
                marginTop: 20,
              },
            ]}
            titleStyle={styles.btn_text}
            onPress={handleSubmit(onSubmit)}
            loading={loading || updatingProfile}
            disabled={loading || updatingProfile}
            disabledStyle={[
              styles.btn_success_disabled,

              { marginTop: 20, opacity: 0.8 },
            ]}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = state => {
  const { loading, updatingProfilePic, deletingProfilePic } =
    state.UpdateProfile;
  const { user_data } = state.Login;
  return { user_data, loading, updatingProfilePic, deletingProfilePic };
};

export default connect(mapStateToProps, {
  updateProfile,
  updateProfilePic,
  updateUserData,
  deleteProfilePic,
})(EditProfile);
