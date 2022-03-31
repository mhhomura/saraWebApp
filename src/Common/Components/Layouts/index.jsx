import React from 'react';
import { Grid, } from './styles';
import MainHeader from '../MainHeader';
import Content from '../Content';
import Aside from '../Aside';



const Layout = ({ children }) => {
    return (
        <Grid>
            <MainHeader />

            <Content>
                {children}
            </Content>
            <Aside />
        </Grid>
    );
}

export default Layout;