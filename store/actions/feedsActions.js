import {
    FETCH_FEEDS_REQUEST,
    FETCH_FEEDS_SUCCESS,
    DELETE_FEED_REQUEST,
    DELETE_FEED_SUCCESS,
    FETCH_FEED_COMMENTS_REQUEST,
    FETCH_FEED_COMMENTS_SUCCESS,
    FETCH_FEED_COMMENTS_FAILURE,
    DELETE_FEED_FAILURE,
    FETCH_FEEDS_FAILURE,
    POST_FEED_REQUEST,
    POST_FEED_SUCCESS,
    POST_FEED_FAILURE
} from './types';
import jsonPlaceholder from '../../apis/json-placeholder-api';

export const fetchFeeds = () => async dispatch => {
    dispatch({
        type: FETCH_FEEDS_REQUEST
    });
    await jsonPlaceholder.get('posts').then((response) => {
        dispatch({
            type: FETCH_FEEDS_SUCCESS,
            payload: response.data
        });
    }).catch((err) => {
        dispatch({
            type: FETCH_FEEDS_FAILURE
        })
    });
};

export const deleteFeed = (id) => async dispatch => {
    dispatch({
        type: DELETE_FEED_REQUEST
    });
    await jsonPlaceholder.delete(`posts/${id}`).then(() => {
        dispatch({
            type: DELETE_FEED_SUCCESS,
            payload: { id }
        });
    }).catch((err) => {
        dispatch({
            type: DELETE_FEED_FAILURE
        })
    });
};


export const fetchComments = (id) => async dispatch => {
    dispatch({
        type: FETCH_FEED_COMMENTS_REQUEST
    });
    await jsonPlaceholder.get(`comments`).then((response) => {
        dispatch({
            type: FETCH_FEED_COMMENTS_SUCCESS,
            payload: response.data
        });
    }).catch((err) => {
        dispatch({
            type: FETCH_FEED_COMMENTS_FAILURE
        })
    });
};

export const postFeed = (newFeed) => async dispatch => {
    dispatch({
        type: POST_FEED_REQUEST
    });
    await jsonPlaceholder.post(`posts`).then((response) => {
        dispatch({
            type: POST_FEED_SUCCESS,
            payload: { id: response.data.id, ...newFeed }
        });
    }).catch((err) => {
        dispatch({
            type: POST_FEED_FAILURE
        })
    });
};