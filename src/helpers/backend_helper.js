import axios from 'axios';
import { post, del, get, put, postWithFetch, getToken } from './api_helper';
import * as url from './url_helper';

import accessToken from './jwt-token-access/accessToken';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fs from 'react-native-fs';

// Gets the logged in user data from local session
const getLoggedInUser = () => {
  const user = AsyncStorage.getItem('user');
  if (user) {
    return JSON.parse(user);
  }
  return null;
};
//Authentication
//is user is logged in
const postLoginUser = user => post(url.LOGIN_USER, user);
const postRegisterUser = user => post(url.REGISTER_USER, user);
const postForgotPassword = user => post(url.FORGOT_PASSWORD, user);
const postResetPassword = user => post(url.RESET_PASSWORD, user);

const postVerifyRegisterOtp = otp_data =>
  post(url.VERIFY_REGISTER_OTP, otp_data);
const postVerifyResetPasswordOtp = otp_data =>
  post(url.VERIFY_RESET_PASS_OTP, otp_data);

const postResendOtp = otp_data => post(url.RESEND_REGISTER_OTP, otp_data);
const postChangeEmailResendOtp = otp_data =>
  post(url.CHANGE_EMAIL_RESEND_OTP, otp_data);

//Profile
const fetchUserProfile = () => get(`${url.GET_USER_PROFILE}`);

const getUserSubscriptions = () => get(url.GET_USER_SUBSCRIPTIONS);
const updateProfile = data => {
  return put(url.UPDATE_PROFILE, data);
};
const deleteProfilePic = () => del(url.DELETE_PROFILE_PIC);

const updateProfilePic = data => {
  console.log('bdy', data);

  return put(url.UPDATE_PROFILE_PIC, data._parts, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

const getTokenn = async () => {
  return await AsyncStorage.getItem('token');
};

//Celebrites
const getFanectCelebrities = () => get(url.GET_CELEBRITIES);
const searchFanectCelebrities = params => {
  console.log(`${url.GET_CELEBRITIES}?search=${params}`);
  return get(`${url.GET_CELEBRITIES}?search=${params}`);
};

//Subscriptions
const subscribeToFanectCeleb = data => post(url.SUBSCRIBE_TO_CELEBRITY, data);
const unsubscribeFromFanectCeleb = data =>
  post(url.UNSUBSCRIBE_FROM_CELEBRITY, data);
const getSubscriptionCodeDetails = params => {
  console.log(params);
  return get(`${url.GET_SUBSCRIPTION_CODE_DETAILS}/${params}`);
};
const postApplyGiftCode = data => {
  post(url.APPLY_GIFT_CODE, data);
};

//Story
const postStory = data => postWithFetch(url.POST_STORY, data);

//Start Live Stream
const startLiveStream = data => get(url.START_LIVE_URL);
const endLiveStream = stream_id => get(url.END_LIVE_URL + stream_id);

//Settings
const changeEmail = data => put(url.CHANGE_EMAIL, data);
const changePassword = data => post(url.CHANGE_PASSWORD, data);
const writeToSupport = data => post(url.WRITE_TO_SUPPORT, data);
const verifyChangeEmail = data => post(url.VERIFY_CHANGE_EMAIL, data);
const addNewCard = data => post(url.ADD_NEW_CARD, data);
export const toggleNotifications = data => post(url.TOGGLE_NOTIFICATION, data);
const deactivateProfile = user => put(url.DEACTIVATE_PROFILE, user);

//Content
const addContent = data => {
  return post(url.ADD_CONTENT, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
// Terms And Privacy
// export const getTerms = () => get(url.GET_TERMS);
const getPrivacyTerms = () => get(url.GET_TERMS);
const getPolicy = () => get(url.GET_PRIVACY_POLICY);

//Content
export const getFeed = () => get(url.GET_CONTENT);
export const getPost = post_id => get(url.GET_POST + post_id);
export const getStories = () => get(url.GET_STORIES);
export const getUserContent = celebrityId =>
  get(url.GET_USER_CONTENT + celebrityId);
export const deleteUserContent = contentId =>
  del(url.DELETE_USER_CONTENT + contentId);
export const getCelebrityContent = celebrityId =>
  get(url.GET_CELEBRITY_CONTENT + celebrityId);

export const editContent = modifiedContent => {
  const formData = new FormData();

  modifiedContent.images.forEach(image => {
    if (image?.uri) {
      formData.append('file', {
        uri: image.uri,
        type: image.uri.includes('mp4') ? 'video/mp4' : 'image/jpg',
        name: 'image',
      });
    } else {
      formData.append('file', {
        uri: image,
        type: image.includes('mp4') ? 'video/mp4' : 'image/jpg',
        name: 'image',
      });
    }
  });

  if (modifiedContent?.caption) {
    formData.append('caption', modifiedContent.caption);
  }
  formData.append('alignment', 'left');
  formData.append('color', '#FFFFFF');

  return put(url.EDIT_CONTENT + modifiedContent.id, formData);
};

//Likes and Comments
export const toggleLike = postId => put(url.TOGGLE_LIKE + postId, {});
export const addComment = body =>
  post(url.ADD_COMMENT + body?.postId, body?.comment);
export const getPostComments = postId => get(url.GET_POST_COMMENTS + postId);

//User
export const getUser = userId => get(url.GET_USER + userId);
const updateFcmToken = async data => {
  return post(url.UPDATE_FCM_TOKEN, data);
};

//Report
export const createReport = data => post(url.CREATE_REPORT, data);

//Transactions
export const initiateTransaction = data => post(url.INITIATE_TRANSACTION, data);
export const completeTransaction = data => post(url.COMPLETE_TRANSACTION, data);
export const getPaymentHistory = () => get(url.PAYMENT_HISTORY);
export const getEarningsHistory = () => get(url.GET_CELEB_EARNINGS);

//Subscriptions
export const subscribeToCeleb = data => post(url.SUBSCRIBE_TO_CELEB, data);
export const buySubscriptions = data => post(url.BUY_SUBSCRIPTIONS, data);
export const setSubscriptionPrice = data =>
  put(url.SET_SUBSCRIPTION_PRICE, data);
// export const unsubscribeFromCeleb = data =>post(url.UNSUBSCRIBE_FROM_CELEB, data);
export const NewUnSubscribeFromCeleb = data => {
  console.log(data);
  post(url.UNSUBSCRIBE_FROM_CELEB, data);
};
export const checkValidSubscription = data =>
  post(url.CHECK_VALID_SUBSCRIPTION, data);

//NOTIFICATIONS
export const getNotifications = () => get(url.GET_NOTIFICATION);

export {
  postLoginUser,
  postRegisterUser,
  postForgotPassword,
  postResetPassword,
  postVerifyRegisterOtp,
  postVerifyResetPasswordOtp,
  postResendOtp,
  getLoggedInUser,
  fetchUserProfile,
  getUserSubscriptions,
  getFanectCelebrities,
  subscribeToFanectCeleb,
  getSubscriptionCodeDetails,
  searchFanectCelebrities,
  unsubscribeFromFanectCeleb,
  updateProfile,
  changePassword,
  changeEmail,
  postChangeEmailResendOtp,
  writeToSupport,
  addNewCard,
  deactivateProfile,
  verifyChangeEmail,
  getPrivacyTerms,
  getPolicy,
  deleteProfilePic,
  updateProfilePic,
  addContent,
  postStory,
  startLiveStream,
  endLiveStream,
  postApplyGiftCode,
  updateFcmToken,
};
