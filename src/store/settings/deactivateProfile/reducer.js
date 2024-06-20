import { DEACTIVATE_PROFILE, API_ERROR, DEACTIVATE_PROFILE_SUCCESS, DEACTIVATE_PROFILE_FAILURE } from "./actionTypes";

const initialState = {
    loading: false,
}

const DeactivateProfile = (state = initialState, action) => {
    switch (action.type) {
        case DEACTIVATE_PROFILE:
            return {
                ...state,
                loading: false,
            };
        case DEACTIVATE_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        case DEACTIVATE_PROFILE_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case API_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };

        default:
            return state;
    }

    // switch (type) {
    //     case DEACTIVATE_PROFILE.REQUEST:
    //       return { loading: true };
    
    //     case DEACTIVATE_PROFILE.SUCCESS:
    //       return { loading: false };
    
    //     case DEACTIVATE_PROFILE.FAILURE:
    //       return { loading: false };
    
    //     default:
    //       return state;
    //   }
}

export default DeactivateProfile;