import React from 'react';
import noMsg from '../../../Assets/attendance/There-are-no-messages.svg';
import {
    Container,
    Image,
    Controller,
} from './styles';

interface IBackgroudProps {
    text: string;
    children: React.ReactNode;
}

const NoMessages: React.FC<IBackgroudProps> = ({ text, children }) => {
    return (
        <Container>
            <Image>
                <img src={noMsg} alt="Imagem"></img>
            </Image>
            <Controller>
                <p>{text}</p>
                {children}
            </Controller>
        </Container>
    );
}

export default NoMessages;