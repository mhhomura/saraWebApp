import React from 'react';
import ContentHeader from '../../Components/ContentHeader';
import { useStyles } from '../../../Styles/styles';
import { Button } from '@material-ui/core';
import { RiArrowGoBackFill } from 'react-icons/ri'
import ModalQRCode from '../../Components/ModalQRCode';
import { Link } from 'react-router-dom';
import TableMyNumbers from '../../Components/TableMyNumbers';
import { useTranslation } from "react-i18next";

import {
  Container,
  Content,
  Controllers,
} from './styles';


const MyNumbers = () => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Container>
      <ContentHeader title={t("words.my_numbers_reg")} subTitle="">
        <Link to="/dashboard">
          <Button classes={{ root: classes.root, label: classes.label, }}>
            <RiArrowGoBackFill />
          </Button>
        </Link>
      </ContentHeader>
      <Controllers>
        {/* <div>
          <Button classes={{ root: classes.root, label: classes.label, }}>
            Find
          </Button>
        </div> */}
        <div>
          <ModalQRCode title="MyNumbers" Parameter="New" button={<Button classes={{ root: classes.root, label: classes.label, }}> {t("words.new_number")} </Button>}>

          </ModalQRCode>
        </div>
      </Controllers>
      <Content>
        <div style={{ height: 300, width: '100%' }}>
          <TableMyNumbers />
        </div>
      </Content>
    </Container>
  );
}

export default MyNumbers;