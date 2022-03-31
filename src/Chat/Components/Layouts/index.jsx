import React from 'react';
import axios_base_chat from '../../../axios_base_chat';
import { Grid, } from './styles';
import Content from '../Content';
import Header from '../Header';
import { useChat } from '../../../Providers/chat';

const Layout = ({ children }) => {
    var windowWidth = window.innerWidth;
    const { setChat } = useChat();
    const [user, setUser] = React.useState([]);

    React.useEffect(() => {
        localStorage.setItem('chat', "null");
        axios_base_chat.get(`/chat/status`)
            .then(res => {
                console.log(res.data);
                localStorage.setItem('operator', res.data.operator.id);
                setChat({ operator: res.data.operator.name, phoneNumber: res.data.status.jid });
                setUser(res.data)
            })
            .catch(err => {
                localStorage.setItem('operator', null);
            })

    }, []);
    return (
        <Grid>
            {windowWidth >= 960 && < Header info={user} />}

            <Content>
                {children}
            </Content>
        </Grid>
    );
}

export default Layout;