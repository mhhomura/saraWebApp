import React from 'react';
import back from '../../../Assets/icon/401.svg';
import Alert from '@material-ui/lab/Alert';
import { useTranslation } from "react-i18next";
import {
    Container,
    Image
} from './styles';


const Not_Authorized = () => {
    const { t } = useTranslation();
    return (
        <Container>
            <Image>
                <img src={back} alt="Imagem"></img>
            </Image>
            <Alert variant="filled" severity="warning">
                {t("words.not_authorized")} — <a href="https://office.builderall.com/br/office/onboarding" style={{ textDecoration: 'none', color: 'white' }} >{t("words.back_office")}</a>!
            </Alert>
        </Container>
    )
}

export default Not_Authorized;