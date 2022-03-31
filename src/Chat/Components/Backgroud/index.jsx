import React from 'react';
import {
    Container,
    Image,
    Controller,
} from './styles';



const Backgroud = ({ text, children, image }) => {
    return (
        <Container>
            <Image>
                <img src={image} alt="Imagem"></img>
            </Image>
            <Controller>
                <p>{text}</p>
                {children}
            </Controller>
        </Container>
    );
}

export default Backgroud;