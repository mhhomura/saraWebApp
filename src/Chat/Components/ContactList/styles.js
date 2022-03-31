import styled from "styled-components";
import { makeStyles } from '@material-ui/core/styles';

export const Container = styled.div`
    overflow-y: scroll;
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
`;
export const ChatName = styled.div`
    font-size: 17px;
    color: #000;
    display: flex;
    width: 80%;
    >p{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin: 0;

    }
`;
export const ChatDate = styled.div`
    font-size: 1rem;
    display: flex;
    flex-direction: 'row';
    justify-content: 'space-between';
    width: 4vw;
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

export const UseStyle = makeStyles((theme) => ({
    root: {
        backgroundColor: '#F2F7FD ',
        '&:hover': {
            backgroundColor: '#EBEBEB ',
        },
    },

}));
