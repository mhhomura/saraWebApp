import styled from "styled-components";
import { makeStyles } from '@material-ui/core/styles';

export const Container = styled.div`

`;

export const Body = styled.div`
    background-color: #F3F7FF;
    padding: 50px 50px;
`;
export const Block = styled.div`
    background: #FFFFFF;
    border: 1px solid #D0DAED;
    border-radius: 3px;
    opacity: 1;
    width: 100%;
    border-radius: 3px;
`;

export const Line = styled.div`
    padding: 0 20px;
    display: flex;
`;

export const Line2 = styled.div`
    padding: 0 20px;
    padding-bottom: 10px ;
`;
export const BTN = styled.div`
    padding: 0 20px;
    padding-bottom: 10px ;
    display: flex;
    align-items: right;
    justify-content: flex-end;
`;
export const Text = styled.div`
    padding: 15px 15px;
    text-align: left;
    font: normal normal 600 15px/22px ;
    letter-spacing: 0px;
    color: #6E6E6E;
    opacity: 1;
`;
export const InputArea = styled.div` 
    height: 185px;
   
`;

export const UseStyle = makeStyles((theme) => ({
    modal: {
        backgroundColor: "#F3F7FF ",
        boxShadow: "0px 14px 32px #00000040",
        borderRadius: "10px",
        opacity: "1",
        maxWidth: "649px",
        alignContent: "center",
        alignItems: "center",

    },
    backgroundColor: {
        backgroundColor: "#F3F7FF ",
    },
    input: {
        flex: 1,
        background: "#FFFFFF",
        border: " 2px solid #D0DAED",
        borderRadius: "3px",
        opacity: "1",
        paddingLeft: "10px"
    },
    text: {
        font: "normal normal 600 15px/22px",
        letterSpacing: "0px",
        color: " #6E6E6E",
        opacity: "1",
    },
    icom: {
        font: "normal normal 600 12px/15px",
        letterSpacing: "0px",
        color: " #0F7BFF",
        opacity: "1",
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
            color: "#1EA2F7"
        },
    },
    textArea: {
        width: '100%',
        outilene: 0,
        backgroundColor: '#FFFFFF ',
        fontSize: '15px',
        color: '#4a4a4a',
        padding: '15px',
        overflow: "scroll",
    },

    btn: {
        background: 'linear-gradient(45deg, #0294FF 50%, #0294FF  90%)',
        border: 0,
        color: '#FFFFFF',
        width: "30px",
        height: "45px",
        borderRadius: "5px",
        boxShadow: '0 3px 5px 2px rgba(25, 28, 26, .3)',
    }

}));

export const StyledImput = styled.input`

`;