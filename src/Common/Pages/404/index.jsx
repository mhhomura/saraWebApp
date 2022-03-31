import React from 'react';
import back from '../../../Assets/icon/404.svg';
import Alert from '@material-ui/lab/Alert';
import { useTranslation } from "react-i18next";

import {
    Container,
    Image
} from './styles';


const NoMatch = () => {
    const { t } = useTranslation();
    return (
        <Container>
            <Image>
                <img src={back} alt="Imagem"></img>
            </Image>
            <Alert variant="filled" severity="warning">
                {t("words.404")}
            </Alert>
        </Container>
    )
}

export default NoMatch;