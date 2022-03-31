import React from 'react';
import { Modal, ModalHeader, ModalFooter } from 'reactstrap';
import { saveBtn } from '../../../Styles/styles';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import axios_base_chat from '../../../axios_base_chat';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useTranslation } from "react-i18next";
import { useHistory } from 'react-router-dom';
import ContactInformation from '../../../Assets/IconesChat/ContactInformation.svg';
import PhoneInput, { formatPhoneNumberIntl } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import {
    Container,
    InputArea,
    UseStyle,
    Block,
    Body,
    Line,
    Text,
} from './styles';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const NewContact = ({ who, id, open }) => {

    const { t } = useTranslation();
    const history = useHistory();
    const classes = UseStyle();
    const btnSvae = saveBtn();

    const [value, setValue] = React.useState();
    const [name, setName] = React.useState();
    const [desc, setDesc] = React.useState();

    const [openSucces, setSucces] = React.useState(false);
    const [newChat, setNewChat] = React.useState(false);
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

    const newContactToggle = () => {
        setNewChat(!newChat);
    }

    const editContactToggle = () => {
        setNewChat(!newChat);
        try {
            axios_base_chat.get(`/chat/contact/${id}`)
                .then(res => {
                    setName(res.data.name);
                    setValue(formatPhoneNumberIntl('+' + res.data.jid.split(':')[0]));
                    setDesc(res.data.observation);
                })
                .catch(err => {

                })
        } catch (error) {

        }
    }

    const update = (name, desc) => {
        if (!name || !desc) {
            setError(true);
        }
        else {
            setInfo(true);
            try {

                var data = {
                    "name": name,
                    "observation": desc,
                }
                axios_base_chat.patch(`/chat/contact/${id}`, data)
                    .then(res => {
                        setInfo(false);
                        setSucces(true);
                        setDesc('');
                        setValue();
                        setName('');
                        localStorage.setItem("updated", "true");
                        history.push('/attendant/chat');

                    })
                    .catch(err => {
                        setError(true);
                    })
            } catch (error) {
                setError(true);
            }
        }

    }

    const create = (name, phone, desc) => {
        if (!name || !phone) {
            setError(true);
        } else {
            try {
                setInfo(true);
                var data = {
                    "name": name,
                    "number": phone,
                    "observation": desc,
                }
                axios_base_chat.post(`/chat/contact`, data)
                    .then(res => {
                        setInfo(false);
                        setSucces(true);
                        setDesc('');
                        setValue();
                        setName('');
                        localStorage.setItem("updated", "true");
                        setNewChat(!newChat);
                        history.push('/attendant/chat')
                    })
                    .catch(err => {
                        setInfo(false);
                        setError(true)
                    })
            } catch (error) {

            }

        }
    }


    return (
        <Container>
            {who === "new" && <Button className={classes.btn} onClick={newContactToggle}> <AddCircleIcon style={{ color: '#FFFFFF ' }} /> </Button>}
            {who === "edit" && <img src={ContactInformation} alt="Contact" onClick={() => editContactToggle()} />}
            {who === "view" && <Button style={{ color: '#0F7BFF', backgroundColor: '#F0F4FC', width: '15vw', height: '8vh', borderRadius: '6px' }} onClick={() => editContactToggle()}> View Profile </Button>}

            <Modal isOpen={newChat} toggle={newContactToggle} className={classes.modal} >
                <ModalHeader className={classes.backgroundColor}><p style={{ font: "normal normal bold 20px/26px", color: "#434343", textTransform: "uppercase", }}>{who === "new" ? t("words.new_contact") : t("words.edit_contact")}</p></ModalHeader>
                <Body>
                    <Block>
                        <Text>
                            {t("words.name")}
                        </Text>
                        <Line>
                            <input
                                id="text_mensagem"
                                type="text"
                                placeholder={t("words.name")}
                                style={{ height: "40px" }}
                                className={classes.input}
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </Line>
                        <Text>
                            {t("words.telephone")}
                        </Text>
                        <Line style={{ paddingBottom: "25px" }}>
                            {who === "edit" || who === "view" ? <PhoneInput
                                placeholder={t("words.phone_number")}
                                value={formatPhoneNumberIntl(value)}
                                onChange={setValue}
                                readOnly
                                style={{ border: '2px solid #D0DAED', width: '100%', height: "40px", flex: 1, paddingLeft: '10px', borderRadius: '3px' }}
                            /> : <PhoneInput
                                placeholder={t("words.phone_number")}
                                value={value}
                                onChange={setValue}
                                style={{ border: '2px solid #D0DAED', width: '100%', height: "40px", flex: 1, paddingLeft: '10px', borderRadius: '3px' }}
                            />}

                        </Line>
                    </Block>

                    <Text>
                        Description
                    </Text>

                    <Block>
                        <InputArea>
                            <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder='Example: weekly classes with the math group' id="exampleFormControlTextarea1" className={classes.textArea} rows="6"></textarea>
                        </InputArea>
                    </Block>
                </Body>
                {who === "new" ? <ModalFooter className={classes.backgroundColor}>
                    <div style={{ cursor: 'pointer' }} onClick={() => setNewChat(!newChat)}>
                        {t("words.cancel")}
                    </div>
                    <div>
                        <Button classes={{ root: btnSvae.root, label: btnSvae.label, }} onClick={() => create(name, value, desc)}>
                            {t("words.save")}
                        </Button>
                    </div>

                </ModalFooter> :
                    <ModalFooter className={classes.backgroundColor}>
                        <div style={{ cursor: 'pointer' }} onClick={() => setNewChat(!newChat)}>
                            {t("words.close")}
                        </div>
                        <div id="update">
                            <Button classes={{ root: btnSvae.root, label: btnSvae.label, }} onClick={() => update(name, desc)}>
                                {t("words.save")}
                            </Button>
                        </div>

                    </ModalFooter>}

                <Snackbar open={openSucces} autoHideDuration={2000} onClose={handleClose}>
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
        </Container >
    )

}

export default NewContact;