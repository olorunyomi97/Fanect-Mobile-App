import { combineReducers } from 'redux';

// Authentication
import Login from './auth/login/reducer';
import Register from './auth/register/reducer';
import Celebrities from './celebrities/reducer';
import Profile from './profile/reducer';
import Subscriptions from './subscriptions/reducer';
import ForgotPassword from './auth/forgetpwd/reducer';
import ResetPassword from './auth/resetpwd/reducer';
import Story from './story/reducer';

import Verification from './auth/verification/reducer';
import UpdateProfile from './updateProfile/reducer';
import Settings from './settings/reducer';
import AddContent from './content/celebrity/reducer';

//Content
import Feed from './feed/reducer';
import Post from './post/reducer';
import Stories from './stories/reducer';
import UserContent from './getUserContent/reducer';
import DeleteContent from './getUserContent/deleteUserContent/reducer';
import EditContent from './editContent/reducer';
import CelebrityContent from './getCelebrityContent/reducer';

//Report
import Report from './report/reducer';

//Transaction
import InitiateTransaction from './transactions/initiateTransaction/reducer';
import CompleteTransaction from './transactions/completeTransaction/reducer';
import EarningsHistory from './earningsHistory/reducer';

//Live Stream
import Livestream from './livestream/reducer';

//Subscriptions
import Subscribe from './subscribe/subscribe/reducer';
import BuySubscription from './subscribe/buySubscriptions/reducer';
import SetSubscriptionPrice from './subscriptionPrice/reducer';
import PaymentHistory from './paymentHistory/reducer';
// import EarningsHistory from './earningsHistory/reducer';

//Likes and Comments
import ToggleLike from './toggleLike/reducer';
import Comment from './comment/reducer';

//User
import User from './getUser/reducer';
import UpdateFcmToken from './updateFcmToken/reducer';

//Notification
import Notification from './notification/reducer';

//Settings
import ToggleNotifications from './settings/notifications/reducer';

const rootReducer = combineReducers({
  //public
  Login,
  Profile,
  Celebrities,
  Subscriptions,
  Register,
  ForgotPassword,
  ResetPassword,
  Verification,
  UpdateProfile,
  Settings,
  Feed,
  Post,
  Story,
  Stories,
  Report,
  AddContent,
  InitiateTransaction,
  CompleteTransaction,
  Livestream,
  Subscribe,
  BuySubscription,
  UserContent,
  DeleteContent,
  SetSubscriptionPrice,
  EditContent,
  PaymentHistory,
  CelebrityContent,
  ToggleLike,
  Comment,
  EarningsHistory,
  User,
  UpdateFcmToken,
  Notification,
  ToggleNotifications,
});

export default rootReducer;
