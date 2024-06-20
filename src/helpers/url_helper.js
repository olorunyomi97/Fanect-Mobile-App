//AUTH
export const LOGIN_USER = 'auth/login';
export const REGISTER_USER = 'auth/register';
export const VERIFY_LOGIN_PAYLOAD = 'admin/verify_login';
export const VERIFY_REGISTER_OTP = `auth/verify_register_otp`;
export const VERIFY_RESET_PASS_OTP = `auth/verify_forgot_otp`;
export const RESEND_REGISTER_OTP = `auth/resend_otp`;
export const FORGOT_PASSWORD = `auth/forgot_password`;
export const RESET_PASSWORD = `auth/reset_user_password`;
export const CHANGE_EMAIL_RESEND_OTP = 'settings/resend_change_email_otp';
//PROFILE
export const GET_USER_PROFILE = 'profile/me';
export const GET_USER_SUBSCRIPTIONS = 'profile/get_subscriptions';
export const UPDATE_PROFILE = 'profile/update_profile';
export const DELETE_PROFILE_PIC = 'profile/delete_profile_pic';
export const UPDATE_PROFILE_PIC = 'profile/update_profile_picture';

//CELEBRITIES
export const GET_CELEBRITIES = `users/get_celebrities`;

//SUBSCRIPTIONS
export const SUBSCRIBE_TO_CELEBRITY = `subscriptions/subscribe_to_celebrity`;
export const UNSUBSCRIBE_FROM_CELEBRITY = `subscriptions/unsubscribe_from_celebrity`;
export const APPLY_GIFT_CODE = `subscriptions/apply_gift_code`;

export const POST_STORY = `posts/post_story`;

//Settings
export const CHANGE_EMAIL = 'settings/change_email';
export const CHANGE_PASSWORD = 'settings/change_password';
export const WRITE_TO_SUPPORT = 'support/write_support';
// export const ADD_NEW_CARD = 'support/write_support';
export const VERIFY_CHANGE_EMAIL = 'settings/verify_change_email_otp';
export const TOGGLE_NOTIFICATION = 'update_notification_settings';
export const DEACTIVATE_PROFILE = 'profile/deactivate_account';

// Privacy&Terms
export const GET_TERMS = 'profile/get_subscriptions';
export const GET_PRIVACY_POLICY = 'profile/get_subscriptions';

//Content
export const ADD_CONTENT = 'posts/post_content';
export const GET_CONTENT = 'feeds/get_my_feeds';
export const GET_POST = 'feeds/get_my_feeds/';
export const GET_STORIES = 'feeds/get_my_stories';
export const GET_USER_CONTENT = 'feeds/get_celebrity_content/';
export const DELETE_USER_CONTENT = 'posts/delete_content/';
export const EDIT_CONTENT = 'posts/edit_content/';
export const GET_CELEBRITY_CONTENT = 'feeds/get_celebrity_content/';

//Likes and Comments
export const TOGGLE_LIKE = 'posts/toggle_post_like/';
export const ADD_COMMENT = 'posts/add_comment/';
export const GET_POST_COMMENTS = 'posts/get_comments/';

//User
export const GET_USER = 'users/get_user/';
export const UPDATE_FCM_TOKEN = 'users/update_fcm_token';

//Reports
export const CREATE_REPORT = 'reports/send_report'

//Live stream
export const START_LIVE_URL = 'posts/start_livestream';
export const END_LIVE_URL = 'posts/end_livestream/';

//Transaction
export const INITIATE_TRANSACTION =
  'transactions/initialize_subscription_transaction';
export const COMPLETE_TRANSACTION =
  'transactions/complete_subscription_transaction';
export const PAYMENT_HISTORY = 'transactions/get_user_transactions';
export const GET_CELEB_EARNINGS = 'transactions/get_celebrity_earnings';

//Subscriptions
export const SUBSCRIBE_TO_CELEB = 'subscriptions/subscribe_to_celebrity';
export const BUY_SUBSCRIPTIONS = 'subscriptions/buy_subscriptions';
export const GET_SUBSCRIPTION_CODE_DETAILS =
  'subscriptions/get_subscription_by_giftcode';
export const SET_SUBSCRIPTION_PRICE = 'settings/set_supscription_price';
export const UNSUBSCRIBE_FROM_CELEB ='subscriptions/unsubscribe_from_celebrity';
export const CHECK_VALID_SUBSCRIPTION ='subscriptions/check_valid_subscription';

//notifications
export const GET_NOTIFICATION = 'notifications/get_my_notifications';
