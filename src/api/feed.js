import { domainName } from './config';
import { Token } from '../utils/token';
import { memoize_promise } from '../utils/memoize-promise';
import query from 'querystringify';
import * as feedAction from '../actions/feed';

export function feed(dispatch) {
    const feedRequisition = _ => {
        let method = 'GET';

        return fetch(`${domainName}/feed`, {
            method,
            headers: builHeaders()
        })
            .then(res => res.json())
            .then(res => {
                if (!res) throw new Error(res.error.message);

                dispatch(feedAction.all(res));
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
                if (!res) throw new Error(res.error.message);
                return res;
            });
    };
    return (dispatch) => {
        const memoized = memoize_promise(feedPerCategoryRequisition)(category);

        memoized.then((payload) => {
            dispatch(feedAction.perCategory(payload));
        });

        return memoized;
    };
}

function builHeaders() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `${Token.value}`);
    return headers;
}