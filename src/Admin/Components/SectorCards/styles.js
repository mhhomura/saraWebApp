import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

export const Container = styled.div``;

export const CardsSectors = styled.div`
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
        border-radius: 5px;

        font-weight: 800;
    }

    .trashButton{
        margin-left: 125px;
        color: #5A5959;
        cursor: pointer;
    }

`;

export const RelatedOperators = styled.div`
    display: flex;
    margin-left: 1rem;
    margin-top: 0.688rem;
    width: 100%;
`;

export const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    avatar: {
        width: '25px',
        height: '25px',
        fontSize: '12px',
        fontFamily: 'Mulish',
        fontWeight: 'bold',
        backgroundColor: 'rgba(211, 219, 234, 0.6)',
        color: '#918686',
        marginRight: '2px'
    }
}));

export const WithoutOperators = styled.span`
    margin-top: 0.3rem;
    font-size: 14px;
    font-weight: bold;
    color: #918686;
`;