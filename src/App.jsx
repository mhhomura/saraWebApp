import React from 'react';
import { ThemeProvider } from 'styled-components'
import GlobalStyles from './Styles/GlobalStyles';
/* import dark from './Styles/themes/dark'; */
import light from './Styles/themes/light';
import Routes from './Routes';

const App = () => {
    return (
        <ThemeProvider theme={light} >

            <GlobalStyles />
            <Routes />

        </ThemeProvider>
    );
}

export default App;