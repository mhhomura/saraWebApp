import React from 'react';
import ContentHeader from '../../Components/ContentHeader';
import Backgroud from '../../Components/Backgroud';
import { Container, Content } from './styles';
import CampaignsCard from '../../../Launch/Components/CampaignsCard';
import { useTranslation } from "react-i18next";
import CampaignsStepByStep from '../../../Launch/Components/CampaignsStepByStep';
import axios_base from '../../../axios_base';
import WelcomeBanner from '../../../Launch/Components/WelcomeBanner';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const Dashboard = () => {
    const { t } = useTranslation();

    const [campaignAmount, setCampaignAmount] = React.useState();
    function getCampaings() {
        axios_base.get('/campaign')
            .then(res => {
                setCampaignAmount(res.data.length);
            })
    }
    React.useEffect(() => {
        getCampaings();
    }, []);

    return (
        <Container>
            {campaignAmount === 0 ? <div>
                <ContentHeader title={t("words.your_campaigns")} subTitle={t("words.welcome_to_launch")}>
                </ContentHeader>

                <WelcomeBanner />

                <Content height={'40rem'}>
                    <Backgroud text={t("words.primary_message")} title={t("words.create_campaigns")}>
                        <CampaignsStepByStep title={t("words.campaigns")} buttonLabel={<span><AddCircleIcon className='addIcon' /> {t("words.create_camp")}</span>} />
                    </Backgroud>
                </Content>
            </div> : <div>
                <ContentHeader title={t("words.dashboard")} subTitle={t("words.selec_camp")}>
                </ContentHeader>

                <WelcomeBanner />

                <Content height={'45rem'}>
                    <CampaignsCard>
                    </CampaignsCard>
                </Content>
            </div>
            }
        </Container>
    );
}

export default Dashboard;