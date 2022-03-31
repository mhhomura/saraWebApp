import React from 'react';
import { Avatar } from '@material-ui/core';
import TransferContact from '../../../Assets/IconesChat/TransferContact.svg';
import { useLocation, useHistory } from 'react-router-dom';
import axios_base_chat from '../../../axios_base_chat';
import Snackbar from '@material-ui/core/Snackbar';
import { BtnBlue } from '../../../Styles/styles';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import { Modal, ModalBody } from 'reactstrap';
import MuiAlert from '@material-ui/lab/Alert';
import moment from 'moment';
import { useChat } from '../../../Providers/chat';



import {
    Container,
    ChatList,
    ChatLines,
    ChatLine,
    ChatName,
    ChatDate,
    ChatMessage,
    Icone,
    UseStyle,
    Bottom,
    Middle,
    Top,
} from './styles';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const ChatOperatorList = ({ name, id, image, origin, logged_at, type }) => {

    const classes = UseStyle();
    const blueB = BtnBlue();
    const { t } = useTranslation();
    const { chat } = useChat();

    const [modal, setModal] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [done, setDone] = React.useState(false);

    const [text, setText] = React.useState("Atendimento transferido")

    const handleClose = () => {
        setDone(false);
        setError(false);
    }
    const handClick = () => {
        setModal(!modal);
    };

    const history = useHistory();
    const location = useLocation();

    React.useEffect(() => {
    }, [location])

    const transferAttendance = (id, message) => {
        try {
            var data = null;
            if (origin === "transfer_sector") {
                data = {
                    "department_id": id,
                    "operator_id": null,
                    "message": message,
                }
            } else {
                data = {
                    "department_id": chat.sectorID,
                    "operator_id": id,
                    "message": message,
                }
            }
            axios_base_chat.patch(`/chat/department/${chat.sectorID}/attendance/${parseInt(localStorage.getItem("chat"))}/transfer`, data)
                .then(res => {
                    setDone(true);
                    setModal(!modal);

                })
                .catch(err => {
                    console.log(err?.response?.data?.message);
                    setError(true)
                })
        } catch (error) {

        }
    }

    return (
        <Container >

            <ChatList >
                {origin === "transfer_sector" ? <Icone><img src={image} alt={name} /></Icone> : <Avatar alt={name} src={image} style={{ width: '50px', height: '50px', marginLeft: '15px' }} />}
                <ChatLines >
                    <ChatLine>
                        <ChatName>
                            <p>{name}</p>
                        </ChatName>
                        <ChatDate>
                            {origin === "transfer" || origin === "transfer_sector" ? <img src={TransferContact} alt=" " onClick={handClick} /> : "sice"}
                        </ChatDate>

                    </ChatLine>
                    <ChatLine>
                        {origin !== "transfer_sector" &&
                            <ChatMessage>
                                <p>{type === "common" ? t("words.operator") : t("words.manager")}</p>
                            </ChatMessage>}

                        {origin === "transfer" || origin === "transfer_sector" ? <p></p> : <p>{logged_at === "never_logged" ? t("words.never_logged") : moment(logged_at).format('LT')}</p>}
                    </ChatLine>
                </ChatLines>
            </ChatList>


            <Modal isOpen={modal} toggle={handClick} className={classes.modal}>
                <ModalBody style={{ backgroundColor: '#F3F7FF', borderRadius: '6px', padding: '25px 30px' }}>
                    <Top>
                        <h3>{t("words.transfer_attendance")}</h3>
                    </Top>
                    <Middle>
                        <div>
                            <h6>{name}</h6>
                            <p>Esse atendimento será Tranferido</p>
                        </div>
                        <label for="message" >{t("words.message")}</label>
                        <div style={{ border: '2px solid #D0DAED', borderRadius: '3px', }}>
                            <textarea id="message" value={text} onChange={e => setText(e.target.value)} placeholder={t("words.message")} className={classes.textArea} rows="6"></textarea>
                        </div>
                    </Middle>
                    <Bottom>
                        <div onClick={handClick} style={{ cursor: 'pointer' }}>
                            {t("words.cancel")}
                        </div>
                        <div>
                            <Button classes={{ root: blueB.root, label: blueB.label, }} onClick={() => transferAttendance(id, text)}>
                                {t("words.transfer_attendance")}
                            </Button>
                        </div>
                    </Bottom>
                </ModalBody>
            </Modal>

            <Snackbar open={done} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    {t("words.done")}
                </Alert>
            </Snackbar>
            <Snackbar open={error} autoHideDuration={5000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {t("words.something_wrong")}
                </Alert>
            </Snackbar>
        </Container>
    )
}

export default ChatOperatorList;