import { combineReducers } from 'redux';
import ChangeEmail from './changeEmail/reducer';
import ChangePassword from './changePassword/reducer';
import WriteToSupport from './writeToSupport/reducer';
import AddNewCard from './addCard/reducer';
import VerifyChangeEmail from './verifyChangeEmail/reducer';
import DeactivateProfile from './deactivateProfile/reducer';

const Settings = combineReducers({
  ChangeEmail,
  ChangePassword,
  WriteToSupport,
  AddNewCard,
  VerifyChangeEmail,
  DeactivateProfile,
});

export default Settings;
