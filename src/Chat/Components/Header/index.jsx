import React from 'react';
import WLM from '../../../Assets/icon/wlm.svg';
import axios_base_chat from '../../../axios_base_chat';
import ProfileIcon from '../../../Common/Components/ProfileIcon';
import {
    Container,
    Notify,
    Right,
    Logo,
    Add,
} from './styles';




const MainHeader = () => {

    const [name, setName] = React.useState('');
    const [phone, setPhone] = React.useState();

    React.useEffect(() => {
        axios_base_chat.get(`/chat/status`)
            .then(res => {
                setName(res.data.operator.name);
                setPhone(res.data.status.wid);
            })
            .catch(err => {
            })

    }, []);

    return (
        <Container>
            <Logo src={WLM} alt="Logo Builderall" />

            <Right>
                <Add></Add>
                <Notify></Notify>
                <ProfileIcon name={name} fone={phone} info="chat" image="avatar" />
            </Right>


        </Container>
    );
}

export default MainHeader;