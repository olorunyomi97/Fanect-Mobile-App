import { all, fork } from 'redux-saga/effects';

//public
import LoginSaga from './auth/login/saga';
import RegisterSaga from './auth/register/saga';
import CelebritySaga from './celebrities/saga';
import ProfileSaga from './profile/saga';
import SubscriptionSaga from './subscriptions/saga';
import ForgotPasswordSaga from './auth/forgetpwd/saga';
import ResetPasswordSaga from './auth/resetpwd/saga';
import storySaga from './story/saga';
import VerificationSaga from './auth/verification/saga';
import UpdateProfileSaga from './updateProfile/saga';
import ChangeEmailSaga from './settings/changeEmail/saga';
import ChangePasswordSaga from './settings/changePassword/saga';
import WriteToSupportSaga from './settings/writeToSupport/saga';
import AddNewCardSaga from './settings/addCard/saga';
import VerifyChangeEmailSaga from './settings/verifyChangeEmail/saga';
import DeactivateProfileSaga from './settings/deactivateProfile/saga';
import FeedSaga from './feed/saga';
import StoriesSaga from './stories/saga';
import CreateReportSaga from './report/saga';
import AddContentSaga from './content/celebrity/saga';
import InitiateTransactionSaga from './transactions/initiateTransaction/saga';
import CompleteTransactionSaga from './transactions/completeTransaction/saga';
import liveStreamSaga from './livestream/saga';
import SubscribeToCelebSaga from './subscribe/subscribe/saga';
import BuySubscriptionSaga from './subscribe/buySubscriptions/saga';
import GetUserContentSaga from './getUserContent/saga';
import DeleteUserContentSaga from './getUserContent/deleteUserContent/saga';
import SetSubscriptionPriceSaga from './subscriptionPrice/saga';
import EditContentSaga from './editContent/saga';
import PaymentHistorySaga from './paymentHistory/saga';
import CelebrityContentSaga from './getCelebrityContent/saga';
import ToggleLikeSaga from './toggleLike/saga';
import AddCommentSaga from './comment/saga';
import EarningsHistorySaga from './earningsHistory/saga';
import GetUserSaga from './getUser/saga';
import UpdateFcmSaga from './updateFcmToken/saga';
import ToggleNotificationSaga from './settings/notifications/saga';
import NotificationSaga from './notification/saga';
import TermsSaga from './Terms/saga';

export default function* rootSaga() {
  yield all([
    fork(LoginSaga),
    fork(RegisterSaga),
    fork(ProfileSaga),
    fork(CelebritySaga),
    fork(SubscriptionSaga),
    fork(ForgotPasswordSaga),
    fork(ResetPasswordSaga),
    fork(VerificationSaga),
    fork(UpdateProfileSaga),
    fork(ChangeEmailSaga),
    fork(ChangePasswordSaga),
    fork(WriteToSupportSaga),
    fork(AddNewCardSaga),
    fork(DeactivateProfileSaga),
    fork(VerifyChangeEmailSaga),
    fork(FeedSaga),
    fork(storySaga),
    fork(StoriesSaga),
    fork(CreateReportSaga),
    fork(AddContentSaga),
    fork(InitiateTransactionSaga),
    fork(CompleteTransactionSaga),
    fork(liveStreamSaga),
    fork(SubscribeToCelebSaga),
    fork(BuySubscriptionSaga),
    fork(GetUserContentSaga),
    fork(DeleteUserContentSaga),
    fork(SetSubscriptionPriceSaga),
    fork(EditContentSaga),
    fork(PaymentHistorySaga),
    fork(CelebrityContentSaga),
    fork(ToggleLikeSaga),
    fork(AddCommentSaga),
    fork(EarningsHistorySaga),
    fork(GetUserSaga),
    fork(UpdateFcmSaga),
    fork(ToggleNotificationSaga),
    fork(NotificationSaga),
    fork(TermsSaga),
  ]);
}
