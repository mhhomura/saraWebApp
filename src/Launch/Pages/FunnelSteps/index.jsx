import React from 'react';
import { Button } from '@material-ui/core';
import { useStyles, cancelBtn, saveBtn } from '../../../Styles/styles';
import { RiArrowGoBackFill } from 'react-icons/ri';
import ContentHeader from '../../../Common/Components/ContentHeader';
import { Link, useParams, useHistory } from 'react-router-dom';
import DandD from '../../../Common/Components/DandD';
import { Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import axios_base from '../../../axios_base';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';
import { useTranslation } from "react-i18next";
import {
    Container,
    Controller,
    Content,
    Label,
} from './styles';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const FunnelSteps = (props) => {
    const { t } = useTranslation();
    let history = useHistory();
    let { id } = useParams();
    const classes = useStyles();
    const BtnCancel = cancelBtn();
    const BtnSave = saveBtn();
    const {
        className,
    } = props;
    const [stageName, setStageName] = React.useState('');
    const [modal, setModal] = React.useState(false);
    const toggle = () => setModal(!modal);

    const createStage = (stageName) => {
        var data = {
            "name": stageName,
        }
        axios_base.post(`campaign/${id}/stage`, data)
            .then(res => {
                console.log(res.data);
                setOpen(true);
                toggle();
                history.push(`/funnelSteps/${id}`);
            })
    }

    const [open, setOpen] = React.useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    return (
        <Container>
            <ContentHeader title={t("words.stages")}>
                <Link to={`/campaigns/${id}/detail`}>
                    <Button classes={{ root: classes.root, label: classes.label, }}>
                        <RiArrowGoBackFill />
                    </Button>
                </Link>
            </ContentHeader>
            <Controller>
                <div>
                    {/* <Link to="/funnelGraphics" style={{ textDecoration: "none", }}>
                        <Button classes={{ root: classes.root, label: classes.label, }}>
                            Grafico de Funil
                        </Button>
                    </Link> */}

                </div>
                <div>
                    <Button classes={{ root: classes.root, label: classes.label, }} onClick={toggle}>
                        {t("words.create_new_stage")}
                    </Button>
                </div>
            </Controller>
            <Content>
                <DandD></DandD>
            </Content>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}> {t("words.create_new_stage")}</ModalHeader>
                <ModalBody>
                    <Grid container spacing={12}>
                        <Grid item xs={12} className={classes.container}>
                            <Label htmlFor="stageName">{t("words.stage_name")}</Label>
                            <Input type="text" onChange={(e) => setStageName(e.target.value)} name="stageName" id="stageName" placeholder={t("words.stage_name")} />
                        </Grid>
                    </Grid>
                </ModalBody>
                <ModalFooter>
                    <div>
                        <Button classes={{ root: BtnCancel.root, label: BtnCancel.label, }} onClick={toggle}>
                            {t("words.cancel")}
                        </Button>
                    </div>
                    <div>
                        <Button classes={{ root: BtnSave.root, label: BtnSave.label, }} onClick={() => createStage(stageName)}>
                            {t("words.save")}
                        </Button>
                    </div>
                </ModalFooter>
            </Modal>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    {t("words.created_step")}
                </Alert>
            </Snackbar>
        </Container>

    );
}

export default FunnelSteps;