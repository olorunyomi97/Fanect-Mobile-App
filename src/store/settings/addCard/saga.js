import { call, put, takeLatest } from 'redux-saga/effects';
import { addNewCard } from '../../../helpers/backend_helper';

import { addNewCardSuccess, addNewCardFailure } from './actions';
import { ADD_NEW_CARD } from './actionTypes';
import { show_toast_notifications } from '../../../helpers/notifications';

function* doAddNewCard(action) {
    console.log('action from adding new card', action);

    try {
        yield call(addNewCard, action.payload);
        yield put(addNewCardSuccess());
        show_toast_notifications('support successfully logged', 'success');
    }   catch (error) {
        yield put(addNewCardFailure());
        show_toast_notifications(error.response?.data?.error?.message, 'error');
    }
}

function* AddNewCardSaga() {
    yield takeLatest(ADD_NEW_CARD.REQUEST, doAddNewCard);
}

export default AddNewCardSaga;