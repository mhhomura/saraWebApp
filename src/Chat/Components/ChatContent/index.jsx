import React from 'react';
import contactsInformation from '../../../Assets/IconesChat/ContactInformation.svg';
import Trash from '../../../Assets/attendance/Trash  Active - Hover.svg';
import DeleteConversation from '../../../Assets/IconesChat/Delete.svg';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import CircularProgress from '@material-ui/core/CircularProgress';
import { formatPhoneNumberIntl } from 'react-phone-number-input';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import * as MessageService from '../../../Services/message';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { useLocation, useHistory } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import FinisheAttendance from '../ChatFinisheAttendance';
import axios_base_chat from '../../../axios_base_chat';
import SoundWave from '../../../Animations/SoundWaves';
import HeadsetIcon from '@material-ui/icons/Headset';
import ChatQuicklyAnswer from '../ChatQuicklyAnswer';
import CancelIcon from '@material-ui/icons/Cancel';
import ChatMessageItem from '../ChatMessageItem';
import { saveBtn } from '../../../Styles/styles';
import ImageIcon from '@material-ui/icons/Image';
import { useTranslation } from "react-i18next";
import SendIcon from '@material-ui/icons/Send';
import StopIcon from '@material-ui/icons/Stop';
import Button from '@material-ui/core/Button';
import Popper from '@material-ui/core/Popper';
import MicIcon from '@material-ui/icons/Mic';
import EmojiPicker from 'emoji-picker-react';
import { Avatar } from '@material-ui/core';
import ChatTransfer from '../ChatTransfer';
import NewContact from '../NewContact';
import ChatIndex from '../ChatIndex';
import ReactDOM from "react-dom";
import WS from '../../../ws';
import { useChat } from '../../../Providers/chat';


import {
    Container,
    LightTooltip,
    ButtonsArea,
    ChatWindow,
    DeleteFile,
    MainHeader,
    InputArea,
    UseStyle,
    ShowFile,
    FileArea,
    Footer,
    Audio,
    Right,
    Body,
    Left,
    Name,
    Info,
    Btn,
} from './styles';
import axios from 'axios';


