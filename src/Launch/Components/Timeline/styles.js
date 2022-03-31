import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

export const Container = styled.div`
    align-items: center;
    width: 100%;
    height: 100%;
    padding-left: 10px;
    padding-bottom: 25px;
    padding-top: 25px;

`;
export const useStyles = makeStyles((theme) => ({
    paper: {
        padding: '6px 16px',
        
    },
    secondaryTail: {
        backgroundColor: theme.palette.secondary.main,
    },
}));

export const Div = styled.div`
    
`;
export const FormGroup = styled.div`
    width: 30vmax;
    
`;

export const Label = styled.div`
    padding-top: 15px;
    padding-bottom: 0px;
    
`;
export const Side1 = styled.div`
    width: 50%;
    height: 50px;
    padding-left: 20px;
`;
export const Side2 = styled.div`
    width: 50%;
    height: 100%;
    padding: 5px 5px;
`;
export const Content = styled.div`
    display: flex;
    width: 100%;
    height: 350px;
    flex-direction: row;

  overflow: scroll;
`;

export const DivDate = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
`;

export const EmojiPicker = styled.div`
    text-align: right;
    > button {
        font-size: 20px;
    }
`;
export const Form = styled.div`
    width: 100%;    
   
`;