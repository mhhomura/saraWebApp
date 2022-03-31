import React from 'react';
import finishedConversantion from '../../../Assets/IconesChat/FinishedConversations.svg';
import contactsInformation from '../../../Assets/IconesChat/Contact.svg';
import ringtone from "../../../Assets/audio/3108_call-sound.ru__.mp3";
import attendantes from '../../../Assets/IconesChat/Attendants.svg';
import NotificationsIcon from '@material-ui/icons/Notifications';
import * as OperatorService from '../../../Services/operator';
import icon from '../../../Assets/icon/logo_ba_font_02.png';
import TagMessage from '../../../Assets/IconesChat/Tag.svg';
import { useLocation, useHistory } from 'react-router-dom';
import set from '../../../Assets/IconesChat/settings.svg';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import ChatListItem from '../ChatListItem/ChatListItem';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import axios_base_chat from '../../../axios_base_chat';
import Typography from '@material-ui/core/Typography';
import NoMessages from '../../Components/NoMessages';
import TabContext from '@material-ui/lab/TabContext';
import SearchIcon from '@material-ui/icons/Search';
import Snackbar from '@material-ui/core/Snackbar';
import ChatOperatorList from '../ChatOperatorList';
import { useTranslation } from "react-i18next";
import isMobile from '../../../Services/isMobile';
import TabPanel from '@material-ui/lab/TabPanel';
import Popover from '@material-ui/core/Popover';
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import ContactsList from '../ContactList';
import Grid from '@material-ui/core/Grid';
import NewContact from '../NewContact';
import Select from 'react-select';
import NewChat from '../NewChat';
import WS from '../../../ws';
import moment from 'moment';

import Accordion from '@material-ui/core/Accordion';
import MuiAlert from '@material-ui/lab/Alert';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useChat } from '../../../Providers/chat';

import {
    Container,
    BottonContacts,
    TabListStyled,
    LightTooltip,
    ButtonsArea,
    SearchInput,
    Definition,
    Attendents,
    useStyles,
    TabStyled,
    Contacts,
    Archived,
    Control,
    NavIcon,
    Search,
    Middle,
    Botton,
    Config,
    Item1,
    Item2,
    List2,
    Top,
} from './styles';



