import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { DEACTIVATE_PROFILE } from './actionTypes';
import { apiError, deactivateProfileSuccess } from './action';
import * as RootNavigation from '../../../helpers/navigation_helper';

import { deactivateProfile } from '../../../helpers/backend_helper'; 
import { show_toast_notifications } from '../../../helpers/notifications';


function* doDeactivateProfile( { payload }) {
    try {
        console.log(payload, '<==== Profile Deactivation ====>')
        const response = yield call(deactivateProfile, payload);
        // clearAsync();
        // yield put(deactivateProfileSuccess(response.data))
        show_toast_notifications('Profile Deactivated Successfully', 'success');
        RootNavigation.navigate('Auth', { screen: 'Login' });
    } catch (error) {
        yield put(apiError(error));
        // show_toast_notifications(error.response?.data?.error?.message, 'error');
        // show_toast_notifications('Unable to deactivate this profile', 'error');
    }
}


function* DeactivateProfileSaga() {
    yield takeLatest(DEACTIVATE_PROFILE, doDeactivateProfile);
}

export default DeactivateProfileSaga;