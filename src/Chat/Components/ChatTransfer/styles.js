import styled from "styled-components";
import { withStyles, makeStyles, createStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import TabList from '@material-ui/lab/TabList';
import Tab from '@material-ui/core/Tab';

export const Container = styled.div`

`;
export const Body = styled.div`
    height: 100%;
    width: 422px;
    background-color: #F7F8FA ;
    margin-bottom: 0;

    >span{
        background-color: #0080FC ;
    }
`;
export const List = styled.div`
    height: 65vh;
    width: 100%;
    background-color: #FFFFFF;
    border: 1px solid #E1E5EB;
    border-radius: 6px;
    overflow-y: auto;

    @media(min-width: 1920px){
        height: 80vh;
    }
   

`;

export const LightTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: "#F3F7FF",
        color: '#505050',
        boxShadow: theme.shadows[1],
        fontSize: '.9rem',
    },
}))(Tooltip);

export const useStyles = makeStyles((theme) =>
    createStyles({
        container: {
            paddingRight: '50px',
        },
        root: {
            flexGrow: 1,
            backgroundColor: '#E9EDF2',
        },
        TabPanelStyle: {
            /* backgroundColor: '#E9EDF2' */
        },
        AppBarStyle: {
            paddinTop: '0',
            marginBottom: '0',
            backgroundColor: '#F7F8FA',
            textAlign: 'center',
            alignItems: 'center',
            color: '#000',
            boxShadow: '0 0px 0px 0px',
            '& > span': {
                backgroundColor: '#0080FC',
            },
        },
        AppTab: {
            color: '#0080FC',

        }
    }),
);
export const TabListStyled = withStyles((theme) => ({
    indicator: {
        backgroundColor: '#0080FC',
    },
}))(TabList);

export const TabStyled = withStyles((theme) => ({

}))(Tab);