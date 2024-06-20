import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Header } from 'react-native-elements';
import FIcon from 'react-native-vector-icons/Feather';
import { Button } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';

import colors from '../../../helpers/colors';
import { hp, wp } from '../../../helpers/scaler';
import { useSelector, useDispatch, connect } from 'react-redux';
import { SelectedImage } from '../../components/SelectedImage';
import { AddImageButton } from '../../components/AddImageButton';
import {
  addContent,
  addContentFailure,
  clearAllData,
  removeImage,
} from '../../../store/content/celebrity/actions';
import { post, postWithFetch } from '../../../helpers/api_helper';
import * as url from '../../../helpers/url_helper';
import { show_toast_notifications } from '../../../helpers/notifications';

const IconContainer = ({ children, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.iconContainer}>
    {children}
  </TouchableOpacity>
);

const CreateContent = ({ navigation, addContent }) => {
  const { location, images, loading } = useSelector(state => state.AddContent);
  const [caption, setCaption] = useState('');

  const dispatch = useDispatch();

  console.log('loc', location);

  console.log('imgss', images);

  const _removeImage = image => {
    dispatch(removeImage(image));
  };

  const _addContent = async () => {
    addContent({ images, caption });
  };

  // useFocusEffect(
  //   React.useCallback(() => {
  //     // const unsubscribe = API.subscribe(userId, user => setUser(user));

  //     return () => dispatch(clearAllData());
  //   }, []),
  // );

  return (
    <ScrollView style={{ flex: 1 }}>
      <Header
        containerStyle={{
          backgroundColor: colors.fanectBg,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
          borderWidth: 0,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        centerComponent={{
          text: 'Post Content',
          style: {
            color: 'white',
            fontSize: wp(20),
            fontWeight: 'bold',
          },
        }}
        leftComponent={
          <IconContainer onPress={() => navigation.navigate('Home')}>
            <FIcon name="x" color="white" size={wp(20)} />
          </IconContainer>
        }
        rightComponent={
          <TouchableOpacity
            onPress={_addContent}
            disabled={images.length < 1 || loading}
          >
            {loading ? (
              <ActivityIndicator color={colors.green} />
            ) : (
              <Text
                style={[
                  styles.postButton,
                  {
                    color:
                      images.length < 1 || loading
                        ? colors.green_disabled
                        : colors.green,
                  },
                ]}
              >
                Post
              </Text>
            )}
          </TouchableOpacity>
        }
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ alignItems: 'center' }}
      >
        {images.length > 0 ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <FlatList
              data={images}
              style={{ flexGrow: 0 }}
              horizontal
              renderItem={({ item }) => (
                <SelectedImage image={item} onDelete={_removeImage} />
              )}
            />
            {images.length < 10 ? (
              <AddImageButton
                onAddImage={() =>
                  navigation.navigate('SettingsStack', { screen: 'Add Image' })
                }
              />
            ) : null}
          </ScrollView>
        ) : (
          <TouchableOpacity
            style={styles.imagePlaceholderContainer}
            onPress={() =>
              navigation.navigate('SettingsStack', { screen: 'Add Image' })
            }
          >
            <Icon name="ios-image" color={colors.green} size={100} />
            <Text style={styles.text1}>Tap to upload image(s)</Text>
            <Text style={styles.text2}>You can post up to 10 images</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={{ width: '100%' }}
          onPress={() =>
            navigation.navigate('SettingsStack', { screen: 'Add Location' })
          }
        >
          <View pointerEvents="none">
            <TextInput
              style={styles.input}
              placeholder="Add Location"
              placeholderTextColor={colors.purple}
              value={location?.description}
            />
          </View>
        </TouchableOpacity>

        <TextInput
          style={[styles.input, { height: hp(243), textAlignVertical: 'top' }]}
          multiline
          placeholder="Type your caption"
          placeholderTextColor={colors.purple}
          onChangeText={text => setCaption(text)}
        />

        <View
          style={{
            marginVertical: 10,
            width: '100%',
          }}
        >
          <Button
            title="Post"
            style={{ backgroundColor: colors.green, width: '100%' }}
            containerStyle={{
              padding: 5,
            }}
            disabled={images.length < 1 || loading}
            buttonStyle={{
              backgroundColor:
                images.length < 1 || loading
                  ? colors.green_disabled
                  : colors.green,
              width: '100%',
              borderRadius: 15,
            }}
            disabledStyle={{ backgroundColor: colors.green_disabled }}
            onPress={_addContent}
            loading={loading}
          />
        </View>
      </ScrollView>
    </ScrollView>
  );
};

const mapStateToProps = state => {
  const settings = state.Settings;
  return { settings };
};

export default connect(mapStateToProps, { addContent })(CreateContent);

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: colors.bg_black,
    flex: 1,
  },
  imagePlaceholderContainer: {
    width: '100%',
    backgroundColor: colors.green_opacity,
    borderColor: colors.green,
    borderRadius: 15,
    borderWidth: 1,
    borderStyle: 'dashed',
    height: 186,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text1: {
    color: colors.purple,
    fontSize: wp(16),
  },
  text2: {
    color: '#6671A6',
    fontSize: wp(12),
  },
  iconContainer: {
    borderRadius: 12,
    padding: 5,
    backgroundColor: colors.bg_grey_opacity,
    alignItems: 'center',
    justifyContent: 'center',
  },
  postButton: {
    color: colors.green,
    fontSize: wp(14),
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: colors.border_black,
    width: '100%',
    borderWidth: 1,
    borderColor: colors.bg_grey,
    marginVertical: 12,
    borderRadius: 15,
    paddingLeft: 10,
    padding: 7,
    fontSize: wp(16),
    color: colors.purple,
  },
});
