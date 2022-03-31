import styled from 'styled-components';

export const Container = styled.div`
    background-color: #FFFFFF;
    margin-top: 5vh;
    height: 25vh;

    box-shadow: 0px 1px 1px #00000029;
    border-radius: 6px;
    opacity: 1;

    @media(max-width: 1366px){
        height: 28vh;
    }

    @media(max-width: 720px){
        height: 40vh;
    }
`;

export const ShareContactTitle = styled.div`
        padding-top: 20px;
        padding-left: 20px;
        color: #434343;

        .divider {
            background-color: black;
            margin-right: 20px;
            opacity: 0.2;
        }

        > p {
            padding: 15px 5px;
            color: #6E6E6E;
        }
`;

export const BtnExportContact = styled.div`
    padding-left: 25px;
`;