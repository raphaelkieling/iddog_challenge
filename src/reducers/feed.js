
import { ALL, CATEGORY, CLEAR_IMAGE, GET_IMAGE_ID } from '../actions/actionTypes';

let default_state = {
    categories: ['husky', 'labrador', 'hound', 'pug'],
    categorySelected: '',
    listPhotos: [],
    image: undefined
};

export function feed(state = default_state, action) {
    switch (action.type) {
        case ALL:
            state.categorySelected = action.payload.category;
            state.listPhotos = [...action.payload.list];
            return { ...state };

        case CATEGORY:
            state.categorySelected = action.payload.category;
            state.listPhotos = [...action.payload.list];
            return { ...state };

        case GET_IMAGE_ID:
            action.payload['href'] = state.listPhotos[action.payload.id];
            state.image = {...action.payload};
            return { ...state };

        case CLEAR_IMAGE:
            state.image = null;
            return { ...state };

        default:
            return state;
    }
}