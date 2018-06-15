import { domainName } from './config';
import { Token } from '../domain/token';

export function signup(email) {
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
            if(!res.user) throw new Error(res.error.message);

            Token.value = res.user.token;
            return true;
        });
}

function builHeaders() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
}