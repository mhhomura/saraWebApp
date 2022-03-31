import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRouteChat from '../Hooks/chatAuth';
import AttendantLogin from '../Chat/Pages/AttendantLogin';
import Conversations from '../Chat/Pages/Conversations';
import Layout from '../Chat/Components/Layouts';
import Disconnected from '../Chat/Pages/Disconnected';
import Logout from '../Chat/Pages/Logout';

const ChatRoutes = () => (
    <Layout>
        <Switch>
            <Route exact path="/attendant/login/:access_code" component={AttendantLogin} />
            <PrivateRouteChat exact path="/attendant/chat" component={Conversations} />
            <Route exact path="/attendant/disconnected" component={Disconnected} />
            <Route exact path="/attendant/logout" component={Logout} />
        </Switch>
    </Layout>
);

export default ChatRoutes;
