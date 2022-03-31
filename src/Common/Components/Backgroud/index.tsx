import React from 'react';
import back from '../../../Assets/icon/No campaigns.svg';
import {
    Container,
    LeftDiv,
    RightDiv
} from './styles';
import megaphone from '../../../Assets/icon/megaphone.svg';

interface IBackgroudProps {
    text: string;
    children: React.ReactNode;
    title: string;
}

const Backgroud: React.FC<IBackgroudProps> = ({ text, title, children }) => {
    return (
        <Container>
            <LeftDiv>
                <img src={back} alt="Imagem"></img>
            </LeftDiv>
            <RightDiv>
                <div className='titleDiv'>
                    <img src={megaphone} alt="megaphone" />
                    <h3>{title}</h3>
                </div>
                <p>{text}</p>
                {children}
            </RightDiv>
        </Container>
    );
}

export default Backgroud;