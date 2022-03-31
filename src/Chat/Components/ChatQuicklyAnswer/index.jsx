import React from 'react';
import trash from '../../../Assets/attendance/Trash  Active - Hover.svg';
import QuicklyAnswer from '../../../Assets/attendance/Quick answers.svg';
import { Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
import ChatNewQuicklyAnswer from '../ChatNewQuicklyAnswer';
import { useLocation, useHistory } from 'react-router-dom';
import { cancelBtn, saveBtn } from '../../../Styles/styles';
import SearchIcon from '@material-ui/icons/Search';
import { useTranslation } from 'react-i18next';
import Popper from '@material-ui/core/Popper';
import { Button } from '@material-ui/core';
import * as MessageService from '../../../Services/message';
import { useChat } from '../../../Providers/chat';

import {
    Container,
    LightTooltip,
    ListSection,
    Message,
    Middle,
    Serach,
    Line1,
    Line2,
    Title,
    Tabs,
    Body,
} from './styles';
import axios_base_chat from '../../../axios_base_chat';

const ChatQuicklyAnswer = () => {

    const location = useLocation();
    const CancelBtn = cancelBtn();
    const history = useHistory();
    const { t } = useTranslation();
    const SaveBtn = saveBtn();
    const { chat } = useChat();

    const componentRef = React.useRef();

    const [messageList, setmessageList] = React.useState([]);

    const [searchContact, setSearchContact] = React.useState('');
    const [deletId, setDeletId] = React.useState();

    const [deleteModal, setDeleteModal] = React.useState(false);
    const toggle = () => {
        setDeleteModal(!deleteModal);
    }
    const deleteConfirm = (id) => {
        setDeleteModal(!deleteModal);
        setDeletId(id)
    }


    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedTab, setSelectedTab] = React.useState(1);

    const handleClose = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };
    const handleOpen = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };
    const selecTab = (number) => {
        setSelectedTab(number);
    }

    React.useEffect(() => {
        getMessage();
    }, [location]);

    const getMessage = () => {
        try {
            axios_base_chat.get(`/chat/message-template`)
                .then(res => {
                    setmessageList(res.data);
                })
        } catch (error) {

        }
    }

    const sentMessage = async (template) => {
        try {
            handleClose();

            // let { data: template } = await axios_base_chat.get(`/chat/message-template/${id}`)

            await MessageService.send(
                template?.content, "text",
                parseInt(localStorage.getItem('chat')),
                chat.sectorID,
                sessionStorage.getItem('operator_token'), true
            );

            history.push(`/attendant/chat`);
        } catch (error) {

        }
    }

    const deleteMessage = (id) => {
        try {
            axios_base_chat.delete(`/chat/message-template/${id}`)
                .then(res => {
                    handleClose();
                    toggle();
                    history.push(`/attendant/chat`);
                })
        } catch (error) {

        }

    }
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;
    return (
        <Container >
            <LightTooltip title={t("words.quick_answers_list")} placement="top">
                <img src={QuicklyAnswer} alt=" " onClick={handleOpen} ref={componentRef} />
            </LightTooltip>
            <Popper ref={componentRef} id={id} open={open} anchorEl={anchorEl}>
                <Body>
                    <Title>
                        <h6> {t("words.quick_answers_list")}</h6>
                        <p>In the text fild, type shortcut /title to filter quick repiles.</p>
                        <hr></hr>
                    </Title>
                    <Middle>
                        <Tabs>
                            <div style={{ borderBottom: selectedTab === 1 && '3px solid #0080FC' }} onClick={() => selecTab(1)}>All ({messageList.length})</div>
                            {/* <div onClick={() => selecTab(2)} style={{ borderBottom: selectedTab === 2 && '3px solid #0080FC' }}>My (8)</div> */}
                        </Tabs>
                        <Serach>
                            <SearchIcon />
                            <input type="text" onChange={e => setSearchContact(e.target.value)} />
                        </Serach>
                    </Middle>
                    <div style={{ marginLeft: '15px', marginRight: '15px', height: '50%' }}>
                        <ListSection>

                            {messageList.filter((message) => {
                                if (searchContact === "") {
                                    return message
                                } else if (message.name.toLowerCase().includes(searchContact.toLowerCase())) {
                                    return message
                                } else {
                                    return null
                                }
                            }).map(message => (
                                <Message key={message?.id} >
                                    <Line1>
                                        <div onClick={() => sentMessage(message)}>{message?.name}</div>
                                        <div style={{ display: "flex" }}><ChatNewQuicklyAnswer type="edit" id={message?.id} content={message?.content} name={message?.name} /> <img src={trash} alt="" style={{ cursor: 'pointer' }} onClick={() => deleteConfirm(message?.id)} /></div>
                                    </Line1>
                                    <Line2>
                                        <p onClick={() => sentMessage(message)}>{message?.content}</p>
                                    </Line2>
                                </Message>
                            ))}
                        </ListSection>
                    </div>
                    <div style={{ textAlign: 'right', padding: '15px', display: 'flex', justifyContent: 'flex-end' }}>
                        <div style={{ paddingRight: '10px', textAlign: 'center', cursor: 'pointer', paddingTop: '10px' }} onClick={handleClose}>{t("words.cancel")}</div>
                        <div> <ChatNewQuicklyAnswer type="new" /></div>
                    </div>
                </Body>
            </Popper>

            <Modal isOpen={deleteModal} toggle={toggle}>
                <ModalHeader>
                    {t("words.delete")}
                </ModalHeader>
                <ModalBody>
                    <h6>{t("words.really_delete")}</h6>
                </ModalBody>
                <ModalFooter>
                    <div>
                        <Button classes={{ root: CancelBtn.root, label: CancelBtn.label, }} onClick={toggle} className="cancelButton" style={{ marginRight: '10px' }} >{t("words.cancel")}</Button>
                        <Button classes={{ root: SaveBtn.root, label: SaveBtn.label, }} onClick={() => deleteMessage(deletId)}>{t("words.delete")}</Button>
                    </div>
                </ModalFooter>
            </Modal>
        </Container >
    )
}


export default ChatQuicklyAnswer;