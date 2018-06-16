import { domainName } from './config';
import { Token } from '../domain/token';
import { memoize_promise } from '../utils/memoize-promise';
import query from 'querystringify';

export function feed() {
    const feedRequisition = _ => {
        let method = 'GET';

        return fetch(`${domainName}/feed`, {
            method,
            headers: builHeaders()
        })
            .then(res => res.json())
            .then(res => {
                if (!res) throw new Error(res.error.message);
                return res;
            });
    };

    return memoize_promise(feedRequisition)();
}

export function feedPerCategory(category) {
    const feedPerCategoryRequisition = (category) => {
        let method = 'GET';

        return fetch(`${domainName}/feed?${query.stringify({ category })}`, {
            method,
            headers: builHeaders()
        })
            .then(res => res.json())
            .then(res => {
                console.log('Entrei aqui');

                if (!res) throw new Error(res.error.message);
                return res;
            });
    };

    return memoize_promise(feedPerCategoryRequisition)(category);

}

function builHeaders() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `${Token.value}`);
    return headers;
}