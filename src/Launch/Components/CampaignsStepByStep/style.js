import styled from 'styled-components';
import StepConnector from '@material-ui/core/StepConnector';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

export const Container = styled.div`

`;

export const ColorlibConnector = withStyles({
    alternativeLabel: {
        top: 22,
    },
    active: {
        '& $line': {
            backgroundImage:
                'linear-gradient( 95deg,#20E4B3   30%, #20E4B3   90%)',
        },
    },
    completed: {
        '& $line': {
            backgroundImage:
                'linear-gradient( 95deg,#20E4B3   30%,#20E4B3  90%)',
        },
    },
    line: {

        height: 3,
        border: 0,
        backgroundColor: '#eaeaf0',
        borderRadius: 1,
    },
})(StepConnector);

export const useQontoStepIconStyles = makeStyles({
    root: {
        color: '#eaeaf0',
        display: 'flex',
        height: 22,
        alignItems: 'center',
    },
    active: {
        color: '#0294FF',
    },
    circle: {
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: 'currentColor',
    },
    completed: {
        color: '#0294FF',
        zIndex: 1,
        fontSize: 18,
    },
});

export const useColorlibStepIconStyles = makeStyles({
    root: {
        backgroundColor: '#ccc',
        zIndex: 1,
        color: '#fff',
        width: 40,
        height: 40,
        display: 'flex',
        borderRadius: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    active: {
        backgroundImage:
            'linear-gradient( 136deg, #20E4B3 30%, #20E4B3 90%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    },
    completed: {
        backgroundImage:
            'linear-gradient( 136deg, #20E4B3 30%, #20E4B3 90%)',
    },
});

export const PrettoSlider = withStyles({
    root: {
        color: "#1665D8",
        height: 8,
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 8,
        borderRadius: 4,
    },
    rail: {
        height: 8,
        borderRadius: 4,
    },
})(Slider);


export const Label = styled.div`
    padding-top: 15px;
    padding-bottom: 0px;
    text-align: left;
    font: normal normal 600 1rem Mulish;
    letter-spacing: 0px;
    color: #6E6E6E;
    opacity: 1;
    
`;

export const Top = styled.div`
    background: #F3F7FF 0% 0% no-repeat padding-box;
    padding-top: 50px; 
    padding-left: 60px; 
    padding-right: 60px; 
    width: 100%;
    border-radius: 10px;
`;

export const TopBar = styled.div`
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 6px 3px #7E7E7E10;
    border-radius: 4px 4px 0px 0px;
    opacity: 1;
    display: flex; 
    justify-content: space-between; 
    flex-direction: row;
    align-items: center;
    font-size: 1.3rem;
    height: 70px;
    padding: 0 20px;
    
`;

export const Div = styled.div`
    >h3 {
        color: var(--unnamed-color-333333);
    text-align: left;
    font: normal normal bold 1.3rem Mulish;
    letter-spacing: 0px;
    color: #333333;
    text-transform: uppercase;
    opacity: 1;
    }
`;

export const Body = styled.div`
   background: #F3F7FF 0% 0% no-repeat padding-box;
    padding-top: 10px; 
    padding-left: 60px; 
    padding-right: 60px;
    padding-bottom: 25px;
    border-radius: 10px;
    height: 600px;
`;

export const BodyCard = styled.div`
     background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 6px 3px #7E7E7E10;
    border-radius: 0px 0px 4px 4px;
    opacity: 1;
    align-items: center;
    font-size: 1.5rem;
    height: 100%;
    padding: 0 20px;
    overflow-y: auto;
`;

export const DivStep = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: 'space-between';
`;


export const Colunm1 = styled.div`
    width: 55%;
    padding-top: 30px;
    padding-left: 10px;
`;
export const Colunm2 = styled.div`
   width: 40%;
   display: flex;
   justify-content: center;
   align-items: center;
   padding-top: 60px;
   padding-left: 30px;
   
`;

export const TextTitle = styled.div`
    >h5{
        text-align: left;
    font: normal normal 600 1.5rem Mulish;
    letter-spacing: 0px;
    color: #4E4E4E;
    opacity: 1;
    }
   >small{
    text-align: left; 
    font: normal normal 600 1rem Mulish;
    letter-spacing: 0px;
    color: #4E4E4E;
    opacity: 0.65;
   }
`;

export const Line = styled.div`
   padding: 5px 0 ;
`;

export const Line2 = styled.div`
    height: 350px;
    width: 80%;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 2px 2px #00000029;
    border-radius: 6px;
    opacity: 1;
`;

export const InfoBody = styled.div`
padding-left:15px ;
    >small{
        text-align: left;
    font: normal normal 600 1rem Mulish;
    letter-spacing: 0px;
    color: #4E4E4E;
    opacity: 0.65;
    }
    >h4{
    text-align: center;
    font: normal normal 600 1.1rem Mulish;
    letter-spacing: 0px;
    color: #6E6E6E;
    opacity: 1;
    }
`;
export const InfoImage = styled.div`
    display: flex;
    padding-bottom: 15px;
  
    justify-content: space-around;
    >div{
        background: #2A9DDE ;
        width: 156px;
        height: 108px;
    }
`;

export const BoxViewNumber = styled.div`
    background: #E0E7FF26;
    border: 1px solid #E0E7FF;
    border-radius: 5px;
   padding: 5px;
`;