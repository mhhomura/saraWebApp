import React from 'react';
import ReactDOM from "react-dom";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { GoGear } from 'react-icons/go';
import { FiMoreVertical } from 'react-icons/fi';
import QRCode from "react-qr-code";
import WS from "../../../ws";
import axios_base from '../../../axios_base';
import { useHistory, useLocation } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { AiOutlineReload } from 'react-icons/ai';
import { useTranslation } from "react-i18next";
import WarningIcon from '@material-ui/icons/Warning';
import AndroidIcon from '@material-ui/icons/Android';
import * as Sentry from "@sentry/react";

import {
  Container,
  useStyles,
  Div,
  Title,
  SubDiv1,
  SubDiv2,
  SubDiv3,
  QrCode,

} from './styles';


function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
interface IAuthenticateModalProps {
  button: React.ReactNode;
  children: React.ReactNode;
  title: String;
  IdNumber: Number;
  Parameter: String;
}


const AuthenticateModal: React.FC<IAuthenticateModalProps> = ({ button, children, title, IdNumber, Parameter }) => {


  const { t } = useTranslation();
  let location = useLocation();
  const [openError1, setOpenError1] = React.useState(false);
  const [openError2, setOpenError2] = React.useState(false);
  const [openError3, setOpenError3] = React.useState(false);
  const handleCloseAlert = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenError1(false);
    setOpenError2(false);
    setOpenError3(false);
  };

  React.useEffect(() => {
    function qrCode() {
      WS.subscribe((msg) => {
        if (msg.subject !== "qr") return;
        if (!document.getElementById('qr')) {
          return
        } else {
          ReactDOM.render(<div><QRCode size={200} value={msg.data.qrcode} /></div>, document.getElementById('qr'))
        }
      })
    }
    qrCode();
  }, [location]);

  var param = true;
  const history = useHistory();
  if (title === "MyNumbers") {
    param = false;
  }


  const classes = useStyles();
  const [open, setOpen] = React.useState(param);

  const handleOpen = () => {
    setOpen(true);

  };

  const handleClose = () => {
    if (title === "MyNumbers") {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  const handleCreate = () => {
    if (Parameter === 'New') {
      /* Cria novo numero */
      axios_base.post('/number')
        .then(res => {
          console.log(res.data);
          generateQrCode(res.data.id);
        })
        .catch(err => {
          Sentry.captureMessage(`${err?.response?.data?.message} ${err?.response?.config.url}`);
          setOpenError3(true);
        })
      Parameter = 'created';
    }

    const generateQrCode = (id_num: any) => {
      const idNumCreated: any = id_num;
      axios_base.patch(`/number/${id_num}/connect`)
        .then(res => {
          setOpen(false);
          if (title === "Auth") {
            window.location.replace('/dashboard');
          } else {
            history.push(`/myNumbers`);
          }
        })
        .catch(err => {
          console.log(err.response, "err")
          Sentry.captureMessage(`${err?.response?.data?.message} ${err?.response?.config.url}`);
          if (!document.getElementById('qr')) {
            return
          } else {
            if (err?.response.data?.message === "nats: timeout") {
              ReactDOM.render(<div className={classes.reload} onClick={() => generateQrCode(idNumCreated)}><div className={classes.center}><h4><AiOutlineReload /></h4><h6>{t("words.reassign_qr")}</h6></div></div>, document?.getElementById('qr'));
            }
            else if (err?.response.data?.message === "number already exists") {
              setOpenError1(true);
              ReactDOM.render(<div className={classes.error} onClick={() => generateQrCode(IdNumber)}><div className={classes.center}><h6>{t("words.number_registered")}</h6></div></div>, document?.getElementById('qr'));
            }
            else if (err?.response.data?.message === "number mismatch") {
              setOpenError2(true);
              ReactDOM.render(<div className={classes.error} onClick={() => generateQrCode(IdNumber)}><div className={classes.center}><h6>{t("words.different_number")}</h6></div></div>, document?.getElementById('qr'));
            }
            else {
              setOpenError3(true);
              ReactDOM.render(<div className={classes.error} onClick={() => generateQrCode(IdNumber)}><div className={classes.center}><h6>{t("words.something_wrong")}</h6></div></div>, document?.getElementById('qr'));
            }
          }

        })
    }

    if (Parameter === 'authenticate') {
      try {
        axios_base.patch(`/number/${IdNumber}/connect`)
          .then(res => {
            console.log(res.data);
            setOpen(false);
            history.push(`/myNumbers`);
          })
          .catch(err => {
            console.log(err.response, "err")
            Sentry.captureMessage(`${err?.response?.data?.message} ${err?.response?.config.url}`);
            if (!document.getElementById('qr')) {
              return
            } else {
              if (err?.response.data?.message === "nats: timeout") {
                ReactDOM.render(<div className={classes.reload} onClick={() => generateQrCode(IdNumber)}><div className={classes.center}><h4><AiOutlineReload /></h4><h6>{t("words.reassign_qr")}</h6></div></div>, document?.getElementById('qr'));
              }
              else if (err?.response.data?.message === "number already exists") {
                setOpenError1(true);
                ReactDOM.render(<div className={classes.error} onClick={() => generateQrCode(IdNumber)}><div className={classes.center}><h6>{t("words.number_registered")}</h6></div></div>, document?.getElementById('qr'));
              }
              else if (err?.response.data?.message === "number mismatch") {
                setOpenError2(true);
                ReactDOM.render(<div className={classes.error} onClick={() => generateQrCode(IdNumber)}><div className={classes.center}><h6>{t("words.different_number")}</h6></div></div>, document?.getElementById('qr'));
              }
              else {
                setOpenError3(true);
                ReactDOM.render(<div className={classes.error} onClick={() => generateQrCode(IdNumber)}><div className={classes.center}><h6>{t("words.something_wrong")}</h6></div></div>, document?.getElementById('qr'));
              }
            }

          })
      } catch (error) {
        Sentry.captureMessage(`erro ao autenticar ${error}`);
      }

    }
  };

  return (
    <Container>
      <div onClick={handleOpen} >
        {button}
      </div>
      <Modal aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onRendered={handleCreate}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={open}>
          <Div className={classes.paper}>
            <Title>
              <h1><b>{t("words.to_user_wppg")}</b></h1>
            </Title>
            <div className="row">
              <div className="col-8">
                <SubDiv1><pre>
                  <p>{t("words.1")}</p>
                  <p>{t("words.2")} <b>{t("words.menu")} <FiMoreVertical /></b> {t("words.or")} <b>{t("words.settings")} <GoGear /></b> {t("words.and_select")} <b>{t("words.linked_devices")}</b></p>
                  <p>{t("words.3")}</p>
                </pre>
                </SubDiv1>
                <hr />
                <SubDiv2>
                  <h1><b>{t("words.information")}</b></h1>
                  <div>
                    <p>{t("words.make_sure")}</p>
                    <p>{t("words.in_order")}</p>
                    <p>3.{t("words.android")}<AndroidIcon></AndroidIcon></p>
                  </div>
                </SubDiv2>
              </div>
              <div className="col-4">
                <SubDiv3>
                  <QrCode>
                    <div id="qr" style={{ width: '60%', height: '60%', padding: '40px 40px' }}>
                      <div className="spinner-border text-primary" role="status" style={{ margin: '70px 70px', width: '50px', height: '50px' }}>
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  </QrCode>
                </SubDiv3>
              </div>
            </div>
            <h6><WarningIcon style={{ color: 'yellow' }} /> <b>{t("words.wpp_beta")}</b></h6>
          </Div>
        </Fade>
      </Modal>
      <Snackbar open={openError1} autoHideDuration={10000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity="error">
          {t("words.number_registered")}
        </Alert>
      </Snackbar>
      <Snackbar open={openError2} autoHideDuration={10000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity="error">
          {t("words.different_number")}
        </Alert>
      </Snackbar>
      <Snackbar open={openError3} autoHideDuration={10000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity="error">
          {t("words.something_wrong")}
        </Alert>
      </Snackbar>
    </Container>
  );
}
export default AuthenticateModal;
