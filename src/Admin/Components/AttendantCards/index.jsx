import { Card, CardBody, CardTitle, Button as ButtonBootstrap, ModalFooter, ModalBody, ModalHeader, Modal, Input } from 'reactstrap';
import { Container, CardsAttendants, CardButtons, CardTitleAvatar, Dot, useStyles } from './styles';
import { Divider, Snackbar, Button } from '@material-ui/core';
import { cancelBtn2, saveBtn2, LightTooltip } from '../../../Styles/styles';
import Thrash from '../../../Assets/admin_img/Trash.svg'
import PersonIcon from '@material-ui/icons/Person';
import LinkIcon from '@material-ui/icons/Link';
import { useTranslation } from "react-i18next";
import MuiAlert from '@material-ui/lab/Alert';
import axios_base from '../../../axios_base';
import React from 'react';

const AttendantCards = ({ attendants, onEdit, onDelete, onSearch }) => {

    const green = useStyles();
    const gray = useStyles();

    const { t } = useTranslation();
    const CancelBtn = cancelBtn2();
    const SaveBtn = saveBtn2();

    const [deleteModal, setDeleteModal] = React.useState(false);
    const [attendantId, setAttendantId] = React.useState(null);
    const [numberId, setNumberId] = React.useState(0);

    const [excludeSuccess, setExcludeSuccess] = React.useState(false);
    const [generalError, setGeneralError] = React.useState(false);
    const [linkSuccess, setLinkSuccess] = React.useState(false);

    const [attendantNameTest, setAttendantNameTest] = React.useState('');
    const [attendantName, setAttendantName] = React.useState('');

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const handleClose = () => {
        setExcludeSuccess(false);
        setGeneralError(false);
        setLinkSuccess(false);
    };

    const toggle = (attendantId, numberId, attendantName) => {
        setDeleteModal(!deleteModal);
        setNumberId(numberId);
        setAttendantId(attendantId);
        setAttendantName(attendantName);
        setAttendantNameTest('');
    }

    const deleteAttendant = () => {
        axios_base.delete(`/number/${numberId}/operator/${attendantId}`)
            .then(res => {
                setExcludeSuccess(true);
                setDeleteModal(false);
                toggle();
                onDelete();
            })
            .catch((error) => {
                setGeneralError(true);
            });
    }

    const copyLink = accessCode => {
        const loginLink = `${window.location.origin}/attendant/login/${accessCode}`;
        const el = document.createElement('textarea');
        el.value = loginLink;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        setLinkSuccess(true);
    }


    React.useEffect(() => {
        setNumberId(numberId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    return (
        <Container>
            <CardsAttendants>
                {attendants.filter((attendant) => {
                    if (onSearch === "") {
                        return attendant
                    } else if (attendant.name.toLowerCase().includes(onSearch.toLowerCase())) {
                        return attendant
                    } else {
                        return null
                    }
                }).map(attendant => (
                    <Card className='cardOutline' key={attendant.id}>
                        <CardBody className='cardBody1'>

                            <CardTitleAvatar variant={attendant.is_active === true ? 'blue' : 'gray'}>
                                <div className='avatarExclusiveDiv'>
                                    <PersonIcon fontSize='large' />
                                </div>
                                <CardTitle className='cardTitle'>{attendant.name.toUpperCase()} </CardTitle>
                            </CardTitleAvatar>

                            <LightTooltip title={attendant.isLogged ? t("words.online_operator") : t("words.offline_operator")}>
                                <div className={attendant.isLogged ? green.green : gray.gray}>
                                    <Dot
                                        overlap="circular"
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right',
                                        }}
                                        variant="dot"
                                        color={attendant.isLogged ? '#2CCC71' : '#898E8D'}
                                    />
                                </div>
                            </LightTooltip>
                        </CardBody>

                        <Divider style={{ opacity: '1' }} />

                        <CardButtons>
                            <CardBody>
                                <ButtonBootstrap variant="primary" className='editButton' onClick={() => onEdit(attendant.id, attendant.name)}>{t("words.atend_edit")}</ButtonBootstrap>
                                <LightTooltip title={t("words.copy_link")} >
                                    <ButtonBootstrap className='copyButton' onClick={() => copyLink(attendant.access_code)} ><LinkIcon className='copyIcon' /></ButtonBootstrap>
                                </LightTooltip>
                                <img src={Thrash} alt="Thrash" className='deleteButton' onClick={() => toggle(attendant.id, attendant.number_id, attendant.name)} />
                            </CardBody>
                        </CardButtons>
                    </Card>
                ))}
            </CardsAttendants>

            <Modal isOpen={deleteModal} toggle={toggle}>
                <ModalHeader>
                    {t("words.delete")}
                </ModalHeader>
                <ModalBody>
                    <h6>{t("words.really_delete")} <b style={{ color: 'red' }}>{attendantName}</b></h6>
                    <Input className="form-input" onChange={e => setAttendantNameTest(e.target.value)} value={attendantNameTest} id="input-delete" />
                </ModalBody>
                <ModalFooter>
                    <div>
                        <Button classes={{ root: CancelBtn.root, label: CancelBtn.label, }} onClick={toggle} className="cancelButton" style={{ marginRight: '10px', }} >{t("words.cancel")}</Button>
                        {attendantName === attendantNameTest ?
                            <Button classes={{ root: SaveBtn.root, label: SaveBtn.label, }} onClick={() => deleteAttendant(attendantId)}>{t("words.delete")}</Button>
                            :
                            null
                        }
                    </div>
                </ModalFooter>
            </Modal>

            <Snackbar open={excludeSuccess} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    {t("words.operator_deleted")}
                </Alert>
            </Snackbar>
            <Snackbar open={generalError} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {t("words.delete_error")}
                </Alert>
            </Snackbar>
            <Snackbar open={linkSuccess} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    {t("words.copied_link")}
                </Alert>
            </Snackbar>
        </Container>
    )
}

export default AttendantCards;