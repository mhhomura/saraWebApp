import Info from '../../../Assets/icon/Info.svg'
import React from 'react';
import {
    Container,
} from './styles';
import { LightTooltip } from '../../../Styles/styles';

interface IBackgroudProps {
    text: string;
}

const NoMessages: React.FC<IBackgroudProps> = ({ text }) => {
    return (
        <Container>
            <LightTooltip title={<span style={{ whiteSpace: 'pre-line', fontSize: '12px' }}>{text}</span>} >
                <img src={Info} alt="Imagem"></img>
            </LightTooltip>
        </Container >
    );
}

export default NoMessages;