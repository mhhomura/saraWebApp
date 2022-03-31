import { Container, Button1, Button2, Buttons, LeftDiv, RightDiv, BannerDiv } from './styles';
import welcomeBanner from '../../../Assets/admin_img/Banner.svg';
import { useTranslation } from "react-i18next";
import { useHistory } from 'react-router-dom';
import React from 'react';


const WelcomeBanner = ({ idNumber }) => {

    const { t } = useTranslation();
    const history = useHistory();

    const handleClickLocal = () => {
        localStorage.setItem("hideBannerLocal", "true")
        history.push(`/dashboard`)
    }

    const handleClickSession = () => {
        sessionStorage.setItem("hideBannerSession", "true")
        history.push(`/dashboard`)
    }

    return (
        <Container>
            {localStorage.getItem("hideBannerLocal") || sessionStorage.getItem("hideBannerSession") === "true" ? null :
                <BannerDiv>
                    <LeftDiv>
                        <h5>Hi, Barly Vallendito</h5>
                        <p>Fusce ac felis sit amet ligula pharetra condimentum. Cum sociis natoque penatibus et magnis dis parturient montes,
                            nascetur ridiculus mus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Curabitur ullamcorper</p>
                        <Buttons>
                            <Button1 onClick={handleClickLocal}>{t("words.dont_show_again")}</Button1>
                            <Button2 onClick={handleClickSession}>{t("words.understood")}</Button2>
                        </Buttons>
                    </LeftDiv>

                    <RightDiv>
                        <img src={welcomeBanner} alt="Top banner" />
                    </RightDiv>
                </BannerDiv>
            }
        </Container>
    )
}

export default WelcomeBanner;