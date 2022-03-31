import styled from "styled-components";

export const Container = styled.div`
    margin-top: 2rem;
    width: 100%;
    display: flex;
`;

export const LeftDiv = styled.div`
    width: 50%;
    height: fit-content;
    margin-left: 8rem;
    margin-top: 9rem;

    > img {
        display: block;
        margin-left: auto;
        margin-right: auto;

        @media(max-width: 1500px){
            width: 90%;
        }
    }
`;

export const RightDiv = styled.div`
    width: 50%;
    height: fit-content;
    margin-top: 14rem;

    > p {
        margin-top: 1rem;
        text-align: left;
        font: 600 15px/22px Mulish;
        letter-spacing: 0px;
        color: #787878;
        opacity: 1;
    }

    .titleDiv{
        display: flex;
        height: fit-content;

        > h3 { 
            text-align: left;
            font: normal normal 800 25px/19px Mulish;
            letter-spacing: 0px;
            color: #434343;
            opacity: 1;
            margin-left: .9rem;
            margin-top: 0.3rem;
        }

        > img {
            width: 25px;
        }
    }
`;