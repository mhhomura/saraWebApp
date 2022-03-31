import React from 'react';
/* import logo from '../../Assets/icon/logo_ba_font_03.png'; */
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom'
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import WLM from '../../../Assets/icon/wlm.svg';
import Badge from '@material-ui/core/Badge';
import { BsBell } from 'react-icons/bs';
import WarningIcon from '@material-ui/icons/Warning';
import axios_base from '../../../axios_base';
import { BtnBlue } from '../../../Styles/styles'
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import ProfileIcon from '../ProfileIcon';
import { formatPhoneNumberIntl } from 'react-phone-number-input'
import { useCommun } from '../../../Providers/commun';
import MenuItem from '@material-ui/core/MenuItem';
import 'moment/locale/en-in';
import 'moment/locale/pt-br';

import {
    Container,
    Logo,
    Add,
    Notify,
    Right,
    UseStyle,
} from './styles';


const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
        margin: 0,
        padding: '3px 5px',
        width: '11vw',
        height: '30vh',
        overflow: 'auto',
        '@media (max-width: 1000px)': {
            width: '9rem',
        }
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const MainHeader = () => {

    const { informatios, setInformations } = useCommun();
    const { t } = useTranslation();
    let location = useLocation();
    const classe = UseStyle();
    const BlueBtn = BtnBlue();
    var badg = 0;
    if (sessionStorage.getItem('color') === "red") {
        badg = 1;
    }

    const [anchorEl3, setAnchorEl3] = React.useState(null);

    const handleClick3 = (event) => {
        setAnchorEl3(event.currentTarget);
    };

    const handleClose3 = () => {
        setAnchorEl3(null);
    };

    const [anchorEl2, setAnchorEl2] = React.useState(null);
    const handleClick2 = (event) => {
        setAnchorEl2(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl2(null);
    };
    const open2 = Boolean(anchorEl2);
    const id2 = open2 ? 'simple-popover' : undefined;

    var url = window.location.href.split('/')[3];
    var urlInvite = window.location.href.split('/')[5];

    const [number, setNum] = React.useState();

    React.useEffect(() => {
        loadNum();
    }, [location]);

    const loadNum = () => {
        try {
            axios_base.get('/number')
                .then(res => {
                    console.log(res.data, '------------------->lslslsl')
                    setInformations({ phoneID: res?.data[0]?.id, phoneNumber: res?.data[0]?.number })
                    setNum(res.data);

                })
                .catch(err => {
                    console.log(err.response);
                })

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <Container>
            {urlInvite === "invite" ? <Logo src={WLM} alt="Logo Builderall" /> : <Link to="/dashboard"><Logo src={WLM} alt="Logo Builderall" /></Link>}


            {urlInvite !== "invite" && <Right>
                <Add>
                    {/* _______________________________________________________________________________________________________________________________________________ */}
                    <Button classes={{ root: BlueBtn.root, label: BlueBtn.label, }} onClick={handleClick3}> Atendimento </Button>
                    <StyledMenu
                        id="customized-menu"
                        anchorEl={anchorEl3}
                        keepMounted
                        open={Boolean(anchorEl3)}
                        onClose={handleClose3}
                    >
                        {number?.map((num) =>
                            <Link to={`/adminDashboard/${num.id}`} style={{ textDecoration: "none", }}>
                                <MenuItem onClick={handleClose3} disableGutters>
                                    <PhoneAndroidIcon style={{ margin: '0' }} />
                                    <ListItemIcon style={{ minWidth: '0', }} onClick={() => setInformations({ phoneID: num.id, phoneNumber: num.number })}>

                                    </ListItemIcon>
                                    <ListItemText primary={formatPhoneNumberIntl('+' + num.number.split(':')[0])} />
                                </MenuItem>
                            </Link>
                        )}
                    </StyledMenu>
                </Add>
                <Notify>
                    <Badge onClick={handleClick2} badgeContent={badg} color="secondary">
                        <BsBell />
                    </Badge>
                </Notify>

                <ProfileIcon name="WhatsApp Launch Manager" fone={informatios.phoneNumber} info='commun' image="ajhsj" />


            </Right>}

            <Popover
                id={id2}
                open={open2}
                anchorEl={anchorEl2}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >

                <Typography className={classe.typography}>
                    <div className={classe.roots}>
                        <List component="nav" aria-label="main mailbox folders">
                            {sessionStorage.getItem('color') === "red" &&
                                <ListItem>
                                    <ListItemIcon style={{ width: '15%' }}>
                                        <WarningIcon style={{ color: 'red' }} />
                                    </ListItemIcon>
                                    <ListItemText primary={t("words.disconnected_phone")} />
                                </ListItem>
                            }
                            <ListItem>
                                <ListItemIcon style={{ width: '15%' }}>
                                    {/*   <WarningIcon style={{ color: 'yellow' }} /> */}
                                </ListItemIcon>
                                <ListItemText primary="" />
                            </ListItem>
                        </List>
                        <Divider />
                    </div>
                </Typography>
            </Popover>
        </Container>
    );
}

export default MainHeader;