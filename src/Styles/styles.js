import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Tooltip } from '@material-ui/core';

export const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #0294FF 50%, #0294FF  90%)',
    borderRadius: 5,
    border: 0,
    color: 'white',
    height: 35,
    padding: '0px 30px',
    boxShadow: '0 3px 5px 2px rgba(25, 28, 26, .3)',
  },
  label: {

  },

});
export const cancelBtn = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #F54B5E 30%, #F54B5E  90%)',
    borderRadius: 5,
    border: 0,
    color: 'white',
    height: 35,
    padding: '0px 30px',
    boxShadow: '0 3px 5px 2px rgba(25, 28, 26, .3)',
    fontWeight: 'bold'
  },
  label: {

  },

});

export const cancelBtn2 = makeStyles({
  root: {
    background: '#F54B5E 0% 0% no-repeat padding-box',
    '&:hover': {
      backgroundColor: '#F54B5E',
      /* opacity: '0.8',
      transition: '0.5s', */
    },
    borderRadius: 5,
    border: 0,
    color: 'white',
    height: 35,
    padding: '0px 30px',
    fontWeight: 'bold'
  },
  label: {

  },

});
export const saveBtn = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #02EAA0 30%, #02EAA0 90%)',
    borderRadius: 5,
    border: 0,
    color: 'white',
    height: 35,
    padding: '0px 30px',
    boxShadow: '0 3px 5px 2px rgba(25, 28, 26, .3)',
    fontWeight: 'bold'
  },
  label: {

  },

});

export const saveBtn2 = makeStyles({
  root: {
    background: '#01D4B9 0% 0% no-repeat padding-box',
    '&:hover': {
      backgroundColor: '#01D4B9',
      /* opacity: '0.8',
      transition: '0.5s', */
    },
    borderRadius: 5,
    border: 0,
    color: 'white',
    height: 35,
    padding: '0px 30px',
    fontWeight: 'bold'
  },
  label: {

  },

});

export const BtnBlue = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #0294FF 50%, #0294FF  90%)',
    borderRadius: 5,
    border: 0,
    color: 'white',
    height: 35,
    padding: '0px 30px',
    boxShadow: '0 3px 5px 2px rgba(25, 28, 26, .3)',
    fontWeight: 'bold',
    fontFamily: 'Lato'
  },
  label: {

  },

});

export const BtnGray = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #ccc 50%, #ccc  90%)',
    borderRadius: 5,
    border: 0,
    color: '#FFFFFF',
    height: 35,
    padding: '0px 30px',
    fontWeight: 'bold'
    /* boxShadow: '0 3px 5px 2px rgba(25, 28, 26, .3)', */
  },
  label: {

  },

});

export const BtnGray2 = makeStyles({
  root: {
    backgroundColor: '#5A5959',
    '&:hover': {
      backgroundColor: '#5A5959',
      /* opacity: '0.8',
      transition: '0.5s', */
    },
    borderRadius: 5,
    border: 0,
    color: 'white',
    height: 35,
    fontWeight: 'bold'

  },
  label: {

  },

});

export const BtnWhite = makeStyles({
  root: {
    backgroundColor: '#FAFAFA',
    '&:hover': {
      backgroundColor: '#FAFAFA',
    },
    borderRadius: 5,
    border: 0,
    color: 'white',
    height: 35,
    marginRight: '20px',
  },
  label: {

  },

});

export const BtnBlue2 = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #0080FC 50%, #0080FC  90%)',
    borderRadius: 5,
    border: 0,
    color: 'white',
    height: 35,
    padding: '0px 30px',
    fontWeight: 'bold',
    fontFamily: 'Lato',
  },
});

export const BlueButtom = makeStyles({
  root: {
    backgroundColor: '#EAF4FF',
    '&:hover': {
      backgroundColor: '#D1E3F2',
    },
    borderRadius: '5px',
    border: 0,
    color: '#0F7BFF',
    height: '40px',
    padding: '0px 30px',
    boxShadow: "0px 1px 1px #044B9026",
  },
  label: {

  },

});

export const progressBar = makeStyles({
  root: {
    width: '100%',
    color: "red"
  },
});

export const NotiFy = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #EAF4FF 50%, #EAF4FF  90%)',
    borderRadius: 5,
    border: '1px solid #ccc',
    color: '#000',
    height: 50,
    padding: '0px 30px',
    /* boxShadow: '0 3px 5px 2px rgba(25, 28, 26, .3)', */
  },
  label: {

  },

});

export const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "#F3F7FF",
    color: '#505050',
    boxShadow: theme.shadows[1],
    fontSize: '.9rem',
  },
}))(Tooltip);