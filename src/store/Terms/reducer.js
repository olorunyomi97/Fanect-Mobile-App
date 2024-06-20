import { GET_TERMS_SUCCESS, API_ERROR, GET_TERMS, GET_PRIVACY_POLICY, GET_PRIVACY_POLICY_SUCCESS } from "./actionTypes";

const initialState = {
    error: null,
    loading: false,
    terms: [],
};

const Terms = (state = initialState, action) => {
    switch (action.type) {
        case GET_TERMS:
            return {
                ...state,
                loading: true,
                error: null,
            };
            
        case GET_TERMS_SUCCESS:
            return {
                ...state,
                loading: false,
                terms: action.payload
            };
        
        case GET_PRIVACY_POLICY:
            return {
                ...state,
                loading: true,
                error: null,
            };
            
        case GET_PRIVACY_POLICY_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        // case GET_PRIVACY_POLICY_SUCCESS:
        //     return {
        //         ...state,
        //         loading: false,
        //     };
        case API_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        default:
          return state;
      }
}

export default Terms;

