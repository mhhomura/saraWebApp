import styled from 'styled-components';

export const Container = styled.div`
    grid-area: CT;
    color:  ${props => props.theme.color.white};
    background: #E9EDF2 0% 0% no-repeat padding-box;
    opacity: 1;
    padding: 40px 0;
    padding-left: 8%;
    padding-right: 5%;
    height: calc(100vh - 50px);
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