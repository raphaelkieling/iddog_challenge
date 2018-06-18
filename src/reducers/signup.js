import { SET_LOGGED } from '../actions/actionTypes';
import { Token } from '../utils/token';

let default_state = {
    logged: false
};


export function signup(state = default_state, action) {
    switch (action.type) {
        
        case SET_LOGGED:
            Token.value = action.payload;
            state.logged = !!Token.value;
            return state;

        default:
            return state;
    }
}