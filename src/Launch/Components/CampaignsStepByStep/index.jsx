import React from "react";
import { Input, Modal, ModalFooter, ModalBody } from 'reactstrap';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import BuildIcon from '@material-ui/icons/Build';
import { Button, Typography, Snackbar } from '@material-ui/core';
import { saveBtn, BtnBlue } from '../../../Styles/styles';
import axios_base from '../../../axios_base';
import Select from 'react-select';
import MuiAlert from '@material-ui/lab/Alert';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import axios from 'axios';
import { useTranslation } from "react-i18next";
import ReactDOM from "react-dom";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { formatPhoneNumberIntl } from 'react-phone-number-input';
import circled_chevron_left from '../../../Assets/icon/circled-chevron-left.svg';
import circled_chevron_right from '../../../Assets/icon/circled-chevron-right.svg';
import Illustration_Attention from '../../../Assets/icon/Illustration_Attention.png';
import Close from '../../../Assets/attendance/Cloese.svg';


import {
    Container,
    ColorlibConnector,
    useQontoStepIconStyles,
    useColorlibStepIconStyles,
    PrettoSlider,
    Label,
    Top,
    TopBar,
    Body,
    BodyCard,
    Div,
    DivStep,
    Colunm1,
    Colunm2,
    TextTitle,
    Line,
    Line2,
    InfoBody,
    InfoImage,
    BoxViewNumber,
} from './style';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function QontoStepIcon(props) {
    const classes = useQontoStepIconStyles();
    const { active, completed } = props;

    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
            })}
        >
            {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
        </div>
    );
}
QontoStepIcon.propTypes = {
    /**
     * Whether this step is active.
     */
    active: PropTypes.bool,
    /**
     * Mark the step as completed. Is passed to child components.
     */
    completed: PropTypes.bool,
};

