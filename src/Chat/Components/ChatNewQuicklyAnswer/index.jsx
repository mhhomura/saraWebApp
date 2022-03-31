import React from 'react';
import { Modal, ModalHeader, ModalFooter } from 'reactstrap';
import edit from '../../../Assets/attendance/edit.svg';
import Snackbar from '@material-ui/core/Snackbar';
import { BtnBlue } from '../../../Styles/styles';
import { useTranslation } from "react-i18next";
import { useHistory } from 'react-router-dom';
import MuiAlert from '@material-ui/lab/Alert';
import { Button } from '@material-ui/core';
import Select from 'react-select';

import {
    Container,
    InputArea,
    UseStyle,
    Body,
    Line,
    Text,
    Line2,
} from './styles';
import axios_base_chat from '../../../axios_base_chat';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ChatNewQuicklyAnswer = ({ type, name, content, id }) => {

    const { t } = useTranslation();
    const history = useHistory();
    const classes = UseStyle();
    const btnBlue = BtnBlue();

    const [textContent, setTextContent] = React.useState('');
    const [title, setTitle] = React.useState('');

    const [openSucces, setSucces] = React.useState(false);
    const [openError, setError] = React.useState(false);
    const [openInfor, setInfo] = React.useState(false);

    const handleClose = () => {
        setSucces(false);
    }
    const handleClose1 = () => {
        setError(false);
    }
    const handleClose2 = () => {
        setInfo(false);
    }

    const [modal, setModal] = React.useState(false);
    const handleClick = () => {
        setModal(!modal);
    }
    const handleClickEdit = () => {
        setModal(!modal);
        setTitle(name);
        setTextContent(content);
    }

    const update = (title, message) => {
        try {
            var data = {
                "name": title,
                "content": message
            }
            axios_base_chat.patch(`chat/message-template/${id}`, data)
                .then(res => {
                    setSucces(true);
                    setTitle('');
                    setTextContent('');
                    setModal(!modal);
                    history.push('/attendant/chat');
                })
        } catch (error) {

        }
    }

    const createResponse = (title, message) => {
        try {
            if (title && message) {
                var data = {
                    "name": title,
                    "content": message
                }
                axios_base_chat.post(`/chat/message-template`, data)
                    .then(res => {
                        setSucces(true);
                        setTitle('');
                        setTextContent('');
                        setModal(!modal);
                        history.push('/attendant/chat');

                    })
                    .catch(err => {

                    })
            }
        } catch (error) {

        }
    }

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]
    return (
        <Container>
            {type === "edit" ? <img src={edit} alt="" style={{ cursor: 'pointer' }} onClick={handleClickEdit} /> :
                <Button classes={{ root: btnBlue.root, label: btnBlue.label, }} onClick={handleClick}>
                    {t("words.reg_replay")}
                </Button>}
            <Modal isOpen={modal} toggle={handleClick} className={classes.modal} >
                <ModalHeader className={classes.backgroundColor} style={{ border: '0px' }}><p style={{ font: "normal normal bold 20px/26px", color: "#434343", textTransform: "uppercase" }}> {t("words.reg_replay")}</p></ModalHeader>
                <Body>
                    <Text>
                        {t("words.name")}
                    </Text>
                    <Line>
                        <input
                            id="title_message"
                            type="text"
                            placeholder={t("words.name")}
                            style={{ height: "40px" }}
                            className={classes.input}
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                    </Line>
                    {/* 
                    <Text>Visibility</Text>
                    <Line2>
                        <Select options={options} style={{ border: " 2px solid #D0DAED", }} />
                    </Line2> */}
                    <Text>
                        {t("words.message")}
                    </Text>

                    <InputArea>
                        <textarea value={textContent} onChange={e => setTextContent(e.target.value)} placeholder={t("words.message")} id="message" className={classes.textArea} rows="6"></textarea>
                    </InputArea>
                </Body>

                <ModalFooter className={classes.backgroundColor} style={{ border: '0px' }}>
                    <div style={{ cursor: 'pointer' }} onClick={() => handleClick()}>
                        {t("words.close")}
                    </div>
                    <div id="update">
                        {type === "edit" ?
                            <Button classes={{ root: btnBlue.root, label: btnBlue.label, }} onClick={() => update(title, textContent)} >
                                {t("words.save")}
                            </Button> :
                            <Button classes={{ root: btnBlue.root, label: btnBlue.label, }} onClick={() => createResponse(title, textContent)}>
                                {t("words.save")}
                            </Button>
                        }
                    </div>

                </ModalFooter>

                <Snackbar open={openSucces} autoHideDuration={1000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                        {t("words.done")}
                    </Alert>
                </Snackbar>

                <Snackbar open={openError} autoHideDuration={2000} onClose={handleClose1}>
                    <Alert onClose={handleClose1} severity="error">
                        {t("words.unable_complete")}
                    </Alert>
                </Snackbar>
                <Snackbar open={openInfor} autoHideDuration={10000} onClose={handleClose2}>
                    <Alert onClose={handleClose2} severity="info">
                        {t("words.creating")}
                    </Alert>
                </Snackbar>

            </Modal>

            <Modal>

            </Modal>
        </Container >
    )
}


export default ChatNewQuicklyAnswer;