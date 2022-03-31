import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import WS from '../ws';
/* import axios_base from '../axios_base'; */

const isAuth = () => {
    if(sessionStorage.getItem('token') !== null) {
        if (!WS.initialized) {
            WS.init(sessionStorage.getItem('token'));
        }
        return true
    }
    return false;
};

const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        <Route 
            {...rest}
            render={props => 
            isAuth() ? (
                <Component {...props} />
            ): (
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

export default PrivateRoute;