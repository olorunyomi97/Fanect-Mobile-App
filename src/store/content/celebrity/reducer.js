import {
  ADD_CONTENT,
  ADD_IMAGE,
  ADD_LOCATION,
  CLEAR_ALL_DATA,
  REMOVE_IMAGE,
} from './actionTypes';

const initialState = {
  loading: false,
  images: [],
  location: null,
};

const AddContent = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_CONTENT.REQUEST:
      return { ...state, loading: true };

    case ADD_CONTENT.SUCCESS:
    case ADD_CONTENT.FAILURE:
      return { ...state, loading: false };

    case ADD_IMAGE:
      return { ...state, images: payload };

    case ADD_LOCATION:
      return { ...state, location: payload };

    case REMOVE_IMAGE:
      return {
        ...state,
        images: [...state.images.filter(image => image.uri !== payload)],
      };

    case CLEAR_ALL_DATA:
      return {
        loading: false,
        images: [],
        location: null,
      };

    default:
      return state;
  }
};

export default AddContent;
