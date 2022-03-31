import attendantIcon from '../../../Assets/attendance/Collaborator - Profile-Blue.svg';
import withoutOperators from '../../../Assets/attendance/without-operators.svg';
import withoutSectors from '../../../Assets/attendance/without-sectors.svg';
import sectorIcon from '../../../Assets/attendance/Sector  Active.svg';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Container, LeftDiv, RightDiv } from './styles';
import { BtnBlue2 } from '../../../Styles/styles';
import { useTranslation } from "react-i18next";
import { Button } from '@material-ui/core';
import React from 'react';


const NoRegisters = ({ title, img, toggle }) => {
    const btnAdd = BtnBlue2();
    const { t } = useTranslation();


    return (
        <Container>
            <LeftDiv>
                {img === "withoutSectors" ?
                    <img src={withoutSectors} alt="no sectors" />
                    :
                    <img src={withoutOperators} alt="no operators" />
                }
            </LeftDiv>
            <RightDiv>
                <div className='titleDiv'>
                    {img === "withoutSectors" ?
                        <img className='sectorIcon' src={sectorIcon} alt="sector" />
                        :
                        <img src={attendantIcon} alt="operator" />
                    }
                    <h3>{title}</h3>
                </div>
                <p>Fusce ac felis sit amet ligula pharetra condimentum. Cum sociis natoque penatibus et magnis dis parturient montes nascetur.
                    ridiculus mus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Curabitur ullamcorper</p>
                <Button onClick={toggle} classes={{ root: btnAdd.root, label: btnAdd.label }} className="addButton">
                    <AddCircleIcon className="addIcon" />
                    {img === "withoutSectors" ? t("words.sector") : t("words.operator")}
                </Button>
            </RightDiv>
        </Container>
    );
}

export default NoRegisters;