import OnlineAttendantsModal from '../../Components/OnlineAttendantsModal';
import { BtnGray2, BtnWhite, LightTooltip } from '../../../Styles/styles';
import ContentHeader from '../../../Common/Components/ContentHeader';
import AdminConfigModal from '../../Components/AdminConfigModal';
import SupportIcon from '../../../Assets/admin_img/support.svg';
import WelcomeBanner from '../../Components/WelcomeBanner';
import ContentAdmin from '../../Components/ContentAdmin';
import SettingsIcon from '@material-ui/icons/Settings';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import { Button, Snackbar } from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';
import { useTranslation } from "react-i18next";
import MuiAlert from '@material-ui/lab/Alert';
import { useParams } from 'react-router-dom';
import axios_base from '../../../axios_base';
import React from 'react';
// eslint-disable-next-line no-unused-vars
import ShareContact from '../../Components/ShareContact';


import {
    Container,
    BtnConfigs,
} from './styles';

const AdminDashboard = () => {
    const { t } = useTranslation();
    const btnGray2 = BtnGray2();
    const btnWhite = BtnWhite();
    let { id } = useParams();

    const [onlineAttModal, setOnlineAttModal] = React.useState(false);
    const [selectedNumber, setSelectedNumber] = React.useState();
    const [configModal, setConfigModal] = React.useState(false);
    const [linkSuccess, setLinkSuccess] = React.useState(false);
    const [number, setNumber] = React.useState();

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const handleClose = () => {
        setLinkSuccess(false);
    };

    const toggleOnlineAtt = () => {
        setOnlineAttModal(!onlineAttModal);
    }

    const toggleAdmConfig = () => {
        setConfigModal(!configModal);
    }

    const copyLink = number => {
        const whatsLink = `https://wa.me/${number}`;
        const el = document.createElement('textarea');
        el.value = whatsLink;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        setLinkSuccess(true);
    }

    const getNumber = () => {
        try {
            axios_base.get('/number')
                .then(res => {
                    console.log(res.data, "getNumber")
                    setNumber(res.data);
                })
                .catch(err => {
                    console.log(err.response);
                })

        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        setSelectedNumber(id)
        getNumber();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Container>
            <ContentHeader title="Atendimento" subTitle={t("words.dashboard_description")}>
                <BtnConfigs>
                    <LightTooltip title="Envie o link do seu WhatsApp para o cliente iniciar um atendimento">
                        <Button classes={{ root: btnWhite.root, label: btnWhite.label }} onClick={() => copyLink(number.map(num => num.number.split(':')[0]))}>
                            <WhatsAppIcon className='whatsIcon' />
                            <LinkIcon className='copyIcon' />
                        </Button>
                    </LightTooltip>

                    <Button classes={{ root: btnWhite.root, label: btnWhite.label }} onClick={toggleOnlineAtt}>
                        <img src={SupportIcon} alt="suporte" />
                    </Button>

                    <Button classes={{ root: btnGray2.root, label: btnGray2.label }} onClick={toggleAdmConfig}>
                        <SettingsIcon />
                    </Button>

                </BtnConfigs>
            </ContentHeader>

            <OnlineAttendantsModal idNumber={selectedNumber} isOpen={onlineAttModal} toggle={toggleOnlineAtt} />

            <AdminConfigModal idNumber={selectedNumber} isOpen={configModal} toggle={toggleAdmConfig} />

            <WelcomeBanner idNumber={selectedNumber} />

            <ContentAdmin idNumber={selectedNumber} />

            {/* <ShareContact /> */}

            <Snackbar open={linkSuccess} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    {t("words.copied_link")}
                </Alert>
            </Snackbar>

        </Container>
    )
}

export default AdminDashboard;