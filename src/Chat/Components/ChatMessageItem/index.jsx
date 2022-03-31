import React from 'react';
import * as DataFormat from '../../../Services/formartText';
import moment from 'moment';

import {
    Container,
    Item,
    Text,
    Date,
    Message,
    SttylesMessage
} from './styles';

const ChatMessageItem = ({ data, origin, type }) => {


    const classes = SttylesMessage();

    var url2 = `data:video/mp4;base64, ${data.message?.videoMessage?.jpegThumbnail}`;
    var url = `data:image/png;base64, ${data.message?.imageMessage?.jpegThumbnail}`;
    var url3 = `data:audio/mpeg;base64, ${data.message?.audioMessage?.directPath}`;

    const open = () => {
        alert("ver imagem")
    }
    const openLink = (link) => {
        window.open(link);
    }

    return (
        <Container>
            <Message style={{
                justifyContent: data?.key?.fromMe === true ? 'flex-end' : 'flex-start',
            }}>
                <Item className={data?.key?.fromMe === true ? classes.My : classes.Their} style={{}}>

                    {data.message?.imageMessage &&
                        <div style={{ height: '300px', width: '250px', cursor: "pointer", paddingBottom: '5px' }} onClick={open}>
                            <img style={{ height: '100%', width: '100%', borderRadius: '6px' }} src={url} alt="imageMessage" />
                        </div>
                    }
                    {data.message?.videoMessage &&
                        <div style={{ height: '250px', width: '250px', cursor: "pointer", paddingBottom: '5px' }} onClick={open}>
                            <video src={url2} width="100%" height="100%" controls></video>
                        </div>
                    }
                    {data.message?.extendedTextMessage?.contextInfo &&
                        <div style={{}}>
                            <div style={{ padding: '5px', borderRadius: '10px', backgroundColor: data?.key?.fromMe === true && '#FFF' }} className={data?.key?.fromMe === true ? classes.Their : classes.My}><p dangerouslySetInnerHTML={{ __html: DataFormat.formatText(data.message?.extendedTextMessage?.contextInfo?.quotedMessage?.conversation) }}></p></div>
                            <Text dangerouslySetInnerHTML={{ __html: DataFormat.formatText(data.message?.extendedTextMessage.text) }}>
                            </Text>
                        </div>
                    }
                    {data.message?.extendedTextMessage?.canonicalUrl &&
                        <div style={{ height: '250px', width: '250px', cursor: "pointer", paddingBottom: '5px' }} onClick={() => openLink(data.message?.extendedTextMessage.canonicalUrl)}>
                            <img style={{ height: '90%', width: '100%', borderRadius: '6px' }} src={`data:image/png;base64, ${data.message?.extendedTextMessage.jpegThumbnail}`} alt={data.message?.extendedTextMessage.title} />
                            <Text dangerouslySetInnerHTML={{ __html: DataFormat.formatText(data.message?.extendedTextMessage.title) }} style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', marginTop: '15px' }}>
                            </Text>
                        </div>
                    }
                    {data.message?.audioMessage &&
                        <div style={{ width: '80%', cursor: "pointer" }} onClick={open}>
                            <audio controls src={url3} style={{ height: '35px', border: 'none' }}></audio>
                        </div>
                    }
                    {data.message &&
                        <Text dangerouslySetInnerHTML={{ __html: DataFormat.formatText(data.message.conversation ? data.message?.conversation : data.message.extendedTextMessage?.text) }}></Text>
                    }
                    <Date style={{ color: data?.key?.fromMe === true ? "#FFFF" : "#202020" }}>
                        {moment(data.sent_at).format('HH:mm')}
                    </Date>
                </Item>
            </Message>
        </Container >
    )
}

export default ChatMessageItem;