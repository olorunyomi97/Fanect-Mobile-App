import { ADD_NEW_CARD } from './actionTypes';

const initialState = {
    loading: false,
  };

  const AddNewCard = (state = initialState, { type, payload }) => {
    switch (type) {
        case ADD_NEW_CARD.REQUEST:
          return { loading: true };
    
        case ADD_NEW_CARD.SUCCESS:
        case ADD_NEW_CARD.FAILURE:
          return { loading: false };
    
        default:
          return state;
      }
  }

  export default AddNewCard;
