import { Button, FormControl, RadioGroup, FormControlLabel, Radio, Snackbar, } from '@material-ui/core';
import { ModalFooter, ModalBody, ModalHeader, FormGroup, Input } from 'reactstrap';
import { Container, Label, ConfigForm, ConfigModal } from './styles.js';
import { cancelBtn2, saveBtn2 } from '../../../Styles/styles';
import InfoTooltip from '../../Components/InfoTooltip';
import { useTranslation } from "react-i18next";
import MuiAlert from '@material-ui/lab/Alert';
import axios_base from '../../../axios_base';
import React from 'react';

const AdminConfigModal = ({ toggle, isOpen, idNumber }) => {
    console.log('AdminConfigModal', isOpen);

    const { t } = useTranslation();
    const [numberId, setNumberId] = React.useState(idNumber);
    const [sectorList, setSectorList] = React.useState([]);

    const [mode, setMode] = React.useState('automated');
    const [availableMsg, setAvailableMsg] = React.useState();
    const [unavailableMsg, setUnavailableMsg] = React.useState();
    const [initialMsg, setInitialMsg] = React.useState();
    const [sectorId, setSectorId] = React.useState(null);
    const [statusAttendance, setStatusAttendance] = React.useState('active');

    //Alertas de erro
    const [addSuccess, setAddSuccess] = React.useState(false);
    const [sectorError, setSectorError] = React.useState(false);
    const [generalError, setGeneralError] = React.useState(false);

    const CancelBtn = cancelBtn2();
    const SaveBtn = saveBtn2();

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
    const handleClose = () => {
        setAddSuccess(false);
        setSectorError(false);
        setGeneralError(false);
    };

    const handleChangeMode = (event) => {
        setMode(event.target.value);
    };

    const handleAttendanceStatus = (event) => {
        setStatusAttendance(event.target.value);
    };

    const handleChangeSector = (event) => {
        setSectorId(Number.parseInt(event.target.value));
    }

    const createMsgs = () => {
        if (mode === 'manual' && sectorId === null | isNaN(sectorId)) {
            setSectorError(true);
        }
        else {
            var data = {
                "mode": mode,
                "default_department_id": mode === "manual" ? sectorId : null,
                "message_available": document.getElementById("availableMsg").value,
                "message_unavailable": document.getElementById("unavailableMsg").value,
                "message_initial": document.getElementById("initialMsg").value,
                "is_active": statusAttendance === 'active'
            }
            axios_base.patch(`/number/${numberId}/attendance`, data)
                .then(res => {
                    console.log(res.data);
                    setAddSuccess(true);
                    toggle(false);
                })
                .catch((error) => {
                    setGeneralError(true);
                });
        }
    }

    const fetchAttendance = () => {
        axios_base.get(`/number/${numberId}/attendance`)
            .then(({ data }) => {
                setSectorId(data.default_department_id)
                setMode(data.mode)
                setAvailableMsg(data.message_available)
                setUnavailableMsg(data.message_unavailable)
                setInitialMsg(data.message_initial)
                setStatusAttendance(data.is_active ? 'active' : 'inactive')
            })
            .catch((error) => {
                if (error?.response?.data?.message === 'record not found') return;
                setGeneralError(true);
            });
    }

    const getSectors = () => {
        try {
            axios_base.get(`/number/${numberId}/department`)
                .then(res => {
                    console.log(res.data, res.data.id)
                    setSectorList(res.data)
                    setSectorId(res.data[0]?.id)
                })
        } catch (error) {

        }
    }

    React.useEffect(() => {
        setNumberId(idNumber);
        if (!idNumber || !isOpen) return;

        getSectors()
        fetchAttendance()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, idNumber])

    return (
        <Container>
            <ConfigModal isOpen={isOpen} toggle={toggle} >
                <ModalHeader>
                    {t("words.auto_settings").toUpperCase()}
                </ModalHeader>
                <ModalBody>
                    <ConfigForm>
                        <FormGroup>
                            <Label htmlFor="statusSetor" className='labels'>{t("words.auto_attendance")}</Label>
                            <FormControl component="fieldset" className='radioAttStatus'>
                                <RadioGroup aria-label="status" name="status" value={statusAttendance} onChange={handleAttendanceStatus}>
                                    <FormControlLabel value="active" control={<Radio color='primary' />} label={t("words.status_active")} />
                                    <FormControlLabel value="inactive" control={<Radio color='primary' />} label={t("words.inactive")} />
                                </RadioGroup>
                            </FormControl>

                            <Label htmlFor="attMode" className='labels'>{t("words.attendance_mode")}<InfoTooltip text={t("words.auto_att_tooltip")} /></Label>
                            <Input type="select" name="selectMode" id="selectMode" className='selectMode' value={mode} onChange={handleChangeMode} >
                                <option label={t("words.choice_sector")} value='automated' />
                                <option label={t("words.sorting_sector")} value='manual' />
                            </Input>

                            {mode === 'automated' ? null :
                                <div>
                                    <Label htmlFor="setorTriagem" className='labels'>{t("words.sort_sector")}</Label>
                                    <Input type="select" name="selectTriagem" id="selectTriagem" className='selectMode' value={sectorId} onChange={handleChangeSector}>
                                        <option label={t("words.select_the_sector")} />
                                        {sectorList.map(sector => (
                                            <option key={sector.id} label={sector.name} value={sector.id} />
                                        ))}
                                    </Input>
                                </div>
                            }

                            <Label htmlFor="availableMsg" className='labels'>{t("words.att_available_label")} <InfoTooltip text={t("words.available_msg_tooltip")} /> </Label>
                            <Input type="textarea" name="text" id="availableMsg" className="textFields" onChange={(e) => setAvailableMsg(e.target.value)} value={availableMsg != null ? availableMsg : t("words.available_msg")} />

                            <Label htmlFor="unavailableMsg" className='labels'>{t("words.att_unavailable_label")} <InfoTooltip text={t("words.unavailable_msg_tooltip")} /> </Label>
                            <Input type="textarea" name="text" id="unavailableMsg" className="textFields" onChange={(e) => setUnavailableMsg(e.target.value)} value={unavailableMsg != null ? unavailableMsg : t("words.unavailable_msg")} />

                            <Label htmlFor="initialMsg" className='labels'>{t("words.att_initial_label")} <InfoTooltip text={t("words.initial_msg_tooltip")} /> </Label>
                            <Input type="textarea" name="text" id="initialMsg" className="textFields" onChange={(e) => setInitialMsg(e.target.value)} value={initialMsg != null ? initialMsg : t("words.initial_msg")} />

                        </FormGroup>
                    </ConfigForm>
                </ModalBody>
                <ModalFooter>
                    <Button classes={{ root: CancelBtn.root, label: CancelBtn.label, }} onClick={toggle} className="cancelButton" style={{ marginRight: '10px' }}>{t("words.close")}</Button>
                    <Button classes={{ root: SaveBtn.root, label: SaveBtn.label, }} onClick={() => createMsgs()}>{t("words.save")}</Button>
                </ModalFooter>
            </ConfigModal>

            <Snackbar open={addSuccess} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    {t("words.auto_att_success")}
                </Alert>
            </Snackbar>
            <Snackbar open={sectorError} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {t("words.select_sector")}
                </Alert>
            </Snackbar>
            <Snackbar open={generalError} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" style={{ marginBottom: '60px' }}>
                    {t("words.msgfield_blank")}
                </Alert>
            </Snackbar>
        </Container>
    )
}

export default AdminConfigModal;