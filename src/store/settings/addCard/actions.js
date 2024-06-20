import { ADD_NEW_CARD } from './actionTypes';

export const addNewCard = new_card => {
    return {
        type: ADD_NEW_CARD.REQUEST,
        payload: new_card,
    };
};

export const addNewCardSuccess = () => {
    return {
        type: ADD_NEW_CARD.SUCCESS,
    }
}

export const addNewCardFailure = () => {
    return {
        type: ADD_NEW_CARD.FAILURE,
    }
}