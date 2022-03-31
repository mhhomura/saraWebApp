import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export const Container = styled.div`

`;
export const UseStyle = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
        width: '100%',
        maxWidth: '20vw',
        backgroundColor: theme.palette.background.paper,
    },
    roots: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
        width: '100%',
        maxWidth: '40vw',
        backgroundColor: theme.palette.background.paper,
    },
    Menu: {
        backgroundColor: '#0294FF',
        color: '#fff'
    },
    padding: {
        padding: '0 5px',
    }
}));

export const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

export const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

export const Box = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    width: 317px;
    height: 187px;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 0px 5px #26242459;
    border-radius: 10px;
    opacity: 1;

   
`;

export const Line = styled.div`
    padding: 10px;
    text-align: left;
    font: normal normal 500 15px/16px Mulish;
    letter-spacing: 0px;
    color: #434343;
    text-transform: capitalize;
    opacity: 1;
`;