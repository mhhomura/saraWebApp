import styled from 'styled-components';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

export const Container = styled.div`
    background: #F8FBFF;
    box-shadow: 0px 1px 2px #00000029;
    border-radius: 6px;
    opacity: 1;
    height: 85vh;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    justify-content: space-between;
    aside.emoji-picker-react {
        width: auto;
        background-color: #f5f5f5;
    }
    .emoji-picker-react .emoji-group:before {
        background-color: #f5f5f5 ;
    }

    @media(max-width: 600px){
        height: 100vh;
    }
    @media(min-width: 1920px){
        height:90vh;
    }
    @media(max-height: 600px){
        height: calc(100vh - 80px);
    }

`;

export const ChatWindow = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    @media(max-width: 600px){
        width: 100vw;
        height: calc(100vh - 30px);
    }
`;

export const Body = styled.div`
    flex: 1;
    overflow-y: auto;
    background: #F8FBFF 0% 0%;
    box-shadow: 0px 1px 2px #00000029;
    padding: 20px 30px;

    ::-webkit-scrolbar{
        width: 6px;
        height: 6px;
    }
    ::-webkit-scrollbar-thumb {
        background-color: rgba(0,0,0,0.2) ;
    }
`;
export const Footer = styled.div`
    display: flex;
    height: 111px;
    align-items: center;
    border-radius: 0px 0px 6px 6px;
    background-color: #FFFFFF;
    border-top: 1px solid #DCE4EF;
    @media(max-height: 600px){
        
    }
`;

export const Left = styled.div`
    display: flex;
    margin: 0 15px;

`;
export const InputArea = styled.div`
    flex: 1;
    display: flex;
    align-content: center;
    background-color: #F0F0F774;
    border: 1px solid #D0DAED;
    border-radius: 3px 0px 0px 3px;
    height: 47px;
`;
export const Right = styled.div`
    display: flex;
    margin: 0 15px;
`;
export const Btn = styled.div`
 width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all ease 0.2s;
    cursor: pointer;
    color: #0072FF;
    &:hover{
        color: #0072FF;
    }
`;
export const FileArea = styled.div`
    height: 120px;
    overflow-y: hidden;
    transition: all ease 0.3s;
    padding-left: 50px;
    justify-content: space-between;
    display: flex;
`;

export const ShowFile = styled.div`
    width: 80px;
    height: 80px;
`;

export const UseStyle = makeStyles((theme) => ({
    textArea: {
        width: '100%',
        height: '47px',
        outilene: 0,
        fontSize: '15px',
        color: '#4a4a4a',
        paddingLeft: '15px',
        border: 'none',
        backgroundColor: 'transparent',
        resize: 'none',
        outline: 'none',
        paddingTop: '10px',
        '&:hover': {
            border: 'none',
        },
    },
    emojiPicker: {
        width: '100%',

    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    tooltip: {
        backgroundColor: theme.palette.common.black,
    },
    root: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
    popper: {
        background: '#FFFFFF 0% 0% no-repeat padding-box',
        boxShadow: '0px 3px 8px #00000059',
        borderRadius: '10px',
        opacity: '1',
    }

}));

export const MainHeader = styled.div`
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 1px 4px #0000001A;
    border-radius: 6px;
    opacity: 1;

    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    height: 68px;
    border-bottom: 1px solid #DCE4EF;
    @media(min-width: 1921px){
        align-items: center;
    }
`;
export const Info = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
`;
export const Name = styled.div`
    font-size: 17px;
    color: #000;
    display: flex;
    width: 180px;
    >p{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin: 0;

    }

`;
export const ButtonsArea = styled.div`
    display: flex;
    align-items: center;
    margin-right: 15px;
`;

export const DeleteFile = styled.div`
    margin-top: 0px; 
    align-items: center;
    align-content: center;
    justify-content:center;
    text-align: center;
    border-radius: 100%;
    background: #ffffff; 
    width: 40px;
    height: 40px;
    cursor: pointer;
    padding-top: 5px;
    box-shadow: 0px 1px 4px #0000001A;
`;

export const LightTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: "#F3F7FF",
        color: '#505050',
        boxShadow: theme.shadows[1],
        fontSize: '.9rem',
    },
}))(Tooltip);

export const Transfer = styled.div`
    height: 200px;
    border: solid 1px black;
    overflow-y: hidden;
    transition: all ease 0.3s;
`;
export const Audio = styled.div`
    height: 100% ;
    width: 100% ;
    
audio::-webkit-media-controls-panel {
  background-color: #5F62D9;
  border-radius: 0;
  border: none
}

audio::-webkit-media-controls-mute-button {
  background-color: #B1D4E0;
  border-radius: 50%;
}
audio::-webkit-media-controls-play-button {
    background-color:#FFFFFF ;
    border-radius: 100%;
}
audio::-webkit-media-controls-timeline {

}
`;