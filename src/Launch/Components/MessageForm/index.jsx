import React from 'react';
import { useHistory } from 'react-router-dom';
import ReactDOM from "react-dom";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import VideocamIcon from '@material-ui/icons/Videocam';
import MicIcon from '@material-ui/icons/Mic';
import ImageIcon from '@material-ui/icons/Image';
import MessageIcon from '@material-ui/icons/Message';
import { saveBtn, cancelBtn, BtnGray } from '../../../Styles/styles';
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import { Input, Modal, ModalHeader, ModalFooter } from 'reactstrap';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import SettingsVoiceIcon from '@material-ui/icons/SettingsVoice';
import StopIcon from '@material-ui/icons/Stop';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import axios_base from '../../../axios_base';
import moment from 'moment';
import { useTranslation } from "react-i18next";

import {
    Container,
    Form,
    FormGroup,
    Label,
    Content,
    DivDate,
    EmojiPicker,
    TabsOptions,
} from './styles';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
        backgroundColor: theme.palette.background.paper,
        width: '100%',
        textAlign: 'center',
    },
    input: {
        display: 'none',
    },
}));

//Tabs Function
function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

/* Componente Criação de mensagem */
const MessageForm = (props) => {

    const { t } = useTranslation();

    const {
        title,
        buttonLabel,
        campaignid,
        origem,
    } = props;

    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleChangeIndex = (index) => {
        setValue(index);
    };
    const classes = useStyles();

    const history = useHistory();
    const BtnCancel = cancelBtn();
    const BtnSave = saveBtn();
    const btnGray = BtnGray();
    const [emojiPickerState, SetEmojiPicker] = React.useState(false);
    const [messageName, setName] = React.useState('');
    const [messageDate, setMessageDate] = React.useState('');
    const [messageTime, setMessageTime] = React.useState('');
    const [messageType, setMessageType] = React.useState('text');
    const [message, SetMessage] = React.useState();
    const [detailMensage, setDetailMessage] = React.useState();
    const [modal, setModal] = React.useState(false);
    const [deleteModal, setDeletModal] = React.useState(false);
    const [getMessageDetail, setMessageDetail] = React.useState(false);
    const [messageDetailId, setMessageID] = React.useState();
    const [campaingIdDetail, setCampaignIdDetail] = React.useState();
    const [open, setOpen] = React.useState(false);
    const [openError, setOpenError] = React.useState(false);
    const [openDeleted, setOpenDeleted] = React.useState(false);
    const [OpenError2, setOpenError2] = React.useState(false);
    const [openResent, setOpenResent] = React.useState(false);
    const [openUpdate, setOpenUpdate] = React.useState(false);
    const [openErro3, setOpenError3] = React.useState(false);
    const [openCreating, setOpenCreate] = React.useState(false);
    const [openErrorSize, SetErrorSize] = React.useState(false);
    const [messageEdited, SetMessageEdited] = React.useState();



    const handleClose = () => {
        setOpen(false);
        setOpenCreate(false)
        setOpenError(false);
        setOpenDeleted(false);
        setOpenError2(false);
        setOpenResent(false);
        setOpenUpdate(false);
        setOpenError3(false);
        SetErrorSize(false);
    };

    //Emoji
    let emojiPicker;
    if (emojiPickerState) {
        emojiPicker = (
            <Picker
                onSelect={emoji => {
                    const txt = document.querySelector('#text_mensagem');
                    const first = txt.value.substring(0, txt.selectionStart);
                    const last = txt.value.substring(txt.selectionStart);
                    const content = emoji.native;
                    SetMessage(first + content + last);
                    txt.select();
                }
                }
            />
        );
    }
    function triggerPicker(event) {
        event.preventDefault();
        SetEmojiPicker(!emojiPickerState);
    }
    //

    const modalDelete = () => {
        setDeletModal(!deleteModal);
    }

    const toggle = () => {
        if (props.buttonLabel.props.origem === 'timeLine') {
            console.log(origem);
            setMessageDetail(true);
            setMessageID(props.buttonLabel.props.messageid);
            setCampaignIdDetail(props.buttonLabel.props.campaignid);
        }
        setfile();
        setAudio();
        setModal(!modal);
    }


    //Create message //
    const createMessage = (messageName, message, messageDate, messageTime, messageType) => {
        if (!messageName || !message || !messageDate || !messageTime || !messageType) {
            if (!messageName) {
                ReactDOM.render(<spam style={{ color: 'red', fontSize: '12px' }}>* {t("words.required")}</spam>, document?.getElementById('statusName'));
                setOpenError(true);
            } if (!messageDate) {
                ReactDOM.render(<spam style={{ color: 'red', fontSize: '12px' }}>* {t("words.required")}</spam>, document?.getElementById('statusDate'));
                setOpenError(true);
            } if (!message) {
                ReactDOM.render(<spam style={{ color: 'red', fontSize: '12px' }}>* {t("words.required")}</spam>, document?.getElementById('statusMessage'));
                setOpenError(true);
            }
        }
        else {
            setOpenCreate(true)
            ReactDOM.render(<Button classes={{ root: btnGray.root, label: btnGray.label, }} >{t("words.save")}</Button>,
                document?.getElementById('bnt_save'));
            try {
                var date = new Date(messageDate + " " + messageTime);
                var dateFormated = date.toISOString();
                var data = new FormData();
                data.append("name", messageName);
                data.append("send_at", dateFormated);
                data.append("content_type", messageType);
                data.append("content", message);

                const options = {
                    method: 'POST',
                    url: `${process.env.REACT_APP_LINK_API}/campaign/${campaignid}/message`,
                    headers: {
                        'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001',
                        Authorization: `Bearer ${sessionStorage.getItem('token')}`
                    },
                    data: data
                };
                axios.request(options).then(res => {
                    console.log(res.data);
                    history.push(`/campaigns/${campaignid}/detail`);
                    setTimeout(() => {
                        setModal(!modal);
                    }, 1000);
                    SetMessage();
                    setMessageTime();
                    setMessageType(messageType);
                    setMessageDate();
                    setName();
                    setAudio();
                    setOpenCreate(false);
                    setOpen(true);
                }).catch(function (error) {
                    console.error(error);
                    setOpenCreate(false);
                    setOpenError3(true);
                });
            } catch (error) {
                setOpenCreate(false);
                setOpenError3(true);
                console.log(error);
                ReactDOM.render(<Button classes={{ root: BtnSave.root, label: BtnSave.label, }} onClick={() => createMessage(messageName, message, messageDate, messageTime, messageType)}>{t("words.save")}</Button>,
                    document?.getElementById('bnt_save'));
            }
        }

    }

    //Image Upload //
    const [name, setNameUpload] = React.useState();
    const [file, setfile] = React.useState();
    const handleChangeImg = (event) => {
        var roundTo = null;
        var converted = event.target.files[0]?.size / (1024 * 1024);
        roundTo = converted.toFixed(roundTo);
        if (roundTo > 12) {
            event.target.value = null;
            SetErrorSize(true);
        } else {
            setNameUpload();
            setfile();
            if (control !== null) {
                SetMessageEdited(event.target?.files[0]);
                setStoredFile(URL.createObjectURL(event?.target?.files[0]))
            } else {
                SetMessage(event.target?.files[0]);
                setfile(URL.createObjectURL(event?.target?.files[0]));
            }
            SetMessage(event.target?.files[0]);
            setNameUpload(event.target?.files[0]?.name);
            setMessageType('image');
        }
    }
    //

    //Video Upload //
    const handleVideo = (event) => {
        var roundTo = null;
        var converted = event.target.files[0]?.size / (1024 * 1024);
        roundTo = converted.toFixed(roundTo);
        if (roundTo <= 12) {
            if (control !== null) {
                SetMessageEdited(event.target?.files[0]);
                setMessageType('video');
            } else {
                SetMessage(event.target?.files[0]);
                setMessageType('video');
            }
            const video = document.getElementById('video');
            video.setAttribute('src', URL.createObjectURL(event?.target?.files[0]));
            video.load();
            video.play();
        } else {
            SetErrorSize(true);

        }
    }
    //

    //Audio Record //
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
                if (control !== null) {
                    SetMessageEdited(blob);
                } else {
                    SetMessage(blob);
                }
                const reader = new window.FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = () => {
                    const audio = document.createElement('audio');
                    audio.src = reader.result;
                    audio.controls = true;
                    ReactDOM.render(<audio controls src={reader.result}></audio>, document.getElementById('audioControls'));

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
            ReactDOM.render(<div><p>{t("words.recording")}...</p> </div>, document.getElementById('state'));
        }
    }
    const stopRecorder = () => {
        if (permission === 'denied') {
            alert(`${t("words.erro_microphone_use")}`)
        } else {
            mediaRecorder.stop();
            ReactDOM.render(<div><p></p> </div>, document.getElementById('state'));
            setMessageType('audio');
        }

    }

    //Audio upload //
    const [audio, setAudio] = React.useState();
    const handleChangeAudio = (event) => {
        var roundTo = null;
        var converted = event.target.files[0]?.size / (1024 * 1024);
        roundTo = converted.toFixed(roundTo);
        if (roundTo > 12) {
            SetErrorSize(true);
        } else {
            if (control !== null) {
                SetMessageEdited(event.target?.files[0]);
            } else {
                SetMessage(event.target?.files[0]);
            }
            setAudio(URL.createObjectURL(event.target.files[0]));
            setMessageType('audio');
        }
    }

    const messageAudio = () => {
        SetMessage();
        setfile();
        setAudio();
        setMessageType('audio');
    }
    const messageVideo = () => {
        SetMessage();
        setfile();
        setAudio();
        setMessageType('video');
    }
    const messageImage = () => {
        SetMessage();
        setfile();
        setAudio();
        setMessageType('image');
    }
    const messageText = () => {
        SetMessage();
        setfile();
        setAudio();
        setMessageType('text');
    }

    //Messag Detail (Visualização da mensagem) //
    const [control, setControl] = React.useState(null);
    const [storedFile, setStoredFile] = React.useState();
    const [messageStatus, setMessageStatus] = React.useState(null);
    if (getMessageDetail === true) {
        try {
            axios_base.get(`/campaign/${campaingIdDetail}/message/${messageDetailId}`)
                .then(res => {
                    if (res.data) {
                        setMessageType(res.data.type);
                        setMessageStatus(res.data.status);
                        setControl(res.data.type);
                        if (res.data.type === "text") {
                            setValue(0);
                            setStoredFile(`${process.env.REACT_APP_LINK_API}/storage/${res.data.content}`)
                        }
                        if (res.data.type === "image") {
                            setValue(1);
                            setStoredFile(`${process.env.REACT_APP_LINK_API}/storage/${res.data.content}`);
                        }
                        if (res.data.type === "video") {
                            setValue(2);
                            const video = document.getElementById('video');
                            video.setAttribute('src', `${process.env.REACT_APP_LINK_API}/storage/${res.data.content}`);
                            video.load();
                            video.play();
                        }
                        if (res.data.type === "audio") {
                            setValue(4);
                            setAudio(`${process.env.REACT_APP_LINK_API}/storage/${res.data.content}`)
                        }
                        SetMessage(res.data.content);
                        setDetailMessage(res.data);
                        setMessageDate(moment(res.data.send_at).format('yyyy-MM-DD'));
                        setMessageTime(moment(res.data.send_at).format('HH:mm'));
                        setName(res.data.name);
                    } else {
                        setOpenError3(true);
                    }
                })
                .catch(err => {
                    console.log(err);
                    setOpenError3(true);
                })
            setMessageDetail(false);
        } catch (error) {
            alert(error)
            setOpenError3(true);
        }
    }
    //Message Detail

    //Delete Message //
    const deleteMessage = (messageDetailId) => {
        try {
            if (detailMensage?.status === 'pending' || detailMensage?.status === 'failed') {
                axios_base.delete(`/campaign/${campaingIdDetail}/message/${messageDetailId}`)
                    .then(res => {
                        setOpenDeleted(true);
                        history.push(`/campaigns/${campaingIdDetail}/detail`);
                    })
                    .catch(err => {
                        setOpenError3(true);
                    })
            } else {
                setOpenError3(true);
            }

        } catch (error) {

        }
    }

    //Update Message //

    const updateMessage = (messageName, message, messageDate, messageTime, messageType) => {
        setOpenCreate(true)
        console.log(messageName, message, messageDate, messageTime, messageType);
        if (!messageName || !messageDate || !messageTime) {
            setOpenCreate(false);
            setOpenError(true);
        } else {
            try {
                ReactDOM.render(<Button classes={{ root: btnGray.root, label: btnGray.label, }} >{t("words.edit")}</Button>,
                    document?.getElementById('btn_edit'));

                var date = new Date(messageDate + " " + messageTime);
                var dateFormated = date.toISOString();
                var data = new FormData();;
                data.append("name", messageName);
                data.append("send_at", dateFormated);
                data.append("content_type", messageType);
                if (messageType !== "text") {
                    if (!messageEdited) {

                    } else {
                        data.append("content", messageEdited);
                    }
                } else {
                    data.append("content", message);
                }
                const options = {
                    method: 'patch',
                    url: `${process.env.REACT_APP_LINK_API}/campaign/${campaingIdDetail}/message/${messageDetailId}`,
                    headers: {
                        'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001',
                        Authorization: `Bearer ${sessionStorage.getItem('token')}`
                    },
                    data: data
                };
                axios.request(options).then(res => {
                    setOpenCreate(false);
                    console.log(res.data);
                    setOpenUpdate(true);
                    history.push(`/campaigns/${campaingIdDetail}/detail`);
                    setTimeout(() => {
                        setModal(!modal);
                    }, 1000);
                    SetMessage();
                    setMessageTime();
                    setMessageDate();
                    setName();
                    setAudio();
                }).catch(function (error) {
                    console.error(error);
                    setOpenCreate(false);
                    setOpenError3(true);
                });
            } catch (error) {
                setOpenCreate(false);
                setOpenError3(true);
                console.log(error);
            }
        }
    }
    //

    return (
        <Container >
            <div onClick={toggle}>{buttonLabel}</div>
            {/*  <Button classes={{ root: btn.root, label: btn.label, }} >{buttonLabel}</Button> */}
            <Modal isOpen={modal} toggle={toggle} size="lg" style={{ maxWidth: '65%', width: '100%' }}>
                <ModalHeader toggle={toggle}>{title}</ModalHeader>
                <Form>
                    <Content>
                        <Grid container spacing={12}>
                            <Grid item xs={6} className={classes.container}>
                                <FormGroup>
                                    <Label htmlFor="nomeDaMensagem">{t("words.message_name")}</Label>
                                    <Input onChange={(e) => setName(e.target.value)} type="text" value={messageName} name="nomeDaMensagem" id="nomeDaMensagem" placeholder={t("words.message_name")} required />
                                    <div id="statusName"></div>
                                </FormGroup>
                            </Grid>
                            <Grid item xs={6} className={classes.container}>
                                <FormGroup>
                                    <Label htmlFor="Data">{t("words.date_sending")}</Label>
                                    <DivDate>
                                        <Input onChange={(e) => setMessageDate(e.target.value)} value={messageDate} type="date" name="date" id="Date" placeholder="Date to send" required />
                                        <Input onChange={(e) => setMessageTime(e.target.value)} value={messageTime} type="time" name="time" id="time" placeholder="Time to send" required />
                                    </DivDate>
                                    <div id="statusDate"></div>
                                </FormGroup>
                            </Grid>
                        </Grid>
                    </Content>
                    <TabsOptions>
                        <Label htmlFor="typeMessage" style={{ paddingLeft: '2%', }}>{t("words.message_type")}</Label>
                        <div className={classes.root}>
                            <AppBar position="static" color="default">
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    indicatorColor="primary"
                                    textColor="primary"
                                    variant="fullWidth"
                                    aria-label="full width tabs example"
                                >
                                    <Tab /* label="Text"  */ icon={< MessageIcon />} onClick={messageText}  {...a11yProps(0)} />
                                    <Tab /* label="Image" */ icon={< ImageIcon />} onClick={messageImage} {...a11yProps(1)} />
                                    <Tab /* label="Video" */ icon={< VideocamIcon />} onClick={messageVideo} {...a11yProps(2)} />
                                    <Tab /* label="Audio" */ icon={< MicIcon />} onClick={messageAudio} {...a11yProps(3)} />
                                    <Tab /* label="Audiotrack" */ icon={< AudiotrackIcon />} onClick={messageAudio} {...a11yProps(4)} />
                                </Tabs>
                            </AppBar>
                            <SwipeableViews
                                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                index={value}
                                onChangeIndex={handleChangeIndex}
                            >
                                <TabPanel value={value} index={0} dir={theme.direction}>

                                    <Label htmlFor="text_mensagem">{t("words.text_message")}</Label>
                                    <Input
                                        style={{
                                            size: "100%",
                                            maxlength: "100%",
                                            width: "100%",
                                            height: "40vh",
                                        }}
                                        id="text_mensagem"
                                        className="input-reset ba b--black-20 pa2 mb2 db w-100"
                                        type="textarea"
                                        aria-describedby="name-desc"
                                        value={message}
                                        onChange={event => SetMessage(event.target.value)}
                                    />
                                    <EmojiPicker>
                                        <button onClick={triggerPicker}>
                                            <span role="img" aria-label="">😀</span>
                                        </button>
                                    </EmojiPicker>
                                    {emojiPicker}
                                </TabPanel>

                                <TabPanel value={value} index={1} dir={theme.direction}>
                                    <br></br>
                                    {control === null && <div>
                                        <label for="contained-button-file" style={{ width: '65%', height: '300px', cursor: 'pointer', backgroundColor: '#b8b8b8', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundImage: `url(${file})`, textAlign: 'center', paddingTop: '10%' }}>
                                            <input onChange={handleChangeImg} accept="image/jpeg" style={{ opacity: '0', width: '100%', height: '50%', }} id="contained-button-file" /* multiple */ type="file" />


                                            <div style={{ backgroundColor: 'rgba(255,255,255,0.5)', display: 'inline-block', padding: '5px' }}><PhotoCamera /><br></br>{t("words.selct_img")}</div>
                                        </label>
                                        <p>{t("words.image_selected")} {name} </p>
                                    </div>
                                    }
                                    {control !== null && <div>
                                        <label for="contained-button-file" style={{ width: '65%', height: '300px', cursor: 'pointer', backgroundColor: '#b8b8b8', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundImage: `url(${storedFile})`, textAlign: 'center', paddingTop: '10%' }}>
                                            <input onInput={handleChangeImg} accept="image/jpeg" style={{ opacity: '0', width: '100%', height: '50%', }} id="contained-button-file" /* multiple */ type="file" />

                                            <div style={{ backgroundColor: 'rgba(255,255,255,0.5)', display: 'inline-block', padding: '5px' }}><PhotoCamera /><br></br>{t("words.selct_img")}</div>
                                        </label>
                                        <p>{t("words.image_selected")} {name} </p>
                                    </div>}


                                </TabPanel>

                                <TabPanel value={value} index={2} dir={theme.direction}>
                                    <br></br>
                                    {/*   {control === null && */}
                                    <Grid container spacing={12}>
                                        <Grid item xs={8} className={classes.container}>
                                            <div id="videoBox2" style={{ width: '90%', height: '300px' }}>
                                                <video id="video" width="100%" height="300" controls></video>
                                            </div>
                                        </Grid>
                                        <Grid item xs={4} className={classes.container}>
                                            <label for="video-input" style={{ width: '100%', height: '300px', cursor: 'pointer', backgroundColor: '#b8b8b8', textAlign: 'center', paddingTop: '10%' }}>
                                                <input onChange={handleVideo} accept="video/mp4" style={{ opacity: '0', width: '100%', height: '50%', }} id="video-input" type="file" />
                                                <PhotoCamera />
                                                <br></br>
                                                {t("words.selct_video")}
                                            </label>
                                        </Grid>
                                    </Grid>
                                </TabPanel>

                                <TabPanel value={value} index={3} dir={theme.direction}>
                                    <br></br>
                                    <Button onClick={startRecorder} variant="contained" color="default" className={classes.button} startIcon={<SettingsVoiceIcon />}>{t("words.start")}</Button>
                                    <Button onClick={stopRecorder} variant="contained" color="default" className={classes.button} startIcon={<StopIcon />}>{t("words.stop")}</Button>
                                    <div id="state"></div>
                                    <div id="audioControls"> </ div>

                                </TabPanel>
                                <TabPanel value={value} index={4} dir={theme.direction}>
                                    <div>
                                        <label for="file-input-audio2" style={{ width: '50%', height: '150px', cursor: 'pointer', backgroundColor: '#b8b8b8', textAlign: 'center', paddingTop: '2%' }}>
                                            <input onChange={handleChangeAudio} accept="audio/mp3" style={{ opacity: '0', width: '100%', height: '5%', }} id="file-input-audio2" type="file" />
                                            <AudiotrackIcon />
                                            <br></br>
                                            {t("words.select_audio")}
                                        </label>
                                        <audio controls src={audio}></audio>
                                    </div>
                                </TabPanel>
                            </SwipeableViews>
                        </div>
                    </TabsOptions>
                    <div id="statusMessage" style={{ marginLeft: '10px' }}></div>
                </Form>
                {!messageStatus &&
                    <ModalFooter>
                        <div>
                            <Button classes={{ root: BtnCancel.root, label: BtnCancel.label, }} onClick={toggle}>{t("words.cancel")}</Button>
                        </div>
                        <div id="bnt_save">
                            <Button classes={{ root: BtnSave.root, label: BtnSave.label, }} onClick={() => createMessage(messageName, message, messageDate, messageTime, messageType)}>{t("words.save")}</Button>
                        </div>
                    </ModalFooter>
                }
                {messageStatus === "completed" &&
                    <ModalFooter>
                        <div>
                            <Button classes={{ root: BtnCancel.root, label: BtnCancel.label, }} onClick={toggle}>{t("words.cancel")}</Button>
                        </div>
                        {/* <div>
                            <Button classes={{ root: BtnSave.root, label: BtnSave.label, }} onClick={() => createMessage(messageName, message, messageDate, messageTime, messageType)}>Resend</Button>
                        </div> */}
                    </ModalFooter>
                }
                {messageStatus === "pending" &&
                    <ModalFooter>
                        <div>
                            <Button classes={{ root: BtnCancel.root, label: BtnCancel.label, }} onClick={modalDelete}>{t("words.delete")}</Button>
                        </div>
                        <div id="btn_edit">
                            <Button classes={{ root: BtnSave.root, label: BtnSave.label, }} onClick={() => updateMessage(messageName, message, messageDate, messageTime, messageType)}>{t("words.edit")}</Button>
                        </div>
                    </ModalFooter>
                }
                {messageStatus === "failed" &&
                    <ModalFooter>
                        <div>
                            <Button classes={{ root: BtnCancel.root, label: BtnCancel.label, }} onClick={toggle}>{t("words.cancel")}</Button>
                        </div>
                        <div>
                            <Button classes={{ root: BtnSave.root, label: BtnSave.label, }} onClick={() => updateMessage(messageName, message, messageDate, messageTime, messageType)}>{t("words.resend")}</Button>
                        </div>
                    </ModalFooter>
                }
            </Modal>
            <Modal isOpen={deleteModal} toggle={modalDelete} >
                <ModalHeader toggle={modalDelete}>{t("words.delete")}</ModalHeader>
                <Form>
                    <h6>{t("words.delete_message_question")}</h6>
                </Form>
                <ModalFooter>
                    <div>
                        <Button classes={{ root: BtnCancel.root, label: BtnCancel.label, }} onClick={() => deleteMessage(messageDetailId)}>
                            {t("words.delete")}
                        </Button>
                    </div>
                    <div>
                        <Button classes={{ root: BtnSave.root, label: BtnSave.label, }} onClick={modalDelete}>
                            {t("words.cancel")}
                        </Button>
                    </div>
                </ModalFooter>
            </Modal>
            <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    {t("words.message_created")}
                </Alert>
            </Snackbar>
            <Snackbar open={openError} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {t("words.fields_empty")}
                </Alert>
            </Snackbar>
            <Snackbar open={openDeleted} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    {t("words.message_deleted")}
                </Alert>
            </Snackbar>
            <Snackbar open={OpenError2} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {t("words.message_already_sent")}
                </Alert>
            </Snackbar>
            <Snackbar open={openResent} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    {t("words.message_resented")}
                </Alert>
            </Snackbar>
            <Snackbar open={openUpdate} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    {t("words.updated_message")}
                </Alert>
            </Snackbar>
            <Snackbar open={openErro3} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {t("words.unable_create_message")}
                </Alert>
            </Snackbar>
            <Snackbar open={openCreating} autoHideDuration={100000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="info">
                    {t("words.creating")}
                </Alert>
            </Snackbar>
            <Snackbar open={openErrorSize} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {t("words.error_image_size")}
                </Alert>
            </Snackbar>
        </Container >
    );
}

export default MessageForm;