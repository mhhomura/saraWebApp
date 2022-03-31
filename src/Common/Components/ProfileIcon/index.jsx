import React from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PhoneIcon from '@material-ui/icons/Phone';
import pt from '../../../Assets/icon_flags/pt.svg';
import en from '../../../Assets/icon_flags/en.svg';
import es from '../../../Assets/icon_flags/es.svg';
import de from '../../../Assets/icon_flags/de.svg';
import fr from '../../../Assets/icon_flags/fr.svg';
import it from '../../../Assets/icon_flags/it.svg';
import ne from '../../../Assets/icon_flags/ne.svg';
import pl from '../../../Assets/icon_flags/pl.svg';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Popover from '@material-ui/core/Popover';
import { useTranslation } from "react-i18next";
import Avatar from '@material-ui/core/Avatar';
import TranslateIcon from '@material-ui/icons/Translate';
import { formatPhoneNumberIntl } from 'react-phone-number-input';
import * as OperatorService from '../../../Services/operator';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import {
    Container,
    UseStyle,
    StyledMenu,
    StyledMenuItem,
    Box,
    Line,
} from './styles';


const ProfileIcon = ({ name, fone, info, image }) => {

    const changeLanguage = (language, fl) => {
        i18n.changeLanguage(language);
        setAnchorElMenu(null);
    };
    const { i18n } = useTranslation();
    const classe = UseStyle();

    const logout = () => {
        OperatorService.logout();
    }

    /* Popover */
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => { setAnchorEl(event.currentTarget); };
    const handleClose = () => { setAnchorEl(null); };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    /* Menu */
    const [anchorElMenu, setAnchorElMenu] = React.useState(null);
    const handleClickMenu = (event) => { setAnchorElMenu(event.currentTarget); };
    const handleCloseMenu = () => { setAnchorElMenu(null); };

    return (
        <Container>
            <Avatar onClick={handleClick} alt={name} src={image} style={{ cursor: 'pointer' }} />

            <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center', }} transformOrigin={{ vertical: 'top', horizontal: 'center', }}>
                <Box>
                    <Line>
                        {name}
                    </Line>
                    <Divider style={{ border: '1px solid #DCE4EF' }} />
                    <Line>
                        <PhoneIcon style={{ color: '#9AB3D5', marginRight: '10px' }} /> {formatPhoneNumberIntl('+' + fone?.split(':')[0])}
                    </Line>
                    {info === "chat" &&
                        <Line onClick={logout} style={{ cursor: 'pointer', }}>
                            <ExitToAppIcon style={{ color: '#9AB3D5', marginRight: '15px' }} /> Disconect
                        </Line>
                    }
                    <Line style={{ cursor: 'pointer', }}>
                        <div onClick={handleClickMenu}>
                            <TranslateIcon style={{ color: '#9AB3D5', marginRight: '15px' }} />  Idioma
                        </div>
                        <div>
                            <StyledMenu style={{ width: '50%' }} id="customized-menu" anchorEl={anchorElMenu} keepMounted open={Boolean(anchorElMenu)} onClose={handleCloseMenu}>
                                <StyledMenuItem onClick={() => changeLanguage("en", en)}>
                                    <ListItemIcon style={{ width: '5%' }}>
                                        <img alt="eua" src={en} style={{ width: '50%' }} />
                                    </ListItemIcon>
                                    <ListItemText primary="English" />
                                </StyledMenuItem>

                                <StyledMenuItem onClick={() => changeLanguage("de", de)}>
                                    <ListItemIcon style={{ width: '5%' }}>
                                        <img alt="de" src={de} style={{ width: '50%' }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Deutsch" />
                                </StyledMenuItem>

                                <StyledMenuItem onClick={() => changeLanguage("es", es)}>
                                    <ListItemIcon style={{ width: '5%' }} >
                                        <img alt="br" src={es} style={{ width: '50%' }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Espñol" />
                                </StyledMenuItem>

                                <StyledMenuItem button onClick={() => changeLanguage("pt", pt)}>
                                    <ListItemIcon style={{ width: '5%' }}>
                                        <img alt="br" src={pt} style={{ width: '50%' }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Português" />
                                </StyledMenuItem>

                                <ListItem button onClick={() => changeLanguage("fr", fr)}>
                                    <ListItemIcon style={{ width: '5%' }}>
                                        <img alt="fr" src={fr} style={{ width: '50%' }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Français" />
                                </ListItem>

                                <StyledMenuItem button onClick={() => changeLanguage("it", it)}>
                                    <ListItemIcon style={{ width: '5%' }}>
                                        <img alt="it" src={it} style={{ width: '50%' }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Italiano" />
                                </StyledMenuItem>

                                <StyledMenuItem button onClick={() => changeLanguage("nl", ne)}>
                                    <ListItemIcon style={{ width: '5%' }}>
                                        <img alt="nl" src={ne} style={{ width: '50%' }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Nederlands" />
                                </StyledMenuItem>

                                <StyledMenuItem button onClick={() => changeLanguage("pl", pl)}>
                                    <ListItemIcon style={{ width: '5%' }}>
                                        <img alt="pl" src={pl} style={{ width: '50%' }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Polski" />
                                </StyledMenuItem>

                            </StyledMenu>
                        </div>
                    </Line>

                </Box>
            </Popover>
        </Container >
    )
}

export default ProfileIcon;