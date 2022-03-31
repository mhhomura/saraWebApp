import React from 'react';
import { Button, Grid } from '@material-ui/core';
import { cancelBtn, saveBtn, useStyles } from '../../../Styles/styles';
import Select from 'react-select';
import axios_base from '../../../axios_base';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Switch from '@material-ui/core/Switch';
import { Modal, ModalBody, ModalHeader, ModalFooter, Input } from 'reactstrap';
import moment from 'moment';
import { TiPlus } from 'react-icons/ti';
import { useHistory, /* useLocation */ } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { formatPhoneNumberIntl } from 'react-phone-number-input'
import {
  DivSwitch,
  Container,
  Form,
  Label,
  DivTags,
  UseStyles,
} from './styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const DetailsLeads = (props) => {

  const { t } = useTranslation();
  /* let location = useLocation(); */
  let history = useHistory();
  var language = navigator.language.substring(0, 2);
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const {
    title,
    buttonLabel,
    idCampaign,
    memberId,
  } = props;

  const [leadTags, setLeadTags] = React.useState([]);
  const [tagName, setTagName] = React.useState();
  const [listTags, setListTags] = React.useState([]);
  const [modal, setModal] = React.useState(false);
  const [modalTag, setModalTag] = React.useState(false);
  const [detailMember, setDetailMember] = React.useState([]);
  const [stage, setStage] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [listStage, setListStage] = React.useState([]);
  const [memberRole, setMemberRole] = React.useState();
  const classes = UseStyles();
  const Btn = useStyles();
  const BtnCancel = cancelBtn();
  const BtnSave = saveBtn();
  const [open, setOpen] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const [openError2, setOpenError2] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
    setOpenError(false);
    setOpenError2(false);
  };

  let options = listTags.map(tags => ({ label: tags?.name, value: tags?.id }));
  let stageOptions = listStage.map(steps => ({ label: steps.name, value: steps.id }));

  function getdetailMember() {
    axios_base.get(`campaign/${idCampaign}/member/${memberId}`)
      .then(res => {
        if (res.data) {
          console.log(res.data);
          if (res.data.is_admin === true) {
            setMemberRole(t("words.administrator"))
          } else {
            setMemberRole(t("words.lead"))
          }
          setDetailMember(res.data);
          setLeadTags(res.data?.tags?.map(tags => ({ label: tags.tag?.name, value: tags.tag?.id })))
          setDescription(res.data?.observation);
          setStage(res.data.stage_id);
          getTags();
          getStage();
        }
      })
      .catch(err => {
        console.log(err)
        setOpenError2(true);
      })

  }
  function getStage() {
    axios_base.get(`campaign/${idCampaign}/stage`)
      .then(res => {
        /* console.log(res.data); */
        setListStage(res.data);
      })
  }

  function getTags() {
    axios_base.get(`/campaign/${idCampaign}/tag`)
      .then(res => {
        setListTags(res.data);
      })
  }

  const updateLead = (stage, description, leadTags) => {
    console.log(leadTags);
    function leadUpdate() {
      if (!description) {
        description = detailMember.observation;
      }
      var data = {
        "stage_id": parseInt(stage),
        "observation": description,
        "tag_ids": leadTags?.map(tagsId => tagsId.value)
      }
      axios_base.patch(`campaign/${idCampaign}/member/${memberId}`, data)
        .then(res => {
          setOpen(true);
          getdetailMember();
          setDescription('')
          setTimeout(() => {
            setModal(!modal);
            history.push(`/campaigns/${idCampaign}/detail`);
          }, 1001);
        })
        .catch(err => {
          console.log(err)
          setOpenError2(true);
        })
    }
    leadUpdate();
  }
  const toggle = () => {
    setModal(!modal);
    getdetailMember();
  }
  const toggleC = () => {
    setModalTag(!modalTag);
  }
  const createTag = (tagName) => {
    try {
      if (tagName.split(' ').length > 1) {
        setOpenError(true);
      }
      var data = {
        "name": tagName,
      }
      axios_base.post(`campaign/${idCampaign}/tag`, data)
        .then(res => {
          setOpen(true);
          setTagName("");
          console.log(res.data);
          /* setModalTag(!modalTag); */
          getTags();
        })
        .catch(error => {
          setOpenError(true)
        })
    } catch (error) {

    }
  }

  var dateFormat = null;
  if (language === 'pt') {
    dateFormat = 'D/MM/YYYY, LTS ';
  } else {
    dateFormat = 'M/D/YYYY, LTS ';
  }


  return (
    <Container>
      <Button classes={{ root: Btn.root, label: Btn.label, }} onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} size="lg" style={{ maxWidth: '700px', width: '100%' }}>
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <Form>
          <Grid container spacing={12}>
            <Grid item xs={2} className={classes.container} style={{ paddingRight: '5px' }}>
              <Avatar alt="Lead" src={detailMember?.image} style={{ width: '100%', height: '100px' }} />
            </Grid>
            <Grid item xs={5} className={classes.container} style={{ paddingTop: '10px' }}>
              <div style={{ marginLeft: '5%' }}>
                {detailMember?.name !== "" && <h4>{detailMember?.name}</h4>}{detailMember?.name === "" && <p>{t("words.name_unavailable")}</p>}
                <h5>{formatPhoneNumberIntl('+' + detailMember.number?.split(':')[0])}</h5>
              </div>
            </Grid>
            <Grid item xs={5} className={classes.container} style={{ paddingTop: '10px' }}>
              <div>
                <h5>{t("words.dates")}</h5>
                <p>{t("words.joined")}:  <i>{moment(detailMember?.created_at).format(dateFormat)}</i></p>
              </div>
            </Grid>
          </Grid>

          <Divider className={classes.divider} />
          <div class="row">
            <div class="col">
              <Label htmlFor="stage">{t("words.stages")}</Label>
              <Select options={stageOptions} onChange={opt => setStage(opt.value)} placeholder={detailMember?.stage?.name} id="stage" >
              </Select>
            </div>

            <div class="col">
              <div class="col">
                <Label htmlFor="role">{t("words.role")}</Label>
                <Input placeholder={memberRole} id="role" disabled >
                </Input>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="observation">{t("words.observation")}:</Label>
            <Input
              onChange={(e) => setDescription(e.target.value)}
              id="observation"
              class="input-reset ba b--black-20 pa2 mb2 db w-100"
              type="textarea"
              aria-describedby="name-desc"
              value={description}
            />
          </div>
          <div>
            <DivTags>
              <div onClick={toggleC} style={{ width: '20%', marginTop: '2.3%', cursor: 'pointer' }}>
                <h5><TiPlus />{t("words.tags")}</h5>
              </div>
              <Select options={options} onChange={opt => setLeadTags(opt)} value={leadTags} isMulti id="adms" />
            </DivTags>
            <DivSwitch>
              <Label className="banishLabel">{t("words.banish")}
                <Switch
                  checked={state.checkedB}
                  onChange={handleChange}
                  color="primary"
                  name="checkedB"
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
              </Label>
            </DivSwitch>
          </div>
          <Divider className={classes.divider} />
        </Form>
        <ModalFooter>
          <div>
            <Button classes={{ root: BtnCancel.root, label: BtnCancel.label, }} onClick={toggle}>{t("words.cancel")}</Button>
          </div>
          <div>
            <Button classes={{ root: BtnSave.root, label: BtnSave.label, }} onClick={() => updateLead(stage, description, leadTags)}>{t("words.save")}</Button>
          </div>
        </ModalFooter>
        <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            {t("words.done")}
          </Alert>
        </Snackbar>
        <Snackbar open={openError2} autoHideDuration={1000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            {t("words.unable_complete")}
          </Alert>
        </Snackbar>
      </Modal>
      <Modal isOpen={modalTag} >
        <ModalHeader toggle={toggleC}>{t("words.create_tag")}</ModalHeader>
        <ModalBody>
          <Label htmlFor="stageName">{t("words.tag_name")}</Label>
          <Input onChange={(e) => setTagName(e.target.value)} name="tagName" value={tagName} id="inputTagName" placeholder={t("words.tag_name")} required />
        </ModalBody>
        <ModalFooter>
          <div>
            <Button classes={{ root: BtnCancel.root, label: BtnCancel.label, }} onClick={toggleC}>
              {t("words.cancel")}
            </Button>
          </div>
          <div>
            <Button type="subimit" classes={{ root: BtnSave.root, label: BtnSave.label, }} onClick={() => createTag(tagName)}>
              {t("words.save")}
            </Button>
          </div>
        </ModalFooter>
        <Snackbar open={openError} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            {t("words.tag_required")}
          </Alert>
        </Snackbar>
      </Modal>
    </Container >
  );
}

export default DetailsLeads;