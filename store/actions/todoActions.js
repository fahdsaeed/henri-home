import {
    FETCH_TODOS_REQUEST,
    FETCH_TODOS_SUCCESS,
    FETCH_TODOS_FAILURE,
    CHANGE_TODO_STATUS_REQUEST,
    CHANGE_TODO_STATUS_SUCCESS,
    CHANGE_TODO_STATUS_FAILURE
} from './types';
import jsonPlaceholder from '../../apis/json-placeholder-api';

export const fetchTodos = () => async dispatch => {
    dispatch({
        type: FETCH_TODOS_REQUEST
    });
    await jsonPlaceholder.get('todos').then((response) => {
        dispatch({
            type: FETCH_TODOS_SUCCESS,
            payload: response.data
        });
    }).catch((err) => {
        dispatch({
            type: FETCH_TODOS_FAILURE
        })
    });
};


export const changeStatus = (id, newStatus) => async dispatch => {
    dispatch({
        type: CHANGE_TODO_STATUS_REQUEST
    });
    dispatch({
        type: CHANGE_TODO_STATUS_SUCCESS,
        payload: { id, newStatus }
    });
};
