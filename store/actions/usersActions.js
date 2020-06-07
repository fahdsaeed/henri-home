import {
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_AVATARS_REQUEST,
    FETCH_USERS_AVATARS_SUCCESS,
    FETCH_USERS_AVATARS_FAILURE,
    FETCH_USERS_FAILURE,
} from './types';
import jsonPlaceholder from '../../apis/json-placeholder-api';
import uiFaces from '../../apis/ui-faces-api';

export const fetchUsers = () => async dispatch => {
    dispatch({
        type: FETCH_USERS_REQUEST
    });
    await jsonPlaceholder.get('users').then((response) => {
        dispatch({
            type: FETCH_USERS_SUCCESS,
            payload: response.data
        });
    }).catch((err) => {
        dispatch({
            type: FETCH_USERS_FAILURE
        });
    });
};

export const fetchAvatars = (limit) => async dispatch => {
    dispatch({
        type: FETCH_USERS_AVATARS_REQUEST
    });
    await uiFaces.get(`/api?limit=${limit}`).then((response) => {
        dispatch({
            type: FETCH_USERS_AVATARS_SUCCESS,
            payload: response.data
        });
    }).catch((err) => {
        dispatch({
            type: FETCH_USERS_AVATARS_FAILURE
        });
    });
};