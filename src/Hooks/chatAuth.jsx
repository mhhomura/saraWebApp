import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import WS from '../ws';

const isAuth = () => {
    if (sessionStorage.getItem('operator_token') !== null) {
        if (!WS.initialized) {
            WS.init(sessionStorage.getItem('operator_token'), true);
        }
        return true
    }
    return false;
};


const PrivateRouteChat = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props =>
                isAuth() ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/not_authorized',
                            state: { message: 'Usuário não autorizado' }
                        }}
                    />
                )}
        />
    );
}

export default PrivateRouteChat;