import React from 'react';
import { useParams } from 'react-router-dom';
/* import { useTranslation } from 'react-i18next'; */
import axios_base from '../../../axios_base';
import WS from '../../../ws';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import logo from '../../../Assets/chat_img/Loading Chat.svg'
import LiquidLoader from '../../../Animations/LiquidLoader';
import {
    Container,
    Image,
    Box,
    Load
} from './styles'


const AttendantLogin = () => {

    /*  const { t } = useTranslation(); */
    const history = useHistory();
    let { access_code } = useParams();


    async function operatorLogin() {
        try {
            axios_base.get(`/chat/login?access_code=${access_code}`)
                .then(res => {
                    if (res.data.token) {
                        var token = res.data.token;
                        setTimeout(() => {
                            WS.init(res.data.token, true);
                            sessionStorage.setItem('operator_token', token);
                            sessionStorage.setItem('operator_autenticated', true);
                            function getStats() {
                                var config = {
                                    method: 'get',
                                    url: `${process.env.REACT_APP_LINK_API}/chat/status`,
                                    headers: {
                                        'Authorization': `Bearer ${token}`
                                    },
                                };

                                axios(config)
                                    .then(res => {
                                        window.location.replace('/attendant/chat')
                                    })
                                    .catch(err => {
                                        localStorage.setItem('tryAgain', `/attendant/login/${access_code}`)
                                        history.push('/attendant/disconnected');
                                    })
                            }
                            getStats();
                        }, 1000);
                    }
                })
                .catch(err => {

                })
        } catch (error) {

        }
    };

    React.useEffect(() => {
        operatorLogin();
    })

    return (
        <Container>
            <Image>
                <img src={logo} alt="logo" />
            </Image>
            <Box>
                <Load >
                    <LiquidLoader />
                </Load>
                <h1>Welcome! Wait a moment we are configuring the chat.</h1>
            </Box>


        </Container>
    )
}

export default AttendantLogin;