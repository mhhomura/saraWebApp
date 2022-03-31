import React from 'react';
import { Modal, ModalBody } from 'reactstrap';
import finishedConversantionGray from '../../../Assets/IconesChat/FinishedConversationsGray.svg';
import finishedConversantion from '../../../Assets/IconesChat/FinishedConversations.svg';
import { BlueButtom, BtnBlue } from '../../../Styles/styles';
import axios_base_chat from '../../../axios_base_chat';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import MuiAlert from '@material-ui/lab/Alert';
import { useChat } from '../../../Providers/chat';
import { useTranslation } from 'react-i18next';

import {
    LightTooltip,
    Container,
    UseStyle,
    Bottom,
    Middle,
    Top,
} from "./styles";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const FinisheAttendance = ({ id, name }) => {

    const buttonBlue = BlueButtom();
    const history = useHistory();
    const classes = UseStyle();
    const blueB = BtnBlue();
    const { chat } = useChat();
    const { t } = useTranslation();

    const [message, setMessage] = React.useState("Atendimento finalizado, Agradecemos pelo seu contato");

    const [attendanceFinished, setFinished] = React.useState(false);
    const [modal, setModal] = React.useState(false);
    const [error, setError] = React.useState(false);

    const handleClose = () => {
        setFinished(false);
        setError(false)
    }

    const handClick = () => {
        setModal(!modal);
    };

    const finisheAttendance = (message) => {
        var data = {
            "message": message,
        }
        try {
            axios_base_chat.patch(`chat/department/${chat.sectorID}/attendance/${id}/finish`, data)
                .then(res => {
                    localStorage.setItem("updated", "true");
                    localStorage.setItem('chat', "null");
                    setFinished(true);
                    handClick();
                    history.push('/attendant/chat');


                })
                .catch(err => {
                    setError(true);
                })
        } catch (error) {

        }
    }


    return (
        <Container>
            <LightTooltip title="Finalizar atendimento" placement="top">
                {localStorage.getItem("operator") !== localStorage.getItem("operatorId") ?
                    <Button classes={{ root: buttonBlue.root, label: buttonBlue.label, }} style={{ color: '#A5B9D5' }}>
                        <img src={finishedConversantionGray} alt=" " style={{ marginRight: '10px' }} /> {t("words.finish_att")}
                    </Button> :
                    <Button classes={{ root: buttonBlue.root, label: buttonBlue.label, }} onClick={handClick}>
                        <img src={finishedConversantion} alt=" " style={{ marginRight: '10px' }} /> {t("words.finish_att")}
                    </Button>}

            </LightTooltip>
            <Modal isOpen={modal} toggle={handClick} className={classes.modal}>
                <ModalBody style={{ backgroundColor: '#F3F7FF', borderRadius: '6px', padding: '25px 30px' }}>
                    <Top>
                        <h3>{t("words.finish_att")}</h3>
                    </Top>
                    <Middle>
                        <div>
                            <h6>{name}</h6>
                            <p>Esse atendimento será finalizado, e podera ser acesaado em "Atendimentos Finalizados"</p>
                        </div>
                        <label for="message" >Message</label>
                        <div style={{ border: '2px solid #D0DAED', borderRadius: '3px', }}>
                            <textarea id="message" value={message} onChange={e => setMessage(e.target.value)} placeholder='Mensagem para fizalizar atendimento' className={classes.textArea} rows={6}></textarea>
                        </div>
                    </Middle>
                    <Bottom>
                        <div style={{ cursor: 'pointer', }} onClick={handClick}>
                            {t("words.cancel")}
                        </div>
                        <div>
                            <Button classes={{ root: blueB.root, label: blueB.label, }} onClick={() => finisheAttendance(message)}>
                                {t("words.finish_att")}
                            </Button>
                        </div>
                    </Bottom>
                </ModalBody>
                <Snackbar open={attendanceFinished} autoHideDuration={3000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                        Atendimento Finalizado
                    </Alert>
                </Snackbar>
                <Snackbar open={error} autoHideDuration={3000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                        {t("words.something_wrong")}
                    </Alert>
                </Snackbar>
            </Modal>

        </Container>
    )

}

export default FinisheAttendance;