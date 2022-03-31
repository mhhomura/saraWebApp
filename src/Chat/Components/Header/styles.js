import styled from 'styled-components';

export const Container = styled.div`
    grid-area: MH;
    color:  ${props => props.theme.color.white};
    background-color: ${props => props.theme.color.primary};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    border-bottom: 1px solid ${props => props.theme.color.gary};
    box-shadow: 0px 3px 6px #00000029;

   /*  @media(min-width: 1921px){
        width:1920px;
    } */
`;

export const Right = styled.div`
    color:  ${props => props.theme.color.white};
    background-color: ${props => props.theme.color.primary};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
`;
export const Add = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    color: ${props => props.theme.color.white};
`;

export const Logo = styled.img`
    margin-left: 10px;
    height: 25px;
    cursor: pointer;
   
`;

export const Notify = styled.span`
     display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    margin-right: 15px;
    cursor: pointer;
`;
