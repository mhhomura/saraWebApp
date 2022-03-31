import React from 'react';
import { Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Button } from '@material-ui/core';
import { BtnBlue, saveBtn, cancelBtn } from '../../../Styles/styles';
import axios_base from '../../../axios_base';
import { useLocation, useHistory } from "react-router-dom";
import ReactDOM from "react-dom";
import ModalQRCode from '../ModalQRCode';
import moment from 'moment';
import { useTranslation } from "react-i18next";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import Typography from '@material-ui/core/Typography';
import LinkIcon from '@material-ui/icons/Link';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import LinkOffIcon from '@material-ui/icons/LinkOff';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { formatPhoneNumberIntl } from 'react-phone-number-input'
import {
  Container,
  Content,
  Logs,
} from './styles';

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}



const TableMyNumbers = (props) => {
  const { t } = useTranslation();

  let location = useLocation();
  const history = useHistory();
  var language = navigator.language.substring(0, 2);
  const [listNum, setListNum] = React.useState([]);
  const [listDetail, setListDetail] = React.useState([]);
  const [number_id, setId] = React.useState();
  const [connected, setConnected] = React.useState(true);
  const [num, setNum] = React.useState();
  const BtnSave = saveBtn();
  const btn = BtnBlue();
  const CancelBtn = cancelBtn();
  const {
    className
  } = props;

  const [openDone, setOpenDone] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const [openError2, setOpenError2] = React.useState(false);
  const [logs, setlogs] = React.useState([]);
  const [conection, setConection] = React.useState();
  const [isConected, setIsConected] = React.useState();
  const handleClose = () => {
    setOpenDone(false);
    setOpenError(false);
    setOpenError2(false);
  };

  const [modal, setModal2] = React.useState(false);
  const toggle2 = () => setModal2(!modal);
  const [modal2, setModal] = React.useState(false);
  const toggle3 = () => setModal(!modal2);

  const [modalInfo, setModalInfo] = React.useState(false);
  const toggleInfo = () => setModalInfo(!modalInfo);

  const [modalDisconnect, setModalDisconnect] = React.useState(false);
  const toggleDisconnect = () => setModalDisconnect(!modalDisconnect);

  const toggleAll = () => {
    setModalInfo(!modalInfo);
    setModal2(!modal);
  }


  function loadNum() {
    try {
      axios_base.get('/number')
        .then(res => {
          if (res?.data) {
            setListNum(res.data);
          }
        })

    } catch (error) {

    }
  }
  const numberDetail = (num_id) => {
    try {
      if (number_id === null) {
        setModal2(false);
      } else {
        axios_base.get(`/number/${num_id}/status`)
          .then(res => {
            setModal2(true);
            setConnected(true);
            setListDetail(res.data);
            setId(num_id);
          })
          .catch(err => {
            setConnected(false);
            setModal2(true);
            setId(num_id);
          })
        axios_base.get(`/number/${num_id}`)
          .then(res => {
            setConection(res.data.created_at);
            setlogs(res.data.logs);
            setNum(res.data.number.split(':')[0])
          })
          .catch(err => {

          })
      }
      setId(num_id);

    } catch (error) {

    }
  }

  const removeNumber = (num_id) => {
    try {
      axios_base.delete(`/number/${num_id}`)
        .then(res => {
          toggle3(!modal2);
          setModal2(false);
          setOpenDone(true);
          setId(null);
          history.push(`/myNumbers`);
          setModal2(false);
        })
        .catch(err => {
          console.log(err.response);
          if (err.response?.data?.message === "ERROR: update or delete on table \"numbers\" violates foreign key constraint \"fk_campaigns_number\" on table \"campaigns\" (SQLSTATE 23503)") {
            setOpenError(true);
            toggle3(!modal2);
          }
          else {
            setOpenError2(true);
          }
        })
    } catch (error) {

    }
  }

  var dateFormat = null;
  if (language === 'pt') {
    dateFormat = 'D/MM/YYYY, LTS ';
  } else {
    dateFormat = 'MMMM Do YYYY, h:mm:ss a';
  }
  React.useEffect(() => {
    loadNum();
  }, [location]);

  const testConection = () => {
    try {
      ReactDOM.render(<div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>, document.getElementById('options'))

      axios_base.get(`/number/${number_id}/connected`)
        .then(res => {
          setIsConected(true);
          toggleInfo();

          ReactDOM.render(<PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
              <div>
                <Button variant="contained" classes={{ root: btn.root, label: btn.label, }} {...bindTrigger(popupState)}>
                  {t("words.options")}
                </Button>
                <Menu {...bindMenu(popupState)}>
                  <div onClick={popupState.close}><MenuItem onClick={testConection}>{t("words.test_connection")}</MenuItem></div>
                  <div onClick={popupState.close}><MenuItem onClick={disconnecteConfirm}>{t("words.disconnect")}</MenuItem></div>
                </Menu>
              </div>
            )}
          </PopupState>, document.getElementById('options'))
        })
        .catch(err => {
          setIsConected(false);
          toggleInfo();

          ReactDOM.render(<PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
              <div>
                <Button variant="contained" classes={{ root: btn.root, label: btn.label, }} {...bindTrigger(popupState)}>
                  {t("words.options")}
                </Button>
                <Menu {...bindMenu(popupState)}>
                  <div onClick={popupState.close}><MenuItem onClick={testConection}>{t("words.test_connection")}</MenuItem></div>
                  <div onClick={popupState.close}><MenuItem onClick={disconnecteConfirm}>{t("words.disconnect")}</MenuItem></div>
                </Menu>
              </div>
            )}
          </PopupState>, document.getElementById('options'))
        })
    } catch (error) {

    }
  }

  const disconnecteConfirm = () => {
    toggleDisconnect();
  }

  const disconnect = () => {
    try {
      ReactDOM.render(<div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>, document.getElementById('options'))
      axios_base.patch(`/number/${number_id}/disconnect`)
        .then(res => {
          setIsConected("disconnected")
          toggleDisconnect();
          toggleInfo()
        })
        .catch(err => {

        })
    } catch (error) {

    }
  }
  return (
    <Container >
      <Content>
        <Table striped className="table" >

          <thead >
            <tr>
              <th>{t("words.number")}</th>
              <th>{t("words.created")}: </th>
              <th>{t("words.details")}</th>
            </tr>
          </thead>
          <tbody >
            {listNum.map((num) => (
              <tr key={num.id}>
                <td>{formatPhoneNumberIntl('+' + num.number.split(':')[0])}</td>
                <td>{moment(num.created_at).format(dateFormat)}</td>
                <td><Button classes={{ root: btn.root, label: btn.label, }} onClick={() => numberDetail(num.id)}>{t("words.details")}</Button></td>
              </tr>
            ))}
          </tbody>

        </Table >
      </Content>
      <Modal isOpen={modal} toggle={toggle2} style={{ maxWidth: '700px', width: '100%' }} className={className} onFocus={() => numberDetail(number_id)} >
        <ModalHeader>{t("words.number_details")}  </ModalHeader>
        <ModalBody>
          {connected === true && <div id="detalhes">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">{t("words.name")}</th>
                  <th scope="col">{t("words.number")}</th>
                  <th scope="col">{t("words.device")}</th>
                  <th scope="col">{t("words.status")}</th>
                  <th scope="col" style={{ flex: '1', textAlign: 'center' }}>{t("words.options")}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{listDetail?.name === "" ? "Unavailable" : listDetail?.name}</td>
                  <td>{formatPhoneNumberIntl('+' + listDetail?.wid?.split(':')[0])}</td>
                  <td>{listDetail?.platform === "" ? "Unavailable" : listDetail?.platform}</td>
                  <td>{t("words.conected")}</td>
                  <td style={{ flex: '1', textAlign: 'center' }} id="options"><PopupState variant="popover" popupId="demo-popup-menu">
                    {(popupState) => (
                      <div>
                        <Button variant="contained" classes={{ root: btn.root, label: btn.label, }} {...bindTrigger(popupState)}>
                          {t("words.options")}
                        </Button>
                        <Menu {...bindMenu(popupState)}>
                          <div onClick={popupState.close}><MenuItem onClick={testConection}>{t("words.test_connection")}</MenuItem></div>
                          <div onClick={popupState.close}><MenuItem onClick={disconnecteConfirm}>{t("words.disconnect")}</MenuItem></div>
                        </Menu>
                      </div>
                    )}
                  </PopupState></td>
                </tr>
              </tbody>
            </table>

            <Logs>
              <Timeline align="alternate">
                {logs?.map((log) => (
                  <TimelineItem>
                    <TimelineOppositeContent>
                      <Typography color="textSecondary">{moment(log.created_at).format(dateFormat)}</Typography>
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineDot>
                        {log.type === "connected" &&
                          <LinkIcon style={{ color: '#0294FF' }} />
                        }
                        {log.type === "disconnected" &&
                          <LinkOffIcon style={{ color: '#F54B5E' }} />
                        }
                      </TimelineDot>
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                      <Typography>
                        {log.type === "connected" &&
                          t("words.conected")
                        }
                        {log.type === "disconnected" &&
                          t("words.disconnected")
                        }
                      </Typography>
                    </TimelineContent>
                  </TimelineItem>
                ))}

                <TimelineItem>
                  <TimelineOppositeContent>
                    <Typography color="textSecondary">{moment(conection).format(dateFormat)}</Typography>
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot>
                      <PlayCircleOutlineIcon style={{ color: '#0294FF' }} />
                    </TimelineDot>
                  </TimelineSeparator>
                  <TimelineContent>
                    <Typography >{t("words.created")}</Typography>
                  </TimelineContent>

                </TimelineItem>

              </Timeline>
            </Logs>
          </div>
          }
          {connected === false &&
            <div>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col" style={{ width: '10%', textAlign: 'center', marginRight: '40px' }}>{t("words.name")}</th>
                    <th scope="col" style={{ width: '30%', textAlign: 'center' }}>{t("words.number")}</th>
                    <th scope="col" style={{ width: '30%', textAlign: 'center' }}>{t("words.device")}</th>
                    <th scope="col" style={{ width: '30%', textAlign: 'center' }}>{t("words.status")}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ width: '10%', }}></td>
                    <td style={{ width: '30%', textAlign: 'center' }}>{formatPhoneNumberIntl('+' + num)}</td>
                    <td style={{ width: '30%', }}></td>
                    <td style={{ width: '30%', textAlign: 'center' }}><ModalQRCode title="MyNumbers"
                      Parameter="authenticate" IdNumber={number_id}
                      button={<Button classes={{ root: btn.root, label: btn.label, }} >{t("words.reassign")}</Button>}>
                    </ModalQRCode></td>
                  </tr>
                </tbody>
              </table>
              <Logs>
                <Timeline align="alternate">
                  {logs?.map((log) => (
                    <TimelineItem>
                      <TimelineOppositeContent>
                        <Typography color="textSecondary">{moment(log.created_at).format(dateFormat)}</Typography>
                      </TimelineOppositeContent>
                      <TimelineSeparator>
                        <TimelineDot>
                          {log.type === "connected" &&
                            <LinkIcon style={{ color: '#0294FF' }} />
                          }
                          {log.type === "disconnected" &&
                            <LinkOffIcon style={{ color: '#F54B5E' }} />
                          }
                        </TimelineDot>
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent>
                        <Typography>{log.type}</Typography>
                      </TimelineContent>
                    </TimelineItem>
                  ))}

                  <TimelineItem>
                    <TimelineOppositeContent>
                      <Typography color="textSecondary">{moment(conection).format(dateFormat)}</Typography>
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineDot>
                        <PlayCircleOutlineIcon style={{ color: '#0294FF' }} />
                      </TimelineDot>
                    </TimelineSeparator>
                    <TimelineContent>
                      <Typography >{t("words.created")}</Typography>
                    </TimelineContent>

                  </TimelineItem>

                </Timeline>
              </Logs>
            </div>
          }

        </ModalBody>
        <ModalFooter>
          <div>
            <Button classes={{ root: BtnSave.root, label: BtnSave.label, }} onClick={toggle2}>{t("words.cancel")}</Button>
          </div>
          <div>
            <Button classes={{ root: CancelBtn.root, label: CancelBtn.label, }} onClick={toggle3}>{t("words.delete")}</Button>
          </div>
          <div>
            {/* <Button classes={{ root: BtnSave.root, label: BtnSave.label, }} >Reautenticar</Button> */}
          </div>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modal2} toggle={toggle3} className={className}>
        <ModalHeader>{t("words.number_details")}</ModalHeader>
        <ModalBody>
          <h6>{t("words.delete_number_question")}</h6>
        </ModalBody>
        <ModalFooter>
          <div>
            <Button classes={{ root: CancelBtn.root, label: CancelBtn.label, }} onClick={toggle3}>{t("words.cancel")}</Button>
          </div>
          <div>
            <Button classes={{ root: BtnSave.root, label: BtnSave.label, }} onClick={() => removeNumber(number_id)}>{t("words.delete")}</Button>
          </div>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalInfo} toggle={toggleInfo} className={className}>
        <ModalHeader>{t("words.number_details")}</ModalHeader>
        <ModalBody>
          <h6>
            {isConected === true && t("words.test_successful")}
            {isConected === "disconnected" && t("words.disconnected")}
            {isConected !== true && isConected !== "disconnected" && t("words.test_failed")}
          </h6>
        </ModalBody>
        <ModalFooter>
          <div>
            {isConected === "disconnected" ?
              <Button classes={{ root: BtnSave.root, label: BtnSave.label, }} onClick={toggleAll}>OK</Button>
              : <Button classes={{ root: BtnSave.root, label: BtnSave.label, }} onClick={toggleInfo}>OK</Button>
            }
          </div>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalDisconnect} toggle={toggleDisconnect} className={className}>
        <ModalHeader>{t("words.number_details")}</ModalHeader>
        <ModalBody>
          <h6>
            {t("words.confirmDisconnection")}
          </h6>
        </ModalBody>
        <ModalFooter>
          <div>
            <Button classes={{ root: CancelBtn.root, label: CancelBtn.label, }} onClick={toggleDisconnect}>{t("words.cancel")}</Button>
          </div>
          <div>
            <Button classes={{ root: BtnSave.root, label: BtnSave.label, }} onClick={disconnect}>OK</Button>
          </div>
        </ModalFooter>
      </Modal>

      <Snackbar open={openDone} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          {t("words.done")}
        </Alert>
      </Snackbar>
      <Snackbar open={openError} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {t("words.cant_delete")}
        </Alert>
      </Snackbar>
      <Snackbar open={openError2} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {t("words.unable_complete")}
        </Alert>
      </Snackbar>
    </Container >
  );
}

export default TableMyNumbers;