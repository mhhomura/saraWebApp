import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

export const Container = styled.div`
`;
export const Div = styled.div`
 width: 1200px;
 height: 720px;

  @media(max-width: 1280px){
    overflow: scroll;
  }

  > h6 {
    font-family: 'Mulish';
    font-weight: bold;
  }
`;

export const Title = styled.div`
  margin-top: 5%;
  text-align: center;

  > h1{
    font-size: 150%;
     font-family: 'Mulish';
     font-weight: 800;
     color: ${props => props.theme.color.tertiary};
     padding-bottom: 35px;

  }
`;

export const SubDiv1 = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
  > h1{
     
  };
  > pre{
    font-size: 120%;
    font-family: 'Mulish';
  };
`;

export const SubDiv2 = styled.div`
padding-top: 40px;
  > h1{
    font-size: 150%;
     font-family: 'Mulish';
     padding-bottom: 35px;
  };
  > div{
    font-size: 120%;
     font-family: 'Mulish';
  };
`;

export const SubDiv3 = styled.div`
   width: 278px;
    height: 283px;
    background-color: #FCFCFC;
    box-shadow: 0px 8px 15px #00000040;
    border-radius: 30px;
    opacity: 1;
`;

export const QrCode = styled.div`
 width: 222px;
height: 221px;
    
`;


export const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 30,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  reload: {
    width: '200px',
    height: '200px',
    borderRadius: '100%',
    textAlign: 'center',
    backgroundColor: '#0294FF',
  },
  error: {
    width: '200px',
    height: '200px',
    borderRadius: '100%',
    textAlign: 'center',
    backgroundColor: '#FD1A5A'

  },
  center: {
    width: '150px',
    height: '100px',
    textAlign: 'center',
    color: 'white',
    paddingTop: '60px',
    paddingLeft: '50px',
    cursor: 'pointer'
  }
}));




