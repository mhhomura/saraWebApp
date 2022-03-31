import styled from 'styled-components';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const Container = styled.div`
    align-items: center;
`;
export const Content = styled.div`
   padding-top: 50px;
   width: 100%;
   height: 100%;  
`;
export const Controller = styled.div`
    padding: 0px;
    display: flex;
    align-items: right;
    justify-content: flex-end;
`;

export const Btn1 = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    color: ${props => props.theme.color.white};
`;
export const Btn2 = styled.div`
  display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
`;
export const Card = styled.div`
    background-color: white;
    width: 100%;
    padding-left: 10px;
    display: flex;
    opacity: 1;
    height: 100%;
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 5px;
    opacity: 1;
    cursor: pointer;
    transition: all .3s;
    align-items: center;
    text-align: center;
    
    > p {
      text-align: center;
      font-size: 15px;
      font-family: 'Mulish' sans-serif;
      letter-spacing: 0px;
      color: #333333;
      opacity: 1; 
      padding-left: 50px;
    };
`;
export const Card5 = styled.div`
    background-color: white; 
    opacity: 1;
    height: 548px;
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 5px;
    opacity: 1;
    list-style: none;
    cursor: pointer;
    transition: all .3s;
    > div {
      width: 100%;
    
     
    }
`;
export const Card6 = styled.div`
    width: 100%;
    align-items: center;
    opacity: 1;
    background-color: white;
    height: 548px;
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 5px;
    opacity: 1;
    list-style: none;
    cursor: pointer;
    transition: all .3s;

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
export const Card7 = styled.div`
    width: 100%;
    align-items: center;
    opacity: 1;
    background-color: white;
    height: 455px;
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 5px;
    opacity: 1;
    list-style: none;
    cursor: pointer;
    transition: all .3s;
    height: calc(100vh - 50px);
    padding-bottom: 35px;
      
`;

export const ContentC7 = styled.div`
   width: 100%;
   
    > div {
      overflow-y: scroll;
    
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
    }
`;

export const ContentC7b = styled.div`
   width: 100%;
   height: 95%;
   
      overflow-y: scroll;
    
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

export const Card8 = styled.div`
    width: 100%;
    align-items: center;
    opacity: 1;
    background-color: white;
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 5px;
    opacity: 1;
    list-style: none;
    transition: all .3s;
`;
export const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingRight: '50px',
    },
    alert: {
      width: '50',
      height: '35',
      background: 'linear-gradient(45deg,#0294FF 30%, #7E1AFD 90%)',
    }
  }),
);

export const Title = styled.div`
    text-align: left;
    padding-left: 10px;
    padding-top: 5px;
    border-bottom: 1px solid ${props => props.theme.color.gary};
    box-shadow: 0px 3px 6px #00000029;
    > h1 {
      letter-spacing: 0px;
      color: #333333;
      opacity: 1;
      font-family: 'Mulish' sans-serif;
      font-size: 20px;
    }

`;

export const TitleBtn = styled.div`
    text-align: right;
    align-items: right;
    padding: 10px 10px;
    border-bottom: 1px solid ${props => props.theme.color.gary};
    box-shadow: 0px 3px 6px #00000029;
`;

export const Body = styled.div`
  /* align-items: center;
  padding-right: 10px;
  border-bottom: 5px ${props => props.theme.color.secondary};
  box-shadow: 0px 5px 0px 0px${props => props.theme.color.secondary};
   */
  background-color: red;
  width: 100%;
`;

export const Display = styled.div`
  padding-top: 2%;
  width: 100%;
  height: 90%;
`;

export const CopyToClipBoard = styled.div`
   padding: 0px;
    display: flex;
    align-items: right;
    justify-content: flex-end;
    padding-bottom: 10px;
    font-size: 25px;
    color: green;
    > div {
      cursor: pointer;
    }
`;
export const thStyle = {
  /*  backgroundColor: 'red', */
  fontSize: '25px',
};

export const InfoSection = styled.div`
  flex: 1;
  height: 100%;
  padding-left: 20px;
  > div{
    width: 100%;
    height: 100%;
    padding-top: 15% ;
    text-align: left;
  }
`;

export const Section = styled.div`

@media(min-width: 1920px){
    width: 150px;
    height: 150px;
  }
  width: 100px;
  height: 100px;
  margin-top: 10%;
  > div {
      font-size: 30px;
      padding-top: 20px;
      color: white;
      align-items: center;
      text-align: center;
      border-radius: 100%;
      width: 85%;
      height: 85%;
    };
`;

export const Line = styled.div`
  display: flex;
  height: 56px;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid rgba(25, 28, 26, .3);
  /* box-shadow: 0 1px 5px 1px  rgba(25, 28, 26, .3); */
`;