function ColorlibStepIcon(props) {
    const classes = useColorlibStepIconStyles();
    const { active, completed } = props;

    const icons = {
        1: <SettingsIcon />,
        2: <GroupAddIcon />,
        3: <BuildIcon />,
    };

    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
                [classes.completed]: completed,
            })}
        >
            {icons[String(props.icon)]}
        </div>
    );
}


ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     */
    active: PropTypes.bool,
    /**
     * Mark the step as completed. Is passed to child components.
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,
};


const StepByStep = (props) => {
    const { t } = useTranslation();

    const {
        title,
        buttonLabel,
    } = props;


    /*  const BtnSave = saveBtn(); */
    const BtnSave = saveBtn();
    const btn = BtnBlue();
    const history = useHistory();

    /*  const id = openPopover ? 'simple-popover' : undefined; */

    const [campaignName, setName] = React.useState('');
    const [GruoupName, setNameGroup] = React.useState('');
    const [valuePermission, setPermision] = React.useState(false);
    /* Atualiza o value dos Sliders */
    const [valueGroup, setValueG] = React.useState(100);
    const handleChangeG = (event, newValue) => {
        setValueG(newValue)
    }
    const [valuePeople, setValueP] = React.useState(235);
    const handleChangeP = (event, newValue) => {
        setValueP(newValue)
    }
    const [valueInitial, setValueI] = React.useState(1);
    const handleChangeI = (event, newValue) => {
        setValueI(newValue)
    }

    const checkPermission = (event) => {
        let checkbox = document.getElementById('autoGroup');
        if (checkbox.checked) {
            setPermision(true)
        } else {
            setPermision(false)
        }
    }

    const [num, setNum] = React.useState('');
    const [listNum, setListNum] = React.useState([]);
    const [adm, setAdms] = React.useState([]);
    const [listAdm, setListAdm] = React.useState([]);
    const [description, setDescription] = React.useState();

    function loadNum() {
        axios_base.get('/number')
            .then(res => {
                var info = res.data;
                setListNum(info);
            })
    }

    function loadAdms(id) {
        try {
            setNumSelected(id)
            setNum(id.value);
            axios_base.get(`/number/${id.value}/status`)
                .then(res => {
                    axios_base.get(`/number/${id.value}/contacts`)
                        .then(res => {
                            console.log(res.data, '--------------->');
                            var contacts = res.data.contacts;
                            setListAdm(contacts);
                        })
                        .catch(err => {
                            console.log(err.response);
                        })
                })
                .catch(err => {
                    setModal2(true);
                });
        } catch (error) {

        }

    }
    React.useEffect(() => {
        loadNum();
    }, []);

    const CreateCampaing = (campaignName, adm, GruoupName, description, imageGroup, valueGroup, valuePeople, valueInitial, valuePermission) => {
        try {
            if (valuePeople <= adm.length + 1) { //Não deixa criar um grupo onde o numero de pessoas permitidas seja menor que a quantidade de adm
                setOpen2(true);
            } else {
                if (!valueGroup || !valuePeople || !valueInitial || !num || !campaignName || adm.length === 0 || !GruoupName || !description || !imageGroup) {
                    setOpenError(true);
                }
                else {
                    try {
                        setOpenCreate(true);
                        var data = new FormData();;
                        data.append("number_id", parseInt(num));
                        data.append("name", campaignName);
                        data.append("group_name", GruoupName);
                        data.append("group_description", description);
                        data.append("group_image", imageGroup);
                        data.append("group_count", valueGroup);
                        data.append("member_count_per_group", valuePeople);
                        data.append("initial_group_number", valueInitial);
                        data.append("enable_member_repeat", valuePermission);
                        /*  data.append("administrators", adm.map(contacts => (contacts.value))); */
                        adm.map(contacts => (contacts.value)).forEach(contacts => data.append("administrators", contacts));
                        const options = {
                            method: 'POST',
                            url: `${process.env.REACT_APP_LINK_API}/campaign`,
                            headers: {
                                'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001',
                                Authorization: `Bearer ${sessionStorage.getItem('token')}`
                            },
                            data: data
                        };
                        axios.request(options).then(res => {
                            sessionStorage.setItem('campaign', true);
                            setOpenCreate(false);
                            setOpen(true);
                            toggle();
                            setOpen(true);
                            history.push(`/campaigns/${res.data.id}/detail`);
                        }).catch(function (error) {
                            setOpenCreate(false);
                            setOpenError2(true);
                        });
                    } catch (error) {
                        setOpenCreate(false);
                        setOpenError2(true);
                    }

                }

            }
        } catch (error) {

        }
    }

    let optionsNumbers = listNum.map(number => ({ label: formatPhoneNumberIntl('+' + number.number.split(':')[0]), value: number.id }));
    let options = listAdm?.map(contacts => ({ label: contacts.name, value: contacts.jid })).sort((a, b) => a.label.localeCompare(b.label));

    const [numSelected, setNumSelected] = React.useState([]);

    const [modal2, setModal2] = React.useState(false);
    const toggle = () => {
        setNumSelected()
        setActiveStep(0);
        setModal(!modal);
        setfile();
    }
    const toggle3 = () => {
        setModal2(!modal2);
        setModal(!modal);
    }

    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [openError, setOpenError] = React.useState(false);
    const [openCreating, setOpenCreate] = React.useState(false);
    const [openError2, setOpenError2] = React.useState(false);
    const [errorSize, setErrorSize] = React.useState(false);


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenCreate(false)
        setOpenError(false);
        setOpenError2(false);
        setOpen(false);
        setOpen2(false);
        setErrorSize(false);

    };
    const [file, setfile] = React.useState();
    const [imageGroup, setImageGroup] = React.useState();
    const handleChangeImg = (event) => {
        var converted = event.target.files[0].size / (1024 * 1024);
        var roundTo = null;
        roundTo = converted.toFixed(roundTo);

        if (roundTo > 12) {
            event.target.value = null;
            setErrorSize(true);
        } else {
            setImageGroup(event.target.files[0]);
            setfile(URL.createObjectURL(event.target.files[0]));
        }
    }


    const [infoStep, setInfoStep] = React.useState(1);

    const [modal, setModal] = React.useState(false);

    // Steps 
    function getSteps() {
        return [`${t("words.campaign_settings")}`, `${t("words.creat_group")}`, `${t("words.group_settings")}`];
    }
    const [activeStep, setActiveStep] = React.useState(1);
    const steps = getSteps();

    const handleNext = () => {
        if (activeStep === 0) {
            if (!campaignName || !num) {
                if (!campaignName) {
                    ReactDOM.render(<spam style={{ color: 'red', fontSize: '12px' }}>* {t("words.required")}</spam>, document?.getElementById('statusName'));
                    setOpenError(true);
                } if (!num) {
                    ReactDOM.render(<spam style={{ color: 'red', fontSize: '12px' }}>* {t("words.required")}</spam>, document?.getElementById('statusNumber'));
                    setOpenError(true);
                }
            } else {
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
            }
        }
        if (activeStep === 1) {
            if (!GruoupName || !num || !description || !imageGroup || adm.length === 0) {
                if (!GruoupName) {
                    ReactDOM.render(<spam style={{ color: 'red', fontSize: '12px' }}>* {t("words.required")}</spam>, document?.getElementById('statusNameGroup'));
                    setOpenError(true);
                } if (!description) {
                    ReactDOM.render(<spam style={{ color: 'red', fontSize: '12px' }}>* {t("words.required")}</spam>, document?.getElementById('statusDescription'));
                    setOpenError(true);
                } if (!imageGroup) {
                    ReactDOM.render(<spam style={{ color: 'red', fontSize: '12px' }}>* {t("words.required")}</spam>, document?.getElementById('statusImage'));
                    setOpenError(true);
                } if (adm.length === 0) {
                    ReactDOM.render(<spam style={{ color: 'red', fontSize: '12px' }}>* {t("words.required")}</spam>, document?.getElementById('statusAdm'));
                    setOpenError(true);
                }
            }
            else {
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
            }
        }
        if (activeStep === 2) {
            if (valuePeople <= adm.length + 1) { //Não deixa criar um grupo onde o numero de pessoas permitidas seja menor que a quantidade de adm
                setOpen2(true);
            } else {
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
            }
        }
        if (activeStep > 2) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };


    function getStepContent(step) {
        switch (step) {
            case 0:
                return <DivStep>
                    <Colunm1>
                        <TextTitle style={{}}>
                            <h5>{t("words.campaign_settings")}</h5>
                            <small>Defina o nome e telefone desejado para sua nova camapanha</small>
                        </TextTitle>
                        <Line >
                            <Label htmlFor="nomeDaCampanha">{t("words.campaing_name")}</Label>
                            <Input maxlength="35" onChange={(e) => setName(e.target.value)} type="text" value={campaignName} name="nomeDaCampanha" id="nomeDaCampanha" placeholder={t("words.campaing_name")} />
                            <div id="statusName"></div>
                        </Line>
                        <Line >
                            <Label htmlFor="exampleSelect">{t("words.number_campaign")}</Label>
                            <Select options={optionsNumbers} onChange={opt => loadAdms(opt)} hasValue value={numSelected} id="select_number" />
                            <div id="statusNumber"></div>
                        </Line>
                    </Colunm1>
                    <Colunm2>
                        <Line2>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div style={{ textAlign: 'left', paddingLeft: '10px', }}>
                                    {infoStep}/3
                                </div>
                                <div style={{ textAlign: 'right', paddingRight: '10px', }}>
                                    <img alt="" src={circled_chevron_left} style={{ cursor: 'pointer' }} onClick={() => infoStep > 1 && setInfoStep(infoStep - 1)} />
                                    <img alt="" src={circled_chevron_right} style={{ cursor: 'pointer' }} onClick={() => infoStep < 3 && setInfoStep(infoStep + 1)} />
                                </div>
                            </div>
                            <InfoImage>
                                <div>

                                </div>
                            </InfoImage>
                            <InfoBody>
                                <h4>
                                    Campaign will be interrupted
                                </h4>
                                <small>
                                    {infoStep === 1 && t("words.make_sure")}
                                    {infoStep === 2 && t("words.in_order")}
                                    {infoStep === 3 && `3. ${t("words.important")}`}
                                </small>
                            </InfoBody>
                        </Line2>
                    </Colunm2>
                </DivStep>;
            case 1:
                return <DivStep>
                    <Colunm1>
                        <TextTitle >
                            <h5>{t("words.creat_group")}</h5>
                            <small>Configure seus grupos</small>
                        </TextTitle>
                        <Line style={{ display: 'flex' }}>
                            <Line style={{ width: '30%' }}>
                                <label htmlFor="contained-button-file" style={{ width: '80%', height: '110px', cursor: 'pointer', backgroundColor: '#E8F0FE', backgroundSize: 'cover', backgroundImage: `url(${file})`, textAlign: 'center', marginBottom: '5%', borderRadius: '100%' }}>
                                    <input accept="image/jpeg" style={{ opacity: '0', width: '100%', height: '50%' }} id="contained-button-file" type="file" onChange={handleChangeImg} class="form-control" required />
                                    <PhotoCamera />
                                </label>
                                <div id="statusImage"></div>
                            </Line>
                            <Line style={{ width: '70%' }}>
                                <Label htmlFor="nomeDoGrupo">{t("words.group_Name")}</Label>
                                <Input maxlength="25" onChange={(e) => setNameGroup(e.target.value)} type="text" value={GruoupName} name="nomeDpGrupo" id="nomeDoGrupo" placeholder={t("words.group_Name")} />
                                <div id="statusNameGroup"></div>
                            </Line>
                        </Line>
                        <Line>
                            <Label htmlFor="admnistradores">{t("words.adm")}</Label>
                            <Select options={options} closeMenuOnSelect={false} isMulti onChange={opt => setAdms(opt)} hasValue value={adm} id="adms" />
                            <div id="statusAdm"></div>
                        </Line>
                        <Line>
                            <Label htmlFor="descricao">{t("words.description")}</Label>
                            <Input maxlength="512" onChange={(e) => setDescription(e.target.value)} value={description} type="textarea" name="descricao" id="descricao" placeholder={t("words.description")} />
                            <div id="statusDescription"></div>
                        </Line>
                    </Colunm1>
                    <Colunm2>
                        <Line2>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div style={{ textAlign: 'left', paddingLeft: '10px', }}>
                                    {infoStep}/3
                                </div>
                                <div style={{ textAlign: 'right', paddingRight: '10px', }}>
                                    <img alt="" src={circled_chevron_left} style={{ cursor: 'pointer' }} onClick={() => infoStep > 1 && setInfoStep(infoStep - 1)} />
                                    <img alt="" src={circled_chevron_right} style={{ cursor: 'pointer' }} onClick={() => infoStep < 3 && setInfoStep(infoStep + 1)} />
                                </div>
                            </div>
                            <InfoImage>
                                <div>

                                </div>
                            </InfoImage>
                            <InfoBody>
                                <h4>
                                    Campaign will be interrupted
                                </h4>
                                <small>
                                    {infoStep === 1 && t("words.make_sure")}
                                    {infoStep === 2 && t("words.in_order")}
                                    {infoStep === 3 && `3. ${t("words.important")}`}
                                </small>
                            </InfoBody>
                        </Line2>
                    </Colunm2>
                </DivStep>;
            case 2:
                return <DivStep >
                    <Colunm1>
                        <TextTitle >
                            <h5>{t("words.group_settings")}</h5>
                            <small>Configure as quantidades de mebros e grupos</small>
                        </TextTitle>
                        <Line>
                            <div style={{ width: '50%' }}>
                                <Typography id="non-linear-slider" gutterBottom>
                                    {t("words.number_groups")}
                                </Typography>
                                <div style={{ display: 'flex' }}>
                                    <BoxViewNumber>
                                        {valueGroup}
                                    </BoxViewNumber>
                                    <div style={{ paddingLeft: '15px', width: '100%' }}>
                                        <PrettoSlider value={valueGroup} onChange={handleChangeG} valueLabelDisplay="auto" /* disabled={disabled} */ defaultValue={100} max={500} min={1} step={1} />
                                    </div>
                                </div>

                            </div>
                            <small>{t("words.groups_per_campaign")}</small>
                        </Line>
                        <Line>
                            <div style={{ width: '50%' }}>
                                <Typography id="discrete-slider-always" gutterBottom>
                                    {t("words.people_Limit")}
                                </Typography>
                                <div style={{ display: 'flex' }}>
                                    <BoxViewNumber>
                                        {valuePeople}
                                    </BoxViewNumber>
                                    <div style={{ paddingLeft: '15px', width: '100%' }}>
                                        <PrettoSlider valueLabelDisplay="auto" value={valuePeople} onChange={handleChangeP} defaultValue={235} max={235} min={1} step={1} />
                                    </div>
                                </div>
                            </div>
                            <small>{t("words.people_per_group")}</small>
                        </Line>
                        <Line>
                            <div style={{ width: '50%' }}>
                                <Typography id="discrete-slider-always" gutterBottom>
                                    {t("words.initial_number")}
                                </Typography>
                                <div style={{ display: 'flex' }}>
                                    <BoxViewNumber>
                                        {valueInitial}
                                    </BoxViewNumber>
                                    <div style={{ paddingLeft: '15px', width: '100%' }}>
                                        <PrettoSlider value={valueInitial} onChange={handleChangeI} valueLabelDisplay="auto" defaultValue={100} min={1} step={1} />
                                    </div>
                                </div>
                            </div>
                            <small>{t("words.group_identifier")}</small>
                        </Line>
                        <Line>
                            <Label check>
                                <Input type="checkbox" value={valuePermission} onChange={checkPermission} id="autoGroup" />{' '}
                                {t("words.allow_customers")}
                            </Label>
                        </Line>
                    </Colunm1>
                    <Colunm2>
                        <Line2>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div style={{ textAlign: 'left', paddingLeft: '10px', }}>
                                    {infoStep}/3
                                </div>
                                <div style={{ textAlign: 'right', paddingRight: '10px', }}>
                                    <img alt="" src={circled_chevron_left} style={{ cursor: 'pointer' }} onClick={() => infoStep > 1 && setInfoStep(infoStep - 1)} />
                                    <img alt="" src={circled_chevron_right} style={{ cursor: 'pointer' }} onClick={() => infoStep < 3 && setInfoStep(infoStep + 1)} />
                                </div>
                            </div>
                            <InfoImage>
                                <div>

                                </div>
                            </InfoImage>
                            <InfoBody>
                                <h4>
                                    Campaign will be interrupted
                                </h4>
                                <small>
                                    {infoStep === 1 && t("words.make_sure")}
                                    {infoStep === 2 && t("words.in_order")}
                                    {infoStep === 3 && `3. ${t("words.important")}`}
                                </small>
                            </InfoBody>
                        </Line2>
                    </Colunm2>
                </DivStep>;
            default:
                return 'Unknown step';
        }
    }
    // Steps 

    return (
        <Container>
            <Button className={btn.root} onClick={toggle}>{buttonLabel}</Button>
            <Modal isOpen={modal} toggle={toggle} style={{ maxWidth: '1113px', background: '#F3F7FF', boxShadow: '0px 14px 32px #00000040', borderRadius: '10px', }}>
                <Top>
                    <TopBar style={{}}>
                        <Div >
                            <h3>{t("words.create_camp")}</h3>
                        </Div>
                        <Div >
                            <Stepper style={{ width: '100%', height: '100%', background: 'transparent' }} alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
                                {steps.map((label) => (
                                    <Step key={label}>
                                        <StepLabel StepIconComponent={ColorlibStepIcon} style={{ paddingRight: '10px', paddingLeft: '10px' }}></StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                        </Div>
                    </TopBar>
                </Top>
                <Body >
                    <BodyCard>
                        {activeStep === steps.length ? (
                            <div>
                                <Typography >
                                    {t("words.done")}
                                </Typography>

                            </div>
                        ) : (
                            <div>
                                <Typography >{getStepContent(activeStep)}</Typography>
                                <div style={{ textAlign: 'center', marginTop: '25px' }}>
                                </div>
                            </div>
                        )}
                    </BodyCard>
                </Body>
                <ModalFooter style={{ paddingRight: '60px', background: '#F3F7FF' }}>
                    <div>
                        <Button onClick={toggle} >{t("words.cancel")}</Button>
                    </div>
                    {activeStep >= 1 &&
                        <div>
                            <Button disabled={activeStep === 0} onClick={handleBack} className={btn.root} style={{ color: '#4E4E4E', background: '#fff', boxShadow: '0px 1px 2px #00000029' }}>
                                {t("words.back")}
                            </Button>
                        </div>}
                    <div>
                        <Button
                            variant="contained"
                            onClick={activeStep === steps.length - 1 ? () => CreateCampaing(campaignName, adm, GruoupName, description, imageGroup, valueGroup, valuePeople, valueInitial, valuePermission) : handleNext}
                            className={activeStep === steps.length - 1 ? BtnSave.root : btn.root}
                        >
                            {activeStep === steps.length - 1 ? `${t("words.save")}` : `${t("words.next")}`}
                        </Button>
                    </div>
                </ModalFooter>
                <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                        {t("words.created_campaign")}!
                    </Alert>
                </Snackbar>
                <Snackbar open={openCreating} autoHideDuration={3000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="info">
                        {t("words.creating")}
                    </Alert>
                </Snackbar>
                <Snackbar open={openError} autoHideDuration={2000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                        {t("words.fields_empty")}
                    </Alert>
                </Snackbar>
                <Snackbar open={openError2} autoHideDuration={2000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                        {t("words.unable_create_campaign")}
                    </Alert>
                </Snackbar>
                <Snackbar open={open2} autoHideDuration={5000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                        {t("words.error_number_people")}
                    </Alert>
                </Snackbar>
                <Snackbar open={errorSize} autoHideDuration={5000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                        {t("words.error_image_size")}
                    </Alert>
                </Snackbar>
            </Modal>

            <Modal isOpen={modal2} toggle={toggle3} style={{ maxWidth: '770px', borderRadius: '6px', padding: '20px 20px' }} >
                <div style={{ display: 'flex', alignContent: 'right', alignItems: 'right', justifyContent: 'right', padding: '10px', cursor: 'pointer' }}>
                    <img alt="close" src={Close} onClick={toggle3} />
                </div>
                <div style={{ textAlign: 'center', paddingTop: '10px' }}>
                    <h1 style={{ font: 'normal normal bold 2rem Mulish', letterSpacing: '0px', color: '#373F4E', opacity: '1', textTransform: 'uppercase' }}>{t("words.attention")}</h1>
                    <h3 style={{ font: 'normal normal bold 1.8rem Mulish', letterSpacing: '0px', color: '#4E4E4E', opacity: '1' }}>{t("words.alert_disconnected")}</h3>
                </div>
                <ModalBody>
                    <div style={{ display: 'flex', alignContent: 'center', alignItems: 'center', justifyContent: 'center', paddingBottom: '40px' }}>
                        <img alt="Atention" src={Illustration_Attention} />
                    </div>
                    <div style={{ textAlign: 'left', font: 'normal normal bold 1rem Mulish', letterSpacing: '0px', color: '#4E4E4E', opacity: '1' }}>
                        <p>{t("words.inform_1")}</p>
                        <p>{t("words.inform_2")}</p>
                    </div>
                </ModalBody>
                <div style={{ display: 'flex', alignContent: 'center', alignItems: 'center', justifyContent: 'center', padding: '25px 0' }}>
                    <Link to="/myNumbers" style={{ textDecoration: "none", }}><Button className={btn.root} >{t("words.my_numbers")}</Button></Link>
                </div>
            </Modal>
        </Container >
    )
}

export default StepByStep;