import {
    FETCH_FEEDS_REQUEST,
    FETCH_FEEDS_SUCCESS,
    FETCH_FEEDS_FAILURE,
    DELETE_FEED_REQUEST,
    DELETE_FEED_SUCCESS,
    FETCH_FEED_COMMENTS_SUCCESS,
    FETCH_FEED_COMMENTS_REQUEST,
    FETCH_FEED_COMMENTS_FAILURE,
    POST_FEED_REQUEST,
    POST_FEED_SUCCESS,
    POST_FEED_FAILURE
} from '../actions/types';
const init = {
    feeds: [],
    comments: []
}

export default (state = init, action) => {
    switch (action.type) {
        case FETCH_FEEDS_REQUEST:
            state;
        case FETCH_FEEDS_SUCCESS:
            return { ...state, feeds: action.payload };
        case FETCH_FEEDS_FAILURE:
            return state;
        case DELETE_FEED_REQUEST:
            return state;
        case DELETE_FEED_SUCCESS:
            return { ...state, feeds: [...state.feeds.filter(f => f.id !== action.payload.id)] };
        case FETCH_FEED_COMMENTS_REQUEST:
            return state;
        case FETCH_FEED_COMMENTS_SUCCESS:
            return { ...state, comments: action.payload };
        case FETCH_FEED_COMMENTS_FAILURE:
            return state;
        case POST_FEED_REQUEST:
            return state;
        case POST_FEED_SUCCESS: {
            let index = state.feeds.findIndex(f => f.id === action.payload.id);
            if (index > -1)
                state.feeds.splice(index, 1, action.payload)
            else
                state.feeds = [action.payload, ...state.feeds];
            return { ...state, feeds: [...state.feeds] };
        }
        case POST_FEED_FAILURE:
            return state;
        default:
            return state;
    }
}