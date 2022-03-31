import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

export const Container = styled.div`
    grid-area: AS;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    border-right: 1px solid #D0DAED;
    box-shadow: 0px 0px 3px #26242424;
    opacity: 1;
    height: 100vh;
    width: 50px;
`;

export const Menu = styled.div`
    transition: all ease 0.3s;
    height: calc(100vh - 50px);
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 0px 3px #26242424;
    justify-content: space-between;
    display: flex;
    flex-direction: column;
   
`;

export const Btn = styled.div`
   
`;
export const UseStyle = makeStyles((theme) => ({
    iten: {
        color: '#A5B9D5',
        '&:hover': {
            color: '#0F7BFF',
        },
    },
}));

export const Iten = styled.div`
     display: flex;
     
    flex-direction: row;
    align-items: center;
    height: 60px;
    padding: 5%;
    color: #A5B9D5;
    font: normal normal 600 1rem/2rem Mulish;
    letter-spacing: 0px;
    cursor: pointer;
    &:hover{
        background: #F4F7FC;
        color: #0F7BFF;
    }
    >div {
        padding-left: 5%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        transition: all ease 0.2s;
    }
`;

export const Line = styled.div`

`;