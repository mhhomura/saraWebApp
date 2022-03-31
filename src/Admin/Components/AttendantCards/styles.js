import styled from 'styled-components';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Badge } from '@material-ui/core';

export const Container = styled.div``;

export const Dot = withStyles((theme) => ({
    badge: {
        backgroundColor: props => props.color,
        color: props => props.color,
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: '$ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    }
}))(Badge);

export const useStyles = makeStyles((theme) => ({
    green: {
        display: 'flex',
        position: 'absolute',
        top: '9px',
        right: '18px',
        '& > *': {
            margin: theme.spacing(0),
        },
    },
    gray: {
        display: 'flex',
        position: 'absolute',
        top: '9px',
        right: '18px',
        '& > *': {
            margin: theme.spacing(0),
        },
    },
}));


export const CardsAttendants = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 2rem;
    
    .cardOutline {
        width: 17rem;
        margin-right: 20px;
        margin-bottom: 20px;
        box-shadow: 0px 1px 1px #00000029;
        border: 1px solid #F5F5F5;
        border-radius: 6px;
    }

    .cardBody1{
        background: rgba(216, 226, 239, 0.13);
    }

    .cardTitle{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin: 0;
        width: 9rem;

        font-family: 'Lato';
        font-weight: bold;
    }

`;

export const CardTitleAvatar = styled.div`
    display: flex;
    color: ${(props) => props.variant === 'blue' ? '#0080FC' : 'rgba(137, 142, 141, 0.6)'};
    font-weight: bold;

    justify-content: left;
    align-items: baseline;
    
    .avatarExclusiveDiv{
        background: #FFFFFF 0% 0% no-repeat padding-box;
        border: 1px solid #D5E8FA;
        border-radius: 100%;
        
        height: 50px;
        width: 50px;
        
        margin-right: 10px;
        margin-left: 25px;
        
        text-align: center;
        padding-top: 5px;
    }
`;

export const CardButtons = styled.div`

    .editButton {
        width: 5.5rem;
        background-color: #5A5959;
        font-size: 0.8rem;
        border-radius: 5px 0px 0px 5px;
        box-shadow: 0.62px 0.79px 2px #1E120D1A;

        font-weight: 800;
    }

    .deleteButton {
        margin-left: 95px;
        color: #5A5959;
        cursor: pointer;
    }

    .copyButton {
        height: 33px;
        width: 30px;
        border-radius: 0px 5px 5px 0px;
        padding: 0;
        background-color: #676767;

        .copyIcon {
            transform: matrix(-0.5, 0.87, -0.87, -0.5, 0, 0);
        }
    }
`;