import styled from "styled-components";
import { makeStyles } from '@material-ui/core/styles';

export const Container = styled.div`
    
`;
export const Message = styled.div`
    margin-bottom: 10px;
    display: flex;
`;
export const Item = styled.div`
    background-color: #FFF;
    border-radius: 10px;
    box-shadow: 0 1px 1px #ccc;
    display: flex;
    flex-direction: column;
    padding: 3px;
    max-width: 90%;

    audio::-webkit-media-controls-panel {
  background: linear-gradient(102deg, #8D59C7 0%, #4F65E0 100%) ;
  border-radius: 0;
  border: 0;
}

audio::-webkit-media-controls-mute-button {
  background-color: #FFFFFF;
  border-radius: 100%;
}
audio::-webkit-media-controls-play-button {
    background-color:#FFFFFF ;
    border-radius: 100%;
}


`;
export const Text = styled.div`
    font-size: 14px;
    margin: 5px 40px 5px 5px;
    overflow-wrap: break-word;
`;
export const Date = styled.div`
    font-size: 11px;
    color: #999;
    margin-right: 5px;
    text-align: right;
    height: 15px;
    margin-top: -15px;
    opacity: 0.6;
   ;
`;

export const SttylesMessage = makeStyles(() => ({
    My: {
        background: 'linear-gradient(102deg, #8D59C7 0%, #4F65E0 100%)',
        boxShadow: "0px 1px 2px #0000001C",
        borderRadius: "10px 0px 10px 10px",
        opacity: "1",
        color: "#FFFFFF",
    },
    Their: {
        background: "#FFFFFF 0% 0% noRepeat paddingBox",
        boxShadow: "0px 1px 2px #0000001C",
        borderRadius: "0px 10px 10px 10px",
        color: "#202020",
    },
    image: {
    }

}));