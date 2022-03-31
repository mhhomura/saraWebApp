import React from 'react';
import { Avatar } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import moment from 'moment';
import { formatPhoneNumberIntl } from 'react-phone-number-input'

import {
    Container,
    ChatList,
    ChatLines,
    ChatLine,
    ChatName,
    ChatDate,
    ChatMessage,
    UseStyle,
    OperatorNameTag,
} from './styles';


const ChatListItem = ({ name, phone, date, id, image, attendenceId, operatorId, OperadorName }) => {
    const location = useLocation();
    const history = useHistory();
    const classes = UseStyle();

    const [chatSelected, setChatSelected] = React.useState();

    const selctChat = (id_) => {
        setChatSelected(id_);
        localStorage.setItem("contact", id_);
        localStorage.setItem("chat", attendenceId);
        localStorage.setItem("operatorId", operatorId);
        localStorage.setItem('chat_status', 'open');
        history.push(`/attendant/chat`);
    }

    React.useEffect(() => {
        setChatSelected(parseInt(localStorage.getItem('chat')));
    }, [location])

    return (
        <Container >
            <ChatList onClick={() => selctChat(id)} className={chatSelected === attendenceId && classes.root} >
                <Avatar alt={name === "" ? formatPhoneNumberIntl('+' + phone.split(':')[0]) : name} src={image} style={{ width: '50px', height: '50px', marginLeft: '15px' }} />
                <ChatLines >
                    <ChatLine>
                        <ChatName>
                            <p>{name === "" ? formatPhoneNumberIntl('+' + phone.split(':')[0]) : name}</p>
                        </ChatName>
                        <ChatDate>
                            {moment(date).format('HH:mm')}
                        </ChatDate>
                    </ChatLine>
                    <ChatLine>
                        <ChatMessage>
                            <p>{id}</p>
                        </ChatMessage>
                        <OperatorNameTag>
                            {OperadorName}
                        </OperatorNameTag>
                    </ChatLine>
                </ChatLines>
            </ChatList>
        </Container>
    )
}

export default ChatListItem;