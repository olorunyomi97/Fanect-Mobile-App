import { takeLatest, call, put } from '@redux-saga/core/effects';
import { apiError, getTermsSuccess, getPrivacyPolicySuccess } from './actions';
import { GET_TERMS, GET_PRIVACY_POLICY } from './actionTypes';
import { getPrivacyTerms, getPolicy } from '../../helpers/backend_helper';

function* doGetTerms() {
    try {
        const response = yield call(getPrivacyTerms);
        console.log('Terms & Conditions', JSON.stringify(response));
        yield put(getTermsSuccess(response));
    } catch (error) {
        console.log(error);
        yield put(apiError(error.message));
    }
}

function* doGetPrivacyPolicy() {
    try {
        const response = yield call(getPolicy);
        console.log('Privacy Policy', JSON.stringify(response));
        yield put(getPrivacyPolicySuccess(response.data));
    } catch (error) {
        console.log(error);
        yield put(apiError(error.message));
    }
}

function* TermsSaga() {
    yield takeLatest(GET_TERMS, doGetTerms);
    yield takeLatest(GET_PRIVACY_POLICY, doGetPrivacyPolicy);
}

export default TermsSaga;
