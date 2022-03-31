import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 50px ;
    
`;

export const Image = styled.div`,
    @media(max-width: 600px){
        > img{
        width:2%;
    }
       
    }
`;

export const Box = styled.div`
    background-color: #FFFFFF; 
    box-shadow: 0px 1px 2px #00000029;
    width: 70vw; 
    height: 285px;
    color: #0080FC;
    text-align: center;
    border-radius: 10px;
    @media(min-height: 1080px){
        height: 350px;
        width: 1920px; 
    }
    @media(min-width: 1921px){
        width: 1920px; 
    }
    >h1{
        text-align: center;
        font: normal normal 30px/45px Mulish;
        font-weight:800;
        letter-spacing: 0px;
        color: #0080FC;
        opacity: 1;
    }
    @media(max-width: 600px){
        >h1{
            text-align: center;
        font: normal normal 800 30px/45px Mulish;
        letter-spacing: 0px;
        color: #0080FC;
        opacity: 1;
    }
    }
`;

export const Load = styled.div`
    text-align: center;
`;
