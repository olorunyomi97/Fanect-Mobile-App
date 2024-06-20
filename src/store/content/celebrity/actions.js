import {
  ADD_CONTENT,
  ADD_LOCATION,
  CLEAR_ALL_DATA,
  REMOVE_IMAGE,
  ADD_IMAGE,
} from './actionTypes';

export const addContent = ({ images, caption }) => {
  console.log('actns', images, caption);
  return {
    type: ADD_CONTENT.REQUEST,
    payload: { images, caption },
  };
};

export const addContentSuccess = () => {
  return {
    type: ADD_CONTENT.SUCCESS,
  };
};

export const addContentFailure = () => {
  return {
    type: ADD_CONTENT.FAILURE,
  };
};

export const addImage = images => {
  return {
    type: ADD_IMAGE,
    payload: images,
  };
};

export const addLocation = location => {
  return {
    type: ADD_LOCATION,
    payload: location,
  };
};

export const removeImage = image => {
  return {
    type: REMOVE_IMAGE,
    payload: image,
  };
};

export const clearAllData = () => {
  console.log('clearing');
  return {
    type: CLEAR_ALL_DATA,
  };
};
