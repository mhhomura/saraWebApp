/*
import React from 'react';
import { useHistory } from 'react-router-dom';
import ReactDOM from "react-dom";
import { useTheme } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core';
import { saveBtn, cancelBtn } from '../../../Styles/styles';
import { Input } from 'reactstrap';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import BuildIcon from '@material-ui/icons/Build';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import axios_base from '../../../axios_base';
import moment from 'moment';
import Select from 'react-select';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useTranslation } from "react-i18next";

import {
    Container,
    useStyles,
    Label,
    PrettoSlider,
    ButtonSection
} from './styles';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
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
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}



function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const CampaignsForm = (props) => {
    const {
        id,
        saveButton,
    } = props;

    const { t } = useTranslation();
    const theme = useTheme();
    const BtnSave = saveBtn();
    const classes = useStyles();
    const [cpName, setCpName] = React.useState();
    const [cpPhone, setCpPhone] = React.useState();
    const [cpPhoto, setCpPhoto] = React.useState();
    const [gpName, setGpName] = React.useState();
    const [adm, setAdm] = React.useState();
    const [gpDescription, setGpDesc] = React.useState();
    const [gpPeopleLimit, setPeopleLimit] = React.useState();
    const [gpLimit, setGpLimit] = React.useState();
    const [onGroup, setOnGroup] = React.useState();


    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const loadCampaign = () => {
        try {
            axios_base.get(`campaign/${id}`)
                .then(res => {

                })
                .catch(err => {

                })
        } catch (error) {

        }
    }

    React.useEffect(() => {
        loadCampaign();
    }, []);

    return (
        <Container >
            <div className={classes.root}>
                <AppBar position="static">
                    <Tabs value={value} onChange={handleChange}
                        className={classes.color}
                        aria-label="simple tabs example"
                        indicatorColor="primary"
                        textColor="primary"
                        back
                        variant="fullWidth">
                        <Tab label={t("words.campaign_settings")} icon={<SettingsIcon />} {...a11yProps(0)} />
                        <Tab label={t("words.groups")} icon={<GroupAddIcon />} {...a11yProps(1)} />
                        <Tab label={t("words.group_settings")} icon={<BuildIcon />} {...a11yProps(2)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    <div>
                        <div style={{ textAlign: 'center', marginBottom: "25px" }}>
                            <h5>{t("words.campaign_settings")}</h5>
                        </div>
                        <Grid container spacing={1}>

                            <Grid item xs={12} >
                                <div class="row">
                                    <div class="col">
                                        <Label htmlFor="nomeDaCampanha">{t("words.campaing_name")}</Label>
                                        <Input maxlength="35" onChange={(e) => setName(e.target.value)} type="text" value={campaignName} name="nomeDaCampanha" id="nomeDaCampanha" placeholder={t("words.campaing_name")} />
                                        <div id="statusName"></div>
                                    </div>
                                    <div class="col">
                                        <Label htmlFor="exampleSelect">{t("words.number_campaign")}</Label>
                                        <Select options={optionsNumbers} onChange={opt => loadAdms(opt)} hasValue value={numSelected} id="select_number" />
                                        <div id="statusNumber"></div>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>

                    </div>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <div>
                        <div style={{ textAlign: 'center', marginBottom: "25px" }}>
                            <h5>{t("words.groups")}</h5>
                        </div>
                        <Grid container spacing={12}>
                            <Grid item xs={2} className={classes.container} style={{ paddingRight: '5px' }}>
                                <label htmlFor="contained-button-file" style={{ width: '100%', height: '95px', cursor: 'pointer', backgroundColor: '#b8b8b8', backgroundSize: 'cover', backgroundImage: `url(${file})`, textAlign: 'center', marginBottom: '5%', borderRadius: '100%' }}>
                                    <input accept="image/jpeg" style={{ opacity: '0', width: '100%', height: '50%' }} id="contained-button-file" type="file" onChange={handleChangeImg} class="form-control" required />
                                    <PhotoCamera />
                                </label>
                                <div id="statusImage"></div>
                            </Grid>
                            <Grid item xs={10} className={classes.container} style={{ paddingTop: '5px', paddingLeft: '15px' }}>
                                <Label htmlFor="nomeDoGrupo">{t("words.group_Name")}</Label>
                                <Input maxlength="25" onChange={(e) => setNameGroup(e.target.value)} type="text" value={GruoupName} name="nomeDpGrupo" id="nomeDoGrupo" placeholder={t("words.group_Name")} />
                                <div id="statusNameGroup"></div>
                            </Grid>
                            <Grid container spacing={12}>
                                <Grid item xs={12} className={classes.container}>
                                    <Label htmlFor="admnistradores">{t("words.adm")}</Label>
                                    <Select options={options} closeMenuOnSelect={false} isMulti onChange={opt => setAdms(opt)} hasValue value={adm} id="adms" />
                                    <div id="statusAdm"></div>
                                </Grid>
                                <Grid item xs={12} className={classes.container}>
                                    <Label htmlFor="descricao">{t("words.description")}</Label>
                                    <Input maxlength="512" onChange={(e) => setDescription(e.target.value)} value={description} type="textarea" name="descricao" id="descricao" placeholder={t("words.description")} />
                                    <div id="statusDescription"></div>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <div style={{ textAlign: 'center', marginBottom: "25px" }}>
                        <h5>{t("words.group_settings")}</h5>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div className={classes.root}>
                                <Typography id="non-linear-slider" gutterBottom>
                                    {t("words.number_groups")}
                                </Typography>
                                <PrettoSlider value={valueGroup} onChange={handleChangeG} valueLabelDisplay="auto" disabled={disabled} defaultValue={100} max={500} min={1} step={1} />
                            </div>
                        </div>
                        <div class="col">
                            <div className={classes.root}>
                                <Typography id="discrete-slider-always" gutterBottom>
                                    {t("words.people_Limit")}
                                </Typography>
                                <PrettoSlider valueLabelDisplay="auto" value={valuePeople} onChange={handleChangeP} defaultValue={235} max={235} min={1} step={1} />
                            </div>
                        </div>
                        <div class="col">
                            <div className={classes.root}>
                                <Typography id="discrete-slider-always" gutterBottom>
                                    {t("words.initial_number")}
                                </Typography>
                                <PrettoSlider value={valueInitial} onChange={handleChangeI} valueLabelDisplay="auto" defaultValue={100} min={1} step={1} />
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col">
                            <small>{t("words.groups_per_campaign")}</small>
                        </div>
                        <div class="col">
                            <small>{t("words.people_per_group")}</small>
                        </div>
                        <div class="col">
                            <small>{t("words.group_identifier")}</small>
                        </div>
                    </div>
                    <br></br>
                    <Label check>
                        <Input type="checkbox" value={valuePermission} onChange={checkPermission} id="autoGroup" />{' '}
                        {t("words.allow_customers")}
                    </Label>
                </TabPanel>
                <ButtonSection>
                    <div>
                        {saveButton}
                        <Button style={{ marginLeft: '10px' }} classes={{ root: BtnSave.root, label: BtnSave.label, }} >{t("words.edit")}</Button>
                    </div>
                </ButtonSection>
            </div>
        </Container >
    );
}

export default CampaignsForm; */