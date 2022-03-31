import React from 'react';
import { Button } from '@material-ui/core';
import { saveBtn } from '../../../Styles/styles';
import { useTranslation } from "react-i18next";
import { useParams } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import axios_base from '../../../axios_base';
import ReactDOM from "react-dom";
import isMobile from '../../../Services/isMobile';
import * as Sentry from "@sentry/react";

import {
    Container,
    Image,
    NameGroup,
    SectionOne,
    UseStyles,
} from './styles';


const JoinScreen = () => {
    const mobile = isMobile()

    const classes = UseStyles();
    let { hash } = useParams();

    const BtnSave = saveBtn();

    const [name, setName] = React.useState();
    const [description, setDescription] = React.useState();
    const [image, setImage] = React.useState();
    /*  const [link, setLink] = React.useState(); */
    /* const [origem, setOrigem] = React.useState(false); */

    const { t } = useTranslation();
    /*  let location = useLocation(); */


    const getCampaign = () => {
        try {
            axios_base.get(`public/campaign/${hash}`)
                .then(res => {
                    console.log(res.data);
                    if (!res.data.group_name) {
                        ReactDOM.render(<div> </div>, document.getElementById('sectionOne'));
                    } else {
                        setName(res?.data?.group_name);
                        setDescription(res?.data?.group_description);
                        setImage(`${process.env.REACT_APP_LINK_API}/storage/${res.data.group_image}`);

                    }
                    try {
                        axios_base.get(`public/campaign/${hash}/invite`)
                            .then(res => {
                                if (!res.data.invite) {
                                } else {
                                    /* setLink(res.data.invite); */
                                    if (mobile) {
                                        console.log('aqui')
                                        window.open(`https://chat.whatsapp.com/${res.data.invite}`, '_self')
                                    } else {
                                        ReactDOM.render(<div>
                                            <p>{t("words.join_question")}</p>
                                            <div style={{ marginBottom: '10%' }}>
                                                <div>
                                                    <a href={`https://web.whatsapp.com/accept?code=${res?.data?.invite}`} style={{ textDecoration: 'none' }}><Button classes={{ root: BtnSave.root, label: BtnSave.label, }} style={{ margin: '5px', width: '100px' }}> {t("words.web")}</Button></a>
                                                    <a href={`https://chat.whatsapp.com/${res?.data?.invite}`} style={{ textDecoration: 'none' }}><Button classes={{ root: BtnSave.root, label: BtnSave.label, }} style={{ margin: '5px', width: '100px' }}> {t("words.desk")}</Button> </a>
                                                </div>
                                            </div>
                                        </div>, document.getElementById('button'))
                                    }

                                }
                            })
                            .catch(err => {
                                /* catch da request dos link das camapnhas */
                                if (err.response?.data.message === "member limit reached") {
                                    ReactDOM.render(<div>
                                        <h6>{t("words.sorry")}, {t("words.erro_description")} <br></br> {t("words.reason")}</h6>
                                    </div >, document.getElementById('button'))
                                } else if (err.response?.data.message === "archived campaign") {
                                    /*    alert(err.response?.data.message) */
                                    ReactDOM.render(<div><h6>{t("words.campaign_archived_error")}</h6></div >, document.getElementById('button'));
                                } else {
                                    Sentry.captureMessage(`${err?.response?.data?.message} ${err?.response?.config.url}`);
                                    ReactDOM.render(<div>
                                        <h6>{t("words.something_wrong")}</h6>
                                    </div >, document.getElementById('button'))
                                }
                                console.log(err.response);
                            })
                    } catch (error) {
                        console.log(error)
                    }

                })
                .catch(err => {
                    console.log(err.response)
                    if (err.response?.data.message === "record not found") {
                        ReactDOM.render(<div><h6>{t("words.unable_complete")}</h6></div >, document.getElementById('sectionOne'));
                        ReactDOM.render(<div><h6>{t("words.unavailable_group")}</h6></div >, document.getElementById('button'));
                    } else {
                        Sentry.captureMessage(`${err?.response?.data?.message} ${err?.response?.config.url}`);
                        ReactDOM.render(<div><h6>{t("words.unable_complete")}</h6></div >, document.getElementById('sectionOne'));
                        ReactDOM.render(<div>{t("words.something_wrong")}</div >, document.getElementById('button'));
                    }
                })
        } catch (error) {

        }
    }


    React.useEffect(() => {
        getCampaign();
    });

    return (
        <Container>
            <SectionOne>
                <div id="sectionOne" style={{}}>
                    <div style={{ display: 'flex', alignItems: 'center', textAlign: 'center', paddingBottom: '15px' }}>
                        <div class="row">
                            <div class="col">
                                <Image>
                                    <div style={{ width: '100%', height: '150px', cursor: 'pointer', backgroundColor: '#b8b8b8', backgroundSize: 'cover', backgroundImage: `url(${image})`, textAlign: 'center', paddingTop: '10%', borderRadius: '100%' }}>

                                    </div>
                                    <div id="statusImage"></div>
                                </ Image>
                            </div>

                        </div>
                    </div>

                </div>
            </SectionOne>
            <div class="container">
                <div class="row">
                    <div class="col">
                        <NameGroup>
                            <h5>
                                {name}
                            </h5>
                            <div style={{ maxWidth: '50vw' }}>
                                <p>
                                    {description}
                                </p>
                            </div>


                        </NameGroup>
                    </div>
                </div>
            </div>

            <div id="button">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
            <Divider className={classes.divider} />
            <p>{t("words.have_whatsapp")}</p>
            <a href="https://www.whatsapp.com/download" target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>{t("words.download")}</a>
        </Container>
    )
}


export default JoinScreen;