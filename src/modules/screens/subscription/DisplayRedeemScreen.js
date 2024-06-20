import React, { useState, useLayoutEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { AddImageButton } from '../../components/AddImageButton';
import { SelectedImage } from '../../components/SelectedImage';
import colors from '../../../helpers/colors';
import { useDispatch, useSelector } from 'react-redux';
import { editContent } from '../../../store/editContent/actions';

export const DisplayRedeemScreen = ({ route, navigation }) => {
  const post = route.params;

  console.log('edit content', post);

  const dispatch = useDispatch();

  const [images, setImages] = useState(post?.url || []);
  const [caption, setCaption] = useState(post?.caption);

  const { loading } = useSelector(state => state.EditContent);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        loading ? (
          <ActivityIndicator
            color={colors.green}
            size={wp(14)}
            style={{ marginRight: 10 }}
          />
        ) : (
          <TouchableOpacity onPress={_editContent} style={{ marginRight: 10 }}>
            <Text style={{ color: colors.green, fontSize: wp(14) }}>Done</Text>
          </TouchableOpacity>
        ),
    });
  }, [loading, navigation, caption, images]);

  const _editContent = () => {
    dispatch(editContent({ id: post?.id, images: images, caption: caption }));
  };

  const addImage = newImages => {
    setImages([...images, ...newImages]);
  };

  const onRemoveImage = imageToDel => {
    const isLocal = typeof imageToDel === 'object';

    if (isLocal) {
      setImages(images.filter(image => image?.uri !== imageToDel.uri));
    } else {
      setImages(images.filter(image => image !== imageToDel));
    }
  };

  return (
    <View style={styles.container}>
      <Text></Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ flexGrow: 0 }}
      >
        {images.length < 10 ? (
          <AddImageButton
            onAddImage={() =>
              navigation.navigate('EditContentStack', {
                screen: 'AddImageEdit',
                params: { images, setImage: addImage },
              })
            }
          />
        ) : null}
        <FlatList
          data={images}
          style={{ flexGrow: 0 }}
          horizontal
          renderItem={({ item }) => (
            <SelectedImage
              image={item}
              onDelete={image => console.log(image)}
              onDelete={onRemoveImage}
            />
          )}
        />
      </ScrollView>

      <View style={{ marginTop: 10 }}>
        <TextInput
          style={[styles.input, { height: hp(243), textAlignVertical: 'top' }]}
          multiline
          placeholder="Type your caption"
          placeholderTextColor={colors.purple}
          onChangeText={text => setCaption(text)}
          value={caption}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bg_black,
    flex: 1,
    padding: 15,
  },
  input: {
    backgroundColor: colors.border_black,
    width: '100%',
    borderWidth: 1,
    borderColor: colors.bg_grey,
    marginVertical: 12,
    borderRadius: 15,
    paddingLeft: 10,
    fontSize: wp(16),
    color: colors.purple,
  },
});
