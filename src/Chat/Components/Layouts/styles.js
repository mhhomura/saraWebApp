import styled from 'styled-components';

export const Grid = styled.div`
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: 50px auto;
    font-family: Mulish,Lato,Helvetica Neue,Helvetica,Arial,sans-serif;
    grid-template-areas:
    'MH MH'
    'CT CT';

    height: 100vh;
    width: 100vw ;
   
    @media(min-width: 1921px){
        height: 100vh;
        grid-template-columns: auto;
        justify-content: center;
    }

    @media(max-width: 600px){
       
       grid-template-columns: auto;
        grid-template-rows: auto;
        grid-template-areas:
        'CT';
        height: 100vh;
       
    }
`;