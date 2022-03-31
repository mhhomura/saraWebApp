import styled from 'styled-components';

export const Container = styled.div`
    display: flexbo;
    width: 100%;
     height: 500px;
   
    padding-top: 30px;
    flex-direction: row;
    
     overflow-x: scroll;
    
    ::-webkit-scrollbar{
        width: 10px;
        height: 10px;
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

