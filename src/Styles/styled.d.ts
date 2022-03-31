import 'styled-components';

declare module 'styled-components'{
    export interface DefaultTheme {
        title: string;

    color: {
        primary: string;
        secondary: string;
        tertiary: string;

        white: string;
        black: string;
        gary: string;

        success: string;
        info: string;
        warning: string;
        img:     string;
        p:      string;
    },

    size:{
        bg: string;
        md: string;
        sm: string;
    },
    
    }
}