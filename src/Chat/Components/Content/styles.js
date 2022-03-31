import styled from 'styled-components';

export const Container = styled.div`
    grid-area: CT;
    background-color:  ${props => props.theme.color.secondary};
    padding: 20px;
    box-sizing: border-box;
    
   
    height: calc(100vh - 50px);
    overflow-y: scroll;

    @media(max-width: 600px){
        padding: 0px;
        width: 100vw;
        height: 100vh;
       
    }
   
`;