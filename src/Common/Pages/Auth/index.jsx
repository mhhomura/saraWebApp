import React from 'react';
import WS from "../../../ws";
import axios_base from '../../../axios_base';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { useParams, /* useHistory */ } from 'react-router-dom';
import ReactDOM from "react-dom";
import axios from 'axios';
import Alert from '@material-ui/lab/Alert';
import { useTranslation } from "react-i18next";

import {
    Container,
} from './styled';


const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#0294FF',
    },
}));

const Login = () => {
    const { t } = useTranslation();
    /* const history = useHistory(); */
    let { user_id } = useParams();

    async function login() {
        try {
            axios_base.get(`/user/login?token=${user_id}`)
                .then(res => {
                    sessionStorage.setItem("auth", "true");
                    if (!res.data.token) {

                    } else {
                        WS.init(res.data.token);
                        sessionStorage.setItem('token', res.data.token);
                        var token = res.data.token;
                        setTimeout(() => {
                            function GetNumber() {
                                try {
                                    var config = {
                                        method: 'get',
                                        url: `${process.env.REACT_APP_LINK_API}/number`,
                                        headers: {
                                            'Authorization': `Bearer ${token}`
                                        },
                                    };

                                    axios(config)
                                        .then(res => {
                                            console.log(res);
                                            console.log(res.data);
                                            if (!res.data[0]) {
                                                /*  Não tem numero criado ainda */
                                                sessionStorage.setItem('campaign', false);
                                                window.location.replace('/authenticate');
                                            } else {
                                                /* Já tem numero criado */
                                                var config = {
                                                    method: 'get',
                                                    url: `${process.env.REACT_APP_LINK_API}/campaign`,
                                                    headers: {
                                                        'Authorization': `Bearer ${token}`
                                                    },
                                                };
                                                axios(config)
                                                    .then(res => {
                                                        console.log(res.data);
                                                        if (!res.data[0]) {
                                                            sessionStorage.setItem('campaign', false);
                                                        } else {
                                                            sessionStorage.setItem('campaign', true);
                                                        }
                                                        window.location.replace('/dashboard');
                                                    })
                                            }
                                        })
                                        .catch(err => {
                                            ReactDOM.render(<Alert variant="filled" severity="error">
                                                {t("something_wrong")}
                                            </Alert>, document.getElementById('AuthPage'))
                                        })
                                } catch (error) {
                                    console.log(error);

                                }
                            }
                            GetNumber();
                        }, 1000);
                    }
                })
                .catch(err => {
                    ReactDOM.render(<Alert variant="filled" severity="error">
                        {t("something_wrong")}
                    </Alert>, document.getElementById('AuthPage'))
                })
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        login();
    });

    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Container>
            <div id="AuthPage">
                <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>
        </Container>
    )
}

export default Login;
