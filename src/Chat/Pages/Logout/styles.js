import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    align-content: center;
    margin-top: 50px ;
    
`;

export const Image = styled.div`
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
    height: 30vh;
    color: #0080FC;
    text-align: center;
    border-radius: 10px;
    >h1{
        font-size: 2rem;
    }
    @media(min-width: 1920px){
        width: 1290px;
        height: 426px;
    }
    @media(max-width: 600px){

        >h1{
        font-size: 0.9rem;
    }
    }
`;

export const Middle = styled.div`
    padding-top: 25px ;
    text-align: center;

    >h3{
        color: #0080FC;
    }
    >div{
        padding:25px 0 ;
    }

`;
