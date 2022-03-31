import { Container, CustomModal, NoOperators } from './styles.js';
import { ModalFooter, ModalBody, ModalHeader, } from 'reactstrap';
import SupportIcon from '../../../Assets/admin_img/support.svg';
import { cancelBtn2 } from '../../../Styles/styles';
import { useTranslation } from "react-i18next";
import axios_base from '../../../axios_base';
import { Button } from '@material-ui/core';
import { Table } from 'reactstrap';
import moment from 'moment';
import React from 'react';

const OnlineAttendantsModal = ({ toggle, isOpen, idNumber }) => {

    const [operatorList, setOperatorList] = React.useState([]);

    const deadline = moment().add(-1, 'minute')
    const { t } = useTranslation();
    const CancelBtn = cancelBtn2();


    const getAttendants = async () => {
        try {
            const res = await axios_base.get(`/number/${idNumber}/operator`)
            console.log(res.data)
            setOperatorList(res.data)

        } catch (error) {

        }
    }

    React.useEffect(() => {
        if (!idNumber || !isOpen) return;
        getAttendants();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, idNumber])

    return (
        <Container>
            <CustomModal isOpen={isOpen} toggle={toggle} size='lg'>
                <ModalHeader>
                    {t("words.online_operators").toUpperCase()}
                </ModalHeader>
                <ModalBody>
                    {operatorList.length ?
                        <Table striped bordered hover size="sm">
                            <thead class='text-center'>
                                <tr>
                                    <th>{t("words.name")}</th>
                                    <th>{t("words.date")}</th>
                                    <th>{t("words.hour")}</th>
                                </tr>
                            </thead>
                            {operatorList.map(operator => (
                                <tbody key={operator.id} class='text-center'>
                                    <tr>
                                        <td>{operator.name}</td>
                                        <td>{operator.logged_at ? (moment(operator.logged_at).format('L')) : t("words.never_logged")}</td>
                                        <td>{operator.logged_at ? (moment(operator.logged_at) >= deadline ? "Online" : moment(operator.logged_at).fromNow()) : t("words.never_logged")}</td>
                                    </tr>
                                </tbody>
                            ))}
                        </Table>
                        :
                        <NoOperators>
                            <span className='alert'><img src={SupportIcon} alt="suporte" />{t("words.no_operators_registered")}</span>
                        </NoOperators>
                    }
                </ModalBody>
                <ModalFooter>
                    <Button classes={{ root: CancelBtn.root, label: CancelBtn.label, }} onClick={toggle} className="cancelButton" style={{ marginRight: '10px' }}>{t("words.close")}</Button>
                </ModalFooter>
            </CustomModal>


        </Container>
    )
}

export default OnlineAttendantsModal;