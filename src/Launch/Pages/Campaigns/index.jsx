import React from 'react';
import { Button } from '@material-ui/core';
import { useStyles, BtnBlue, cancelBtn, saveBtn, BtnGray } from '../../../Styles/styles';
import Grid from '@material-ui/core/Grid';
import ContentHeader from '../../../Common/Components/ContentHeader';
import { RiArrowGoBackFill, RiAdminLine } from 'react-icons/ri';
import { BsPeople, BsSearch } from 'react-icons/bs';
import { TiMessages } from 'react-icons/ti';
import TimeLineCuston from '../../Components/Timeline';
import { Link, useParams, useLocation, useHistory } from 'react-router-dom';
import { Snackbar, withStyles, Avatar } from '@material-ui/core';
import MessageForm from '../../Components/MessageForm';
import { CgDetailsMore } from 'react-icons/cg';
import { FaRegCopy } from 'react-icons/fa';
import DetailsLeads from '../../Components/DetailsLeads';
import axios_base from '../../../axios_base';
import { InputGroup, InputGroupText, ModalFooter, ModalBody, ModalHeader, Modal, Input } from 'reactstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart } from 'recharts';
import CountUp from 'react-countup';
import moment from 'moment';
import { useTranslation } from "react-i18next";
import { FixedSizeList as List } from 'react-window';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
/* import FileCopyIcon from '@material-ui/icons/FileCopy'; */
import MenuIcon from '@material-ui/icons/Menu';
import DeleteIcon from '@material-ui/icons/Delete';
import ReactDOM from "react-dom";
import MuiAlert from '@material-ui/lab/Alert';
import CampaignsForm from '../../Components/CampaignsForm';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import ListIcon from '@material-ui/icons/List';
import ArchiveIcon from '@material-ui/icons/Archive';
import UnarchiveIcon from '@material-ui/icons/Unarchive';
import { formatPhoneNumberIntl } from 'react-phone-number-input'

import {
    Container,
    Card, Card5, Card6, Card7, Card8,
    Content,
    Btn1, Btn2,
    Controller,
    Title,
    TitleBtn,
    Display,
    ContentC7,
    ContentC7b,
    Line,
    InfoSection, Section,
} from './styles';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            backgroundColor: '#0294FF ',
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

