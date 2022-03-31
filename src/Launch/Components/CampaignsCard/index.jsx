import React from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import axios_base from '../../../axios_base';
import moment from 'moment';
import { useTranslation } from "react-i18next";
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import Divider from '@material-ui/core/Divider';
import { InputGroup, InputGroupText, Input } from 'reactstrap';
import { BsSearch } from 'react-icons/bs';
import CampaignsStepByStep from '../../../Launch/Components/CampaignsStepByStep';
import AddCircleIcon from '@material-ui/icons/AddCircle';


import {
    Container,
    Title,
    Graphic,
    Card,
    useStyles,
    TabArea,
    SearchAddButtons,
    SearchInput,
    BtnAdd
} from './styles';

const CampaignsCard = () => {

    const [search, setSearch] = React.useState("");

    const { t } = useTranslation();
    const classes = useStyles();
    var language = navigator.language.substring(0, 2);
    const [listCampaing, setCampaing] = React.useState([]);
    var size = 0;

    function getCampaings() {
        axios_base.get('/campaign')
            .then(res => {
                setCampaing(res.data);
            })
    }

    React.useEffect(() => {
        getCampaings();
    }, []);

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    var dateFormat = null;
    if (language === 'pt') {
        dateFormat = 'DD/MM';
    } else {
        dateFormat = 'MM/D';
    }
    var windowWidth = window.innerWidth;
    if (windowWidth >= '1280') {
        size = 3;
    } else if (windowWidth <= '780') {
        size = 12;
    }

    return (
        <Container>
            <div className={classes.root}>
                <TabContext value={value}>
                    <AppBar position="static" className={classes.AppBarStyle}>
                        <TabList TabIndicatorProps={{ style: { background: '#0080FC' } }} onChange={handleChange} aria-label="Campaings" className={classes.SelectedTab}>
                            <Tab label={t("words.active")} value="1" className={classes.TabFont} />
                            <Tab label={t("words.archived")} value="2" className={classes.TabFont} />
                        </TabList>
                    </AppBar>

                    <Divider className='divider' />

                    <SearchAddButtons>
                        <SearchInput>
                            <InputGroup>
                                <InputGroupText><BsSearch /></InputGroupText>
                                <Input className="form-input" onChange={e => setSearch(e.target.value)} value={search} id="input-table" placeholder={t("words.search")} />
                            </InputGroup>
                        </SearchInput>

                        <BtnAdd>
                            <CampaignsStepByStep title={t("words.campaigns")} buttonLabel={<span><AddCircleIcon className='addIcon' /> {t("words.create_camp")}</span>} />
                        </BtnAdd>

                    </SearchAddButtons>
                    <TabArea>
                        <TabPanel value="1" className={classes.TabPanelStyle}>
                            <Grid container spacing={3}>
                                {listCampaing.filter((campaign) => {
                                    if (search === "") {
                                        return campaign
                                    } else if (campaign.name.toLowerCase().includes(search.toLowerCase())) {
                                        return campaign
                                    } else {
                                        return null
                                    }
                                }).map((num) => (num.archived === false && <Grid item xs={size} key={num.id} className={classes.container}>
                                    <Link to={`/campaigns/${num.id}/detail`} style={{ textDecoration: "none", }}>
                                        <Card >
                                            <Title>
                                                <h2>{num.name.toUpperCase()}</h2>
                                            </Title>
                                            <Graphic>
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <BarChart
                                                        width={500}
                                                        height={300}
                                                        data={num?.statistics.map(statistics => ({
                                                            name: moment().subtract(statistics.index, 'days').format(dateFormat),
                                                            entradas: statistics.count
                                                        })).reverse()}
                                                        margin={{
                                                            top: 5,
                                                            right: 30,
                                                            left: 20,
                                                            bottom: 5,
                                                        }}
                                                        barSize={20}
                                                    >
                                                        <XAxis dataKey="name" scale="poits" padding={{ left: 10, right: 10 }} />
                                                        <Tooltip />
                                                        <Bar dataKey="entradas" fill="#0294FF" background={{ fill: 'White' }} />
                                                    </BarChart>
                                                </ResponsiveContainer>

                                            </Graphic>
                                        </Card>
                                    </Link>
                                </Grid>
                                ))}


                            </Grid>
                        </TabPanel>
                        <TabPanel value="2" className={classes.TabPanelStyle}>
                            <Grid container spacing={3}>
                                {listCampaing.map((num) => (num.archived === true && <Grid item xs={size} key={num.id} className={classes.container}>
                                    <Link to={`/campaigns/${num.id}/detail`} style={{ textDecoration: "none", }}>
                                        <Card >
                                            <Title>
                                                <h2>{num.name}</h2>
                                            </Title>
                                            <Graphic>
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <BarChart
                                                        width={500}
                                                        height={300}
                                                        data={num?.statistics.map(statistics => ({
                                                            name: moment().subtract(statistics.index, 'days').format(dateFormat),
                                                            entradas: statistics.count
                                                        })).reverse()}
                                                        margin={{
                                                            top: 5,
                                                            right: 30,
                                                            left: 20,
                                                            bottom: 5,
                                                        }}
                                                        barSize={20}
                                                    >
                                                        <XAxis dataKey="name" scale="poits" padding={{ left: 10, right: 10 }} />
                                                        <Tooltip />
                                                        <Bar dataKey="entradas" fill="#0294FF" background={{ fill: 'White' }} />
                                                    </BarChart>
                                                </ResponsiveContainer>

                                            </Graphic>
                                        </Card>
                                    </Link>
                                </Grid>
                                ))}


                            </Grid>
                        </TabPanel>
                    </TabArea>
                </TabContext>
            </div>

        </Container>
    );
}

export default CampaignsCard;
