import styled from "styled-components";

export const Container = styled.div`
    text-align:center;
    align-items: center;
`;
export const Image = styled.div`
    align-items: center;
    text-align:center;
    > img{
        width: 100%;
    }
`;
export const Controller = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align:center;
    > p {
        padding-bottom: 15px;
        color: ${props => props.theme.color.p};
        font-size: 17px;
        font-family: 'Mulish', sans-serif; 
        
    }
`;