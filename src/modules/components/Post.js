import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
// import { Tooltip } from 'react-native-elements';
import AIcon from 'react-native-vector-icons/AntDesign';
import FIcon from 'react-native-vector-icons/Fontisto';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import EIcon from 'react-native-vector-icons/Entypo';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import { useSelector, useDispatch, connect } from 'react-redux';
import { createImageProgress } from 'react-native-image-progress';
import FastImage from 'react-native-fast-image';
import Swiper from 'react-native-swiper';
import * as Progress from 'react-native-progress';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import Tooltip from 'react-native-walkthrough-tooltip';
import Modal from 'react-native-modal';
import { Button } from 'react-native-elements';

import colors from '../../helpers/colors';
import { wp } from '../../helpers/scaler';
import { Comments } from './Comments';
import { ReportOptions } from './ReportOptions';
import { ReportCommentInput } from './ReportCommentInput';
import { reportOptions } from '../../helpers/constants';
import { createReport } from '../../store/report/actions';
import { ToolTipButton, ToolTipContentContainer } from '.';
import { deleteUserContent } from '../../store/getUserContent/deleteUserContent/actions';
import { useNavigation } from '@react-navigation/core';
import { toggleLike } from '../../store/toggleLike/actions';
import {
  addComment,
  clearPostComments,
  getPostComments,
} from '../../store/comment/actions';

const avatarIcon = require('../../assets/icons/avatar.png');

dayjs.extend(relativeTime);

const FImage = createImageProgress(FastImage);

const IconContainer = ({ children, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.iconContainer}>
    {children}
  </TouchableOpacity>
);