function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ChatAside = () => {
    const mobile = isMobile()
    var windowHeight = window.innerHeight;
    function recarregarPagina() {
        history.push('/attendant/chat');
    }
    var TimeOut;
    window.onresize = function () {
        clearTimeout(TimeOut);
        TimeOut = setTimeout(recarregarPagina, 10);
    };

    const deadline = moment().add(-1, 'minute');

    const { chat, setChat } = useChat();

    const { t } = useTranslation();
    const location = useLocation();
    const history = useHistory();
    const classes = useStyles();


    const bottomContacts = React.useRef(null);
    const bottomAtendants = React.useRef(null);
    const bottomArchived = React.useRef(null);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const [notificationSound, setNotification] = React.useState(true);
    const [AttendantsOpen, setAttendantsOpen] = React.useState(false);
    const [contactsOpen, setContactsOpen] = React.useState(false);
    const [ArchivedOpen, setArchivedOpen] = React.useState(false);

    const [chatsFinished, setChatsFinished] = React.useState([]);
    const [chatsOthers, setChatsOthers] = React.useState([]);
    const [operators, setOperators] = React.useState([]);
    const [contacts, setContacts] = React.useState([]);
    const [sectorts, setSectors] = React.useState([]);
    const [chats, setChats] = React.useState([]);

    const [newmessage, setNewMessage] = React.useState(0);

    const [searchFinished, setSearchFinished] = React.useState("");
    const [searchContact, setSearchContact] = React.useState("");
    const [placeholder, setPlaceholder] = React.useState("");
    const [search, setSearch] = React.useState("");

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [value, setValue] = React.useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
        setNewMessage(0);
    };

    /* set ActiveSector */
    const setSectorActive = (id, label) => {
        setChat({ sectorName: label, sectorID: id });
        localStorage.setItem("chat", 'null');
        console.log(chat.sectorName);

        if (value === "1") {
            getListMyAttendments(id);
        } else {
            getListOthers(id);
        }
        setPlaceholder(label);
    }

    const loadContacts = () => {
        setContactsOpen(!contactsOpen);
        getListMyContacts();
    }
    const loadAttendantsOpen = () => {
        getOperator();
        setAttendantsOpen(!AttendantsOpen);
    }
    const loadArchived = () => {
        setArchivedOpen(!ArchivedOpen);
        getListMyAttendmentsFinished(chat.sectorID);
    }
    const loadTags = () => {

    }
    /* Get Contatos */
    const getListMyContacts = () => {
        try {
            axios_base_chat.get('/chat/contact')
                .then(res => {
                    setContacts(res.data);
                })
        } catch (error) {
        }
    }
    /* Get Sectors */
    const getSector = () => {
        try {
            if (!chat.sectorID) {
                axios_base_chat('/chat/department')
                    .then(res => {
                        setSectors(res.data);
                        setChat({ sectorName: res?.data['0']?.name, sectorID: res?.data['0']?.id });
                        getListMyAttendments(res?.data['0']?.id);
                        setPlaceholder(res?.data['0']?.name);
                    })
            } else {
                setPlaceholder(chat.sectorName);
            }
        } catch (error) {

        }
    }
    /* Get Chats */
    const getListMyAttendments = (id) => {
        try {
            axios_base_chat.get(`/chat/department/${id}/attendance`)
                .then(res => {
                    setChats(res.data);
                })
                .catch(err => {

                })
        } catch (error) {
            setOpenError(true);
        }
    }
    /* Get Others Attendance */
    const getListOthers = (id) => {
        try {
            axios_base_chat.get(`/chat/department/${id}/attendance?others=true`)
                .then(res => {
                    setChatsOthers(res.data);
                })
                .catch(err => {

                })
        } catch (error) {
            setOpenError(true);
        }
    }

    const getListMyAttendmentsFinished = (id) => {
        try {
            axios_base_chat.get(`/chat/department/${id}/attendance?finished=true`)
                .then(res => {
                    setChatsFinished(res.data);
                })
                .catch(err => {

                })
        } catch (error) {
            setOpenError(true);
        }
    }

    const getOperator = () => {
        try {
            axios_base_chat.get(`/chat/department/${chat.sectorID}/operator`)
                .then(res => {
                    setOperators(res.data);
                })
                .catch(err => {
                    console.log(err.response);

                })
        } catch (error) {
            setOpenError(true);
        }
    }

    const [open3, setOpen3] = React.useState(false);
    const [openError, setOpenError] = React.useState(false);

    const handleCloseError = () => {
        setOpenError(!openError);
    };

    const handleClose3 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen3(false);
    };

    React.useEffect(() => {
        if (localStorage.getItem("updated") === "true") {
            getListMyContacts();
            getListMyAttendments(chat.sectorID);
            localStorage.setItem("updated", "false");
        }
        if (chats.length === 0) {
            getListMyAttendments(chat.sectorID);
        }
        if (sectorts.length === 0) {
            getSector();
        }
    }, [location]);

    const turnNotification = () => {
        setNotification(!notificationSound);
        history.push('/attendant/chat');
    }
    const logout = () => {
        OperatorService.logout();
    }
    const notify = () => {
        Notification.requestPermission();
    }

    React.useEffect(() =>
        WS.subscribe((msg) => {

            if (msg.subject === "message.received") {
                if (msg.data?.department_id === parseInt(chat.sectorID)) {
                    document.getElementById("notify")?.play();
                    if (value === "1") {
                    } else {
                        setNewMessage(1);
                    }
                }
            } else if (msg.subject === "attendance.created" || msg.subject === "attendance.finished" || msg.subject === "attendance.transferred") {
                if (msg.data?.department_id === parseInt(chat.sectorID)) {
                    document.getElementById("notify")?.play();
                    if (value === "1") {
                        getListMyAttendments(chat.sectorID);
                    } else {
                        setNewMessage(1);
                        getListOthers(chat.sectorID);
                    }

                }
            }
            if (msg.data?.department_id !== chat.sectorID && msg.data.operator_id === parseInt(localStorage.getItem('operator'))) {
                console.log(msg.data?.department_id, chat.sectorID)

                if (msg.subject === "message.received" || msg.subject === "attendance.created") {
                    if (mobile) {
                        document.getElementById("notify")?.play();
                    } else {
                        const found = sectorts.find(sector => sector.id === msg.data?.department_id);
                        setOpen3(true);
                        var n = new Notification(found?.name ? found?.name : "Nova Mensagem", { body: `Você tem uma nova menagem em outro setor ${found?.name}`, icon: { icon } })
                    }
                }
            }
        }), [chat, value])

    let options = sectorts.map(sec => ({ label: sec.name, value: sec.id }));

    return (
        <Container ref={bottomArchived}>
            {notificationSound === true && <audio id="notify" src={ringtone} preload="auto" hidden></audio>}

            <Contacts style={{ width: contactsOpen ? '100%' : '0px', height: contactsOpen ? '100%' : '0px' }}>
                <Top id="btnArea">
                    <ButtonsArea >
                        <NavIcon><ArrowBackIcon onClick={() => setContactsOpen(false)} /></NavIcon>
                        {t("words.contacts_list")}

                    </ButtonsArea>
                    <Config>
                        <LightTooltip title={t("words.settings")} placement="top">
                            <img src={set} alt="" onClick={handleClick} aria-describedby={id} style={{ cursor: 'pointer' }} />
                        </LightTooltip>
                    </Config>
                </Top>
                <Search style={{ padding: '20px 20px', background: '#F7F8FA' }}>
                    <Grid container spacing={1}>
                        <Grid item xs={10} >
                            <SearchInput>
                                <SearchIcon style={{ color: '#434343' }} />
                                <input type="search" placeholder={t("words.search")} onChange={e => setSearchContact(e.target.value)} />
                            </SearchInput>
                        </Grid>
                        <Grid item xs={2} style={{ textAlign: 'center ', }} >
                            <NewContact who="new" />
                        </Grid>
                    </Grid>
                </Search>
                <div style={{ padding: '5px 15px', }}>
                    <div style={{ height: windowHeight <= 1000 ? mobile ? `calc(${windowHeight}px - 150px)` : `calc(${windowHeight}px - 235px)` : `calc(${windowHeight}px - 300px)`, background: '#FFFFFF 0% 0% no-repeat padding-box', border: '1px solid #E1E5EB', borderRadius: '6px', opacity: '1', overflow: 'scroll' }}>
                        {contacts.length === 0 ? <NoMessages text='Você não tem nenhum contato no momento. Crie um para começar.' />
                            :
                            <BottonContacts ref={bottomContacts}>

                                {contacts.filter((contact) => {
                                    if (searchContact === "") {
                                        return contact
                                    } else if (contact.name.toLowerCase().includes(searchContact.toLowerCase()) || contact.jid.toLowerCase().includes(searchContact.toLowerCase())) {
                                        return contact
                                    } else {
                                        return null
                                    }
                                }).map(contact => (
                                    <ContactsList key={contacts.id} name={contact?.name} phone={contact?.jid}
                                        id={contact?.id} image={contact?.image}
                                    >
                                        <NewContact who="edit" id={contact?.id} open="true" />
                                    </ContactsList>
                                ))}

                            </BottonContacts>}
                    </div>
                </div>
            </Contacts>

            <Attendents style={{ width: AttendantsOpen ? '100%' : '0px', height: AttendantsOpen ? '100%' : '0px' }}>
                <Top id="btnArea">
                    <ButtonsArea >
                        <NavIcon><ArrowBackIcon onClick={() => setAttendantsOpen(false)} /></NavIcon>
                        {t("words.operators")}

                    </ButtonsArea>
                    <LightTooltip title={t("words.settings")} placement="top">
                        <img src={set} alt="" onClick={handleClick} aria-describedby={id} style={{ cursor: 'pointer' }} />
                    </LightTooltip>
                </Top>
                {operators.length === 0 ? <NoMessages text={t("words.no_operators_registered")} />
                    :
                    <BottonContacts style={{ height: windowHeight <= 900 ? mobile ? `calc(${windowHeight}px - 160px)` : `calc(${windowHeight}px - 160px)` : `calc(${windowHeight}px - 165px)`, padding: '10px 10px', background: '#F7F8FA' }}>
                        <div className={classes.root}>
                            <Accordion className={classes.aco}>
                                <AccordionSummary
                                    className={classes.border}
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography className={classes.heading}><img src={attendantes} alt="" onClick={loadAttendantsOpen} style={{ paddingRight: '10px' }} /> {t("words.online_operators")} </Typography>
                                </AccordionSummary >
                                <AccordionDetails >
                                </AccordionDetails>
                                {operators.map(operator => (
                                    (moment(operator.logged_at) >= deadline && <ChatOperatorList key={operator.id} name={operator?.name} type={operator.type} id={operator?.id} image={operator?.image} logged_at={operator.logged_at} />
                                    )))}

                            </Accordion>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2a-content"
                                    id="panel2a-header"
                                >
                                    <Typography className={classes.heading}><img src={attendantes} alt="" onClick={loadAttendantsOpen} style={{ paddingRight: '10px' }} /> Atendentes Offline </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                </AccordionDetails>
                                {operators.map(operator => (
                                    (operator.logged_at ? moment(operator.logged_at) <= deadline && <ChatOperatorList key={operator.id} name={operator?.name} id={operator?.id} type={operator.type} image={operator?.image} logged_at={operator.logged_at} /> : <ChatOperatorList logged_at={"never_logged"} key={operator.id} name={operator?.name} type={operator.type} id={operator?.id} image={operator?.image} />)
                                )
                                )}
                            </Accordion>
                        </div>


                    </BottonContacts>
                }

            </Attendents>

            <Archived style={{ width: ArchivedOpen ? '100%' : '0px', height: ArchivedOpen ? '100%' : '0px' }}>
                <Top id="btnArea">
                    <ButtonsArea >
                        <NavIcon><ArrowBackIcon onClick={() => setArchivedOpen(false)} /></NavIcon>
                        {t("words.finished_att")}

                    </ButtonsArea>
                    <LightTooltip title={t("words.settings")} placement="top">
                        <img src={set} alt="" onClick={handleClick} aria-describedby={id} style={{ cursor: 'pointer' }} />
                    </LightTooltip>
                </Top>
                <Search>
                    <Grid container spacing={1}>

                        <Grid item xs={12} >
                            <SearchInput>
                                <SearchIcon style={{ color: '#434343' }} />
                                <input type="search" placeholder={t("words.search")} onChange={e => setSearchFinished(e.target.value)} />
                            </SearchInput>
                        </Grid>
                    </Grid>
                </Search>

                {chatsFinished.length === 0 ? <NoMessages text='Não há atendimentos finalizados.' />
                    :
                    <BottonContacts >
                        {chatsFinished.filter((finished) => {
                            if (search === "") {
                                return finished
                            } else if (finished?.contact?.name.toLowerCase().includes(searchFinished.toLowerCase()) || finished?.contact.jid.toLowerCase().includes(searchFinished.toLowerCase())) {
                                return finished
                            } else {
                                return null
                            }
                        }).map(finished => (
                            <ChatListItem
                                OperadorName={finished?.operator.name}
                                name={finished?.contact.name}
                                phone={finished?.contact.jid}
                                date={finished?.contact.updated_at}
                                attendenceId={finished?.id}
                                id={finished?.contact.id} image={finished?.contact.image} />
                        ))}

                    </BottonContacts>
                }


            </Archived>

            <Top id="btnArea">
                <ButtonsArea >
                    <NavIcon>
                        <LightTooltip title={t("words.operators")} placement="top">
                            <img src={attendantes} alt="" onClick={loadAttendantsOpen} />
                        </LightTooltip >
                    </NavIcon>

                    <NavIcon>
                        <LightTooltip title={t("words.contacts_list")} placement="top">
                            <img src={contactsInformation} alt="" onClick={loadContacts} />
                        </LightTooltip>
                    </NavIcon>
                    {/*  <NavIcon>
                        <LightTooltip title="Tags" placement="top">
                            <img src={TagMessage} alt="" onClick={loadTags} />
                        </LightTooltip>
                    </NavIcon> */}
                    <NavIcon>
                        <NewChat />
                    </NavIcon>
                    <NavIcon>
                        <LightTooltip title={t("words.finished_att")} placement="top">
                            <img src={finishedConversantion} alt="" onClick={loadArchived} />
                        </LightTooltip>
                    </NavIcon>

                </ButtonsArea>
                <Config>
                    <LightTooltip title={t("words.settings")} placement="top">
                        <img src={set} alt="" onClick={handleClick} aria-describedby={id} style={{ cursor: 'pointer' }} />
                    </LightTooltip>
                </Config>
            </Top>

            <div id="md">
                <Middle >
                    <p>{t("words.chose_sector_attView")}</p>
                    <Select components={{ Control }} placeholder={placeholder} options={options} onChange={opt => setSectorActive(opt.value, opt.label)} aria-describedby="basic-addon1" />
                </Middle>
            </div>

            <Search>
                <Grid container spacing={0}>
                    <Grid item xs={12} >
                        <SearchInput>
                            <SearchIcon style={{ color: '#434343' }} />
                            <input type="search" placeholder={t("words.search")} onChange={e => setSearch(e.target.value)} value={search} />
                        </SearchInput>
                    </Grid>
                </Grid>
            </Search>

            <TabContext value={value}>
                <AppBar position="static" className={classes.AppBarStyle}>
                    <TabListStyled indicatorColor="primary" onChange={handleChange} aria-label="Calls">
                        <TabStyled label={<Badge badgeContent={newmessage} style={{ paddingRight: '15px', fontFamily: 'Mulish' }} color="error"> My calls </Badge>} value="1" className={value === '1' && classes.AppTab} onClick={() => getListMyAttendments(parseInt(localStorage.getItem("sectorActive")))} />
                        <TabStyled label={<Badge badgeContent={0} style={{ paddingRight: '15px', fontFamily: 'Mulish' }} color="primary"> Others </Badge>} value="2" className={value === '2' && classes.AppTab} onClick={() => getListOthers(parseInt(localStorage.getItem("sectorActive")))} />
                    </TabListStyled>
                </AppBar>
                <Botton value="1" ref={bottomAtendants} id="bottom" style={{ height: windowHeight <= 900 ? mobile ? `calc(${windowHeight}px - 300px)` : `calc(${windowHeight}px - 390px)` : `calc(${windowHeight}px - 410px)` }}>

                    {chats.length === 0 ? <TabPanel value="1" className={classes.TabPanelStyle}><NoMessages text='Nenhum atendimento no momento' /></TabPanel>
                        :
                        <TabPanel value="1" className={classes.TabPanelStyle}>

                            {chats.filter((chat) => {
                                if (search === "") {
                                    return chat
                                } else if (chat?.contact?.name.toLowerCase().includes(search.toLowerCase()) || chat?.contact.jid.toLowerCase().includes(search.toLowerCase())) {
                                    return chat
                                } else {
                                    return null
                                }
                            }).map(chat => (
                                <ChatListItem name={chat?.contact.name}
                                    OperadorName={chat?.operator.name}
                                    key={chat?.contact.id}
                                    phone={chat?.contact.jid}
                                    date={chat?.contact.updated_at}
                                    attendenceId={chat?.id}
                                    operatorId={chat?.operator_id}
                                    id={chat?.contact.id} image={chat?.contact.image} />
                            ))}
                        </TabPanel>
                    }

                    {chatsOthers.length === 0 ? <TabPanel value="2" className={classes.TabPanelStyle}><NoMessages text='Não há outros atendimentos no momento' /></TabPanel>
                        :
                        <TabPanel value="2" className={classes.TabPanelStyle}>
                            {chatsOthers.filter((otherChat) => {
                                if (search === "") {
                                    return otherChat
                                } else if (otherChat?.contact?.name.toLowerCase().includes(search.toLowerCase()) || otherChat?.contact.jid.toLowerCase().includes(search.toLowerCase())) {
                                    return otherChat
                                } else {
                                    return null
                                }
                            }).map(otherChat => (
                                <ChatListItem key={otherChat?.contact.id} name={otherChat?.contact.name}
                                    OperadorName={otherChat?.operator.name}
                                    phone={otherChat?.contact.jid}
                                    date={otherChat?.contact.updated_at}
                                    attendenceId={otherChat?.id}
                                    operatorId={otherChat?.operator_id}
                                    id={otherChat?.contact.id} image={otherChat?.contact.image} />
                            ))}
                        </TabPanel>
                    }

                </Botton>
            </TabContext>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                className={classes.popover}
            >
                <Typography className={classes.typography}>{t("words.settings")}</Typography>
                <Definition>
                    <List2 onClick={() => turnNotification()}>
                        <Item1>{notificationSound === true ? <VolumeOffIcon /> : <VolumeUpIcon />}</Item1>
                        <Item2>  {notificationSound === true ? t("words.dis_notification") : "Enable audio Notification"} </Item2>

                    </List2>
                    <List2 onClick={notify}>
                        <Item1><NotificationsIcon /></Item1>
                        <Item2>  Notification</Item2>

                    </List2>
                    <List2 onClick={logout}>
                        <Item1><ExitToAppIcon /></Item1>
                        <Item2>  {t("words.disconnect_user")}</Item2>

                    </List2>
                </Definition>

            </Popover>


            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={open3}
                autoHideDuration={3000}
                onClose={handleClose3}>
                <Alert onClose={handleClose} style={{ background: '#476BFF' }} severity="info" onClick={handleClose3}>
                    Você tem uma nova mensagem em outro setor!
                </Alert>
            </Snackbar>

            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={openError}
                autoHideDuration={3000}
                onClose={handleCloseError}>
                <Alert onClose={handleCloseError} style={{ background: '#ff4747' }} severity="error" onClick={handleCloseError}>
                    {t("words.something_wrong")}
                </Alert>
            </Snackbar>

        </Container >
    );
}

export default ChatAside;