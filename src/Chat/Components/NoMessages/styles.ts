import styled from "styled-components";

export const Container = styled.div`
    text-align:center;
    align-items: center;
    padding: 100px;
`;
export const Image = styled.div`
    align-items: center;
    text-align:center;
    > img{
        width: 30%;
    }
`;
export const Controller = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align:center;
    > p {
        padding: 15px 0;
        color: ${props => props.theme.color.p};
        font-size: 17px;
        font-family: 'Mulish', sans-serif; 
        
    }
`;