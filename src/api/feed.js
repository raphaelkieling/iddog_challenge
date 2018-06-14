import { domainName } from './config';
import { Token } from '../domain/token';
import { toParameterUrl } from '../utils/parameter';

export function feed() {
    let method = 'GET'

    return fetch(`${domainName}/feed`, {
        method,
        headers: builHeaders()
    })
        .then(res => res.json())
        .then(res => {
            if (!res) throw new Error(res.error.message)
            return res;
        })
}

export function feedPerCategory(category) {
    let method = 'GET'

    return fetch(`${domainName}/feed?${toParameterUrl({ category })}`, {
        method,
        headers: builHeaders()
    })
        .then(res => res.json())
        .then(res => {
            if (!res) throw new Error(res.error.message)
            return res;
        })
}

function builHeaders() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `${Token.value}`)
    return headers;
}