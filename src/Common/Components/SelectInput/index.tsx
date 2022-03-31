import React from 'react';
import {Container} from './styles';

interface ISelectInput{
    options: {
        value: string | number;
        label: string | number;
    }[],
}

const SelectInput: React.FC<ISelectInput> = ({ options}) => {
    return (
        <Container>
            <select>
                {
                    options.map(option => (
                        <option value={option.value}>{option.label}</option>
                    ))
                    
                }
            </select>
        </Container>
    );
}

export default SelectInput;