const Campaigns = () => {


    const history = useHistory();

    const { t } = useTranslation();
    let location = useLocation();
    var language = navigator.language.substring(0, 2);
    const classes = useStyles();
    const btn = BtnBlue();
    const BtnSave = saveBtn();
    const btnGray = BtnGray();
    const CancelBtn = cancelBtn();
    const [listMembers, setListMember] = React.useState([]);
    const [camp, setCamp] = React.useState('')
    const [date, setDate] = React.useState('')
    const [info, setInfo] = React.useState([])
    const [groupLink, setGroupLink] = React.useState('')
    const [totals, setTotals] = React.useState([]);
    const [membersPerStage, setInfoStage] = React.useState([]);
    const [idNumber, setIdNumber] = React.useState();
    const [archiveStatus, setArchiveStatus] = React.useState();
    var size = 0;
    var secondSize = 0;
    var thirdSize = 0;
    let { id } = useParams();
    var dateFormat = null;
    var secondDateFormat = null;
    if (language === 'pt') {
        dateFormat = 'D/MM/YYYY, LTS ';
        secondDateFormat = 'D/MM/';
    } else {
        dateFormat = 'MMMM Do YYYY, h:mm:ss a';
        secondDateFormat = "MM/D";
    }

    React.useEffect(() => {
        function getDetailsCampaing() {
            axios_base.get(`/campaign/${id}`)
                .then(res => {
                    if (res.data) {
                        console.log(res.data);
                        setCamp(res.data.name);
                        setDate(res.data.created_at);
                        setIdNumber(res.data.number_id);
                        setGroupLink(`${window.location.origin}/campaign/${res.data.invite_code}/invite`);
                        setArchiveStatus(res.data.archived);
                        function getMember() {
                            axios_base.get(`/campaign/${res.data.id}/member`)
                                .then(res => {
                                    setListMember(res.data);
                                    /* setOrigialList(res.data); */
                                    console.log(res.data, "->");
                                })
                        }
                        getMember()
                    }
                }).catch(err => {

                })
        }
        function getStatistics() {
            try {
                axios_base.get(`campaign/${id}/statistics`)
                    .then(res => {
                        setTotals(res.data.totals);
                        setInfo(res.data.member_count_by_date.reverse());
                        setInfoStage(res.data.member_count_by_stage);
                    })
            } catch (error) {

            }
        }
        getDetailsCampaing();
        getStatistics();
    }, [id, location]);

    const copy = () => {
        const el = document.createElement('textarea');
        el.value = groupLink;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        alert(`${t("words.copied_link")}`);

    }

    //Filtro de leads
    /* const [originalListLeads, setOrigialList] = React.useState([]); */
    const [search, setSearch] = React.useState("");
    const filtered = listMembers.filter(v => v.number.split(':')[0].includes(search));
    const [anchorEl, setAnchorEl] = React.useState(null);


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    //Deletar campanha
    const [modal, setModal] = React.useState(false);
    const [modal3, setModal3] = React.useState(false);
    const [editModal, setEditModal] = React.useState(false);

    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);

    const handleClose2 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen1(false);
        setOpen2(false);
        setOpen3(false);

    };

    const deleteCampaings = () => {
        try {
            setOpen2(true);
            axios_base.delete(`/campaign/${id}`)
                .then(res => {
                    setOpen2(false);
                    setOpen1(true);
                    console.log(res.data);
                    history.push(`/dashboard`);
                })
                .catch(err => {
                    setOpen3(true);
                })
        } catch (error) {

        }
    }

    const CampaignsArchive = () => {
        try {
            var data = {
                "archived": !archiveStatus,
            };
            axios_base.patch(`/campaign/${id}/archive`, data)
                .then(res => {
                    setModal3(false);
                    setOpen1(true);
                    history.push(`/campaigns/${id}/detail`);
                })
                .catch(err => {
                    toggle3();
                    setOpen3(true);
                })
        } catch (error) {
            setOpen3(true);
        }
    }

    const toggle = () => {
        setAnchorEl(null);
        setModal(!modal);
    }
    const toggle3 = () => {
        setAnchorEl(null);
        setModal3(!modal3);
    }

    const toggle2 = () => {
        setAnchorEl(null);
        setEditModal(!editModal);
    }
    const confirDelete = (name) => {
        if (name === camp) {
            ReactDOM.render(<Button classes={{ root: BtnSave.root, label: BtnSave.label, }} onClick={deleteCampaings}>{t("words.delete")}</Button>, document.getElementById('delet'))
        } else {
            ReactDOM.render(<div></div>, document.getElementById('delet'))
        }
    }
    var windowWidth = window.innerWidth;
    if (windowWidth >= '1280') {
        size = 3;
        secondSize = 8;
        thirdSize = 4;
    } else if (windowWidth <= '780') {
        size = 6;
        secondSize = 12;
        thirdSize = 12;
    }

    return (
        <Container>
            <ContentHeader title={camp} subTitle={`${t("words.created_at")} ${moment(date).format(dateFormat)}`}>
                <Link to="/dashboard">
                    <Button classes={{ root: classes.root, label: classes.label, }} >
                        <RiArrowGoBackFill />
                    </Button>
                </Link>
            </ContentHeader>

            <Controller>
                <Btn1>
                    {archiveStatus === false ? <div onClick={copy} >
                        <Button variant="contained" id="myInput" classes={{ root: classes.root, label: classes.label, }} >
                            {t("words.group_link")} <FaRegCopy />
                        </Button>
                    </div> : <div onClick={toggle3} >
                        <Button variant="contained" id="myInput" classes={{ root: BtnSave.root, label: BtnSave.label, }} >
                            {t("words.unarchive")} <UnarchiveIcon />
                        </Button>
                    </div>}


                </Btn1>
                <Btn2>
                    <Button
                        aria-controls="customized-menu"
                        aria-haspopup="true"
                        variant="contained"
                        classes={{ root: classes.root, label: classes.label, }}
                        onClick={handleClick}
                    >
                        <MenuIcon />
                    </Button>
                    <StyledMenu
                        id="customized-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        {/*  <StyledMenuItem onClick={toggle2}>
                            <ListItemIcon>
                                <EditIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary="Editar" />
                        </StyledMenuItem> */}
                        <Link to={`/campaigns/${id}/groups`} numberId={idNumber} status={`${archiveStatus}texto`} style={{ textDecoration: "none", color: 'black' }}>
                            <StyledMenuItem>
                                <ListItemIcon>
                                    <GroupAddIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText primary={t("words.groups")} />
                            </StyledMenuItem>
                        </Link>
                        <Link to={`/funnelSteps/${id}`} style={{ textDecoration: "none", color: 'black' }}>
                            <StyledMenuItem>
                                <ListItemIcon>
                                    <ListIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText primary={t("words.stages")} />
                            </StyledMenuItem>
                        </Link>
                        {archiveStatus === false && <StyledMenuItem onClick={toggle3}>
                            <ListItemIcon>
                                <ArchiveIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary={t("words.archive")} />
                        </StyledMenuItem>
                        }
                        <StyledMenuItem onClick={toggle}>
                            <ListItemIcon>
                                <DeleteIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary={t("words.delete")} />
                        </StyledMenuItem>
                    </StyledMenu>
                </Btn2>
            </Controller>

            <Content>
                {/* Blocos */}
                <Grid container spacing={3}>
                    <Grid item xs={size} className={classes.container}>
                        <Card>
                            <Grid container spacing={1}>
                                <Grid item xs={4} className={classes.container}>
                                    <Section>
                                        <div style={{ background: "transparent linear-gradient(33deg, #FD1A7A 0%, #F67D34 100%) 0% 0% no-repeat padding-box" }}>
                                            <BsPeople />
                                        </div>
                                    </Section>
                                </Grid>
                                <Grid item xs={8} className={classes.container}>
                                    <InfoSection>
                                        <div>
                                            <h5>{t("words.leads")}</h5>
                                            <h3><CountUp end={totals?.member_count} duration={1.75} /></h3>
                                        </div>
                                    </InfoSection>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                    <Grid item xs={size} className={classes.container}>
                        <Card>
                            <Grid container spacing={1}>
                                <Grid item xs={4} className={classes.container}>
                                    <Section>
                                        <div style={{ background: 'transparent linear-gradient(33deg, #DBFC01 0%, #FFDD02 100%) 0% 0% no-repeat padding-box' }}>
                                            <BsPeople />
                                        </div>
                                    </Section>
                                </Grid>
                                <Grid item xs={8} className={classes.container}>
                                    <InfoSection>
                                        <div>
                                            <h5>{t("words.groups")}</h5>
                                            <h3><CountUp end={totals?.group_count} duration={1.75} /></h3>
                                        </div>
                                    </InfoSection>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                    <Grid item xs={size} className={classes?.container}>
                        <Card>
                            <Grid container spacing={1}>
                                <Grid item xs={4} className={classes.container}>
                                    <Section>
                                        <div style={{ background: "transparent linear-gradient(33deg, #01AAFC 0%, #00FDC4 100%) 0% 0% no-repeat padding-box" }}><TiMessages /></div>
                                    </Section>
                                </Grid>
                                <Grid item xs={8} className={classes.container}>
                                    <InfoSection>
                                        <div>
                                            <h5>{t("words.total_msg")}</h5>
                                            <h3><CountUp end={totals?.message_count} duration={1.75} /></h3>
                                        </div>
                                    </InfoSection>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                    <Grid item xs={size} className={classes.container}>
                        <Card>
                            <Grid container spacing={1}>
                                <Grid item xs={4} className={classes.container}>
                                    <Section>
                                        <div style={{ background: 'transparent linear-gradient(33deg, #01AAFC 0%, #0294FF 100%) 0% 0% no-repeat padding-box' }}><RiAdminLine /></div>
                                    </Section>
                                </Grid>
                                <Grid item xs={8} className={classes.container}>
                                    <InfoSection>
                                        <div>
                                            <h5>{t("words.adm")}</h5>
                                            <h3><CountUp end={totals?.admin_count} duration={1.75} /></h3>
                                        </div>
                                    </InfoSection>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                    <Grid item xs={secondSize} className={classes.container}>
                        <Card5>
                            <Title><h1>{t("words.member_per_day")}</h1></Title>
                            <Display>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        width={500}
                                        height={300}
                                        data={info?.map(statistics => ({
                                            name: moment().subtract(statistics.index, 'days').format(secondDateFormat),
                                            joined: statistics.count
                                        }))}
                                        margin={{
                                            top: 5,
                                            right: 30,
                                            left: 20,
                                            bottom: 5,
                                        }}
                                        barSize={20}
                                    >
                                        <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="joined" fill="#0294FF" background={{ fill: 'White' }} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </Display>
                        </Card5>
                    </Grid>
                    <Grid item xs={thirdSize} className={classes.container}>
                        <Card6 >
                            <Title>
                                <h1>{t("words.members_per_stage")}</h1>
                            </Title>
                            <ResponsiveContainer width="100%" height="100%">
                                <ComposedChart
                                    layout="vertical"
                                    width={500}
                                    height={400}
                                    data={membersPerStage?.map(statistics => ({
                                        name: statistics.name,
                                        leads: statistics.count
                                    }))}
                                    /* data={data} */
                                    margin={{
                                        top: 20,
                                        right: 20,
                                        bottom: 20,
                                        left: 20,
                                    }}
                                >
                                    <CartesianGrid stroke="#f5f5f5" />
                                    <XAxis type="number" />
                                    <YAxis dataKey="name" type="category" scale="band" />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="leads" barSize={20} fill="#0294FF " />
                                </ComposedChart>
                            </ResponsiveContainer>
                        </Card6>
                    </Grid>
                    <Grid item xs={12} className={classes.container}>
                        <Card8>
                            <TitleBtn>
                                <div style={{ width: '30%' }}>
                                    <InputGroup>
                                        <InputGroupText><BsSearch /></InputGroupText>
                                        <Input className="form-input" onChange={e => setSearch(e.target.value)} value={search} id="input-table" placeholder={t("words.search")} />
                                    </InputGroup>
                                </div>
                            </TitleBtn>
                            <ContentC7>
                                <Line>
                                    <div style={{ marginRight: '40px' }}></div>
                                    <div style={{ flex: '1' }}><h6>{t("words.name")}</h6></div>
                                    <div style={{ flex: '1' }}><h6>{t("words.number")}</h6></div>
                                    <div style={{ width: '20%' }} ><h6>{t("words.joined")}</h6></div>
                                    <div style={{ flex: '1' }}><h6>{t("words.stage")}</h6></div>
                                    <div style={{ flex: '1' }}><h6>{t("words.role")}</h6></div>
                                    <div><h6>{t("words.details")}</h6></div>
                                </Line>

                                <List
                                    height={350}
                                    itemCount={filtered.length}
                                    itemSize={56}

                                >
                                    {({ index, style }) => {
                                        const member = filtered[index];
                                        return (
                                            <Line style={style} key={member.id}>
                                                <div ><Avatar alt="Lead" src={member?.image} style={{ width: '30px', height: '30px', marginRight: '10px' }} /></div>
                                                <div style={{ flex: '1' }}>{member?.name !== "" && member?.name}{member?.name === "" && t("words.name_unavailable")}</div>
                                                <div style={{ flex: '1' }}>{formatPhoneNumberIntl('+' + member.number.split(':')[0])}</div>



                                                {/* <div style={{ width: '20%' }} >{member.observation}</div> */}
                                                <div style={{ width: '20%' }} >{moment(member.created_at).format(dateFormat)}</div>
                                                <div style={{ flex: '1' }}>{member.stage.name}</div>
                                                <div style={{ flex: '1' }}>{member.is_admin === true ? (t("words.administrator")) : (t("words.lead"))}</div>
                                                <div><DetailsLeads title={t("words.details")} idCampaign={id} memberId={member.id} buttonLabel={<CgDetailsMore />} /></div>
                                            </Line>
                                        )
                                    }}
                                </List>

                            </ContentC7>

                        </Card8>
                    </Grid>
                    {/*  <Grid item xs={6} className={classes.container}>
                        <Card8 >
                            <Title><h1>Procurar</h1></Title>
                        </Card8>
                    </Grid> */}
                    <Grid item xs={12} className={classes.container}>
                        <Card7 >
                            <TitleBtn>
                                {!archiveStatus ? <MessageForm buttonLabel={<Button classes={{ root: btn.root, label: btn.label, }}>{t("words.create_msg")}</Button>} campaignid={id} title={t("words.message")} /> :
                                    <Button classes={{ root: btnGray.root, label: btnGray.label, }} >{t("words.create_msg")}</Button>
                                }
                            </TitleBtn>
                            <ContentC7b>
                                <TimeLineCuston />
                            </ContentC7b>
                        </Card7>
                    </Grid>
                </Grid>
            </Content>

            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader>{t("words.campaigns")}</ModalHeader>
                <ModalBody>
                    <h6>{t("words.delete_campaign")}</h6>
                    <h6>{t("words.delete_cp2")}</h6>
                    <p>{t("words.delete_cp3")} <b style={{ color: 'red' }}>{camp}</b> </p>
                    <Input className="form-input" onChange={e => confirDelete(e.target.value)} id="input-delete" placeholder={t("words.delete")} />
                </ModalBody>
                <ModalFooter>
                    <div>
                        <Button classes={{ root: CancelBtn.root, label: CancelBtn.label, }} onClick={toggle}>{t("words.cancel")}</Button>
                    </div>
                    <div id="delet">

                    </div>
                </ModalFooter>
            </Modal>

            <Modal isOpen={editModal} toggle={toggle2} size="lg" style={{ maxWidth: '700px', width: '100%' }}>
                <ModalHeader>{t("words.campaigns")}</ModalHeader>
                <ModalBody>
                    <CampaignsForm id={id} saveButton={<Button classes={{ root: CancelBtn.root, label: CancelBtn.label, }} onClick={toggle2}>{t("words.cancel")}</Button>}>

                    </CampaignsForm>
                </ModalBody>
                <ModalFooter>

                </ModalFooter>
            </Modal>

            <Modal isOpen={modal3} toggle={toggle3}>
                <ModalHeader>{t("words.campaigns")}</ModalHeader>
                <ModalBody>
                    {archiveStatus === true ? <div>
                        <h6>{t("words.unarchive_question")}</h6>
                    </div> : <div>
                        <h6>{t("words.archive_question")}</h6>
                    </div>}

                </ModalBody>
                <ModalFooter>
                    <div>
                        <Button classes={{ root: CancelBtn.root, label: CancelBtn.label, }} onClick={toggle3}>{t("words.cancel")}</Button>
                    </div>
                    <div >
                        <Button classes={{ root: BtnSave.root, label: BtnSave.label, }} onClick={CampaignsArchive}>{t("words.save")}</Button>
                    </div>
                </ModalFooter>
            </Modal>

            <Snackbar open={open1} autoHideDuration={3000} onClose={handleClose2}>
                <Alert onClose={handleClose2} severity="success">
                    {t("words.done")}!
                </Alert>
            </Snackbar>
            <Snackbar open={open2} autoHideDuration={3000} onClose={handleClose2}>
                <Alert onClose={handleClose2} severity="info">
                    {t("words.deleting")}
                </Alert>
            </Snackbar>
            <Snackbar open={open3} autoHideDuration={2000} onClose={handleClose2}>
                <Alert onClose={handleClose2} severity="error">
                    {t("words.unable_complete")}
                </Alert>
            </Snackbar>
        </Container>
    );
}

export default Campaigns;