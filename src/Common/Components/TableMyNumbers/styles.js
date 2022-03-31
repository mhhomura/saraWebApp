import styled from "styled-components";

export const Container = styled.div`
   width: 100%;
   height: 100%;
   margin-bottom: 10px;
    
`;
export const Content = styled.div`
    width: 100%;
    height: 70vh;
    background-color: #ffff;
   
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

export const Logs = styled.div`
    width: 100%;
    height: 40vh;

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