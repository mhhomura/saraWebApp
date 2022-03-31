import React from 'react'
import Backgroud from '../Backgroud';
import cover from '../../../Assets/chat_img/Chat start illustration.svg'
import { useTranslation } from 'react-i18next';

import {
    Container,
} from './styles';

const ChatIndex = () => {

    const { t } = useTranslation();

    return (
        <Container>
            {/* <img src={back} alt="Imagem"></img>
            <h1>Mantenha seu Celular Conectado</h1>
            <h2>Olá</h2> */}
            <Backgroud text={t("words.synced_whats")} image={cover}>

            </Backgroud>
        </Container>
    )
}

export default ChatIndex;