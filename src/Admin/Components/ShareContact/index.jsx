import { BtnBlue2 } from '../../../Styles/styles';
import Divider from '@material-ui/core/Divider';
import { Button } from '@material-ui/core';
import React from 'react';

import {
    ShareContactTitle,
    BtnExportContact,
    Container,
} from './styles';

const ShareContact = () => {
    const exportBtn = BtnBlue2();

    return (
        <Container>

            <ShareContactTitle>
                <h5>Exporte sua lista de contatos</h5>
                <Divider className='divider' />
                <p>Exporte contatos salvos na plataforma em um arquivo csv.</p>
            </ShareContactTitle>

            <BtnExportContact>
                <Button classes={{ root: exportBtn.root, label: exportBtn.label }}>
                    Exportar
                </Button>
            </BtnExportContact>

        </Container>
    )
}

export default ShareContact;