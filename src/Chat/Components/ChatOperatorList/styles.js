import styled from "styled-components";
import { makeStyles } from '@material-ui/core/styles';

export const Container = styled.div`
`;

export const ChatList = styled.div`
    display: flex;
    align-items: center;
    height: 90px;
    &:hover{
        background-color: #f5f5f5 ;
    }
`;
export const ChatLines = styled.div`
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-bottom: 1px solid #EAF1FC ;
    padding-right: 15px;
    margin-left: 15px;
    flex-wrap: wrap;
    min-width: 0;
`;
export const ChatLine = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    >p{
        text-align: left;
font: normal normal normal 12px/12px Mulish;
letter-spacing: 0px;
color: #656565;
opacity: 1;

    }
`;
export const ChatName = styled.div`
    display: flex;
    width: 80%;
    >p{
        text-align: left;
        font: normal normal 600 15px/14px Mulish;
        letter-spacing: 0px;
        color: #434343;
        opacity: 1;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin: 0;

    }
`;
export const ChatDate = styled.div`
    font-size: 12px;
    color: #999;
    cursor: pointer;
`;
export const ChatMessage = styled.div`
    display: flex;
    width: 100%;
    >p{
        text-align: left;
        font: normal normal normal 13px/16px Mulish;
        letter-spacing: 0px;
        color: #6E6E6E;
        opacity: 1;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin: 0;

    }
`;

export const UseStyle = makeStyles((theme) => ({
    root: {
        backgroundColor: '#F2F7FD ',
        '&:hover': {
            backgroundColor: '#EBEBEB ',
        },
    },
    modal: {
        backgroundColor: "#F3F7FF ",
        boxShadow: "0px 14px 32px #00000040",
        borderRadius: "10px",
        opacity: "1",
        maxWidth: "649px",
        alignContent: "center",
        alignItems: "center",

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
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },

}));

export const Icone = styled.div`
    border: 2px solid #F5F6F7;
    border-radius: 60px;
    background-color: #f5f5f5 ;
    margin-left: 20px ;
    width: 46px;
    height: 46px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    flex-direction: column;
    text-align: center;
`;

export const Middle = styled.div`
>div{
    >h6{
        color: #0080FC;
    }
    >p{
        color: #4E4E4E;
    }
};
>label{
    color: #6E6E6E;
}
`;
export const Top = styled.div`
    padding-bottom: 15px ;
    >h3{
        color: #434343;
    }
`;


export const Bottom = styled.div`
    display: flex;
    align-items: flex-end;
    float: right;
    >div{
        padding: 15px 5px;
    }
`;
