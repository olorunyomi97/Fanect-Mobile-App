import { EDIT_CONTENT } from './actionTypes';

const initialState = {
  loading: false,
};

const EditContentReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case EDIT_CONTENT.REQUEST:
      return { ...state, loading: true };

    case EDIT_CONTENT.SUCCESS:
    case EDIT_CONTENT.FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default EditContentReducer;
