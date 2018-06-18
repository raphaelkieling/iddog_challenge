import { domainName } from './config';
import * as actionSignup from '../actions/signup';
export function signup(email) {
    return dispatch => {
        let method = 'POST';
        let body = {
            email
        };

        return fetch(`${domainName}/signup`, {
            method,
            body: JSON.stringify(body),
            headers: builHeaders()
        })
            .then(res => res.json())
            .then(res => {
                if (!res.user) throw new Error(res.error.message);
                dispatch(actionSignup.setLogged(res.user.token));
                return res.user.token;
            });
    };
}

function builHeaders() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
}