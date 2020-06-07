import {
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE,
    FETCH_USERS_AVATARS_REQUEST,
    FETCH_USERS_AVATARS_SUCCESS,
    FETCH_USERS_AVATARS_FAILURE
} from '../actions/types';
const init = {
    users: [],
    avatars: []
}

export default (state = init, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUEST:
            return state;
        case FETCH_USERS_SUCCESS:
            return { ...state, users: action.payload };
        case FETCH_USERS_FAILURE:
            return state;
        case FETCH_USERS_AVATARS_REQUEST:
            return state;
        case FETCH_USERS_AVATARS_SUCCESS:
            return { ...state, avatars: action.payload };
        case FETCH_USERS_AVATARS_FAILURE:
            return state;
        default:
            return state
    }
}