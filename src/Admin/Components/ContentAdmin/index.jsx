import { InputGroup, InputGroupText, Input, ModalFooter, ModalBody, ModalHeader, } from 'reactstrap';
import { BtnBlue2, cancelBtn2, saveBtn2 } from '../../../Styles/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import TabContext from '@material-ui/lab/TabContext';
import TabPanel from '@material-ui/lab/TabPanel';
import Divider from '@material-ui/core/Divider';
import { useTranslation } from "react-i18next";
import TabList from '@material-ui/lab/TabList';
import AttendantCards from '../AttendantCards';
import AppBar from '@material-ui/core/AppBar';
import MuiAlert from '@material-ui/lab/Alert';
import { useParams } from 'react-router-dom';
import axios_base from '../../../axios_base';
import { BsSearch } from 'react-icons/bs';
import SectorCards from '../SectorCards';
import Tab from '@material-ui/core/Tab';
import moment from 'moment';
import React from 'react';
import NoRegisters from '../NoRegisters';

import {
    FormControlLabel,
    FormControl,
    RadioGroup,
    FormGroup,
    Snackbar,
    Checkbox,
    Button,
    Radio,
} from '@material-ui/core';
import {
    SearchAddButtons,
    SearchInput,
    Container,
    useStyles,
    AddModal,
    TabArea,
    BtnAdd,
    Label,
    Form
} from './styles';

