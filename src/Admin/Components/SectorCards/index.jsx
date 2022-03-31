import { Card, CardBody, CardTitle, Button as ButtonBootstrap, ModalFooter, ModalBody, ModalHeader, Modal, Input } from 'reactstrap';
import { Container, CardsSectors, CardButtons, CardTitleAvatar, RelatedOperators, useStyles, WithoutOperators } from './styles';
import { cancelBtn2, saveBtn2 } from '../../../Styles/styles';
import { Divider, Snackbar, Button } from '@material-ui/core';
import ApartmentIcon from '@material-ui/icons/Apartment';
import Thrash from '../../../Assets/admin_img/Trash.svg'
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import PersonIcon from '@material-ui/icons/Person';
import { useTranslation } from "react-i18next";
import Avatar from '@material-ui/core/Avatar';
import MuiAlert from '@material-ui/lab/Alert';
import axios_base from '../../../axios_base';
import React from 'react';

const SectorCards = ({ sectors, onEdit, onDelete, onSearch, idNumber }) => {

    const { t } = useTranslation();
    const CancelBtn = cancelBtn2();
    const SaveBtn = saveBtn2();
    const classes = useStyles();

    const [deleteModal, setDeleteModal] = React.useState(false);
    const [sectorId, setSectorId] = React.useState(null);
    const [numberId, setNumberId] = React.useState();

    const [excludeSuccess, setExcludeSuccess] = React.useState(false);
    const [generalError, setGeneralError] = React.useState(false);

    const [sectorNameTest, setSectorNameTest] = React.useState('');
    const [sectorName, setSectorName] = React.useState('');

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const handleClose = () => {
        setExcludeSuccess(false);
        setGeneralError(false);
    };

    const toggle = (sectorId, numberId, sectorName) => {
        setDeleteModal(!deleteModal);
        setNumberId(numberId);
        setSectorId(sectorId);
        setSectorName(sectorName);
        setSectorNameTest('');
    }

    const deleteSector = () => {
        axios_base.delete(`/number/${numberId}/department/${sectorId}`)
            .then(res => {
                setExcludeSuccess(true);
                setDeleteModal(false);
                toggle();
                onDelete();
            })
            .catch((error) => {
                setGeneralError(true);
            });
    }

    React.useEffect(() => {
        setNumberId(numberId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container>
            <CardsSectors>
                {sectors.filter((sector) => {
                    if (onSearch === "") {
                        return sector
                    } else if (sector.name.toLowerCase().includes(onSearch.toLowerCase())) {
                        return sector
                    } else {
                        return null
                    }
                }).map(sector => (
                    <Card className='cardOutline' key={sector.id} >
                        <CardBody className='cardBody1'>
                            <CardTitleAvatar variant={sector.is_active === true ? 'blue' : 'gray'}>
                                <div className='avatarExclusiveDiv'>
                                    <ApartmentIcon fontSize='large' />
                                </div>
                                <CardTitle className='cardTitle'>{sector.name.toUpperCase()}</CardTitle>
                            </CardTitleAvatar>

                            <RelatedOperators>
                                <PersonIcon style={{ marginTop: '1px', color: '#B7CFEB', marginRight: '.3rem' }} />
                                {
                                    sector.operators?.length > 0
                                        ?
                                        <AvatarGroup max={4} classes={{ avatar: classes.avatar }}>
                                            {sector.operators?.map(({ operator }) => (
                                                <Avatar title={operator.name}>{operator.name.charAt(0)}</Avatar>
                                            ))}
                                        </AvatarGroup>
                                        :
                                        <WithoutOperators>{t("words.without_operators")}</WithoutOperators>
                                }
                            </RelatedOperators>
                        </CardBody>
                        <Divider style={{ opacity: '1' }} />
                        <CardButtons>
                            <CardBody>
                                <ButtonBootstrap variant="primary" className='editButton' onClick={() => onEdit(sector.id, sector.name)}>{t("words.atend_edit")}</ButtonBootstrap>
                                <img src={Thrash} alt="Thrash" className='trashButton' onClick={() => toggle(sector.id, sector.number_id, sector.name)} />
                            </CardBody>
                        </CardButtons>
                    </Card>
                ))}
            </CardsSectors>

            <Modal isOpen={deleteModal} toggle={toggle}>
                <ModalHeader>
                    {t("words.delete")}
                </ModalHeader>
                <ModalBody>
                    <h6>{t("words.really_delete")} <b style={{ color: 'red' }}>{sectorName}</b> </h6>
                    <Input className="form-input" onChange={e => setSectorNameTest(e.target.value)} value={sectorNameTest} id="input-delete" />
                </ModalBody>
                <ModalFooter>
                    <div>
                        <Button classes={{ root: CancelBtn.root, label: CancelBtn.label, }} onClick={toggle} className="cancelButton" style={{ marginRight: '10px' }} >{t("words.cancel")}</Button>
                        {sectorName === sectorNameTest ?
                            <Button classes={{ root: SaveBtn.root, label: SaveBtn.label, }} onClick={() => deleteSector(sectorId)}>{t("words.delete")}</Button>
                            : null}
                    </div>
                </ModalFooter>
            </Modal>

            <Snackbar open={excludeSuccess} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    {t("words.sector_deleted")}
                </Alert>
            </Snackbar>
            <Snackbar open={generalError} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {t("words.delete_error")}
                </Alert>
            </Snackbar>

        </Container>
    )
}

export default SectorCards;