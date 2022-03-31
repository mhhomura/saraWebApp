import styled from 'styled-components';

export const Grid = styled.div`
    display: grid;
    grid-template-columns:50px auto;
    grid-template-rows: 50px auto;
    font-family: Mulish,Lato,Helvetica Neue,Helvetica,Arial,sans-serif;

    grid-template-areas:
    'AS MH'
    'AS CT';

    height: 100vh;
    width: 100vw ;
`;