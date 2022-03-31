import React from 'react';
import TransferContactGray from '../../../Assets/IconesChat/TransferContactGray.svg';
import TransferContact from '../../../Assets/IconesChat/TransferContact.svg';
import Cloese from '../../../Assets/attendance/Cloese.svg';
import SectorIcon from '../../../Assets/attendance/Sector  Active.svg';
import TabContext from '@material-ui/lab/TabContext';
import ChatOperatorList from '../ChatOperatorList';
import TabPanel from '@material-ui/lab/TabPanel';
import AppBar from '@material-ui/core/AppBar';
import Popper from '@material-ui/core/Popper';
import { useChat } from '../../../Providers/chat';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';


import {
    Container,
    LightTooltip,
    Body,
    useStyles,
    List,
    TabListStyled,
    TabStyled,
} from './styles';
import axios_base_chat from '../../../axios_base_chat';



const ChatTransfer = () => {

    const location = useLocation();
    const classes = useStyles();
    const { chat } = useChat();
    const { t } = useTranslation();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        getOperator();
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const [operators, setOperators] = React.useState([]);
    const [sectorts, setSectors] = React.useState([]);

    const [value, setValue] = React.useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const getSector = () => {
        try {
            axios_base_chat('/chat/department?all=true')
                .then(res => {
                    setSectors(res.data);
                })
        } catch (error) {

        }
    }
    const getOperator = () => {
        try {
            axios_base_chat.get(`/chat/department/${chat.sectorID}/operator`)
                .then(res => {
                    console.log(res.data);
                    setOperators(res.data);
                })
                .catch(err => {
                    console.log(err.response)
                })
        } catch (error) {

        }
    }

    return (
        <Container>
            {localStorage.getItem("operator") !== localStorage.getItem("operatorId") ?
                <LightTooltip title={t("words.transfer_attendance")} placement="top">
                    <img src={TransferContactGray} alt=" " />
                </LightTooltip> :
                <LightTooltip title={t("words.transfer_attendance")} placement="top">
                    <img src={TransferContact} alt=" " onClick={handleClick} />
                </LightTooltip>}
            <Popper
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                style={{ border: '1px solid #E1E5EB', borderRadius: '6px' }}
            >

                <Body>
                    <div style={{ padding: '10px 10px', color: '#0080FC', display: 'flex' }}><img src={Cloese} alt="Close" style={{ cursor: 'pointer', paddingRight: '15px' }} onClick={handleClose} /><h5 style={{ paddingTop: '2px' }}>{t("words.transfer_attendance")}</h5></div>
                    <TabContext value={value}>
                        <AppBar position="static" className={classes.AppBarStyle}>
                            <TabListStyled indicatorColor="primary" onChange={handleChange} aria-label="Campaings">
                                <TabStyled label={t("words.operators")} value="1" className={value === '1' && classes.AppTab} />
                                <TabStyled label={t("words.sectors")} value="2" className={value === '2' && classes.AppTab} onClick={getSector} />
                            </TabListStyled>
                        </AppBar>



                        <TabPanel value="1" className={classes.TabPanelStyle}>
                            <List>
                                {operators.map(operator => (
                                    <ChatOperatorList key={operator.id} name={operator?.name}
                                        origin="transfer"
                                        id={operator?.id} image={operator?.image}
                                    >
                                    </ChatOperatorList>
                                ))}
                            </List>
                        </TabPanel>
                        <TabPanel value="2" className={classes.TabPanelStyle}>
                            <List>
                                {sectorts.map(sec => (
                                    <ChatOperatorList key={sec.id} name={sec?.name}
                                        origin="transfer_sector"
                                        id={sec?.id} image={SectorIcon}
                                    >
                                    </ChatOperatorList>
                                ))}
                            </List>
                        </TabPanel>
                    </TabContext>
                </Body>
            </Popper>
        </Container>
    )
}

export default ChatTransfer;