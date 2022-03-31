import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';



export const Container = styled.div`
  width: 100%;
  height: auto;
  /* background: #F3F7FF; */
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

export const Side1 = styled.div`
    width: 50%;
    height: 50px;
    padding: 5px 5px;
    padding-right: 10px;
`;
export const Side2 = styled.div`
    width: 50%;
    height: 100%;
    padding: 5px 5px;
`;
export const Scroll = styled.div`
    height: 70vh;
    overflow: scroll;

    ::-webkit-scrollbar{
        width: 10px;
    }
    ::-webkit-scrollbar-thumb{
        background: linear-gradient(45deg, #0294FF 30%, #0AFFF7  90%);
        border-radius: 10px;
    }
    ::-webkit-scrollbar-track{
        background-color: ${props => props.theme.color.primary};
        border-radius: 10px;
    }
`;
