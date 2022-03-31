import React from 'react';
import startConsersantion from '../../../Assets/IconesChat/StartConversation.svg';
import { Modal, ModalHeader, ModalFooter } from 'reactstrap';
import { useHistory, useLocation } from 'react-router-dom';
import ChatNewQuicklyAnswer from '../ChatNewQuicklyAnswer';
import axios_base_chat from '../../../axios_base_chat';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import { BtnBlue } from '../../../Styles/styles';
import Tooltip from '@material-ui/core/Tooltip';
import { useTranslation } from 'react-i18next';
import InfoIcon from '@material-ui/icons/Info';
import MuiAlert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import {
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
} from '@material-ui/core';

import Select from 'react-select';
import * as MessageService from '../../../Services/message';
import { useChat } from '../../../Providers/chat';

import {
    Container,
    UseStyle,
    Body,
    Block,
    Line2,
    Text,
    BTN,
    InputArea
} from './styles';

const LightTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: "#F3F7FF",
        color: '#505050',
        boxShadow: theme.shadows[1],
        fontSize: '.9rem',
    },
}))(Tooltip);

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const NewChat = () => {

    const { t } = useTranslation();
    const location = useLocation();
    const history = useHistory();
    const classes = UseStyle();
    const btnB = BtnBlue();
    const { chat } = useChat();

    const [contacts, setContacts] = React.useState([]);
    const [messages, setMessages] = React.useState([]);

    const [contactId, setContactId] = React.useState();
    const [error, setErrot] = React.useState();
    const [text, setText] = React.useState();

    const [messageError, setMessageError] = React.useState(false);
    const [messageSent, setMessageSent] = React.useState(false);
    const [statusSign, setStatusSign] = React.useState(true);
    const [createing, setCreating] = React.useState(false);
    const [newChat, setNewChat] = React.useState(false);


    const handleSignChange = () => {
        setStatusSign(!statusSign);
    };

    const newChatToggle = () => {
        setNewChat(!newChat);
    }
    const newChatToggle2 = () => {
        setNewChat(!newChat);
        getContacts();
        getMessages();
    }


    const handleClose = () => {
        setMessageSent(false);
        setCreating(false);
        setMessageError(false);
    }

    const getContacts = () => {
        try {
            axios_base_chat.get(`/chat/contact`)
                .then(res => {
                    setContacts(res.data);
                })
                .catch(err => {

                })
        } catch (error) {

        }
    }

    const startNewConsersantion = (contact, department) => {
        setCreating(true);
        try {
            var data = {
                "department_id": department,
                "contact_id": contact
            }
            axios_base_chat.post(`/chat/department/${chat.sectorID}/attendance`, data)
                .then(res => {

                    const sentMessage = async () => {
                        try {
                            handleClose();
                            await MessageService.send(
                                text, "text",
                                res.data.id,
                                chat.sectorID,
                                sessionStorage.getItem('operator_token'),
                                statusSign
                            );

                            setCreating(false);
                            setMessageSent(true)
                            setText("");
                            newChatToggle();
                            setContactId();
                            localStorage.setItem("updated", "true");
                            localStorage.setItem('chat', "null");
                            history.push(`/attendant/chat`);

                        } catch (error) {
                            setCreating(false);
                            setErrot(error?.response?.message)
                        }
                    }
                    sentMessage();
                })
                .catch(err => {
                    setCreating(false);
                    if (err.response.data.message === "open in another department") {
                        setErrot("Esse contato já possui um atendimento aberto em outro setor");
                    }
                    setMessageError(true)
                })
        } catch (error) {
            setCreating(false);
            setErrot(error?.response?.message)

        }
    }

    const getMessages = () => {
        axios_base_chat.get('/chat/message-template')
            .then(res => {
                setMessages(res.data);
            })
    }

    React.useEffect(() => {
        getMessages();
    }, [location])

    console.log(contacts);
    let contact = contacts.map(cont => ({ label: cont?.name, value: cont.id }));
    let msg = messages.map(msg => ({ label: msg?.content, value: msg.id }));



    return (
        <Container>
            <LightTooltip title={t("words.start_conversation")} placement="top">
                <img src={startConsersantion} alt="" onClick={newChatToggle2} />
            </LightTooltip>
            <Modal isOpen={newChat} toggle={newChatToggle} className={classes.modal} >
                <ModalHeader className={classes.backgroundColor}><p style={{ font: "normal normal bold 20px/26px", color: "#434343", textTransform: "uppercase", }}>{t("words.start_conversation")}</p></ModalHeader>
                <Body>
                    <Block>
                        <Text>
                            {t("words.contacts")}
                        </Text>
                        <Line2>
                            <Select options={contact} onChange={opt => setContactId(opt.value)} />
                            {/*  <select className="form-select" style={{ width: "107px", backgroundColor: "#FFFFFF" }} aria-label="Default select example">
                                <option defaultValue>To sign</option>
                                <option value="1">yes</option>
                                <option value="2">no</option>
                            </select>
                            <input
                                id="text_mensagem"
                                type="text"
                                placeholder='Phone Number'
                                className={classes.input}
                            /> */}
                        </Line2>
                        <Text>
                            {t("words.sign_conversantion")} <InfoIcon style={{ color: "#707070", fontSize: "19px", cursor: "pointer" }} />
                        </Text>
                        <Line2>
                            <FormControl component="fieldset" className='radioSectorStatus'>
                                <RadioGroup aria-label="status" name="status" value={statusSign} onChange={handleSignChange}>
                                    <FormControlLabel value={true} control={<Radio style={{ color: "#0F7BFF" }} />} label={t("words.to_sign")} />
                                    <FormControlLabel value={false} control={<Radio style={{ color: "#0F7BFF" }} />} label={t("words.not_sign")} />
                                </RadioGroup>
                            </FormControl>
                        </Line2>
                    </Block>
                    <Text>
                        {t("words.reg_answers")} <InfoIcon style={{ color: "#707070", fontSize: "19px", cursor: "pointer" }} />
                    </Text>
                    <Block>
                        <Text>{t("words.quick_answers_list")}</Text>
                        <Line2><Select options={msg} onChange={opt => setText(opt.label)} /></Line2>
                        <BTN>
                            <ChatNewQuicklyAnswer type="new" />
                        </BTN>
                    </Block>
                    <Text>
                        {t("words.message")}
                    </Text>

                    <Block>
                        <InputArea>
                            <textarea onChange={e => setText(e.target.value)} value={text} placeholder={t("words.message")} id="exampleFormControlTextarea1" className={classes.textArea} rows="6"></textarea>
                        </InputArea>
                    </Block>
                </Body>
                <ModalFooter className={classes.backgroundColor}>
                    <div style={{ cursor: 'pointer' }} onClick={() => setNewChat(false)}>
                        {t("words.cancel")}
                    </div>
                    <div>
                        <Button classes={{ root: btnB.root, label: btnB.label, }} onClick={() => startNewConsersantion(contactId, chat.sectorID)}>
                            {t("words.send_msg")}
                        </Button>
                    </div>

                </ModalFooter>
            </Modal>

            <Snackbar open={createing} autoHideDuration={10000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="info">
                    {t("words.creating")}
                </Alert>
            </Snackbar>
            <Snackbar open={messageSent} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    {t("words.send_msg_success")}
                </Alert>
            </Snackbar>
            <Snackbar open={messageError} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {t("words.chat_init_error")}, {error}
                </Alert>
            </Snackbar>
        </Container>
    )

}

export default NewChat;