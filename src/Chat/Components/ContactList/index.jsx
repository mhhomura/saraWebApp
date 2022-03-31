import React from 'react';
import { Avatar } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import axios_base_chat from '../../../axios_base_chat';
import { formatPhoneNumberIntl } from 'react-phone-number-input'
import startConsersantion from '../../../Assets/IconesChat/StartConversation.svg';
import { useChat } from '../../../Providers/chat';

import {
    Container,
    ChatList,
    ChatLines,
    ChatLine,
    ChatName,
    ChatDate,
    ChatMessage,
} from './styles';


const ContactsList = ({ name, phone, id, image, children, styled }) => {
    const history = useHistory();
    const { chat } = useChat();

    const selctChat = (id_) => {

        try {
            var data = {
                "department_id": chat.sectorID,
                "contact_id": id_
            }
            axios_base_chat.post(`/chat/department/${chat.sectorID}/attendance`, data)
                .then(res => {
                    localStorage.setItem("chat", res.data.id);
                    localStorage.setItem("contact", id_);
                    history.push('/attendant/chat')
                })
                .catch(err => {
                    console.log(err.response, "error create attendace")
                })
        } catch (error) {

        }

    }

    return (
        <Container >
            <ChatList /* className={ === id && classes.root} */ >
                <Avatar alt="Lead" src={image} style={{ width: '50px', height: '50px', marginLeft: '15px' }} />
                <ChatLines >
                    <ChatLine >
                        <ChatName >
                            <p>{name !== " " ? name : phone.split(':')[0]}</p>
                        </ChatName>
                        <ChatDate>
                            <div style={{ cursor: 'pointer' }}>
                                {children}
                            </div>
                            <div style={{ marginLeft: '10px', cursor: 'pointer' }} onClick={() => selctChat(id)}>
                                <img src={startConsersantion} alt="Start Coversation" />
                            </div>
                        </ChatDate>
                    </ChatLine>
                    <ChatLine>
                        <ChatMessage>
                            <p>{formatPhoneNumberIntl('+' + phone.split(':')[0])}</p>
                        </ChatMessage>
                    </ChatLine>
                </ChatLines>
            </ChatList>
        </Container>
    )
}

export default ContactsList;