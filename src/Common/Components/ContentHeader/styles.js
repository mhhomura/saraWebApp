import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;
`;
export const TitleContainer = styled.div`
    > h1{
            font-family: 'Mulish', sans-serif;
            font-weight: 800;
            color: ${props => props.theme.color.tertiary};
            text-align: left;
            letter-spacing: 0px;
            opacity: 1;
            &::after{
                content: '';
                display: block;
                width: 55px;
            }
        };
    > small {
        font-family: 'Mulish', sans-serif;
        font-weight: 800;
        color: #434343;
        opacity: 0.5;
        letter-spacing: 0.45px;
        text-align: left;
    }

`;
export const Controllers = styled.div`
    justify-content: space-between;
    align-items: center;
    display: flex;
`;