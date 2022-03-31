import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';


export const Container = styled.div`
  
`;
export const Form = styled.div`
    width: 100%;
`;
export const FormGroup = styled.div`
    width: 30vmax;
    
`;

export const Label = styled.div`
    padding-top: 15px;
    padding-bottom: 0px;
    
`;
export const Div = styled.div`
    display: flex;
    justify-content: space-between;
    
`;
export const Footer = styled.div`
    display: flex;
    padding-top: 15px;
    align-items: right;
    justify-content: flex-end;
    > div {
      flex-direction: row;
      padding-left: 10px;
   }
`;
export const useStyles = makeStyles((theme) => ({
    root: {
        width: 200,

    },
    margin: {
        height: theme.spacing(3),
    },
}));
export const Content = styled.div`
   /*  display: flex;
    width: 100%;
    height: 50%;
    flex-direction: row;
    overflow: scroll; */
    margin-left: 2%;
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

export const Upload = styled.div`
    display: flex;
`;

export const PreloadImg = styled.div`
    width: 20%;
    width: 20%;
    justify-content: flex-end;
`;
export const InputImport = styled.div`
    width: 100%;
    text-align: left;
    padding-top: 7%;
    flex-direction: initial;

`;
export const TabsOptions = styled.div`
    width: 98%;
`;