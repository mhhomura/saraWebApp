import styled from "styled-components";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

export const Container = styled.div`
    
`;

export const Bottom = styled.div`
    display: flex;
    align-items: flex-end;
    float: right;
    >div{
        padding: 15px 5px;
    }
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
    textArea: {
        width: '100%',
        outilene: 0,
        backgroundColor: '#FFFFFF ',
        fontSize: '15px',
        color: '#4a4a4a',
        padding: '15px',
        overflow: "scroll",
    },
}));

export const LightTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: "#F3F7FF",
        color: '#505050',
        boxShadow: theme.shadows[1],
        fontSize: '.9rem',
    },
}))(Tooltip);
