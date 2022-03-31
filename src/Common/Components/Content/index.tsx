import React from 'react';
import { Container, } from './styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useTranslation } from "react-i18next";
import BtnOverview from '../BtnOverview';

function Alert(props: any) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const Content: React.FC = ({ children }) => {

    const { t } = useTranslation();
    const [open, setOpen] = React.useState(false);

    var url = window.location.href.split('/')[3];
    var urlInvite = window.location.href.split('/')[5];

    const handleClose = (reason: any) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    React.useEffect(() => {
        /* if (sessionStorage.getItem('color') === "red") {
            setOpen(true);
        } else {
            setOpen(false);
        } */
    });

    return (
        <Container>
            {children}
            <Snackbar open={open} /* autoHideDuration={3000} */ onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {t("words.disconnected_phone")}
                </Alert>
            </Snackbar>
            {url !== "not_authorized" || urlInvite !== "invite" ? <BtnOverview></BtnOverview> :
                <div></div>
            }
        </Container>
    );
}

export default Content;