const ContentAdmin = ({ idNumber }) => {

    const CancelBtn = cancelBtn2();
    const SaveBtn = saveBtn2();
    const btnAdd = BtnBlue2();
    let { id } = useParams();

    const { t } = useTranslation();
    const classes = useStyles();

    const [numberId, setNumberId] = React.useState(idNumber);
    const [modal, setModal] = React.useState(false);
    const [value, setValue] = React.useState('1');
    //Sector
    const [statusSector, setStatusSector] = React.useState('active');
    const [sectorName, setSectorName] = React.useState('');
    const [sectorList, setSectorList] = React.useState([]);
    const [sectorID, setSectorID] = React.useState(null);
    //Attendant
    const [statusAttendant, setStatusAttendant] = React.useState('active');
    const [attendantName, setAttendantName] = React.useState('');
    const [attendantList, setAttendantList] = React.useState([]);
    const [attendantID, setAttendantID] = React.useState(null);
    const [roleType, setRoleType] = React.useState('common');

    const [generalError, setGeneralError] = React.useState(false);
    const [openWarning, setOpenWarning] = React.useState(false);
    const [editSuccess, setEditSuccess] = React.useState(false);
    const [addSuccess, setAddSuccess] = React.useState(false);
    const [nullError, setNullError] = React.useState(false);
    const [nameError, setNameError] = React.useState(false);

    // Seleção de setores checkbox - Anderson
    const [selectedSectors, setSelectedSectors] = React.useState([]);

    function changeSelectedSectors(id, checked) {
        if (checked) {
            setSelectedSectors([...selectedSectors, id]);
        } else {
            setSelectedSectors([...selectedSectors.filter(s => s !== id)]);
        }
    }
    // Seleção de setores checkbox - Anderson

    //Buscar
    const [search, setSearch] = React.useState("");

    const handleClose = () => {
        setGeneralError(false);
        setEditSuccess(false);
        setOpenWarning(false);
        setAddSuccess(false);
        setNullError(false);
        setNameError(false);
    };

    const handleSectorStatusChange = (event) => {
        setStatusSector(event.target.value);
    };

    const handleAttendantStatusChange = (event) => {
        setStatusAttendant(event.target.value);
    };

    const handleRoleTypeChange = (event) => {
        setRoleType(event.target.value);
    };

    //Aba atendentes e setores
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const toggle = () => {
        setStatusAttendant('active');
        setStatusSector('active');
        setSelectedSectors([]);
        setRoleType('common');
        setAttendantName('');
        setAttendantID(null);
        setSectorID(null);
        setSectorName('');
        setModal(!modal);
    }

    //Criar e listar setores
    const createSector = (sectorName, statusSector) => {
        let foundSectorName = sectorList.find(s => s.name === sectorName)
        if (!sectorName) {
            setNullError(true)
        }
        if (foundSectorName != null && sectorID === null) {
            setNameError(true)
        }
        else {
            try {
                var data = {
                    "name": sectorName,
                    "is_active": statusSector === 'active'
                }
                if (sectorID === null) {
                    axios_base.post(`/number/${numberId}/department`, data)
                        .then(res => {
                            console.log(res.data);
                            setAddSuccess(true);
                            setModal(false);
                            getSectors();
                        })
                        .catch(err => {
                            console.log(err);
                        })
                } //Editar:
                else {
                    const editFunc = () => {
                        axios_base.patch(`/number/${numberId}/department/${sectorID}`, data)
                            .then(res => {
                                console.log(res.data);
                                setEditSuccess(true);
                                setModal(false);
                                getSectors();
                            })
                            .catch(err => {
                                console.log(err);
                            })
                    }
                    if (foundSectorName != null && foundSectorName.id === sectorID) {
                        editFunc();
                    }
                    else {
                        if (!foundSectorName) {
                            editFunc();
                        }
                        else {
                            setNameError(true)
                        }
                    }
                }
            } catch (error) {
                setModal(false);
                setGeneralError(true);

            }
        }
    }

    const getSectors = () => {
        try {
            axios_base.get(`/number/${numberId}/department`)
                .then(res => {
                    console.log(res.data)
                    setSectorList(res.data)
                })
        } catch (error) {

        }
    }

    function editSector(sectorID) {
        try {
            axios_base.get(`/number/${numberId}/department/${sectorID}`)
                .then(res => {
                    console.log(res.data)
                    setSectorID(res.data.id)
                    setSectorName(res.data.name)
                    setStatusSector(res.data.is_active ? 'active' : 'inactive')
                    setModal(true);
                })
        } catch (error) {

        }
    }

    //Criar e listar operadores
    const createAttendant = (attendantName, statusAttendant) => {
        let foundAttName = attendantList.find(a => a.name === attendantName)
        if (!attendantName) {
            setNullError(true)
        }
        if (foundAttName != null && attendantID === null) {
            setNameError(true)
        }
        else {
            try {
                var data = {
                    "name": attendantName,
                    "type": roleType,
                    "departments": selectedSectors,
                    "is_active": statusAttendant === 'active'
                }
                if (attendantID === null) {
                    axios_base.post(`/number/${numberId}/operator`, data)
                        .then(res => {
                            console.log(res.data);
                            setAddSuccess(true);
                            setModal(false);
                            //history.push(`/adminDashboard`);
                            getAttendants();
                            if (selectedSectors.length === 0) {
                                setOpenWarning(true)
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        })
                }
                //Editar:
                else {
                    const editFunc = () => {
                        axios_base.patch(`/number/${numberId}/operator/${attendantID}`, data)
                            .then(res => {
                                console.log(res.data);
                                setEditSuccess(true);
                                setModal(false);
                                getAttendants();
                            })
                            .catch(err => {
                                console.log(err);
                            })
                    }
                    if (foundAttName != null && foundAttName.id === attendantID) {
                        editFunc();
                    }
                    else {
                        if (!foundAttName) {
                            editFunc();
                        }
                        else {
                            setNameError(true)
                        }
                    }
                }
            } catch (error) {
                setModal(false);
                setGeneralError(true);
            }
        }
    }

    const getAttendants = async () => {
        try {
            const res = await axios_base.get(`/number/${numberId}/operator`)

            const deadline = moment().add(-1, 'minute')

            setAttendantList(res.data.map(attendant => ({
                ...attendant,
                isLogged: moment(attendant.logged_at).isAfter(deadline)
            })))
            console.log(attendantList)
        } catch (error) {

        }
    }

    async function editAttendant(attendantID) {
        try {
            const res = await axios_base.get(`/number/${numberId}/operator/${attendantID}`)
            console.log(res.data)
            setAttendantID(res.data.id)
            setAttendantName(res.data.name)
            setRoleType(res.data.type)
            setStatusAttendant(res.data.is_active ? 'active' : 'inactive')
            setSelectedSectors(res.data.departments?.map(department => department.department_id) || [])
            setModal(true);
        } catch (error) {
        }
    }

    React.useEffect(() => {
        setNumberId(id)
        if (!numberId) return;

        getAttendants()
        getSectors()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idNumber])

    return (
        <Container>

            <TabContext value={value}>
                {/* Abas */}
                <AppBar position="static" className={classes.AppBarStyle}>
                    <TabList onChange={handleChange} TabIndicatorProps={{ style: { background: '#0080FC' } }} className={classes.SelectedTab}>
                        <Tab label={t("words.sectors")} value="1" className={classes.TabFont} />
                        <Tab label={t("words.operators")} value="2" className={classes.TabFont} />
                    </TabList>
                </AppBar>

                <Divider className='divider' />

                {/* Modal de adição */}

                <AddModal isOpen={modal}>
                    <ModalHeader>
                        {sectorID || attendantID ?
                            t("words.edit").toUpperCase()
                            :
                            t("words.add").toUpperCase()
                        }&nbsp;
                        {value === '1' ?
                            t("words.sector").toUpperCase()
                            :
                            t("words.operator").toUpperCase()
                        }

                    </ModalHeader>

                    <ModalBody>
                        {value === '1' ?
                            <Form>
                                <Label htmlFor="sectorName">{t("words.sector_name")}</Label>
                                <Input maxLength={35} type="text" name="sectorName" id="sectorName" value={sectorName}
                                    onChange={(e) => setSectorName(e.target.value)} className='nameInput' />

                                <Label htmlFor="sectorStatus">Status</Label>
                                <FormControl component="fieldset" className='selector'>
                                    <RadioGroup aria-label="status" name="status" className='radioGroupDiv' value={statusSector} onChange={handleSectorStatusChange}>
                                        <FormControlLabel value="active" control={<Radio color='primary' />} label={t("words.status_active")} />
                                        <FormControlLabel value="inactive" control={<Radio color='primary' />} label={t("words.inactive")} />
                                    </RadioGroup>
                                </FormControl>
                            </Form>
                            :
                            <Form>
                                <Label htmlFor="attendantName">{t("words.operator_name")}</Label>
                                <Input maxLength="35" type="text" name="attendantName" id="attendantName" value={attendantName} onChange={(e) => setAttendantName(e.target.value)} className='nameInput' />
                                <Label htmlFor="statusSetor">{t("words.role")}</Label>
                                <FormControl component="fieldset" className='selector'>
                                    <RadioGroup aria-label="roleType" name="roleType" value={roleType} onChange={handleRoleTypeChange}>
                                        <FormControlLabel value="common" control={<Radio color='primary' />} label={t("words.collaborator")} />
                                        <FormControlLabel value="manager" control={<Radio color='primary' />} label={t("words.manager")} />
                                    </RadioGroup>
                                </FormControl>

                                <Label htmlFor="statusSetor">{t("words.sector_view")}</Label>
                                <FormControl component="fieldset" className='selector'>
                                    <FormGroup >
                                        {sectorList.length ? sectorList.filter(s => s.is_active).map(sector => (
                                            <FormControlLabel key={sector.id}
                                                control={
                                                    <Checkbox name={sector.name} color='primary' checked={selectedSectors.find(s => s === sector.id)}
                                                        onChange={e => changeSelectedSectors(sector.id, e.target.checked)}
                                                    />
                                                }
                                                label={sector.name}
                                            />
                                        ))
                                            :
                                            <span style={{ padding: '5px 0 5px' }}>{t("words.no_sectors_registered")}</span>
                                        }
                                    </FormGroup>
                                </FormControl>

                                <Label htmlFor="operatorStatus">Status</Label>
                                <FormControl component="fieldset" className='selector'>
                                    <RadioGroup aria-label="status" name="status" value={statusAttendant} onChange={handleAttendantStatusChange}>
                                        <FormControlLabel value="active" control={<Radio color='primary' />} label={t("words.status_active")} />
                                        <FormControlLabel value="inactive" control={<Radio color='primary' />} label={t("words.inactive")} />
                                    </RadioGroup>
                                </FormControl>
                            </Form>
                        }
                    </ModalBody>
                    <ModalFooter>
                        <div>
                            {value === '1' ?
                                <div>
                                    <Button classes={{ root: CancelBtn.root, label: CancelBtn.label, }} onClick={toggle} className="cancelButton" style={{ marginRight: '10px' }}>{t("words.cancel")}</Button>
                                    <Button classes={{ root: SaveBtn.root, label: SaveBtn.label, }} onClick={() => createSector(sectorName, statusSector)}>{sectorID ? t("words.save") : t("words.add")}</Button>
                                </div>
                                :
                                <div>
                                    <Button classes={{ root: CancelBtn.root, label: CancelBtn.label, }} onClick={toggle} className="cancelButton" style={{ marginRight: '10px' }}>{t("words.cancel")}</Button>
                                    <Button classes={{ root: SaveBtn.root, label: SaveBtn.label, }} onClick={() => createAttendant(attendantName, statusAttendant, sectorName)}>{attendantID ? t("words.save") : t("words.add")}</Button>
                                </div>
                            }
                        </div>
                    </ModalFooter>
                </AddModal>

                <Snackbar open={addSuccess} autoHideDuration={3000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                        {value === '1' ? t("words.add_sector_success") : t("words.add_operator_success")}
                    </Alert>
                </Snackbar>
                <Snackbar open={editSuccess} autoHideDuration={2000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                        {value === '1' ? t("words.edited_sector_success") : t("words.edited_operator_success")}
                    </Alert>
                </Snackbar>
                <Snackbar open={nullError} autoHideDuration={2000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                        {value === '1' ? t("words.sector_name_field_blank") : t("words.operator_name_field_blank")}
                    </Alert>
                </Snackbar>
                <Snackbar open={nameError} autoHideDuration={2000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                        {value === '1' ? t("words.sector_name_already_exists") : t("words.operator_name_already_exists")}
                    </Alert>
                </Snackbar>
                <Snackbar open={generalError} autoHideDuration={2000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                        {value === '1' ? t("words.error_sector") : t("words.error_operator")}
                    </Alert>
                </Snackbar>
                <Snackbar open={openWarning} autoHideDuration={3000} onClose={handleClose} style={{ marginBottom: '60px' }}>
                    <Alert onClose={handleClose} severity="warning">
                        {t("words.operator_notAssigned")}
                    </Alert>
                </Snackbar>
                <TabArea>
                    <TabPanel value="1" className={classes.TabPanelStyle}>
                        {sectorList.length > 0 ?
                            <SearchAddButtons>
                                <SearchInput>
                                    <InputGroup>
                                        <InputGroupText><BsSearch /></InputGroupText>
                                        <Input className="form-input" onChange={e => setSearch(e.target.value)} value={search} id="input-table" placeholder={t("words.search")} />
                                    </InputGroup>
                                </SearchInput>

                                <BtnAdd>
                                    <Button onClick={toggle} classes={{ root: btnAdd.root, label: btnAdd.label }} className="addButton">
                                        <AddCircleIcon className="addIcon" />
                                        {t("words.sector")}
                                    </Button>
                                </BtnAdd>
                            </SearchAddButtons>
                            :
                            null
                        }
                        {sectorList.length > 0 ?
                            <SectorCards idNumber={idNumber} sectors={sectorList} onEdit={editSector} onDelete={getSectors} onSearch={search} />
                            :
                            <NoRegisters img="withoutSectors" title={t("words.create_sectors")} toggle={toggle} />
                        }

                    </TabPanel>
                    <TabPanel value="2" className={classes.TabPanelStyle}>
                        {attendantList.length > 0 ?
                            <SearchAddButtons>
                                <SearchInput>
                                    <InputGroup>
                                        <InputGroupText><BsSearch /></InputGroupText>
                                        <Input className="form-input" onChange={e => setSearch(e.target.value)} value={search} id="input-table" placeholder={t("words.search")} />
                                    </InputGroup>
                                </SearchInput>

                                <BtnAdd>
                                    <Button onClick={toggle} classes={{ root: btnAdd.root, label: btnAdd.label }} className="addButton">
                                        <AddCircleIcon className="addIcon" />
                                        {t("words.operator")}
                                    </Button>
                                </BtnAdd>
                            </SearchAddButtons>
                            :
                            null
                        }
                        {attendantList.length > 0 ?
                            <AttendantCards attendants={attendantList} onEdit={editAttendant} onDelete={getAttendants} onSearch={search} />
                            :
                            <NoRegisters img="withoutOperators" title={t("words.register_operators")} toggle={toggle} />
                        }

                    </TabPanel>
                </TabArea>
            </TabContext>
        </Container>
    )
}

export default ContentAdmin;

