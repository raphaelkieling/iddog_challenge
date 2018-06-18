import { Token } from '../utils/token';
import { Route, Redirect } from 'react-router-dom';
import React from 'react';

export const RoutePrivate = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props =>
        !!Token.value ? (<Component {...props} />) : (<Redirect to={{ pathname: "/signup", state: { from: props.location } }} />)
    }
    />
);