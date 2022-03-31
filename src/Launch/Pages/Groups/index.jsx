import React from 'react';
import { InputGroup, InputGroupText, ModalFooter, ModalBody, ModalHeader, Modal, Input } from 'reactstrap';
import { BsSearch } from 'react-icons/bs';
import Grid from '@material-ui/core/Grid';
import { Snackbar, } from '@material-ui/core';
import { useTranslation } from "react-i18next";
import { useStyles, cancelBtn, saveBtn } from '../../../Styles/styles';
import { FixedSizeList as List } from 'react-window';
import moment from 'moment';
import { Link, useParams, useLocation, useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import axios_base from '../../../axios_base';
import ContentHeader from '../../../Common/Components/ContentHeader';
import { RiArrowGoBackFill } from 'react-icons/ri';
import ImportGroup from '../../Components/ImportGroup';
import MenuIcon from '@material-ui/icons/Menu';
import ReactDOM from "react-dom";
import MuiAlert from '@material-ui/lab/Alert';
import {
    Container,
    Card8,
    TitleBtn,
    ContentC7,
    Line,
    Right,
    Left,
} from './style';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Groups = () => {


    const history = useHistory();
    const { t } = useTranslation();
    const classes = useStyles();
    const BtnSave = saveBtn();
    const CancelBtn = cancelBtn();
    let { id } = useParams();
    var language = navigator.language.substring(0, 2);
    let location = useLocation();
    const [listGroups, setListGroups] = React.useState([]);
    const [modal, setModal] = React.useState(false);
    const [groupName, setgroupName] = React.useState();
    const [campaignId, setCampaignId] = React.useState();
    const [groupId, setGroupId] = React.useState();
    const [jid, setJid] = React.useState();
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [campaign, setCampaign] = React.useState();

    const handleClose = () => {
        setOpen(!open);
    }
    const handleClose2 = () => {
        setOpen2(!open2);
    }
    const toggle = () => {
        setModal(!modal)
    }

    var dateFormat = null;
    if (language === 'pt') {
        dateFormat = 'D/MM/YYYY, LTS ';
    } else {
        dateFormat = 'MMMM Do YYYY, h:mm:ss a';
    }


    const getGroups = (id_) => {
        axios_base.get(`campaign/${id_}/group`)
            .then(res => {
                setListGroups(res.data);
                console.log(res.data);
            })
            .catch(err => {

            })
    }
    const getDetailsCampaing = (id) => {
        axios_base.get(`/campaign/${id}`)
            .then(res => {
                if (res.data) {
                    console.log(res.data);
                    setCampaign(res.data);
                }
            })
    }

    React.useEffect(() => {
        getDetailsCampaing(id)
        getGroups(id);
    }, [id, location]);


    const groupsOptions = (campaignId, groupId, jid, name) => {
        setgroupName(name);
        setCampaignId(campaignId);
        setGroupId(groupId);
        setJid(jid);
        toggle();
    }


    /* Setar a lista de leads em um array de state para mostar na tela de detalhes */
    /* Corrigir traduções */

    /* adicionar a notificação de desconeção */
    /* adicionar os retonos das ações de importação e exclusão de grupos */

    /* Adicionar tratamento para listar grupos que deram erro na importação */

    const groupDelete = () => {
        try {
            var data = {
                "gid": jid,
            }
            axios_base.delete(`campaign/${campaignId}/group/${groupId}`, data)
                .then(res => {
                    toggle();
                    console.log(res.data);
                    handleClose();
                    history.push(`/campaigns/${id}/groups`);
                })
                .catch(err => {
                    handleClose2();
                })
        } catch (error) {

        }
    }

    const confirDelete = (name) => {
        if (name === groupName) {
            ReactDOM.render(<Button classes={{ root: BtnSave.root, label: BtnSave.label, }} onClick={groupDelete}>{t("words.delete")}</Button>, document.getElementById('delet'))
        } else {
            ReactDOM.render(<div></div>, document.getElementById('delet'))
        }
    }


    //Filtro de grupos
    const [search, setSearch] = React.useState("");
    const filtered = listGroups.filter(v => v?.metadata?.subject.split(':')[0].includes(search));


    return (
        <Container>
            <ContentHeader title={`${t("words.groups")}`} /* subTitle={camp} */>
                <Link to={`/campaigns/${id}/detail`}>
                    <Button classes={{ root: classes.root, label: classes.label, }} >
                        <RiArrowGoBackFill />
                    </Button>
                </Link>
            </ContentHeader>

            <Grid item xs={12} className={classes.container}>
                <Card8>
                    <TitleBtn>
                        <Left>
                            <InputGroup>
                                <InputGroupText><BsSearch /></InputGroupText>
                                <Input className="form-input" onChange={e => setSearch(e.target.value)} value={search} id="input-table" placeholder={t("words.search")} />
                            </InputGroup>
                        </Left>
                        <Right>
                            <ImportGroup campaign={campaign}></ImportGroup>
                        </Right>
                    </TitleBtn>
                    <ContentC7>
                        <Line>
                            {/* <div style={{ width: '10%', textAlign: 'center', marginRight: '40px' }}></div> */}
                            <div style={{ width: '30%', textAlign: 'left' }}><h6>{t("words.name")}</h6></div>
                            <div style={{ width: '30%', textAlign: 'center' }}><h6>{t("words.created")}</h6></div>
                            <div style={{ width: '20%', textAlign: 'center' }}><h6>{t("words.leads")}</h6></div>
                            <div style={{ width: '20%', textAlign: 'right' }}><h6>{t("words.menu")}</h6></div>
                        </Line>

                        <List
                            height={350}
                            itemCount={filtered?.length}
                            itemSize={56}

                        >
                            {({ index, style }) => {
                                const group = filtered[index];
                                return (
                                    <Line style={style} key={group.id}>

                                        <div style={{ width: '30%', }}>{group?.metadata?.subject !== "" && group?.metadata?.subject}{group?.metadata?.subject === "" && t("words.name_unavailable")} </div>
                                        <div style={{ width: '30%', textAlign: 'center' }} >{moment(group.created_at).format(dateFormat)}</div>
                                        <div style={{ width: '20%', textAlign: 'center' }} >{group?.metadata?.participants?.length}</div>
                                        <div style={{ width: '20%', textAlign: 'right' }}> <Button classes={{ root: classes.root, label: classes.label, }} onClick={() => groupsOptions(group.campaign_id, group.id, group.jid, group?.metadata?.subject)} >
                                            <MenuIcon />
                                        </Button>
                                        </div>
                                    </Line>
                                )
                            }}
                        </List>
                    </ContentC7>
                </Card8>
            </Grid>
            <Modal isOpen={modal} toggle={toggle} size="lg" style={{ maxWidth: '700px', width: '100%' }}>
                <ModalHeader>{t("words.groups")}</ModalHeader>
                <ModalBody>
                    <h6>{t("words.delete_group")}</h6>
                    <h6>{t("words.delete_gp2")}</h6>
                    <p>{t("words.delete_cp3")} <b style={{ color: 'red' }}>{groupName}</b> </p>
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
            <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
                <Alert onClose={handleClose2} severity="success">
                    {t("words.done")}
                </Alert>
            </Snackbar>
            <Snackbar open={open2} autoHideDuration={2000} onClose={handleClose2}>
                <Alert onClose={handleClose2} severity="error">
                    {t("words.unable_complete")}
                </Alert>
            </Snackbar>
        </Container>
    )
}

export default Groups;