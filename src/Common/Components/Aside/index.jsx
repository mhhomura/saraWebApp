import React from 'react';
import Backoffice_Active from '../../../Assets/CommunIcons/Backoffice  Active - Hover.svg';
import backoffice_Inactive from '../../../Assets/CommunIcons/backoffice  Inactive.svg';
import Help_Active from '../../../Assets/CommunIcons/Help  Active - Hover.svg';
import Help_Inactive from '../../../Assets/CommunIcons/Help  Inactive.svg';
import Attendance_Active from '../../../Assets/CommunIcons/Icon menu Attendance _ Active.svg';
import Attendance_Inactive from '../../../Assets/CommunIcons/Icon menu Attendance _ Inactive.svg';
import Campaign_Active from '../../../Assets/CommunIcons/Icon menu Campaign _ Active.svg';
import Campaign_Inactive from '../../../Assets/CommunIcons/Icon menu Campaign _ Inactive.svg';
import Number_Active from '../../../Assets/CommunIcons/Icon menu My Numbers_ _ Active.svg';
import Number_Inactive from '../../../Assets/CommunIcons/Icon menu My Numbers _ Inactive.svg';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import { useTranslation } from 'react-i18next';
import { useCommun } from '../../../Providers/commun';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';


import {
    Container,
    UseStyle,
    Iten,
    Line,
    Menu,
    Btn,
} from './styles';

function Aside() {

    const classes = UseStyle();
    const { t } = useTranslation();
    const { informatios } = useCommun();

    const [asideOpen, setAsideOpen] = React.useState(false);

    const [launch, setLaunch] = React.useState(false);
    const [attendance, setAttendance] = React.useState(false);
    const [phone, setphone] = React.useState(false);
    const [back, setBack] = React.useState(false);
    const [help, setHelp] = React.useState(false);

    const open = () => {
        setAsideOpen(!asideOpen);
    }
    return (
        <Container>
            <Btn style={{ height: '50px' }}>
                {asideOpen === true ?
                    <MenuOpenIcon fontSize='large' onClick={open} style={{ width: '100%', borderRadius: '6px', color: '#2C6BFE', marginTop: '5px', cursor: 'pointer' }} />
                    : <MenuIcon fontSize='large' onClick={open} style={{ width: '100%', borderRadius: '6px', color: '#2C6BFE', marginTop: '5px', cursor: 'pointer' }} />
                }


            </Btn>
            <Menu style={{ width: asideOpen === true ? "10vw" : "48px" }}>
                <Line>
                    <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                        <Iten style={{ justifyContent: asideOpen !== true && 'center' }} onMouseOver={() => setLaunch(true)} onMouseLeave={() => setLaunch(false)}>
                            <img alt="campaing" src={launch !== true ? Campaign_Inactive : Campaign_Active} />
                            {asideOpen === true && <div >{t("words.campaigns")}</div>}
                        </Iten>
                    </Link>
                    <Link to="/myNumbers" style={{ textDecoration: 'none' }}>
                        <Iten style={{ justifyContent: asideOpen !== true && 'center' }} onMouseOver={() => setphone(true)} onMouseLeave={() => setphone(false)}>
                            <img alt="my_number" src={phone !== true ? Number_Inactive : Number_Active} />
                            {asideOpen === true && <div >{t("words.my_numbers")}</div>}
                        </Iten>
                    </Link>
                    {/*  <Link to={`/adminDashboard/${informatios.phoneID}`} style={{ textDecoration: 'none' }}>
                        <Iten style={{ justifyContent: asideOpen !== true && 'center' }} onMouseOver={() => setAttendance(true)} onMouseLeave={() => setAttendance(false)}>
                            <img alt="Attendance" src={attendance !== true ? Attendance_Inactive : Attendance_Active} />
                            {asideOpen === true && <div >Atendimento</div>}
                        </Iten>
                    </Link> */}
                </Line>

                <Line style={{ borderTop: '1px solid #BED1EA' }}>
                    <a href="https://office.builderall.com/br/office/onboarding" style={{ textDecoration: 'none', color: 'white' }} >
                        <Iten style={{ justifyContent: asideOpen !== true && 'center' }} onMouseOver={() => setBack(true)} onMouseLeave={() => setBack(false)}>
                            <img alt="logo builderall" src={back !== true ? backoffice_Inactive : Backoffice_Active} />
                            {asideOpen === true && <div >Back Office</div>}
                        </Iten>
                    </a>

                    <Iten style={{ justifyContent: asideOpen !== true && 'center' }} onMouseOver={() => setHelp(true)} onMouseLeave={() => setHelp(false)}>
                        <img alt="help" src={help !== true ? Help_Inactive : Help_Active} />
                        {asideOpen === true && <div >Ajuda</div>}
                    </Iten>
                </Line>
            </Menu>
        </Container >
    );
}

export default Aside;