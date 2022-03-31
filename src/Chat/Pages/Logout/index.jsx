import React from 'react';
import Banner from '../../../Assets/attendance/Banner.svg'
import Alert from '@material-ui/lab/Alert';
import { useTranslation } from 'react-i18next';


import {
    Container,
    Image,
    Box,
    Middle,
} from './styles';

const Logout = () => {

    const { t } = useTranslation();

    return (
        <Container>
            <Image>
                <img src={Banner} alt="logo" />
            </Image>
            <Box>
                <Middle>
                    <h3>{t("words.disconnected")}</h3>
                </Middle>

                <Alert severity="warning" style={{ cursor: 'pointer', textAlign: 'center' }}>
                    <div style={{ textAlign: 'center' }}>Seção Encerrada</div>
                </Alert>
            </Box>

        </Container>
    )
}

export default Logout;