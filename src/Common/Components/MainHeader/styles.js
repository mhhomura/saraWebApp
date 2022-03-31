import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

export const Container = styled.div`
    grid-area: MH;
    color:  ${props => props.theme.color.white};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    border-bottom: 1px solid #D0DAED;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 0px 9px #26242424;
    opacity: 1;
`;

export const Right = styled.div`
    color:  ${props => props.theme.color.white};
    background: #FFFFFF 0% 0% no-repeat padding-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;

    

`;
export const Add = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    color: ${props => props.theme.color.white};
`;

export const Logo = styled.img`
    margin-left: 10px;
    height: 25px;
    cursor: pointer;
   
`;

export const Notify = styled.span`
     display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    margin-right: 15px;
    cursor: pointer;
`;
export const ImgProfile = styled.img`
    border-radius: 50px;
    height: 30px;
    width: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
   
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
