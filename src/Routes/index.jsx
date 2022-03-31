import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from './app.routes';
import ChatRotes from './chat.routes';

const Routes = () => (
    <BrowserRouter>
        {window.location.href.split('/')[3] === "attendant" ? <ChatRotes /> : <App />}
    </BrowserRouter>

);

export default Routes;