import styled from "styled-components";
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

export const Container = styled.div`

`;

export const Body = styled.div`
    width: 560px;
    height: 482px;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 8px #00000059;
    border-radius: 10px;
    opacity: 1;
`;
export const LightTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: "#F3F7FF",
        color: '#505050',
        boxShadow: theme.shadows[1],
        fontSize: '.9rem',
    },
}))(Tooltip);

export const Title = styled.div`
    padding: 10px;
    >h6{
        color: #434343;
        font-size: 18px;
    };
    >p{
        color: #656565;
        font-size: 14px;
    }
    >hr{
        border: 1px solid #CEDDF0;
    };
`;
export const Middle = styled.div`
    display: flex;
    justify-content: space-between;
    align-content: center:
    align-items: center;
    padding-bottom: 15px;
    padding-right: 15px;
    padding-left: 15px;
    >div{
        height: 35px;
    }
    &.search{
        
    }
`;
export const Tabs = styled.div`
    border-bottom: 1px solid #D0DAEDCC ;
    width: 50%;
    padding-right: 10px;
    display: flex;
    padding-left: 10px;
    >div{
        transition: all ease 0.1s;
        text-align: center;
        width: 60%;
        cursor: pointer;
    }
`;
export const ListSection = styled.div`
    border: 1px solid #DEE3EA;
    border-radius: 5px;
    height: 100%;
    flex: 1;
    overflow-y: scroll;
`;
export const Serach = styled.div`

    border: 1px solid #D0DAEDCC;
    border-radius: 5px;
    width: 45%;
    display: flex;
    >input{
        padding-left: 10px ;
    }
`;
export const Message = styled.div`
    padding: 15px;
    border-bottom: 1px solid #DEE3EA;
    cursor: pointer;
`;
export const Line1 = styled.div`
    display: flex;
    justify-content: space-between;
`;
export const Line2 = styled.div`
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