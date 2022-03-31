import styled from "styled-components";

export const Container = styled.div`
    background: #f8f9fa;
    display: flex ;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    weight: 100vw;
    border-radius: 6px;
   /*  border-bottom: 6px solid #4adf83 ; */
    >img{
        width: 100vw;
        height: auto;
    }
    >h1{
        font-size: 32px;
        color: #525252;
        font-weight: normal;
        margin-top: 30px ;
    }
    >h2{
        font-size: 14px;
        color: #777;
        font-weight: normal;
        margin-top: 20px;
        line-height: 20px;
        text-align: center;
    }
    
    @media(max-width: 600px){
       width: 100vw;
       
    }
`;