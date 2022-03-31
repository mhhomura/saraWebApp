/* import styled from 'styled-components';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

export const Container = styled.div`
  width: 100%;
  height: auto;
  background: #ffff;
`;

export const Label = styled.div`
    padding-top: 15px;
    padding-bottom: 0px;
    
`;

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#ffff',
  },
  color: {
    backgroundColor: '#ffff',
  }
}));

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

export const ButtonSection = styled.div`

    text-align: right;
    margin-top: 25px;
   
    align-items: flex-end;
`; */