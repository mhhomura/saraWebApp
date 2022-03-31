import React from 'react';
import ChatContent from '../../Components/ChatContent';
import ChatAside from '../../Components/ChatAside';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import {
    Container,
} from './styles';


const Conversations = () => {

    const history = useHistory();
    var windowWidth = window.innerWidth;

    function recarregarPagina() {
        history.push('/attendant/chat');
    }

    var TimeOut;
    window.onresize = function () {
        clearTimeout(TimeOut);
        TimeOut = setTimeout(recarregarPagina, 10);
    };
    React.useEffect(() => {
        localStorage.setItem('chat', "null");
        localStorage.setItem('chat_status', "close");
        if (localStorage.getItem('sectorActive')) {

        } else {
            localStorage.setItem('sectorActive', "null");
        }
    }, []);

    return (
        <Container>
            <div>
                {windowWidth >= 960 ? <Grid container spacing={3} >

                    <Grid item xs={4} >
                        <ChatAside />

                    </Grid>

                    <Grid item xs={8} >
                        <ChatContent />
                    </Grid>


                </Grid> : localStorage.getItem('chat_status') === "open" ? <ChatContent /> : <ChatAside />}
            </div>

        </Container>
    )
}

export default Conversations;