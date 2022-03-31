import React from 'react';
import logo from '../../../Assets/chat_img/Trying to connect to synced cell phone.svg'
import Alert from '@material-ui/lab/Alert';
import { useTranslation } from 'react-i18next';
import { BtnBlue } from '../../../Styles/styles';
import Button from '@material-ui/core/Button';


import {
    Container,
    Image,
    Box,
    Middle,
} from './styles';

const Disconnected = () => {

    const { t } = useTranslation();
    const blue = BtnBlue();
    var url = localStorage.getItem('tryAgain');

    const tryAgain = () => {
        window.location.replace(url)
    }
    return (
        <Container>
            <Image>
                <img src={logo} alt="logo" />
            </Image>
            <Box>
                <Middle>
                    <h3>{t("words.test_failed")}</h3>
                    <div>
                        <Button classes={{ root: blue.root, label: blue.label, }} onClick={() => tryAgain()}> {t("words.disc_try_again")}</Button>
                    </div>
                </Middle>

                <Alert severity="warning" style={{ cursor: 'pointer', textAlign: 'center' }}>
                    <div style={{ textAlign: 'center' }}>If possible, open the WhastaApp App on the cell phone that is synced to force the connection and return to normal. </div>
                </Alert>
            </Box>

        </Container>
    )
}

export default Disconnected;