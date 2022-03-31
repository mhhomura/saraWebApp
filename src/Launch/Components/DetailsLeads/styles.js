import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';


export const Container = styled.div`
  width: 100%;
  height: auto;
  
`;
export const Form = styled.div`
    width: 100%;
    padding: 15px;
`;
export const FormGroup = styled.div`
    width: 40vmax;
`;
export const Label = styled.div`
    padding-top: 15px;
    padding-bottom: 0px;  
`;
export const Footer = styled.div`
    display: flex;
    padding-top: 15px;
    padding-bottom: 15px;
    align-items: right;
    justify-content: flex-end;
    > div {
      flex-direction: row;
      padding-left: 10px;
   }
`;
export const UseStyles = makeStyles((theme) => ({
  root: {
    width: 200,

  },
  margin: {
    height: theme.spacing(3),
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12)',
    gridGap: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(1),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
}));

export const IconTrash = styled.div`
    padding-top: 10px;
    padding-right: 10px;
    color: red;
    cursor: pointer;
    font-size: 20px;
    height: 20%;

 `;

export const DivSwitch = styled.div`
  padding-left: 0px;
`;

export const DivTags = styled.div`
  padding-bottom: 10px;

  >div {
    cursor: pointer;
  }
`;

export const useSts = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(0),
    },
  },

}));

export const DivDescription = styled.div`
  height: 10vh;
  overflow-y: scroll;
`;