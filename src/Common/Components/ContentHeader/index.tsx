import React from 'react';
import {
    Container,
    TitleContainer,
    Controllers,
} from './styles';

interface IContentHeaderProps {
    title: string;
    subTitle: string;
    children: React.ReactNode;
}

const ContentHeader: React.FC<IContentHeaderProps> = ({title, subTitle, children}) => {
    /* const options = [
        { value: 'Matheus', label: 'matheus',}] */
    return (
        <Container>
            <TitleContainer>
                <h1>{title}</h1>
                <small>{subTitle}</small>
            </TitleContainer>
            <Controllers>
                <div>{children}</div>
            </Controllers>
        </Container>
    );
}

export default ContentHeader;