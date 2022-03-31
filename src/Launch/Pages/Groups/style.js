import styled from 'styled-components'

export const Container = styled.div`

`;

export const Card8 = styled.div`
    width: 100%;
    height: 75vh;
    align-items: center;
    opacity: 1;
    background-color: white;
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 5px;
    opacity: 1;
    list-style: none;
    transition: all .3s;
`;

export const TitleBtn = styled.div`
    align-content: space-between;
    padding: 10px 10px;
    border-bottom: 1px solid ${props => props.theme.color.gary};
    box-shadow: 0px 3px 6px #00000029;
    display: flex;
`;

export const Right = styled.div`
    width: 50%;
    text-align: right;
    align-items: right;
`;

export const Left = styled.div`
    width: 50%;
    text-align: left;
    align-items: left;
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
export const Line = styled.div`
  display: flex;
  height: 56px;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid rgba(25, 28, 26, .3);
  /* box-shadow: 0 1px 5px 1px  rgba(25, 28, 26, .3); */
`;