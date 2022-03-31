import React from 'react';
import AuthenticateModal from '../../Components/ModalQRCode';
import { Container } from './styles';


const Authenticate = () => {

    return (
        <Container>
            <AuthenticateModal Parameter="New" title="Auth" />
        </Container>
    );
}

export default Authenticate;
;