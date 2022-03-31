import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

export const Container = styled.div`
    text-align: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 80vh;
`;

export const Image = styled.div`
    width: 150px;
    height: 150px;
    
`;

export const NameGroup = styled.div`text-align: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;

`;

export const SectionOne = styled.div`
     
`;

export const UseStyles = makeStyles((theme) => ({
    root: {
        width: 200,

    },
    margin: {
        height: theme.spacing(3),
    },
    container: {
        display: 'grid',
        gridTemplateColumns: 'repeat(12)',
        gridGap: theme.spacing(1),
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        whiteSpace: 'nowrap',
        marginBottom: theme.spacing(1),
    },
    divider: {
        margin: theme.spacing(2, 0),
    },
}));
