import {
    FETCH_TODOS_REQUEST,
    FETCH_TODOS_SUCCESS,
    FETCH_TODOS_FAILURE,
    CHANGE_TODO_STATUS_SUCCESS
} from '../actions/types';
const init = {
    todos: []
}

export default (state = init, action) => {
    switch (action.type) {
        case FETCH_TODOS_REQUEST:
            return state;
        case FETCH_TODOS_SUCCESS:
            return { ...state, todos: action.payload };
        case FETCH_TODOS_FAILURE:
            return state;
        case CHANGE_TODO_STATUS_SUCCESS: {
            let index = state.todos.findIndex(t => t.id === action.payload.id);
            let item = state.todos[index];
            item.completed = action.payload.newStatus;
            state.todos.splice(index, 1, item);
            return { ...state, todos: [...state.todos] };
        }
        default:
            return state;
    }
}