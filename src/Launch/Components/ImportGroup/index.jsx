import React from 'react';
import { useTranslation } from "react-i18next";
import { ModalFooter, ModalBody, ModalHeader, Modal } from 'reactstrap';
import { useStyles, cancelBtn, saveBtn, BtnGray } from '../../../Styles/styles';
import { Button, Grid } from '@material-ui/core';
import Select from 'react-select';
import axios_base from '../../../axios_base';
import { useParams, useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Snackbar } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ReactDOM from "react-dom";
import MuiAlert from '@material-ui/lab/Alert';
import {
    Container,
    Label
} from './styles';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function LinearProgressWithLabel(props) {
    return (
        <Box display="flex" alignItems="center">
            <Box width="100%" mr={1} >
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box minWidth={35}>
                <Typography variant="body2" color="textSecondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

LinearProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate and buffer variants.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired,
};


const ImportGroup = (props) => {

    const {
        campaign,
    } = props;


    const history = useHistory();
    let { id } = useParams();
    const { t } = useTranslation();
    let location = useLocation();
    const classes = useStyles();
    const btnCancel = cancelBtn();
    const btnSave = saveBtn();
    const btnGray = BtnGray();
    const [progress, setProgress] = React.useState(0);
    const errors = [];


    const [modal, setModal] = React.useState(false);
    const [modal2, setModal2] = React.useState(false);

    const toggle = () => {
        setModal(!modal);
    }
    const toggle2 = () => {
        setModal2(!modal2);
    }

    const [open3, setOpen3] = React.useState(false);

    const handleClose2 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen3(false);

    };

    const [listGroups, setListGroups] = React.useState([]);
    const [groups, setGroups] = React.useState([]);
    const [groupsNames, setGroupsNames] = React.useState();

    /* Lista os grupos disponiveis para a importação */

    const getGroupList = React.useCallback(() => {
        console.log(campaign?.number_id)

        axios_base.get(`number/${campaign?.number_id}/groups`)
            .then(res => {
                setListGroups(res.data.groups);
            })
            .catch(err => {
            })
    },
        [campaign],
    );


    let options = listGroups?.map(group => ({ label: group.name, value: group.jid })).sort((a, b) => a.label.localeCompare(b.label));

    React.useEffect(() => {
        if (campaign) {
            getGroupList();
        }
    }, [location, campaign, getGroupList]);

    /* Faz o post para adicionar o grupo na campanha */
    const groupImport = async (jid, time) => {
        try {
            var data = {
                "gid": jid,
            }
            const response = await axios_base.post(`campaign/${id}/group`, data);
            console.log(response);
            setOpen3(true);
            let groupName = groups.find(g => g.value === response.config.data.split('"')[3]);
            setGroupsNames(groupName.label);
            setOpen3(true);

        } catch (error) {
            let groupName = groups.find(g => g.value === error.response.config.data.split('"')[3]);
            var trad = null;
            console.log(error.response.data.message)
            if (error.response.data.message === 'ERROR: duplicate key value violates unique constraint "idx_groups_g_id" (SQLSTATE 23505)') {
                trad = "already_in";
            } else if (error.response.data.message === "you are not admin of this group") {
                trad = "not_adm";
            }
            else {
                trad = "something_wrong";
            }
            errors.push(`${t("words.import_error")}: ${groupName.label} -  ${t("words.because")} ${t(`words.${trad}`)}`);
        }
    }

    /* Chama o post dos grupos de acordo com a quantidade de grupos selecionados*/
    const importGroups = async (groups) => {
        if (!groups) {
        } else {
            try {
                var time = 100 / groups.length;
                const jid = groups.map(group => (group.value));
                for (const i in jid) {
                    let func = await groupImport(jid[i], time);
                    setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + time));
                    console.log(func);
                }
                setProgress(0);
                setGroups();
                if (errors.length > 0) {
                    ReactDOM.render(<div>
                        {errors.map((error) => (
                            <div>
                                <Alert onClose={handleClose2} severity="error" key={error}>
                                    {error}
                                </Alert>
                                <br></br>
                            </div>
                        ))}
                    </div>, document.getElementById('body'))
                }
                else {
                    setProgress(0);
                    setGroups();
                    handleClose2();
                    ReactDOM.render(<div>
                        <Alert onClose={handleClose2} severity="success">
                            {t("words.groups")} {t("words.success_import")}
                        </Alert>
                    </div>, document.getElementById('body'))
                }
                ReactDOM.render(<div>
                    <Button classes={{ root: btnCancel.root, label: btnCancel.label, }} onClick={toggle}>
                        {t("words.ok")}
                    </Button>
                </div>, document.getElementById('button'))
                history.push(`/campaigns/${id}/groups/`);
            } catch (error) {

            }
        }

    }
    return (
        <Container >
            {!campaign?.archived ? <Button classes={{ root: classes.root, label: classes.label, }} onClick={toggle} >
                {t("words.import")}
            </Button> : <Button classes={{ root: btnGray.root, label: btnGray.label, }} disabled>
                {t("words.import")}
            </Button>}


            <Modal isOpen={modal} toggle={toggle} size="lg" style={{ maxWidth: '700px', width: '100%', height: '100vh' }}>
                <ModalHeader>{t("words.import")}</ModalHeader>
                <ModalBody id="body">
                    {progress > 0 ? <LinearProgressWithLabel value={progress} /> :
                        (<div >
                            <Grid container spacing={12}>
                                <Grid item xs={12} className={classes.container}>
                                    <Label htmlFor="groups">{t("words.groups")}</Label>
                                    <Select options={options} closeMenuOnSelect={false} isMulti onChange={opt => setGroups(opt)} hasValue value={groups} id="groups" />
                                </Grid>
                            </Grid>

                        </div>)}
                </ModalBody>
                <ModalFooter id="button">
                    <div>
                        <Button classes={{ root: btnCancel.root, label: btnCancel.label, }} onClick={toggle}>
                            {t("words.cancel")}
                        </Button>
                    </div>
                    <div>
                        <Button classes={{ root: btnSave.root, label: btnSave.label, }} onClick={() => importGroups(groups)}>
                            {t("words.import")}
                        </Button>
                    </div>
                </ModalFooter>
            </Modal>
            <Modal isOpen={modal2} toggle={toggle2} size="lg" style={{ maxWidth: '700px', width: '100%' }}>
                <ModalHeader>{t("words.import")}</ModalHeader>
                <ModalBody>

                </ModalBody>
                <ModalFooter>
                    <div id="button">

                    </div>
                </ModalFooter>
            </Modal>
            <div id="info">
                <Snackbar open={open3} autoHideDuration={1000} onClose={handleClose2}>
                    <Alert onClose={handleClose2} severity="success">
                        {groupsNames} {t("words.success_import")}
                    </Alert>
                </Snackbar>
            </div>
        </Container >
    );
}

export default ImportGroup;