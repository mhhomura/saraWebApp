import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Privateroute from '../Hooks/auth';
import Layout from '../Common/Components/Layouts';
import Dashboard from '../Common/Pages/Dashboard';
import Campaigns from '../Launch/Pages/Campaigns';
import Authenticate from '../Common/Pages/Authenticate';
import MyNumbers from '../Common/Pages/MyNumbers';
import FunnelSteps from '../Launch/Pages/FunnelSteps';
import Not_Authorized from '../Common/Pages/Not_Authorized'
import Login from '../Common/Pages/Auth';
import NoMatch from '../Common/Pages/404';
import JoinScreen from '../Launch/Pages/Join_Secreen';
import Groups from '../Launch/Pages/Groups';
import AdminDashboard from '../Admin/Pages/AdminDashboard';



const AppRoutes = () => (
    <Layout>
        <Switch  >
            <Route exact path="/authenticate/:user_id/" component={Login} />
            <Privateroute exact path="/authenticate" component={Authenticate} />
            <Privateroute exact path="/dashboard" component={Dashboard} />
            <Privateroute exact path="/campaigns/:id/detail" component={Campaigns} />
            <Privateroute exact path="/campaigns/:id/groups" component={Groups} />
            <Privateroute exact path="/myNumbers" component={MyNumbers} />
            <Privateroute exact path="/funnelSteps/:id" component={FunnelSteps} />
            {/* Atendimento */}
            <Privateroute exact path="/adminDashboard/:id" component={AdminDashboard} />
            <Route exact path="/campaign/:hash/invite" component={JoinScreen} />
            <Route exact path="/not_authorized" component={Not_Authorized} />
            <Route component={NoMatch} />
        </Switch>
    </Layout>



);

export default AppRoutes;