const DeletePostModal = ({ onDelete, onCancel }) => {
  return (
    <View
      style={{
        backgroundColor: '#313131',
        borderRadius: 30,
        padding: 15,
        alignItems: 'center',
      }}
    >
      <AIcon name="warning" color="red" size={wp(69)} />

      <Text style={{ marginVertical: 10, color: 'white', textAlign: 'center' }}>
        Are you sure you want to delete this content
      </Text>

      <View
        style={{
          width: '40%',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}
      >
        <Button
          // buttonStyle={[
          //   styles.btn_grey,
          //   { marginTop: 30, marginBottom: 0, width: 110 },
          // ]}
          title="Cancel"
          onPress={onCancel}
          buttonStyle={{
            backgroundColor: '#919191',
            borderRadius: 15,
            marginRight: 20,
          }}
        />
        <Button
          title="Delete"
          onPress={onDelete}
          buttonStyle={{ backgroundColor: '#D70812', borderRadius: 15 }}
        />
      </View>
    </View>
  );
};

const Post = ({
  post,
  loading,
  user_data,
  loadingLike,
  forUser,
  postComments,
  postCommentLoading,
}) => {
  const navigation = useNavigation();

  const [showTP, setShowTP] = useState(false);

  const { id, avatar, caption, created, url, username, celebrity_data } = post;

  const celebrity_details = celebrity_data[0] == undefined ? celebrity_data : celebrity_data[0];

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  if (url.includes(null) || typeof url[0] === 'object') {
    return null;
  }

  const login = useSelector(state => state.Login);

  const currUserId = login?.user_data?.user._id;

  const dispatch = useDispatch();
  // const { loading } = useSelector(state => state.Report);
  // const { user_data } = useSelector(state => state.Login);

  const [commentText, setCommentText] = useState('');
  const [reason, setReason] = useState(null);
  const [reasonContent, setReasonContent] = useState('');

  const [isLiked, setIsLiked] = useState(post?.user_liked);

  const [likeCount, setLikeCount] = useState(post?.likes.length);
  const [commentCount, setCommentCount] = useState(post?.comments.length);

  const reportContentModalRef = useRef(null);
  const commentModalRef = useRef(null);

  const openReportModal = () => reportContentModalRef.current?.open();
  const openCommentModal = () => commentModalRef.current?.open();

  const closeReportModal = () => reportContentModalRef.current?.close();

  const onSelectOption = reason => {
    setReason(reason);
  };

  const submitReport = () => {
    console.log(post);
    console.log({
      // user_id: user_data?._id,
      user_id: user_data?.user._id,
      report_reason: reason,
      report_content: reasonContent,
      is_content: true,
      is_user: false,
      reported_content_id: post?.id,
      reported_user_id: post?.celebrity_id,
    });

    dispatch(
      createReport(
        {
          // user_id: user_data?._id,
          user_id: user_data?.user._id,
          report_reason: reason,
          report_content: reasonContent,
          is_content: true,
          is_user: false,
          reported_content_id: post?.id,
          reported_user_id: post?.celebrity_id,
        },
        closeReportModal,
      ),
    );
  };

  const delContent = () => {
    dispatch(deleteUserContent(id));
  };

  const GeneralToolTipContent = () => {
    return (
      <ToolTipContentContainer>
        <ToolTipButton
          icon={<AIcon name="warning" color={colors.green} />}
          label="Report Content"
          onPress={() => {
            setShowTP(false);
            openReportModal();
          }}
        />
      </ToolTipContentContainer>
    );
  };

  const ForUserToolTipContent = () => {
    return (
      <ToolTipContentContainer>
        <ToolTipButton
          icon={<AIcon name="edit" color={colors.green} size={wp(14)} />}
          label="Edit Content"
          onPress={() => {
            setShowTP(false);
            navigation.navigate('EditContentStack', {
              screen: 'EditContent',
              params: post,
            });
          }}
        />
        <ToolTipButton
          icon={<FAIcon name="trash" color={colors.red} size={wp(14)} />}
          label="Delete Content"
          danger
          onPress={() => {
            setShowTP(false);
            setShowDeleteModal(true);
          }}
        />
      </ToolTipContentContainer>
    );
  };

  const postId = post?.id;

  const _toggleLike = () => {
    dispatch(toggleLike(postId));
    setIsLiked(!isLiked);

    if (!isLiked) {
      setLikeCount(likeCount + 1);
    } else {
      if (likeCount > 0) {
        setLikeCount(likeCount - 1);
      }
    }
  };

  const addCommentCb = () => {
    setCommentText('');
    setCommentCount(commentCount + 1);
  };

  const _addComment = () => {
    if (commentText.length > 1) {
      dispatch(addComment(postId, { comment: commentText }, addCommentCb));
    }
  };

  const _getPostComments = () => {
    console.log('post com chan', postId);
    dispatch(getPostComments(postId));
  };

  const _clearPostComments = () => {
    dispatch(clearPostComments());
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <TouchableOpacity
            onPress={() => {
              if (currUserId === celebrity_details?._id) {
                navigation.navigate('General', {
                  screen: 'Profile',
                });
              } else {
                navigation.navigate('DiscoverStack', {
                  screen: 'CelebrityProfile',
                  params: {
                    celebrity_id: celebrity_details._id,
                    new_click: true,
                    fromFeed: true,
                  },
                });
              }
            }}
            style={styles.mainProfileContainer}
          >
            <FastImage
              source={{ uri: celebrity_details.avatar }}
              style={styles.profilePic}
              fallback
              defaultSource={avatarIcon}
            />

            <View style={{ justifyContent: 'space-between', marginLeft: 10 }}>
              <Text style={styles.author}>{celebrity_details.username}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {/* {location ? (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <EIcon name="location-pin" color={colors.green} />
                    <Text style={styles.locationText}>{location}</Text>
                    <EIcon name="dot-single" color={colors.purple2} />
                  </View>
                ) : null} */}
                <Text style={styles.date}>{dayjs(created).fromNow()}</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* <Tooltip
            highlightColor="none"
            overlayColor="none"
            withPointer={false}
            backgroundColor={colors.border_black}
            // containerStyle={styles.toolTipContainerStyle}
            popover={
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <AIcon name="warning" color={colors.green} />
                <TouchableOpacity onPress={openReportModal}>
                  <Text style={styles.reportContentText}>Report Content</Text>
                </TouchableOpacity>
              </View>
            }
          >
            <Icon name="options-vertical" color="white" size={wp(20)} />
          </Tooltip> */}

          <Tooltip
            isVisible={showTP}
            content={
              forUser ? <ForUserToolTipContent /> : <GeneralToolTipContent />
            }
            placement="bottom"
            onClose={() => setShowTP(false)}
            contentStyle={{
              backgroundColor: colors.bg_black,
              shadowColor: 'rgba(255, 255, 255, 0.17)',
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.3,
              shadowRadius: 4.65,

              elevation: 8,
            }}
          >
            <TouchableOpacity onPress={() => setShowTP(true)}>
              <Icon name="options-vertical" color="white" size={wp(20)} />
            </TouchableOpacity>
          </Tooltip>
        </View>
        <View>
          <Swiper style={styles.swiperContainer} showsPagination={true}>
            {url.map(image => (
              <FImage
                source={{ uri: image }}
                // sorting out for video display //
                style={styles.postPic}
                indicator={Progress.Circle}
                indicatorProps={{
                  size: 20,
                  borderWidth: 0,
                  color: colors.green,
                  unfilledColor: colors.bg_black,
                  alignSelf: 'center',
                  justifyContent: 'center',
                }}
                resizeMode={FastImage.resizeMode.contain}
              />
            ))}
          </Swiper>
          {/* <Image source={postPic} style={styles.postPic} /> */}
        </View>

        {caption ? (
          <View style={styles.captionContainer}>
            <Text style={styles.caption}>{caption}</Text>
          </View>
        ) : null}

        <View style={styles.actionContainer}>
          <View style={styles.commentLikeContainer}>
            <View style={styles.iconValueContainer}>
              <IconContainer onPress={_toggleLike}>
                {isLiked ? (
                  <AIcon name="like2" color={colors.green} />
                ) : (
                  <AIcon name="like2" color="white" />
                )}
              </IconContainer>
              <Text style={styles.likeText}>{likeCount}</Text>
            </View>

            <View style={styles.iconValueContainer}>
              <IconContainer onPress={openCommentModal}>
                <FIcon name="commenting" color="white" />
              </IconContainer>
              <Text style={styles.commentText}>{commentCount}</Text>
            </View>
          </View>

          <View style={{ marginTop: 10 }}>
            <TextInput
              style={styles.input}
              placeholder="Add your comment"
              placeholderTextColor={colors.purple}
              onChangeText={text => setCommentText(text)}
              onEndEditing={_addComment}
              value={commentText}
            />
          </View>
        </View>
      </View>

      <Modal isVisible={showDeleteModal}>
        <DeletePostModal
          onCancel={() => setShowDeleteModal(false)}
          onDelete={() => {
            setShowDeleteModal(false);
            delContent();
          }}
        />
      </Modal>

      <Portal>
        <Modalize
          ref={reportContentModalRef}
          adjustToContentHeight
          onClose={() => setReason(null)}
        >
          <View>
            {reason ? (
              <ReportCommentInput
                user={username}
                reason={reason}
                setReason={setReasonContent}
                loading={loading}
                onSubmitReport={submitReport}
              />
            ) : (
              <ReportOptions
                reportOptions={reportOptions}
                onSelectOption={onSelectOption}
              />
            )}
          </View>
        </Modalize>

        <Modalize
          ref={commentModalRef}
          adjustToContentHeight
          onOpen={_getPostComments}
          onClosed={_clearPostComments}
        >
          <View>
            <Comments comments={postComments} loading={postCommentLoading} />
          </View>
        </Modalize>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.border_black,
    borderRadius: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  mainProfileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // width: '100%',
  },
  captionContainer: {
    paddingHorizontal: 15,
    paddingTop: 5,
  },
  caption: {
    fontSize: wp(14),
    color: 'white',
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  swiperContainer: {
    maxHeight: 300,
    // width: '100%',
  },
  postPicContainer: {
    // minHeight: 145,
  },
  postPic: {
    // height: 145,
    // width: '100%',
    // minHeight: '100%',
    resizeMode: 'cover',
    flexGrow: 1,
    backgroundColor: '#000000',
  },
  author: {
    fontSize: wp(14),
    color: 'white',
  },
  date: {
    fontSize: wp(12),
    color: 'white',
    opacity: 0.6,
  },
  actionContainer: {
    padding: 15,
  },
  iconValueContainer: {
    flexDirection: 'row',
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  commentLikeContainer: {
    flexDirection: 'row',
  },
  iconContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bg_grey_opacity,
    marginRight: 5,
  },
  likeText: {
    fontSize: wp(12),
    color: colors.green,
  },
  commentText: {
    fontSize: wp(12),
    color: 'white',
  },
  input: {
    borderColor: colors.bg_grey_opacity,
    borderWidth: 1,
    borderRadius: 15,
    paddingLeft: 10,
    color: colors.purple,
    paddingVertical: 10,
  },
  reportContentText: {
    fontSize: wp(14),
    color: 'white',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  locationText: {
    color: colors.green,
    fontSize: wp(12),
  },
  // toolTipContainerStyle: {
  //   shadowColor: 'white',
  //   shadowOffset: {
  //     width: 0,
  //     height: 3,
  //   },
  //   shadowOpacity: 0.29,
  //   shadowRadius: 4.65,

  //   elevation: 7,
  // },
});

const mapStateToProps = state => {
  const { loading } = state.Report;
  const { user_data } = state.Login;
  const { loadingLike } = state.ToggleLike;
  const { postComments, postCommentLoading } = state.Comment;

  return { loading, user_data, loadingLike, postComments, postCommentLoading };
};

export default connect(mapStateToProps)(Post);