const ChatContent = () => {
    const { t } = useTranslation();

    var windowWidth = window.innerWidth;
    function recarregarPagina() {
        history.push('/attendant/chat');
    }
    var TimeOut;
    window.onresize = function () {
        clearTimeout(TimeOut);
        TimeOut = setTimeout(recarregarPagina, 10);
    };

    const { chat, setChat } = useChat();

    let location = useLocation();
    const history = useHistory();
    const body = React.useRef();
    const classes = UseStyle();
    const BtnSave = saveBtn();

    const [backgroundImg, setBackgroudImg] = React.useState();
    const [messageType, setMessageType] = React.useState();
    const [activeChat, setActiveChat] = React.useState();
    const [contact, setContact] = React.useState();
    const [audio, setAudio] = React.useState();
    const [file, setFile] = React.useState();

    const [attachmentOpen, setAttachmentOpen] = React.useState(false);
    const [sendingFile, setSendingFile] = React.useState(false);
    const [hasFile, setHasFile] = React.useState(false);

    const [list, setList] = React.useState([]);

    const openAttachment = () => {
        setAttachmentOpen(!attachmentOpen);

    }


    const handleEmojiClick = (e, emojiObject) => {
        const txt = document.querySelector('#text_mensagem');
        const first = txt.value.substring(0, txt.selectionStart);
        const last = txt.value.substring(txt.selectionStart);
        const content = emojiObject.emoji;
        document.getElementById('text_mensagem').value = first + content + last;
        txt.focus();
    }

    const sendToBot = (message) => {

        var data = `{\r\n    \"message\": \"${message}\"\r\n}`;

        var config = {
            method: 'post',
            url: 'http://127.0.0.1:5000/send/message',
            headers: {
                'Content-Type': 'text/plain'
            },
            data: data
        };

        axios(config)
            .then(res => {
                console.log(res.data);

                MessageService.send(
                    res.data, "text",
                    parseInt(localStorage.getItem('chat')),
                    chat.sectorID,
                    sessionStorage.getItem('operator_token'), true
                );
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const getChat = (num) => {
        try {
            axios_base_chat.get(`/chat/department/${chat.sectorID}/attendance/${num}/message`)
                .then(res => {
                    setList([])
                    if (res.data[63].key.fromMe === false) {
                        sendToBot(res.data[63].message.conversation)
                    }
                    setList(res.data.map(v => ({ ...v, sent_at: new Date(Number.parseInt(v.messageTimestamp) * 1000) })))
                    if (body?.current?.scrollHeight > body?.current?.offsetHeight) {
                        body.current.scrollTop = body.current.scrollHeight - body.current.offsetHeight;
                    }
                })
                .catch(err => {
                    if (err?.response?.data?.message === "record not found") {
                        setList([])
                    }
                })
        } catch (error) {
            console.log(error);
        }
    }


    React.useEffect(() => {
        setHasFile(false);
        if (body?.current?.scrollHeight > body?.current?.offsetHeight) {
            body.current.scrollTop = body.current.scrollHeight - body.current.offsetHeight;
        }
        var num2 = parseInt(localStorage.getItem('contact'));
        var compare = null;
        setActiveChat(localStorage.getItem('chat'));
        if (localStorage.getItem('chat') !== "null" && compare !== parseInt(localStorage.getItem('chat'))) {
            setFile();
            setAudio();
            setBackgroudImg();
            getChat(parseInt(localStorage.getItem('chat')));
        }
        if (compare !== parseInt(localStorage.getItem('chat')) && localStorage.getItem('chat') !== "null") {
            compare = parseInt(localStorage.getItem('chat'));
            axios_base_chat.get(`/chat/contact/${num2}`)
                .then(res => {
                    setContact(res.data);
                })
                .catch(err => {

                })
        }
    }, [location]);

    React.useEffect(() =>
        WS.subscribe((msg) => {
            if (msg?.subject === "message.received") {
                if (parseInt(localStorage.getItem('chat')) === msg?.data?.id && msg.data?.department_id === chat.sectorID) {
                    getChat(parseInt(localStorage.getItem('chat')));
                    if (body?.current?.scrollHeight > body?.current?.offsetHeight) {
                        body.current.scrollTop = body.current.scrollHeight - body.current.offsetHeight;
                    }
                }
            }
        }), [chat]);

    /* #126ECE */

    /* Upload Image */

    const UploadImage = (event) => {
        var roundTo = null;
        var converted = event?.target?.files[0]?.size / (1024 * 1024);
        roundTo = converted.toFixed(roundTo);
        setFile();
        if (roundTo > 12) {
            event.target.value = null;
            alert("Tamanho maior que o permitido: 12mb");
        } else {
            setMessageType("image");
            setHasFile(true)
            setFile(event?.target?.files[0]);
            setBackgroudImg(URL.createObjectURL(event?.target?.files[0]));

        }
    }

    /* Upload Video */

    const UploadVideo = (event) => {
        setMessageType("video");
        setHasFile(true);
        var roundTo = null;
        var converted = event?.target?.files[0]?.size / (1024 * 1024);
        roundTo = converted.toFixed(roundTo);
        if (roundTo <= 12) {
            setFile(event.target?.files[0]);
            const video = document.getElementById("video");
            video?.setAttribute('src', URL.createObjectURL(event?.target?.files[0]));
            video?.load();
            video?.play();

        } else {
            alert("Tamanho maior que o permitido: 12mb");
            setMessageType();
            setHasFile(false);
            /* SetErrorSize(true); */

        }
    }

    /* Upload Audio */
    const UploadAudio = (event) => {
        var roundTo = null;
        var converted = event.target.files[0]?.size / (1024 * 1024);
        roundTo = converted.toFixed(roundTo);
        if (roundTo > 12) {
            /* SetErrorSize(true); */
        } else {
            setMessageType("audio");
            setHasFile(true)
            setFile(event.target?.files[0]);
            setAudio(URL.createObjectURL(event.target.files[0]));
        }
    }

    const createMessage = (message, messageType, e) => {

        var evt = e || window.event;
        if (evt.shiftKey) {
            return false
        }
        if (!message || !messageType) {
            console.log(message, messageType)
        } else {
            if (messageType !== "text") {
                setSendingFile(true);
            } else {
                document.getElementById('text_mensagem').value = ""
            }

            const sentMessage = async (message) => {
                try {
                    await MessageService.send(
                        message, messageType,
                        parseInt(localStorage.getItem('chat')),
                        chat.sectorID,
                        sessionStorage.getItem('operator_token'),
                        document?.getElementById('sign_')?.value
                    );
                    setFile();
                    setHasFile(false);
                    setBackgroudImg();
                    setSendingFile(false);
                    cancelRecordAudio();
                    getChat(activeChat);
                    if (anchorElPoperEmoji !== null) {
                        handleClickPoperEmoji();
                    }
                } catch (error) {

                }
            }
            sentMessage(message);
        }

    }

    const CancelSendFile = () => {
        setFile();
        setHasFile(false);
        setBackgroudImg();
        setSendingFile(false);
        setBackgroudImg();

    }
    const backToSideBar = () => {
        localStorage.setItem('chat_status', "close");
        history.push('/attendant/chat');
    }

    if (body?.current?.scrollHeight > body?.current?.offsetHeight) {
        body.current.scrollTop = body.current.scrollHeight - body.current.offsetHeight;
    }


    const [anchorElPoper, setAnchorElPoper] = React.useState(null);

    const handleClickPoper = (event) => {
        setAnchorElPoper(anchorElPoper ? null : event.currentTarget);
    };

    const open = Boolean(anchorElPoper);
    const id = open ? 'simple-popper' : undefined;

    const [anchorElPoperEmoji, setAnchorElPoperEmoji] = React.useState(null);

    const handleClickPoperEmoji = (event) => {
        setAnchorElPoperEmoji(anchorElPoperEmoji ? null : event.currentTarget);
    };

    const openEmoji = Boolean(anchorElPoperEmoji);
    const idEmoji = openEmoji ? 'simple-popper' : undefined;

    /* Reacor Audio */
    const [recording, setRecording] = React.useState(false);
    const [permission, setpermission] = React.useState();
    let mediaRecorder;

    navigator
        ?.mediaDevices
        ?.getUserMedia({ audio: true })
        .then(stream => {
            setpermission('allowed');
            mediaRecorder = new MediaRecorder(stream);
            let chunks = []
            mediaRecorder.ondataavailable = data => {
                chunks.push(data.data);

            }
            mediaRecorder.onstop = () => {
                const blob = new Blob(chunks, { type: 'audio/mp3; codecs=opus' });
                setFile(blob);
                const reader = new window.FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = () => {
                    const audio = document.createElement('audio');
                    audio.src = reader.result;
                    audio.controls = true;
                    ReactDOM.render(<InputArea style={{ background: '#5F62D9' }}><Audio><audio controls src={reader.result} style={{ height: '100%', border: 'none', width: '100%' }} ></audio></Audio></InputArea>, document.getElementById('soundBar'));

                }
            }
        }, err => {
            setpermission('denied')
            console.log(err)

        })

    const startRecorder = () => {
        console.log(mediaRecorder);
        if (permission === 'denied') {
            alert(`${t("words.erro_microphone_use")}`)
        } else {
            mediaRecorder.start();
            ReactDOM.render(<StopIcon onClick={stopRecorder} />, document.getElementById('control'));
            ReactDOM.render(<div style={{ width: '100%', paddingLeft: '50%' }}> <SoundWave /></div>, document.getElementById('audioControls'));
        }
    }
    const stopRecorder = () => {
        if (permission === 'denied') {
            alert(`${t("words.erro_microphone_use")}`)
        } else {
            mediaRecorder.stop();
            setMessageType('audio');
        }

    }
    const cancelRecordAudio = () => {
        setRecording(false);
        setFile();
    }
    const [mic, setMic] = React.useState(true);

    return (
        <Container>
            {localStorage.getItem("chat") !== "null" ? <ChatWindow>
                <MainHeader>
                    <Info>
                        {windowWidth <= 960 && <div onClick={backToSideBar}><ArrowBackIcon style={{ color: '#0072FF' }} /></div>}

                        <Avatar alt={contact?.name} src={contact?.image} style={{ width: '40px', height: '40px', marginRight: '15px', marginLeft: '15px' }} />
                        <Name>
                            <p style={{ fontWeight: '600', color: '#505050' }} > {contact?.name !== "" ? contact?.name : formatPhoneNumberIntl('+' + contact?.jid.split(':')[0])}</p>
                        </Name>
                    </Info>
                    {windowWidth >= 960 ? <ButtonsArea>
                        <Btn>
                            <ChatTransfer />
                        </Btn>
                        <Btn>
                            <LightTooltip title="Informações do Contato" placement="top">
                                <img src={contactsInformation} alt=" " onClick={handleClickPoper} />
                            </LightTooltip>
                        </Btn>
                        <FinisheAttendance id={activeChat} sectorId={chat.sectorID} name={contact?.name} />

                    </ButtonsArea> :
                        <ButtonsArea />}
                </MainHeader>
                <Body ref={body}>
                    {list.map((item) => (item.message !== "" &&
                        <ChatMessageItem
                            key={item.key.id}
                            data={item}
                            origin={'chat'}
                        />

                    ))}
                </Body>
                <FileArea style={{ height: hasFile ? '120px' : '0px' }}>
                    {messageType === "image" &&
                        <div style={{ display: 'flex', paddingTop: '10px' }} onKeyPress={(e) => e.key === "Enter" && createMessage(file, "image")}>
                            <div style={{ marginRight: '-10px' }}>
                                <ShowFile style={{ backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundImage: `url(${backgroundImg})`, borderRadius: '6px', marginTop: '10px' }} />
                            </div>
                            <DeleteFile onClick={() => CancelSendFile()}>
                                <img src={DeleteConversation} alt=" " />
                            </DeleteFile>
                        </div>
                    }
                    {messageType === "video" &&
                        <div style={{ display: 'flex', paddingTop: '10px' }} onKeyPress={(e) => e.key === "Enter" && createMessage(file, "image")}>
                            <div style={{ marginRight: '-10px' }}>
                                <ShowFile style={{ borderRadius: '6px', marginTop: '10px' }} >
                                    <video id="video" width="100%" height="100%" controls></video>
                                </ShowFile>
                            </div>
                            <DeleteFile onClick={() => CancelSendFile()} >
                                <img src={DeleteConversation} alt=" " />
                            </DeleteFile>
                        </div>
                    }
                    {messageType === "audio" &&
                        <div style={{ display: 'flex', paddingTop: '10px' }} onKeyPress={(e) => e.key === "Enter" && createMessage(file, "image")}>
                            <div style={{ marginRight: '200px' }}>
                                <ShowFile style={{ borderRadius: '6px', marginTop: '25px' }} >
                                    <audio controls src={audio}></audio>
                                </ShowFile>
                            </div>
                            <DeleteFile onClick={() => CancelSendFile()} >
                                <img src={DeleteConversation} alt=" " />
                            </DeleteFile>
                        </div>
                    }
                    <div style={{ paddingTop: '50px', paddingRight: '25px' }} id="sendingArea">
                        {sendingFile ? <Button variant="contained" color="default" className={classes.button} startIcon={<CloudUploadIcon />}>
                            <div className={classes.root}>
                                <CircularProgress />
                            </div>
                        </Button> : <Button classes={{ root: BtnSave.root, label: BtnSave.label, }} onClick={() => createMessage(file, messageType)}>
                            <SendIcon />
                        </Button>}

                    </div>

                </FileArea>
                {recording !== true ?
                    <Footer>
                        <Left>
                            <Btn>
                                <ChatQuicklyAnswer />
                            </Btn>
                        </Left>
                        {windowWidth <= 600 ? <InputArea>

                            <textarea
                                autocomplete="off"
                                rows={6}
                                id="text_mensagem"
                                placeholder={t("words.message")}
                                className={classes.textArea}
                                onKeyPress={(e) => e.key === "Enter" && createMessage(e.target.value, "text")}

                            />
                        </InputArea> :
                            <InputArea>
                                <select className="form-select" style={{ width: "142px", backgroundColor: "#FFFFFF" }} aria-label="sign" id="sign_">
                                    <option defaultValue value={true}>{t("words.to_sign")}</option>
                                    <option value={false} >{t("words.not_sign")}</option>
                                </select>
                                <textarea
                                    onFocus={() => setMic(false)}
                                    onMouseLeave={() => setMic(true)}
                                    onMouseOver={() => setMic(false)}
                                    autocomplete="off"
                                    id="text_mensagem"
                                    placeholder={t("words.message")}
                                    className={classes.textArea}
                                    onKeyUpCapture={(e) => e.key === "Enter" && createMessage(e.target.value.trim(), "text")}

                                />

                                <Btn style={{ overflow: 'hidden', width: attachmentOpen ? 200 : 0 }}>
                                    <label for="contained-button-file" style={{ cursor: 'pointer', textAlign: 'center', alignItems: 'center' }}>
                                        <Btn>
                                            <ImageIcon />
                                            <input onChange={UploadImage} accept="image/jpeg" style={{ opacity: '0' }} id="contained-button-file" type="file" />
                                        </Btn>
                                    </label>

                                    <label for="video-input" style={{ cursor: 'pointer', textAlign: 'center', alignItems: 'center' }}>
                                        <Btn>
                                            <VideoLibraryIcon />
                                            <input onChange={UploadVideo} accept="video/mp4" style={{ opacity: '0' }} id="video-input" type="file" />
                                        </Btn>
                                    </label>

                                    <label for="file-input-audio2" style={{ cursor: 'pointer', textAlign: 'center', alignItems: 'center' }}>
                                        <Btn>
                                            <HeadsetIcon />
                                            <input onChange={UploadAudio} accept="audio/mp3" style={{ opacity: '0' }} id="file-input-audio2" type="file" />
                                        </Btn>
                                    </label>
                                </Btn>
                                <Btn style={{ overflow: 'hidden', width: attachmentOpen ? 0 : 50 }}>
                                    <InsertEmoticonIcon onClick={handleClickPoperEmoji} />
                                </Btn>
                                <Btn >
                                    <AttachFileIcon onClick={openAttachment} />
                                </Btn>

                            </InputArea>
                        }

                        <Right>
                            <Btn>
                                {mic === true ? <MicIcon onClick={() => setRecording(true)} /> : <SendIcon onClick={() => createMessage(document.getElementById("text_mensagem").value, "text")} />}
                            </Btn>
                        </Right>
                    </Footer> :
                    <Footer>
                        <Left>
                            <Btn style={{ paddingBottom: '10px' }} onClick={cancelRecordAudio}>
                                <img alt="trash" src={Trash} />
                            </Btn>
                        </Left>
                        <select className="form-select" hidden style={{ width: "142px", backgroundColor: "#FFFFFF" }} aria-label="sign" id="sign_">
                            <option defaultValue value={true}>{t("words.to_sign")}</option>
                        </select>
                        <div style={{ flex: 1 }} id="soundBar">
                            <InputArea >
                                <Btn id="control">
                                    <MicIcon onClick={startRecorder} />
                                </Btn>
                                <div id='audioControls' style={{ width: '100%' }}>

                                </div>
                            </InputArea>
                        </div>
                        <Right>
                            <Btn>
                                {sendingFile === false ? <SendIcon onClick={() => createMessage(file, "audio")} /> : <CircularProgress />}
                            </Btn>
                        </Right>
                    </Footer>
                }
            </ChatWindow>
                : < ChatIndex />
            }


            <Popper id={id} open={open} anchorEl={anchorElPoper} onClose={handleClickPoper} style={{ backgroundColor: '#FFFFFF', boxShadow: '0px 3px 8px #00000059', borderRadius: '6px' }}>
                <div style={{ margin: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <h5 style={{ color: '#434343', fontSize: '1rem' }}>Informações do contato</h5>
                        <CancelIcon fontSize="small" style={{ cursor: 'pointer', color: '#F54B5E' }} onClick={handleClickPoper} />
                    </div>
                    <hr style={{ color: '#CEDDF0' }}></hr>
                    <div style={{ margin: '25px', height: '20vh', }}>
                        <p style={{ color: '#6E6E6E', fontSize: '.9rem', textAlign: 'justify' }}>
                            {contact?.observation ? contact?.observation : "Has no Description"}
                        </p>
                    </div>
                    <div style={{ justifyContent: 'center', textAlign: 'center' }} >
                        <NewContact who="view" id={contact?.id} open="true" />
                    </div>
                </div>

            </Popper>

            <Popper id={idEmoji} open={openEmoji} anchorEl={anchorElPoperEmoji} onClose={handleClickPoperEmoji} className={classes.popper}>
                <div style={{ margin: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <CancelIcon fontSize="small" style={{ cursor: 'pointer', color: '#F54B5E' }} onClick={handleClickPoperEmoji} />
                    </div>
                    <hr style={{ color: '#CEDDF0' }}></hr>
                    <EmojiPicker
                        onEmojiClick={handleEmojiClick}
                        disableSearchBar
                        disableSkinTonePicker
                    />
                </div>

            </Popper>

        </Container >
    )
}

export default ChatContent;