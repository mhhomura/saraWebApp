import styled from "styled-components";
import { makeStyles } from '@material-ui/core/styles';

export const Container = styled.div`

`;

export const ChatList = styled.div`
    display: flex;
    cursor: pointer;
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
`;
export const ChatName = styled.div`
    font-size: 16px;
    color: #505050;
    display: flex;
    width: 80%;
    >p{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin: 0;
        font-weight: 600;
    }
`;
export const ChatDate = styled.div`
    font-size: 12px;
    color: #999;
`;
export const ChatMessage = styled.div`
    font-size: 14px;
    color: #999;
    display: flex;
    width: 100%;
    >p{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin: 0;

    }
`;

export const OperatorNameTag = styled.div`
    background: #FFFFFF;
    box-shadow: 0px 1px 0px #00000017;
    border: 1px solid #E6F1FF;
    border-radius: 3px;
    opacity: 1;
    padding: 2px 5px;

    font: normal normal 600 12px/18px Mulish;
    letter-spacing: 0px;
    color: #696565;
    opacity: 1;
    
`;

export const UseStyle = makeStyles((theme) => ({
    root: {
        backgroundColor: '#F2F7FD ',
        '&:hover': {
            backgroundColor: '#EBEBEB ',
        },
    },

}));